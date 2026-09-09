import protectedApi, { publicApi } from '@/lib/axios';

export const UserService = {
  signup: async (input) => {
    const response = await publicApi.post('/auth', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return response.data;
  },
  signin: async (input) => {
    const response = await publicApi.post('/auth/login', {
      email: input.email,
      password: input.password,
    });
    return response.data;
  },
  me: async () => {
    const response = await protectedApi.get('/users/me');
    return response.data;
  },
};
