import useRefreshToken from './hooks/useRefreshToken.ts';
import useAuth from './hooks/useAuth.ts';
import { useEffect } from 'react';
import { axiosInstance } from './api/api.ts';

export function ApiWatcher() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {

    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
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
      axiosInstance.interceptors.response.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return (
    <div />
  );
}