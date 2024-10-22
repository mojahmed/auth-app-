import { useState } from 'react';
import { useCreatePostMutation, useGetPostsQuery } from '../../redux/features/posts/postsApiSlice';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/CreatePost.module.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({ title: '', content: '' });
  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();
  const { refetch } = useGetPostsQuery(); // Get the refetch function

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost(postInputs).unwrap(); // unwrap to handle the promise
      setPostInputs({ title: '', content: '' });
      await refetch(); // Refetch the posts to get the latest data
      navigate('/dashboard'); // Redirect after successful creation
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor='title'>Title</label>
        <input
          id='title'
          type='text'
          required
          value={postInputs.title}
          onChange={(e) => setPostInputs({ ...postInputs, title: e.target.value })}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='content'>Content</label>
        <textarea
          id='content'
          required
          value={postInputs.content}
          onChange={(e) => setPostInputs({ ...postInputs, content: e.target.value })}
        />
      </fieldset>
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
      {isError && error && <p className={styles.error}>{error.data.message}</p>}
    </form>
  );
};

export default CreatePost;
