import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { ArrowUpDown, Loader2Icon } from 'lucide-react';
import { useSearchParams } from 'react-router';

import { useGetTransactions } from '@/api/hooks/transaction';
import DeleteTransactionButton from '@/components/delete-transaction-button';
import EditTransactionButton from '@/components/edit-transaction-button';
import TransactionTypeBadge from '@/components/transaction-type-badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency } from '@/helpers/currency';

const columns = [
  {
    accessorKey: 'name',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    sortFn: (rowA, rowB, columnId) => {
      const nameA = String(rowA.getValue(columnId) ?? '');
      const nameB = String(rowB.getValue(columnId) ?? '');

      return nameA.localeCompare(nameB, 'pt-BR', {
        sensitivity: 'base',
        numeric: true,
      });
    },
  },

  {
    accessorKey: 'type',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    sortFn: (rowA, rowB, columnId) => {
      const typeA = String(rowA.getValue(columnId) ?? '');
      const typeB = String(rowB.getValue(columnId) ?? '');

      return typeA.localeCompare(typeB, 'pt-BR', {
        sensitivity: 'base',
      });
    },

    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />;
    },
  },

  {
    accessorKey: 'date',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    sortFn: (rowA, rowB, columnId) => {
      const dateA = new Date(String(rowA.getValue(columnId) ?? '')).getTime();

      const dateB = new Date(String(rowB.getValue(columnId) ?? '')).getTime();

      return dateA - dateB;
    },

    cell: ({ row: { original: transaction } }) => {
      return format(new Date(transaction.date), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      });
    },
  },

  {
    accessorKey: 'amount',

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    sortFn: (rowA, rowB, columnId) => {
      const amountA = Number(rowA.getValue(columnId) ?? 0);
      const amountB = Number(rowB.getValue(columnId) ?? 0);

      return amountA - amountB;
    },

    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount);
    },
  },

  {
    id: 'actions',
    header: 'Ações',
    enableSorting: false,

    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center gap-2">
          <EditTransactionButton transaction={transaction} />
          <DeleteTransactionButton transaction={transaction} />
        </div>
      );
    },
  },
];

const TransactionsTable = () => {
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const {
    data: transactions,
    isLoading,
    isError,
  } = useGetTransactions({
    from,
    to,
  });

  if (isLoading) {
    return (
      <section>
        <h2 className="mb-4 text-2xl font-bold">Transações</h2>

        <div className="flex h-90 items-center justify-center rounded-md border">
          <Loader2Icon className="animate-spin" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section>
        <h2 className="mb-4 text-2xl font-bold">Transações</h2>

        <div className="text-destructive r flex h-90 items-center justify-center rounded-md border">
          <p className="text-center">
            Não foi possível carregar as transações.
          </p>
        </div>
      </section>
    );
  }

  if (!transactions?.length) {
    return (
      <section>
        <h2 className="mb-4 text-2xl font-bold">Transações</h2>

        <div className="flex h-90 items-center justify-center rounded-md border">
          <p className="text-center">
            Nenhuma transação encontrada para este período.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Transações</h2>

      <ScrollArea className="h-90 rounded-md border">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </section>
  );
};

export default TransactionsTable;
