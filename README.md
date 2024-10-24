# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

This app is an authentication system that allows users to register, log in, and access create-post or a dashboard where they can view user information.

### 1. **User Registration**

- Users can create an account by providing their first name, last name, email, and password.
- Upon successful registration, a token is generated and stored in cookies for authentication.

### 2. **User Login**

- Existing users can log in with their email and password.
- On successful login, they are redirected to create-post and then to a dashboard, and the access token is stored in cookies.

### 3. **post-page**

The `CreatePost` component handles the submission of a new post by capturing user input, sending it to an API for creation, and then redirecting the user upon success.

### 3. **Dashboard**

- After logging in, users can access a dashboard that displays a table of user data (like first name, last name, email, and timestamps for when the user was created or updated). they can see the content that they did wrote
- There’s an option to log out, which removes the access token from cookies and redirects the user back to the login page.

### 4. **Protected Routes**

- Certain routes (like the dashboard) are protected, meaning only authenticated users can access them. If a user tries to access these routes without being logged in, they are redirected to the login page.

### 5. **Error Handling**

- The app handles various errors during registration and login, providing feedback to the user when something goes wrong.

Overall, the app serves as a basic template for user authentication and management, showcasing how to handle user sessions and secured routes in a React application.
