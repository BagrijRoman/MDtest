import React, { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hook/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn } = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const redirectToFromPage = useCallback(() => {
    navigate(fromPage, { replace: true })
  }, [ fromPage ]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback((event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const user = { name: form.username.value, password: form.password.value };
    signIn(user, () => redirectToFromPage);
  }, [redirectToFromPage]);

  useEffect(() => {
    if (!!user) {
      redirectToFromPage();
    }
  }, [user, redirectToFromPage]);

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
