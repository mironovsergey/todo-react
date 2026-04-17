import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/routes/protected-route';
import { PublicRoute } from '@/components/routes/public-route';
import { AppLayout } from '@/components/layout/app-layout';
import { SignInPage } from '@/pages/sign-in-page/sign-in-page';
import { SignUpPage } from '@/pages/sign-up-page/sign-up-page';
import { TodosPage } from '@/pages/todos-page/todos-page';
import { ProfilePage } from '@/pages/profile-page/profile-page';
import { ROUTES } from '@/utils/constants';

export const App = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.TODOS} element={<TodosPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.TODOS} replace />} />
    </Routes>
  );
};
