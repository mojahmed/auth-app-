import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import RootLayout from './components/RootLayout';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/Dashboard';
import CreatePost from './components/posts/CreatePost'; 
import Cookies from 'js-cookie';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  const accessToken = Cookies.get('accessToken');

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
       
        <Route path='auth' element={<RootLayout />}>
          <Route
            path='login'
            element={
              accessToken ? <Navigate to='/create-post' replace /> : <Login />
            }
          />
          <Route
            path='signup'
            element={
              accessToken ? <Navigate to='/create-post' replace /> : <Signup />
            }
          />
        </Route>

        {/* Protected Routes */}
        <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path='/create-post'
          element={
            <RequireAuth>
              <CreatePost /> 
            </RequireAuth>
          }
        />
        <Route path='/' element={<Navigate to='/auth/login' replace />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
