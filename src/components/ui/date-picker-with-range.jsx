'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const DatePickerWithRange = ({
  value,
  onChange,
  placeholder = 'Selecione uma data',
}) => {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!value}
            className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
          />
        }
      >
        <CalendarIcon />
        {value ? format(value, 'PPP') : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerWithRange;
