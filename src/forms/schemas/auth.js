import z from 'zod';

export const signInFormSchema = z.object({
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
