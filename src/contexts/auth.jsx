import { createContext, useContext, useEffect, useState } from 'react';

import { useSignIn, useSignUp } from '@/api/hooks/auth';
import { AuthService } from '@/api/services/auth';
import { toast } from '@/components/ui/toast';
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';

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
  const signUpMutation = useSignUp();

  const signInMutation = useSignIn();

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

  const signup = async (data) => {
    try {
      const createdUser = await signUpMutation.mutateAsync(data);
      setUser(createdUser);
      setTokens(createdUser.tokens);
      toast.add({
        type: 'success',
        title: 'Conta criada com sucesso!',
        description: 'Seja bem vindo.',
      });
    } catch (error) {
      console.error(error);
      toast.add({
        type: 'error',
        title: 'Erro ao criar conta!',
        description: 'Por favor, tente mais tarde.',
      });
    }
  };

  const signin = async (data) => {
    try {
      const loggedUser = await signInMutation.mutateAsync(data);
      setUser(loggedUser);
      setTokens(loggedUser.tokens);
      toast.add({
        type: 'success',
        title: 'Logado com sucesso!',
        description: 'É bom vê-lo novamente.',
      });
    } catch (error) {
      toast.add({
        type: 'error',
        title: 'Erro ao realizar o login!',
        description: 'Por favor, verifique suas credenciais.',
      });
      console.error(error);
    }
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
