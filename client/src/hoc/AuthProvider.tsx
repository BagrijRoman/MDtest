import React, { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

export const AuthProvider = ({ children }: { children: JSX.Element}) => {
  const [user, setUser] = useState(null);

  const signIn = (newUser: any, cb?: () => void) => {
    setUser(newUser);
    cb && cb();
  };

  const signOut = (cb?: () => void) => {
    setUser(null);
    cb && cb();
  };
  
  const value = {user, signIn, signOut};

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
};
