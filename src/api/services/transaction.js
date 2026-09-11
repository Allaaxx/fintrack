import protectedApi from '@/lib/axios';

const TransactionService = {
  /**
   * Cria uma transação para o usuário autenticado.
   * @param {object} input - Usuário a ser criado.
   * @param {string} input.name - Nome da transação.
   * @param {number} input.amount - Valor da transação.
   * @param {string} input.date - Data da transação (YYYY-MM-DD).
   * @param {string} input.type - Tipo da transação (EARNING/EXPENSE/INVESTMENT).
   */
  create: async (input) => {
    const response = await protectedApi.post('/transactions/me', input);
    return response.data;
  },
};

export default TransactionService;
