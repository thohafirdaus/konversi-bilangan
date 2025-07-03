
import React from 'react';
import { NumberBase } from '../types';

interface NumberInputProps {
  inputValue: string;
  inputBase: NumberBase;
  onInputChange: (value: string) => void;
  onBaseChange: (base: NumberBase) => void;
  error: string | null;
}

const baseOptions: { value: NumberBase; label: string }[] = [
  { value: NumberBase.BINARY, label: 'Biner (2)' },
  { value: NumberBase.OCTAL, label: 'Oktal (8)' },
  { value: NumberBase.DECIMAL, label: 'Desimal (10)' },
  { value: NumberBase.HEXADECIMAL, label: 'Heksadesimal (16)' },
];

const NumberInput: React.FC<NumberInputProps> = ({
  inputValue,
  inputBase,
  onInputChange,
  onBaseChange,
  error,
}) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-2xl space-y-6 w-full">
      <div>
        <label htmlFor="numberInput" className="block text-sm font-medium text-sky-400 mb-1">
          Masukkan Bilangan:
        </label>
        <input
          type="text"
          id="numberInput"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder={`Contoh: ${inputBase === NumberBase.DECIMAL ? '123' : inputBase === NumberBase.BINARY ? '101101' : inputBase === NumberBase.OCTAL ? '173' : '7B'}`}
          className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow duration-150 ease-in-out placeholder-slate-500 text-lg"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>

      <div>
        <p className="block text-sm font-medium text-sky-400 mb-2">Basis Bilangan Input:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {baseOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onBaseChange(option.value)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                ${inputBase === option.value
                  ? 'bg-sky-500 text-white shadow-md hover:bg-sky-600 focus:ring-sky-500'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 focus:ring-sky-400'
                }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NumberInput;
