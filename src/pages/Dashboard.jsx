

import Cookies from 'js-cookie';
import { useSendLogoutMutation } from '../redux/features/auth/authApiSlice';
import { useGetUsersQuery } from '../redux/features/users/usersApiSlice';
import { useGetPostsQuery } from '../redux/features/posts/postsApiSlice'; // Importing the posts query
import styles from '../styles/Dashboard.module.css';
import { useNavigate } from 'react-router';
import PostList from '../components/posts/PostList';

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    data: users,
    isLoading: loadingUsers,
    isError: errorLoadingUsers,
    error: userError,
    isSuccess: successLoadingUsers,
  } = useGetUsersQuery();

  const {
    data: posts,
    isLoading: loadingPosts,
    isError: errorLoadingPosts,
    error: postError,
    isSuccess: successLoadingPosts,
  } = useGetPostsQuery();

  const [sendLogout] = useSendLogoutMutation();

  const formatDate = (dateString) => {
    const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return 'Invalid date format';

    const year = match[1];
    const month = match[2];
    const day = match[3];

    return `${year}/${month}/${day}`;
  };

  const handleLogout = () => {
    sendLogout();
    Cookies.remove('accessToken');
    navigate('/auth/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
    

      {loadingUsers && !errorLoadingUsers && <p>Loading users...</p>}
      {!loadingUsers && errorLoadingUsers && <p>Error: {userError.data.message}</p>}
      {!loadingUsers && successLoadingUsers && users && users.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>{formatDate(user.updatedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        <button type='button' onClick={handleLogout}>
        Logout
      </button>

      {/* Post List Section */}
      {loadingPosts && <p>Loading posts...</p>}
      {!loadingPosts && errorLoadingPosts && <p>Error: {postError.data.message}</p>}
      {!loadingPosts && successLoadingPosts && posts && posts.length > 0 && (
        <div>
          {/* <h2>Posts</h2> */}
          <PostList />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
