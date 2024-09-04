import { createContext, PropsWithChildren, useState } from 'react';

// interface UserData {
//   accessToken: string;
// }

const AuthContext = createContext({});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;