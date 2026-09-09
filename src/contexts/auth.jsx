import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { toast } from '@/components/ui/toast';
import api from '@/lib/axios';

export const AuthContext = createContext({
  user: null,
  signin: () => {},
  signup: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

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

  const signInMutation = useMutation({
    mutationKey: 'signin',
    mutationFn: async (variables) => {
      const response = await api.post('/auth/login', {
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

  const signin = (data) => {
    signInMutation.mutate(data, {
      onSuccess: (createdUser) => {
        const accessToken = createdUser.tokens.accessToken;
        const refreshToken = createdUser.tokens.refreshToken;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(createdUser);
        toast.add({
          type: 'success',
          description: 'Logado com sucesso!',
        });
      },
      onError: (error) => {
        console.error(error);
        toast.add({
          type: 'error',
          description: 'Erro ao logar. Por favor, tente mais tarde.',
        });
      },
    });
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        signin,
        signup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
