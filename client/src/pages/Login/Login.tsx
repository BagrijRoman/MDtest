import React, { useCallback, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

import { useAuth } from '../../hook/useAuth';
import { ApiService } from '../../services';

interface ISignInFormData {
  email: string;
  password: string;
}

// todo decompose

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn } = useAuth();
  const fromPage = location.state?.from?.pathname || '/';

  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ISignInFormData>({
    email: '',
    password: '',
  });

  const redirectToFromPage = useCallback(() => {
    navigate(fromPage, { replace: true })
  }, [ fromPage ]);

  useEffect(() => {
    if (!!user) {
      redirectToFromPage();
    }
  }, [user, redirectToFromPage]);

  const onDataChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }, []);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Form submitted:', formData);

    try {
      setLoginLoading(true);

      const {} = await ApiService.login({ email: '', password: '' })

    } catch (err) {

    } finally {
      setLoginLoading(false);
    }
  }, []);






  // const handleSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   const email = form.username.value;
  //   const password = form.password.value;
  //
  //   const user = { name: form.username.value, password: form.password.value };
  //   signIn(user, () => redirectToFromPage);
  // }, [redirectToFromPage]);


  return (
    <Container>
      <h3>Login </h3>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email here"
            name="email"
            value={formData.email}
            onChange={onDataChange}
            isInvalid={!!(formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))}
          />
          <Form.Control.Feedback type="invalid">
            Should be valid email
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={onDataChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loginLoading}
        >
          {loginLoading ? 'Loading…' : 'Sign In'}
        </Button>
      </Form>
    </Container>
  );




  // return (
  //   <div>
  //     <h1>Login page</h1>
  //     <form className="authorization" onSubmit={handleSubmit}>
  //       <Form.Label htmlFor="inputPassword5">Password</Form.Label>
  //       <Form.Control
  //         type="password"
  //         id="inputPassword5"
  //         aria-describedby="passwordHelpBlock"
  //       />
  //       <label>
  //         Password: <input type="password" name="password" disabled={loginLoading}/>
  //       </label>
  //       <Button type="submit" disabled={loginLoading}>
  //         {loginLoading ? 'Loading…' : 'Login'}
  //       </Button>
  //     </form>
  //   </div>
  // )
};

export default Login;
