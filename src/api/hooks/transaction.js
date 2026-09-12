import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getUserBalanceQueryKey } from '@/api/hooks/user';
import TransactionService from '@/api/services/transaction';
import { useAuthContext } from '@/contexts/auth';

export const createTransactionMutationKey = ['createTransaction'];

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({
          userId: user.id,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      });
    },
  });
};

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId];
  }
  return ['getTransactions', userId, from, to];
};

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext();
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  });
};

export const editTransactionMutationKey = ['editTransaction'];

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: editTransactionMutationKey,
    mutationFn: (input) => TransactionService.update(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({
          userId: user.id,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      });
    },
  });
};

export const deleteTransactionMutationKey = ['deleteTransaction'];

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  return useMutation({
    mutationKey: deleteTransactionMutationKey,
    mutationFn: (input) => TransactionService.delete(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({
          userId: user.id,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      });
    },
  });
};
