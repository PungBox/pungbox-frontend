import React from 'react';
import { useAccessCodeInput } from './util/accessCodeInput';
import { authConfig as config } from '../../../utils/config';
import styles from '/src/components/Module/Authenticate.module.css';

const Authenticate = () => {
  const { inputsRef, undoDigitInput, accessCodeInput } = useAccessCodeInput();

  function submit(e: React.FormEvent<HTMLFormElement>) {
    console.log('submit');
    console.log(e);
  }
  
  return (
    <div className={styles.authPanel}>
      <form method="POST" onSubmit={(e) => submit(e)}>
      <span className="font-bold">Access Code:</span>
        <label htmlFor="access_code" className={styles.label}>
          {accessCodeInput}
          <span className={`${styles.materialSymbolsOutlined} ${styles.cancel}`} onClick={undoDigitInput}>
            X
          </span>
        </label>
        
        <span className="font-bold">Password:</span>
        <label htmlFor="password" className={styles.label}>

        <input
          ref={(elem) => (inputsRef.current[config.DIGIT_LENGTH] = elem)}
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
