import { isFuture, isValid, parse } from 'date-fns';

const genericParse = (date: string | Date, format: string) => {
  if (typeof date === 'string') {
    return parse(date, format, new Date());
  }
  return date;
};

export const isValidDate = (date: string | Date, format = 'dd/MM/yyyy') => {
  return isValid(genericParse(date, format));
};

export const isFutureDate = (date: string | Date, format = 'dd/MM/yyyy') => {
  return isFuture(genericParse(date, format));
};
