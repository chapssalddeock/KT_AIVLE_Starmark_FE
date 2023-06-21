import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../AuthHooks/useAuth';

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/', undefined, { shallow: true });
  };

  useEffect(() => {
    if (!auth?.access) {
      handleLoginRedirect();
      // 나중에 유효기간 확인 하는 작업 추가
    }
    else {
      console.log("else require");
      console.log(auth);
    }
  }, [auth]);


  if (!auth?.access) {
    return null;
  }

  return <>{children}</>;
};

export default RequireAuth;
