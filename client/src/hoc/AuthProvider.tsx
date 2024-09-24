import { createContext, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  signin: (newUser: any, cb: () => void) => {},
  signout: (cb: () => void) => {}
});

export const AuthProvider = ({ children }: { children: JSX.Element}) => {
  const [user, setUser] = useState(null);
  const signin = (newUser: any, cb: () => void) => {
    setUser(newUser);
    cb();
  };

  const signout = (cb: () => void) => {
    setUser(null);
    cb();
  };
  const value = {user, signin, signout};

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}
