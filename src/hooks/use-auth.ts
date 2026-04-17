import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signUp, signIn } from '@/services/auth';
import { useAuthContext } from '@/hooks/use-auth-context';
import { ROUTES } from '@/utils/constants';
import type { SignUpData, SignInData } from '@/types/auth';

export const useSignUp = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignUpData) => signUp(data),
    onSuccess: ({ data }) => {
      login(data.data.user, data.data.tokens);
      toast.success('Account created successfully');
      navigate(ROUTES.TODOS);
    },
  });
};

export const useSignIn = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: ({ data }) => {
      login(data.data.user, data.data.tokens);
      toast.success('Welcome back!');
      navigate(ROUTES.TODOS);
    },
  });
};

export const useLogout = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      navigate(ROUTES.SIGN_IN);
    },
  });
};
