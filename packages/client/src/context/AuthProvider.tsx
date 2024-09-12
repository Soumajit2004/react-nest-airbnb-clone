import React, { createContext, PropsWithChildren, useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken.ts';
import useAuth from '../hooks/useAuth.ts';
import { axiosInstance } from '../api/api.ts';

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

  const refresh = useRefreshToken();
  const authContext = useAuth();

  useEffect(() => {

    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${authContext?.auth?.accessToken}`;
        }

        return config;
      }, (error) => Promise.reject(error),
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error.response.status === 401) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance;
        }

        return Promise.reject(error);
      });

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [authContext?.auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;