
import React from 'react';
import { ConversionResult, NumberBase } from '../types';

interface OutputDisplayProps {
  results: ConversionResult;
}

interface OutputFieldProps {
  label: string;
  value: string;
  baseIdentifier: string;
}

const OutputField: React.FC<OutputFieldProps> = ({ label, value, baseIdentifier }) => {
  const handleCopy = async () => {
    if (value) {
      try {
        await navigator.clipboard.writeText(value);
        // Optional: Add a small notification "Copied!"
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="bg-slate-700 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-sky-400">
          {label} <span className="text-xs text-slate-400">({baseIdentifier})</span>
        </label>
        {value && (
           <button
            onClick={handleCopy}
            title="Salin"
            className="text-slate-400 hover:text-sky-400 transition-colors p-1 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        )}
      </div>
      <div 
        className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-md text-slate-100 min-h-[40px] break-all select-all text-lg"
        title={value || '---'}
      >
        {value || '---'}
      </div>
    </div>
  );
};


const OutputDisplay: React.FC<OutputDisplayProps> = ({ results }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-2xl w-full space-y-5">
      <h3 className="text-xl font-semibold text-sky-400 mb-1">Hasil Konversi:</h3>
      <OutputField label="Biner" value={results.binary} baseIdentifier="2" />
      <OutputField label="Oktal" value={results.octal} baseIdentifier="8" />
      <OutputField label="Desimal" value={results.decimal} baseIdentifier="10" />
      <OutputField label="Heksadesimal" value={results.hexadecimal} baseIdentifier="16" />
    </div>
  );
};

export default OutputDisplay;
