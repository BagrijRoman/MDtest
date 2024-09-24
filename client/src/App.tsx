import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { RequireAuth } from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';

import Layout from './components/Layout';
import {
  NotFound,
  User,
  UsersList,
  Login,
  Home,
} from './pages';

import './App.scss';

const App = () => (
  <div className="md">
    <AuthProvider>
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
    </AuthProvider>
  </div>
);

export default App;
