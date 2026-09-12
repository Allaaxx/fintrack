import { useMutation } from '@tanstack/react-query';

import { AuthService } from '@/api/services/auth';

export const signupMutationKey = ['signup'];
export const signinMutationKey = ['signin'];

export const useSignUp = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (variables) => {
      const response = await AuthService.signup(variables);
      return response;
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationKey: signinMutationKey,
    mutationFn: async (variables) => {
      const response = await AuthService.signin(variables);
      return response;
    },
  });
};
