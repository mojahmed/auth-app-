
import { useState } from 'react';
import styles from '../../styles/Form.module.css';
import { useRegisterMutation } from '../../redux/features/auth/authApiSlice';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const navigate = useNavigate();

  const [userInputs, setUserInputs] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [register, { isError, isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register({
        first_name: userInputs.first_name,
        last_name: userInputs.last_name,
        email: userInputs.email,
        password: userInputs.password,
      });
      
      const accessToken = data.accessToken; // Access the token from the response
      if (accessToken) {
        Cookies.set('accessToken', accessToken); // Save the token in cookies
        setUserInputs({
          email: '',
          first_name: '',
          last_name: '',
          password: '',
        });
        navigate('Create Account'); // Redirect after successful registration
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error for troubleshooting
      if (error && error.data && error.data.message) {
        alert(error.data.message); // Show an alert with the error message
      }
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor='first_name'>First Name</label>
          <input
            id='first_name'
            type='text'
            name='first_name'
            required
            minLength={2}
            value={userInputs.first_name}
            onChange={(e) =>
              setUserInputs((prev) => ({
                ...prev,
                first_name: e.target.value,
              }))
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='last_name'>Last Name</label>
          <input
            id='last_name'
            type='text'
            name='last_name'
            required
            minLength={2}
            value={userInputs.last_name}
            onChange={(e) =>
              setUserInputs((prev) => ({
                ...prev,
                last_name: e.target.value,
              }))
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            required
            value={userInputs.email}
            onChange={(e) =>
              setUserInputs((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            minLength={6}
            required
            value={userInputs.password}
            onChange={(e) =>
              setUserInputs((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        </fieldset>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Create Account'}
        </button>
      </form>
      {isError && error && error.data && (
        <p className={styles.error}>{error.data.message}</p>
      )}
    </>
  );
};

export default SignupForm;

