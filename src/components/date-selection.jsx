import { useQueryClient } from '@tanstack/react-query';
import { addMonths, format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import DatePickerWithRange from '@/components/ui/date-picker-with-range';
import { useAuthContext } from '@/contexts/auth';

const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd');

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return defaultDate;
  }

  const dateAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to));

  if (dateAreInvalid) {
    return defaultDate;
  }

  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  };
};

const DateSelection = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [date, setDate] = useState(getInitialDateState(searchParams));

  useEffect(() => {
    if (!date?.from || !date?.to) return;
    const queryParams = new URLSearchParams();
    queryParams.set('from', formatDateToQueryParam(date.from));
    queryParams.set('to', formatDateToQueryParam(date.to));
    navigate(`/?${queryParams.toString()}`);
    queryClient.invalidateQueries({
      queryKey: [
        'balance',
        user.id,
        formatDateToQueryParam(date.from),
        formatDateToQueryParam(date.to),
      ],
    });
  }, [navigate, date, queryClient, user.id]);

  return <DatePickerWithRange value={date} onChange={setDate} />;
};

export default DateSelection;
