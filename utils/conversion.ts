
import { NumberBase } from '../types';

export const getBaseNumber = (base: NumberBase): number => {
  switch (base) {
    case NumberBase.BINARY:
      return 2;
    case NumberBase.OCTAL:
      return 8;
    case NumberBase.HEXADECIMAL:
      return 16;
    case NumberBase.DECIMAL:
    default:
      return 10;
  }
};

export const isValidNumberForBase = (value: string, base: NumberBase): boolean => {
  if (value.trim() === '' || value === '-') return true; // Allow empty or just negative sign during input

  const negative = value.startsWith('-');
  const absValue = negative ? value.substring(1) : value;

  if (absValue.trim() === '') return true; // Allow '-'

  let regex: RegExp;
  switch (base) {
    case NumberBase.DECIMAL:
      regex = /^[0-9]+$/;
      break;
    case NumberBase.BINARY:
      regex = /^[01]+$/;
      break;
    case NumberBase.OCTAL:
      regex = /^[0-7]+$/;
      break;
    case NumberBase.HEXADECIMAL:
      regex = /^[0-9a-fA-F]+$/;
      break;
    default:
      return false;
  }
  return regex.test(absValue);
};

export const convertToDecimal = (value: string, fromBase: NumberBase): number | null => {
  if (!isValidNumberForBase(value, fromBase)) {
    return null;
  }
  
  const baseNumber = getBaseNumber(fromBase);
  const parsed = parseInt(value, baseNumber);

  if (isNaN(parsed)) {
    // Handle specific case for '-' which parseInt might return NaN for, but we might want to allow as intermediate
    if (value === "-") return 0; // Or some other handling, for now treat as 0 for further conversion attempt or let validation catch it.
                                  // However, isValidNumberForBase should already filter this to some extent.
                                  // For a complete "-" input, it's not a valid number.
    return null; 
  }
  return parsed;
};

export const convertFromDecimal = (decimalValue: number, toBase: NumberBase): string => {
  if (isNaN(decimalValue)) return 'Input tidak valid';
  
  const baseNumber = getBaseNumber(toBase);
  if (baseNumber === 10) return decimalValue.toString(10);
  if (baseNumber === 2) return decimalValue.toString(2);
  if (baseNumber === 8) return decimalValue.toString(8);
  if (baseNumber === 16) return decimalValue.toString(16).toUpperCase();
  
  return 'Basis tidak didukung';
};
