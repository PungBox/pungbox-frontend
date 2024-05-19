import React, { useMemo, useRef } from 'react';
import { authConfig as config } from '../../../../utils/config';

function allowOnlyOneLastCharacterInInputField(target: HTMLInputElement) {
  if (target.value.length > 1) {
    target.value = target.value[target.value.length - 1];
  }
}

function isValidDigit(value: string): boolean {
  return !Number.isNaN(parseInt(value));
}

const useAccessCodeInput = () => {
  const inputsRef = useRef(Array(config.DIGIT_LENGTH + 1));
  
  function moveToPreviousDigit(currentNumber: number): void {
    inputsRef.current[currentNumber - 1].value = '';
    inputsRef.current[currentNumber - 1].focus();
  }
  
  function handleDigitInput(e: React.KeyboardEvent<HTMLInputElement>, currentNumber: number) {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;
    
    const isKeyInputBackspace = e.keyCode === 8;
    const isKeyInputTab = currentNumber !== 0 && inputsRef.current[currentNumber - 1].value === '';
    if (isKeyInputBackspace || isKeyInputTab) {
      moveToPreviousDigit(currentNumber);
      return;
    }
    if (!isValidDigit(inputValue)) {
      target.value = '';
      return;
    }
    
    allowOnlyOneLastCharacterInInputField(target);
    inputsRef.current[currentNumber + 1].focus();
  }
  
  function undoDigitInput() {
    for (let i = 0; i < config.DIGIT_LENGTH; i++) {
      inputsRef.current[i].value = '';
    }
    inputsRef.current[0].focus();
  }
  
  const accessCodeInput = useMemo(() => Array.from({ length: config.DIGIT_LENGTH }, (_, i) => {
    return i;
  }).map((i) =>
    <input
      key={i}
      ref={(elem) => (inputsRef.current[i] = elem)}
      type="number"
      id={`digit${i}`}
      name={`digit${i}`}
      min="0"
      max="9"
      onKeyUp={(e) => handleDigitInput(e, i)}
      required
      autoFocus={(i === 0)}
    />), []);
  
  return { inputsRef, undoDigitInput, accessCodeInput };
};

export { useAccessCodeInput };