import useAuth from './useAuth.ts';
import api from '../api/api.ts';

const useLogout = () => {
  const authState = useAuth();

  return async () => {
    authState?.setAuth(null);
    try {
      await api.post('/auth/signout', {}, { withCredentials: true });
    } catch (err) {
      console.error(err);
    }
  };
};

export default useLogout;