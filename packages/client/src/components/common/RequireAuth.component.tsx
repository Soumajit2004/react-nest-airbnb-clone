import useAuth from '../../hooks/useAuth.ts';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuthComponent = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.accessToken
      ? <Outlet />
      : <Navigate to={'/auth/login'} state={{ from: location }} replace />
  );
};

export default RequireAuthComponent;