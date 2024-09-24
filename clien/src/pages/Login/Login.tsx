import React, { ChangeEvent, FormEvent } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

import { ISignInFormData } from './LoginContainer';

interface ILoginProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  onDataChange: (e: ChangeEvent<HTMLInputElement>) => void;
  formData: ISignInFormData;
  loginLoading: boolean;
}

export const Login = (props: ILoginProps) => {
  const {
    onSubmit,
    onDataChange,
    formData,
    loginLoading,
  } = props;

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
          disabled={!!loginLoading}
        >
          {loginLoading ? 'Loading…' : 'Sign In'}
        </Button>
      </Form>
    </Container>
  );
};
