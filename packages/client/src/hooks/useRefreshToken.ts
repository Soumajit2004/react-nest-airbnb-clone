import useAuth from './useAuth.ts';
import { refreshAccessToken } from '../api/auth.api.ts';

const useRefreshToken = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { setAuth } = useAuth();

  return async () => {
    const response = await refreshAccessToken();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setAuth((prev): { accessToken: string } => {
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
};

export default useRefreshToken;