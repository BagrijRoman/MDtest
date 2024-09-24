import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import { Home, Login, NotFound, User, UsersList } from "./pages";
import { RequireAuth } from "./hoc/RequireAuth";
import { ApiService } from './services';
import { useAuth } from './hook/useAuth';

export const Router = () => {
  const { user, signIn } = useAuth();

  const checkAuth = async () => {
    if (!user) {
      const { error, user: apiUser } = await ApiService.checkAuthOnStartup();

      if (apiUser && !error) {
        signIn(apiUser);
      }
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="users" element={
          <RequireAuth>
            <UsersList />
          </RequireAuth>
        } />
        <Route path="user/:id" element={
          <RequireAuth>
            <User />
          </RequireAuth>
        } />

        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};