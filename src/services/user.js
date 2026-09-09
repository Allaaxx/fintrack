import protectedApi, { publicApi } from '@/lib/axios';

export const UserService = {
  /**
   * Cria um novo usuário.
   * @param {object} input - Usuário a ser criado.
   * @param {string} input.firstName - Primeiro nome do usuário.
   * @param {string} input.LastName - Sobrenome do usuário.
   * @param {string} input.email - E-mail do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} Usuário criado.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  signup: async (input) => {
    const response = await publicApi.post('/auth', {
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  /**
   * Loga o usuário.
   * @param {object} input - Usuário a ser autenticado.
   * @param {string} input.email - E-mail do usuário.
   * @param {string} input.password - Senha do usuário.
   * @returns {Object} Usuário autenticado.
   * @returns {string} response.tokens - Tokens de autenticação.
   */
  signin: async (input) => {
    const response = await publicApi.post('/auth/login', {
      email: input.email,
      password: input.password,
    });
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
      tokens: response.data.tokens,
    };
  },
  /**
   * Retorna o usuário autenticado.
   * @returns {Object} Usuário autenticado.
   */
  me: async () => {
    const response = await protectedApi.get('/users/me');
    return {
      id: response.data.id,
      email: response.data.email,
      firstName: response.data.first_name,
      lastName: response.data.last_name,
    };
  },
};
