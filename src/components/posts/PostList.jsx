import { useGetPostsQuery, useUpdatePostMutation, useDeletePostMutation } from '../../redux/features/posts/postsApiSlice';
import { useState } from 'react';
import styles from '../../styles/PostList.module.css';

const PostList = () => {
  const { data: posts, isLoading, isError, error, refetch } = useGetPostsQuery();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();
  const [editPostId, setEditPostId] = useState(null);
  const [newContent, setNewContent] = useState('');

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Error: {error.data?.message || 'Failed to load posts'}</p>;

  const handleEditClick = (post) => {
    setEditPostId(post._id);
    setNewContent(post.content);
  };

  const handleUpdate = async (postId) => {
    if (newContent.trim()) {
      try {
        await updatePost({ postId, content: newContent }).unwrap();
        setEditPostId(null);
        setNewContent('');
        await refetch();
      } catch (err) {
        console.error('Failed to update post:', err);
        alert(`Error: ${err.data?.message || 'Something went wrong'}`);
      }
    }
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId).unwrap(); 
      await refetch();
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post._id}>
            <td>{post.title}</td>
            <td>
              {editPostId === post._id ? (
                <input
                  type="text"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Edit content"
                />
              ) : (
                <span>{post.content}</span>
              )}
            </td>
            <td>
              {editPostId === post._id ? (
                <>
                  <button onClick={() => handleUpdate(post._id)}>Save</button>
                  <button onClick={() => setEditPostId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(post)}>Edit</button>
                  <button onClick={() => handleDelete(post._id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostList;
