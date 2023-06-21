import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/', undefined, { shallow: true });
  };

  useEffect(() => {
    console.log(auth);
    if (!auth?.accessToken) {
      handleLoginRedirect();
    }
  }, [auth]);


  if (!auth?.accessToken) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
