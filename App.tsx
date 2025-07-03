
import React, { useState, useEffect, useCallback } from 'react';
import { NumberBase, ConversionResult } from './types';
import NumberInput from './components/NumberInput';
import OutputDisplay from './components/OutputDisplay';
import { isValidNumberForBase, convertToDecimal, convertFromDecimal } from './utils/conversion';

const initialResults: ConversionResult = {
  decimal: '',
  binary: '',
  octal: '',
  hexadecimal: '',
};

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [inputBase, setInputBase] = useState<NumberBase>(NumberBase.BINARY);
  const [results, setResults] = useState<ConversionResult>(initialResults);
  const [error, setError] = useState<string | null>(null);

  const performConversion = useCallback(() => {
    if (inputValue.trim() === '') {
      setResults(initialResults);
      setError(null);
      return;
    }
    
    // Allow negative sign for all bases during input
    const isPotentiallyNegative = inputValue.startsWith('-');
    const valueToCheck = isPotentiallyNegative && inputValue.length === 1 ? inputValue : inputValue.replace(/^-/, '');

    if (valueToCheck.length > 0 && !isValidNumberForBase(inputValue, inputBase)) {
       setError(`Input '${inputValue}' tidak valid untuk basis ${inputBase}.`);
       setResults(initialResults);
       return;
    }
     // If input is just "-", don't show error yet, but clear results
    if (inputValue === "-") {
        setError(null);
        setResults(initialResults);
        return;
    }


    setError(null);
    const decimalRepresentation = convertToDecimal(inputValue, inputBase);

    if (decimalRepresentation === null || isNaN(decimalRepresentation)) {
       // This check might be redundant if isValidNumberForBase is robust
       // but good for safety.
      if (inputValue.trim() !== '' && inputValue !== '-') { // Don't error on empty or just "-"
         setError(`Gagal mengkonversi '${inputValue}' dari basis ${inputBase}.`);
      }
      setResults(initialResults);
      return;
    }
    
    // Limit input length to avoid performance issues or extremely large numbers
    // This is a practical limit, not a strict mathematical one for very large number libraries
    if (inputValue.length > 50) {
        setError("Input terlalu panjang. Harap masukkan angka dengan panjang maksimal 50 digit.");
        setResults(initialResults);
        return;
    }

    // Check for safe integer range if dealing with very large numbers causing precision loss
    // For this example, we assume standard JS number limitations are acceptable
    // If not, BigInt would be needed throughout the conversion pipeline.
    if (!Number.isSafeInteger(decimalRepresentation) && inputValue.length > 15 && inputBase === NumberBase.DECIMAL) {
        // Warn about potential precision loss for large decimals if not using BigInt
        // For other bases, the string length can be much larger for the same magnitude
    }


    setResults({
      decimal: convertFromDecimal(decimalRepresentation, NumberBase.DECIMAL),
      binary: convertFromDecimal(decimalRepresentation, NumberBase.BINARY),
      octal: convertFromDecimal(decimalRepresentation, NumberBase.OCTAL),
      hexadecimal: convertFromDecimal(decimalRepresentation, NumberBase.HEXADECIMAL),
    });
  }, [inputValue, inputBase]);

  useEffect(() => {
    performConversion();
  }, [performConversion]);


  const handleInputChange = (value: string) => {
    // Allow negative sign only at the beginning
    if (value === "-") {
        setInputValue("-");
    } else if (value.startsWith("-")) {
        const restOfValue = value.substring(1);
        setInputValue("-" + restOfValue.replace(/[^0-9a-fA-F]/gi, '')); // Basic filter, validation is prime
    } else {
        setInputValue(value.replace(/[^0-9a-fA-F]/gi, '')); // Basic filter
    }
  };

  const handleBaseChange = (base: NumberBase) => {
    setInputBase(base);
    // When base changes, re-validate and convert existing inputValue
    // The useEffect will handle this automatically as inputBase is a dependency.
  };
  
  return (
    <div className="container mx-auto max-w-2xl p-4 md:p-6 space-y-8">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-sky-400">
          Kalkulator Konversi Bilangan
        </h1>
        <p className="text-slate-400 mt-2 text-lg">
          Konversi angka antar sistem Biner, Oktal, Desimal, dan Heksadesimal.
        </p>
      </header>

      <main className="space-y-8">
        <NumberInput
          inputValue={inputValue}
          inputBase={inputBase}
          onInputChange={handleInputChange}
          onBaseChange={handleBaseChange}
          error={error}
        />
        <OutputDisplay results={results} />
      </main>
      
      <footer className="text-center text-slate-500 text-sm mt-12">
        <p>&copy; {new Date().getFullYear()} Kalkulator Konversi. Dibuat dengan React & Tailwind CSS. | by <a href="https://thoha.my.id" target="_blank">Thoha Firdaus</a></p>
      </footer>
    </div>
  );
};

export default App;
