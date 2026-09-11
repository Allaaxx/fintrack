import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInFormSchema } from '@/forms/schemas/auth';

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
