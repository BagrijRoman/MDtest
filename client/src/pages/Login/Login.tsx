import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();
  const fromPage = location.state?.from?.pathname || '/';
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const user = { name: form.username.value, password: form.password.value };
    signin(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <div>
      <h1>Login page</h1>
      <form className="authorization" onSubmit={handleSubmit}>
        <label>
          Name: <input name="username" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
};

export default Login;
