import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import z from 'zod';

import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import api from '@/lib/axios';

const SignInPage = () => {
  const [user, setUser] = useState();
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
  const signInSchema = z.object({
    email: z
      .email({
        error: 'O e-mail é inválido.',
      })
      .trim()
      .min(1, {
        error: 'O e-mail é obrigatório.',
      }),
    password: z.string().trim().min(6, {
      error: 'A senha deve ter no minímo 6 caracteres.',
    }),
  });
  const form = useForm({
    resolver: zodResolver(signInSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
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
  const handleSubmit = (data) => {
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
  if (user) {
    return <h1>Olá, {user.first_name} VC FOI LOGADO!</h1>;
  }
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Entre na sua conta</CardTitle>
          <CardDescription>Insira seus dados abaixo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form id="form-sign-in" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite seu email"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                    <PasswordInput
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Digite sua senha"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" form="form-sign-in">
            Fazer login
          </Button>
        </CardFooter>
      </Card>
      <div className="flex items-center justify-center">
        <p className="text-center opacity-50">Ainda não possui uma conta? </p>
        <Button variant="link">
          <Link to="/signup">Crie agora</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignInPage;
