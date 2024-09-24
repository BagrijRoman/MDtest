import React from "react";
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className="md-header">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/users">Users List</NavLink>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer>MDtest 2024</footer>
    </>
  )
}

export default Layout;
