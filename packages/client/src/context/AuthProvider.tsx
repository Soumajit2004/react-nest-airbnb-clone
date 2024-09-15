import React, { createContext, PropsWithChildren, useState } from 'react';
import { AuthWatcher } from '../components/common/auth/AuthWacher.component.tsx';

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
      <AuthWatcher>
        {children}
      </AuthWatcher>
    </AuthContext.Provider>
  );
};

export default AuthContext;