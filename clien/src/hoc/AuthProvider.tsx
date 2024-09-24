import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  user: null,
  signIn: (newUser: any, cb?: () => void) => {},
  signout: (cb?: () => void) => {}
});

export const AuthProvider = ({ children }: { children: JSX.Element}) => {
  const [user, setUser] = useState(null);

  const signIn = (newUser: any, cb?: () => void) => {
    setUser(newUser);
    cb && cb();
  };

  const signout = (cb?: () => void) => {
    setUser(null);
    cb && cb();
  };
  
  const value = {user, signIn, signout};

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
