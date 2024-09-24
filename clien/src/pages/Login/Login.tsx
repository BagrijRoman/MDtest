import React, { useCallback, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

import { useAuth } from '../../hook/useAuth';
import { ApiService } from '../../services';
import { httpStatus } from "../../const";

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
  }, [formData]);

  const onSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoginLoading(true);
      const { status, user } = await ApiService.login({ email: formData.email, password: formData.password });
      if (status === httpStatus.OK && user) {
        signIn(user, () => redirectToFromPage);
      }
    } catch (err) {
      // tot add error notification here
    } finally {
      setLoginLoading(false);
    }
  }, [formData]);

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
};

export default Login;
