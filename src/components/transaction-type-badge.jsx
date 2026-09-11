import { cva } from 'class-variance-authority';
import { CircleIcon } from 'lucide-react';

const variants = cva(
  'bg-muted  flex w-fit items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-bold',
  {
    variants: {
      variant: {
        earning: 'text-primary-green fill-primary-green',
        expense: 'text-primary-red fill-primary-red',
        investment: 'text-primary-blue fill-primary-blue',
      },
    },
  }
);

const getText = (variant) => {
  switch (variant) {
    case 'earning':
      return 'Ganho';

    case 'expense':
      return 'Gasto';

    case 'investment':
      return 'Investimento';
  }
};

const TransactionTypeBadge = ({ variant }) => {
  return (
    <div className={variants({ variant })}>
      <CircleIcon size={10} className="fill-inherit" />
      {getText(variant)}
    </div>
  );
};

export default TransactionTypeBadge;
