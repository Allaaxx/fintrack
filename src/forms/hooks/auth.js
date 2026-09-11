import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInFormSchema, signUpFormSchema } from '@/forms/schemas/auth';

export const useSignInForm = () => {
  const form = useForm({
    resolver: zodResolver(signInFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return { form };
};

export const useSignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      terms: false,
    },
  });

  return { form };
};
