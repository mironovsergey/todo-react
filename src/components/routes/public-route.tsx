import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '@/hooks/use-auth-context';
import { ROUTES } from '@/utils/constants';

export const PublicRoute = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.TODOS} replace />;
  }

  return <Outlet />;
};
