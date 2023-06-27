import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../AuthHooks/useAuth';

const RequireAuth = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push('/', undefined, { shallow: true });
  };

  const handleAuthRedirect = () => {
    router.push('/service');
  }

  // useEffect(() => {
  //   console.log("NO");
  //   if (!auth?.access) {
  //     console.log("NO");
  //     handleLoginRedirect();
  //     // 나중에 유효기간 확인 하는 작업 추가
  //   }
  //   else {
  //     console.log("YES");
  //     console.log("else require");
  //     console.log(auth);

  //   }
  // }, [auth, router]);


  if (!auth?.access) {
    if(router.pathname !== '/'){
      handleLoginRedirect();
      return null;
    }
  }

  if(router.pathname === '/'){
    if(auth?.access){
      handleAuthRedirect();
      return null;
    }
  }


  return <>{children}</>;
};

export default RequireAuth;
