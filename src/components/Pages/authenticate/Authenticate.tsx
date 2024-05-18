import React, { useRef } from 'react';
import styles from '/src/components/Module/Authenticate.module.css';

const Authenticate = () => {
  const DIGIT_LENGTH = 6;
  const inputsRef = useRef(Array(DIGIT_LENGTH + 1));

  function handleDigitInput(e: React.KeyboardEvent<HTMLInputElement>, currentNumber: number) {
    const target = e.target as HTMLInputElement;
    const inputValue = target.value;

    if (currentNumber !== 0 && (e.keyCode === 8 /* backspace */ || inputsRef.current[currentNumber - 1].value === '')) {
      inputsRef.current[currentNumber - 1].value = '';
      inputsRef.current[currentNumber - 1].focus();
      return;
    }

    if (Number.isNaN(parseInt(inputValue))) {
      target.value = '';
      return;
    }
    if (target.value.length > 1) {
      target.value = target.value[target.value.length - 1];
    }
    inputsRef.current[currentNumber + 1].focus();
  }

  function undoDigitInput() {
    for (let i = 0; i < DIGIT_LENGTH; i++) {
      inputsRef.current[i].value = '';
    }
    inputsRef.current[0].focus();
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    console.log('submit');
    console.log(e);
  }

  return (
    <div className={styles.authPanel}>
    <form method="POST" onSubmit={(e) => submit(e)}>
    <span className="font-bold">Access Code:</span>
      <label htmlFor="access_code" className={styles.label}>
        {Array.from({ length: DIGIT_LENGTH }, (_, i) => {
          const id = `digit${i}`;
          if (i === 0) {
            return (
              <input
                key={i}
                ref={(elem) => (inputsRef.current[i] = elem)}
                type="number"
                id={id}
                name={id}
                min="0"
                max="9"
                onKeyUp={(e) => handleDigitInput(e, i)}
                required
                autoFocus
                className={styles.inputcode}
              />
            );
          }
          return (
            <input
              key={i}
              ref={(elem) => (inputsRef.current[i] = elem)}
              type="number"
              id={id}
              name={id}
              min="0"
              max="9"
              onKeyUp={(e) => handleDigitInput(e, i)}
              required
              className={styles.inputcode}
            />
          );
        })}
        <span className={`${styles.materialSymbolsOutlined} ${styles.cancel}`} onClick={undoDigitInput}>
          X
        </span>
      </label>
        
      <span className="font-bold">Password:</span>
      <label htmlFor="password" className={styles.label}>
        <input
          ref={(elem) => (inputsRef.current[DIGIT_LENGTH] = elem)}
          type="password"
          id="password"
          name="password"
          required
          className={styles.inputpassword}
        />
      </label>
  
      <button type="submit" value="Submit" className={styles.button}>
        Go to Storage
      </button>
    </form>
  </div>
  );
};

export default Authenticate;
