import React from 'react';
import { useAccessCodeInput } from './util/accessCodeInput';
import { authConfig as config } from '../../../utils/config';

const Authenticate = () => {
  const { inputsRef, undoDigitInput, accessCodeInput } = useAccessCodeInput();
  
  function submit(e: React.FormEvent<HTMLFormElement>) {
    console.log('submit');
    console.log(e);
  }
  
  return (
    <div className="auth-panel">
      <form method="POST" onSubmit={(e) => submit(e)}>
        <label htmlFor="access_code">Access Code:</label>
        <br />
        {accessCodeInput}
        <span className="material-symbols-outlined" onClick={undoDigitInput}>
          cancel
        </span>
        <br />
        <br />
        
        <label htmlFor="password">Password:</label>
        <br />
        <input
          ref={(elem) => (inputsRef.current[config.DIGIT_LENGTH] = elem)}
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
