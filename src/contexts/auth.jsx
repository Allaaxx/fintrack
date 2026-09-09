import { useMutation } from '@tanstack/react-query';
import { createContext, useEffect, useState } from 'react';

import { toast } from '@/components/ui/toast';
import api from '@/lib/axios';

export const AuthContext = createContext({
  user: null,
  signin: () => {},
  signup: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await api.post('/auth', {
        first_name: variables.firstName,
        last_name: variables.lastName,
        email: variables.email,
        password: variables.password,
      });
      return response.data;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (!accessToken && !refreshToken) return;
        const response = await api.get('/users/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.error(error);
      }
    };
    init();
  }, []);

  const signup = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        setUser(createdUser);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        toast.add({
          type: 'success',
          description: 'Conta criada com sucesso!',
        });
      },
      onError: () => {
        toast.add({
          type: 'error',
          description: 'Erro ao criar conta. Por favor, tente mais tarde.',
        });
      },
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user: user,
        signin: () => {},
        signup: signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
