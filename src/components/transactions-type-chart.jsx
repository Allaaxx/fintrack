'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Loader2Icon } from 'lucide-react';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { Label, Pie, PieChart, Sector } from 'recharts';

import { useGetTransactions } from '@/api/hooks/transaction';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'A donut chart';

const transactionTypeConfig = {
  EARNING: {
    label: 'Ganhos',
    fill: 'var(--primary-green)',
  },
  EXPENSE: {
    label: 'Gastos',
    fill: 'var(--primary-red)',
  },
  INVESTMENT: {
    label: 'Investimentos',
    fill: 'var(--primary-blue)',
  },
};

const chartConfig = {
  EARNING: {
    label: 'Ganhos',
    color: 'var(--primary-green)',
  },
  EXPENSE: {
    label: 'Gastos',
    color: 'var(--primary-red)',
  },
  INVESTMENT: {
    label: 'Investimentos',
    color: 'var(--primary-blue)',
  },
};

const renderSector = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, payload } =
    props;

  return (
    <Sector
      cx={cx}
      cy={cy}
      innerRadius={innerRadius}
      outerRadius={outerRadius}
      startAngle={startAngle}
      endAngle={endAngle}
      fill={payload.fill}
    />
  );
};
const emptyChartData = [
  {
    type: 'EMPTY',
    label: 'Sem transações',
    quantity: 1,
    fill: 'hsl(var(--muted))',
  },
];

const calculateChartData = (transactions = []) => {
  const groupedTransactions = {
    EARNING: 0,
    EXPENSE: 0,
    INVESTMENT: 0,
  };

  for (const transaction of transactions) {
    const type = transaction.type;
    const amount = Number(transaction.amount);

    if (!transactionTypeConfig[type]) {
      continue;
    }

    if (!Number.isFinite(amount)) {
      continue;
    }

    groupedTransactions[type] += Math.abs(amount);
  }

  const totalAmount = Object.values(groupedTransactions).reduce(
    (total, amount) => total + amount,
    0
  );

  const data = Object.entries(groupedTransactions).map(([type, quantity]) => ({
    type,
    label: transactionTypeConfig[type].label,
    quantity,
    percentage:
      totalAmount > 0 ? Math.round((quantity / totalAmount) * 100) : 0,
    fill: transactionTypeConfig[type].fill,
  }));

  return {
    data,
  };
};

export function TransactionsTypeChart() {
  const [searchParams] = useSearchParams();

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const { data: transactions, isLoading } = useGetTransactions({
    from,
    to,
  });

  const { data: chartData } = useMemo(() => {
    return calculateChartData(transactions);
  }, [transactions]);

  if (!transactions?.length) {
    return (
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Transações</CardTitle>

          <CardDescription>
            Nenhuma transação encontrada neste período
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-52 w-full max-w-52 sm:h-60 sm:max-w-60"
          >
            <PieChart>
              <Pie
                data={emptyChartData}
                dataKey="quantity"
                nameKey="label"
                innerRadius={60}
                outerRadius={80}
                stroke="none"
                isAnimationActive={false}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !('cx' in viewBox) || !('cy' in viewBox)) {
                      return null;
                    }

                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 8}
                          className="fill-foreground text-sm font-semibold"
                        >
                          Sem transações
                        </tspan>

                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 16}
                          className="fill-muted-foreground text-xs"
                        >
                          0 registros
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transações</CardTitle>
        </CardHeader>
        <CardContent className="flex h-full w-full items-center justify-center">
          <Loader2Icon className="animate-spin" />
        </CardContent>
      </Card>
    );
  }
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Transações</CardTitle>
        <CardDescription>
          {from && to
            ? `${format(new Date(`${from}T00:00:00`), 'MMMM yyyy', {
                locale: ptBR,
              }).replace(/^./, (char) => char.toUpperCase())} - ${format(
                new Date(`${to}T00:00:00`),
                'MMMM yyyy',
                { locale: ptBR }
              ).replace(/^./, (char) => char.toUpperCase())}`
            : from
              ? `A partir de ${format(
                  new Date(`${from}T00:00:00`),
                  'MMMM yyyy',
                  { locale: ptBR }
                ).replace(/^./, (char) => char.toUpperCase())}`
              : to
                ? `Até ${format(new Date(`${to}T00:00:00`), 'MMMM yyyy', {
                    locale: ptBR,
                  }).replace(/^./, (char) => char.toUpperCase())}`
                : 'Todos os períodos'}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 justify-between pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-52 w-full max-w-52 sm:h-60 sm:max-w-60"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="quantity"
              nameKey="label"
              innerRadius={60}
              shape={renderSector}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          Transações
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {transactions.length}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
