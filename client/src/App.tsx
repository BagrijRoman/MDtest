import React from "react";

import { AuthProvider } from "./hoc/AuthProvider";
import { Router } from "./Router";

import "./App.scss";

const App = () => (
  <div className="md">
    <AuthProvider>
      <Router/>
    </AuthProvider>
  </div>
);

export default App;
