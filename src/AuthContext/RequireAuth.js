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
