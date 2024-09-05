import { useEffect, useState } from 'react';
import useRefreshToken from '../../../hooks/useRefreshToken.ts';
import useAuth from '../../../hooks/useAuth.ts';
import { Outlet } from 'react-router-dom';

export default function PersistenceLogin() {
  const [isLoading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const authState = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !authState?.auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, []);

  useEffect(() => {
    console.log(`is Loading: ${isLoading}`);
    console.log(`Access Token: ${authState?.auth?.accessToken}`);

  }, [isLoading]);

  return (
    <>
      {isLoading
        ? <h1>Loading...</h1>
        : <Outlet />
      }
    </>
  );
}