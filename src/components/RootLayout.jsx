import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import styled from 'styled-components';   //using this st compo

const Nav = styled.nav`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: white; /* Background color */
  display: flex; /* Flexbox for alignment */
  justify-content: space-between; /* Space between buttons */
  border-radius: 8px; /* Rounded corners */
  margin-bottom: 2rem; /* Space below */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Shadow for depth */
`;

const Button = styled(Link)`
  margin: 0 10px; /* Space between buttons */
  padding: 10px 20px; /* Padding for button size */
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff; /* Border for button effect */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s, background-color 0.3s;

  &:hover {
    color: #fff; /* Change text color on hover */
    background-color: #007bff; /* Button color on hover */
  }
`;

const RootLayout = () => {
  return (
    <div>
      <Nav>
        <Button to="/auth/signup">Signup</Button>
        <Button to="/auth/login">Login</Button>
      </Nav>
      <Outlet />
    </div>
  );
};

export default RootLayout;
