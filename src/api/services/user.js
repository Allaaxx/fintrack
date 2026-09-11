import protectedApi from '@/lib/axios';

export const UserService = {
  /**
   * Retornar o balanço do usuário autenticado.
   * @param {object} input - Usuário a ser autenticado.
   * @param {string} input.from - Data inicial (YYYY-MM-DD).
   * @param {string} input.to - Data final (YYYY-MM-DD).
   */
  getBalance: async (input) => {
    const queryParams = new URLSearchParams();
    queryParams.set('from', input.from);
    queryParams.set('to', input.to);
    const response = await protectedApi.get(
      `/users/me/balance?${queryParams.toString()}`
    );
    return response.data;
  },
};
