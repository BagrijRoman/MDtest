import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../components/Logo";

const NotFound = () => (
  <div>
    This page doesn't exist. Go <Link to="/">home</Link>
    <Logo />
  </div>
);

export default NotFound;
