import React, { useRef } from 'react';

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
    <div className="auth-panel">
      <form method="POST" onSubmit={(e) => submit(e)}>
        <label htmlFor="access_code">Access Code:</label>
        <br />
        {Array.from({ length: DIGIT_LENGTH }, (_, i) => {
          return i;
        }).map((i) => {
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
            />
          );
        })}
        <span className="material-symbols-outlined" onClick={undoDigitInput}>
          cancel
        </span>
        <br />
        <br />

        <label htmlFor="password">Password:</label>
        <br />
        <input
          ref={(elem) => (inputsRef.current[DIGIT_LENGTH] = elem)}
          type="password"
          id="password"
          name="password"
          required
        />
        <br />
        <br />

        <button type="submit" value="Submit">
          Go to Storage
        </button>
      </form>
    </div>
  );
};

export default Authenticate;
