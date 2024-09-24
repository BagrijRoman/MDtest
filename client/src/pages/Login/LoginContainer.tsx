import React, { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../hook";
import { ApiService } from "../../services";
import { httpStatus } from "../../const";
import { Login } from './Login';

export interface ISignInFormData {
  email: string;
  password: string;
}

export const LoginContainer = () => {
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
      console.log('err: ', err)
    } finally {
      setLoginLoading(false);
    }
  }, [formData]);

  return (
    <Login
      {...{
        onSubmit,
        onDataChange,
        formData,
        loginLoading,
      }}
    />
  );

};
