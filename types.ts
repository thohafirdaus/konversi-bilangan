
export enum NumberBase {
  BINARY = 'Biner',
  OCTAL = 'Oktal',
  DECIMAL = 'Desimal',
  HEXADECIMAL = 'Heksadesimal',
}

export interface ConversionResult {
  decimal: string;
  binary: string;
  octal: string;
  hexadecimal: string;
}
