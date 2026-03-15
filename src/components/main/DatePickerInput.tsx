import { Calendar } from '@/components/ui/calendar';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { isValidDate } from '@/lib/date';
import { format, parse } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';

export function DatePickerInput({
  isInvalid,
  fieldName,
  fieldValue,
  fieldErrors,
  label,
  dateFormat = 'dd/MM/yyyy',
  required,
  onChange,
  onBlur,
}: {
  isInvalid?: boolean;
  fieldName: string;
  fieldValue: string;
  fieldErrors: Array<{ message?: string } | undefined>;
  label: string;
  dateFormat?: string;
  required?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}) {
  const today = new Date();

  const [open, setOpen] = useState(false);

  const date = isValidDate(fieldValue, dateFormat)
    ? parse(fieldValue, dateFormat, today)
    : undefined;

  const [month, setMonth] = useState<Date | undefined>(date);

  return (
    <Field data-invalid={isInvalid} className="mx-auto">
      <FieldLabel htmlFor={fieldName} required={required}>
        {label}
      </FieldLabel>
      <InputGroup>
        <InputGroupInput
          id={fieldName}
          name={fieldName}
          value={fieldValue}
          placeholder="DD/MM/YYYY"
          aria-invalid={isInvalid}
          onChange={(e) => {
            onChange?.(e.target.value);
          }}
          onBlur={onBlur}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
          autoComplete="off"
        />
        <InputGroupAddon align="inline-end">
          <Popover
            open={open}
            onOpenChange={(isOpen) => {
              if (isOpen) setMonth(date);
              setOpen(isOpen);
            }}
          >
            <PopoverTrigger asChild>
              <InputGroupButton
                id={`btn-${fieldName}`}
                variant="ghost"
                size="icon-xs"
                aria-label="Select date"
                tabIndex={-1}
                type="button"
              >
                <CalendarIcon />
                <span className="sr-only">Select date</span>
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                month={month ?? today}
                onMonthChange={setMonth}
                locale={vi}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    onChange?.(format(selectedDate, dateFormat));
                  } else {
                    onChange?.('');
                  }
                  setOpen(false);
                }}
                captionLayout="dropdown"
                disabled={{ after: today }}
                autoFocus
              />
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
      </InputGroup>

      {isInvalid && <FieldError errors={fieldErrors} />}
    </Field>
  );
}
