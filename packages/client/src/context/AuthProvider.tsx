import React, { createContext, PropsWithChildren, useState } from 'react';

type UserCredentials = {
  accessToken: string;
}

type AuthContextType = {
  auth: UserCredentials | null;
  setAuth: React.Dispatch<React.SetStateAction<UserCredentials | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<UserCredentials | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;