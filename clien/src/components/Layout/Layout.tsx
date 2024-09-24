import React, { useCallback } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hook';
import { ApiService } from '../../services';

import './layout.scss';

const Layout = () => {
  const { user, signOut } = useAuth();

  const onLogoutClick = useCallback(() => {
    if (user) {
      ApiService.logOut();
      signOut();
    }
  },[user, signOut]);

  return (
    <>
      <header className="md-header">
        <div className="nav-section">
          <Navbar.Brand as={Link} to="/">
            MD test
          </Navbar.Brand>
          <NavLink to="/" className="nav-section-item">Home</NavLink>
          <NavLink to="/users" className="nav-section-item">Users List</NavLink>
          <NavLink to="/edit-profile" className="nav-section-item">Edit profile</NavLink>
        </div>

        {user ? (
          <Button
            className="btn-logout"
            variant="secondary"
            size="sm"
            onClick={onLogoutClick}
          >
            Sign out
          </Button>
        ) :  null}
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer>MDtest 2024</footer>
    </>
  )
}

export default Layout;
