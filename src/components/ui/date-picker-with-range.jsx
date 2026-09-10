'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale/pt-BR';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field } from '@/components/ui/field';
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
    <Field className="mx-auto w-full">
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              id="date-picker-range"
              className="justify-start px-2.5 font-normal"
            >
              <CalendarIcon data-icon="inline-start" />
              {value?.from ? (
                value.to ? (
                  <>
                    {format(value.from, 'LLL dd, y', {
                      locale: ptBR,
                    })}{' '}
                    -{' '}
                    {format(value.to, 'LLL dd, y', {
                      locale: ptBR,
                    })}
                  </>
                ) : (
                  format(value.from, 'LLL dd, y', {
                    locale: ptBR,
                  })
                )
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            locale={ptBR}
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
};

export default DatePickerWithRange;
