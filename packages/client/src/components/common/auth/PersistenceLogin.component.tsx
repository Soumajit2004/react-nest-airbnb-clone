import { useEffect, useState } from 'react';
import useRefreshToken from '../../../hooks/auth/useRefreshToken.ts';
import useAuth from '../../../hooks/auth/useAuth.ts';
import { Outlet } from 'react-router-dom';

export default function PersistenceLogin() {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !auth.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  return (
    <>
      {isLoading
        ? <h1>Loading...</h1>
        : <Outlet />
      }
    </>
  );
}