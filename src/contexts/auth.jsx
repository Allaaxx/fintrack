import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';

import { toast } from '@/components/ui/toast';
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';
import { AuthService } from '@/api/services/index';

export const AuthContext = createContext({
  user: null,
  isInitializing: true,
  signin: () => {},
  signup: () => {},
  signout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

const setTokens = (tokens) => {
  localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, tokens.refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isInitializing, setIsInitializing] = useState(true);
  const signUpMutation = useMutation({
    mutationKey: ['signup'],
    mutationFn: async (variables) => {
      const response = await AuthService.signup(variables);
      return response;
    },
  });

  const signInMutation = useMutation({
    mutationKey: 'signin',
    mutationFn: async (variables) => {
      const response = await AuthService.signin(variables);
      return response;
    },
  });

  useEffect(() => {
    const init = async () => {
      try {
        setIsInitializing(true);
        const accessToken = localStorage.getItem(
          LOCAL_STORAGE_ACCESS_TOKEN_KEY
        );
        const refreshToken = localStorage.getItem(
          LOCAL_STORAGE_REFRESH_TOKEN_KEY
        );
        if (!accessToken && !refreshToken) return;
        const response = await AuthService.me();
        setUser(response);
      } catch (error) {
        setUser(null);
        console.error(error);
      } finally {
        setIsInitializing(false);
      }
    };
    init();
  }, []);

  const signup = (data) => {
    signUpMutation.mutate(data, {
      onSuccess: (createdUser) => {
        setTokens(createdUser.tokens);
        setUser(createdUser);
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
      onSuccess: (loggedUser) => {
        setTokens(loggedUser.tokens);
        setUser(loggedUser);
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

  const signout = () => {
    setUser(null);
    removeTokens();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isInitializing,
        signin,
        signup,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
