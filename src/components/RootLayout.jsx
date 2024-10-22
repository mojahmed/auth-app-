
import { Outlet, Link } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      <nav>
        
        <Link to="/auth/login">Login</Link>
        {/* <Link to="/auth/signup">Signup</Link>
        <Link to="/create-post">Create Post</Link> */}
      </nav>
      <Outlet />
    </div>
  );
};

export default RootLayout;
