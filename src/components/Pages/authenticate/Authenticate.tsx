import React, { useState } from 'react';
import { useAccessCodeInput } from './util/accessCodeInput';
import { authConfig as config } from '../../../utils/config';
import styles from '/src/components/Module/Authenticate.module.css';
import { authenticate } from '../../../service/service';
import { HTMLFormElement, IHTMLFormControlsCollection } from 'happy-dom';
import { useNavigate } from 'react-router-dom';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

interface RegisterFormElements extends IHTMLFormControlsCollection {
  password: HTMLInputElement;
  digit0: HTMLInputElement;
  digit1: HTMLInputElement;
  digit2: HTMLInputElement;
  digit3: HTMLInputElement;
  digit4: HTMLInputElement;
  digit5: HTMLInputElement;
  digit6?: HTMLInputElement;
  digit7?: HTMLInputElement;
  digit8?: HTMLInputElement;
  digit9?: HTMLInputElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: RegisterFormElements;
}

function getBucketCodeFromFormElem(formElements: RegisterFormElements): string {
  let result = '';
  for (let i = 0; i < 10; i++) {
    const elementName = `digit${i}` as `digit${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
    const digitElem = formElements[elementName];
    if (digitElem === undefined) break;
    result += digitElem.value;
  }
  return result;
}

const Authenticate = () => {
  const { inputsRef, undoDigitInput, accessCodeInput } = useAccessCodeInput();
  const [isLoading, setIsLoading] = useState(false);

  const { setBucketInfo } = useBucketInfoContext();

  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    const formElements = (e.currentTarget as unknown as RegisterFormElement).elements;
    const bucketCode = getBucketCodeFromFormElem(formElements);
    const authResponse = await authenticate({ bucketCode, password: formElements.password.value });
    setIsLoading(false);
    if (authResponse === null) return;
    setBucketInfo({ bucketCode, bucketId: authResponse.bucketId });
    navigate({ pathname: '/view', search: `?bucketCode=${bucketCode}` });
  }

  return (
    <div className={styles.authPanel}>
      <form method="POST" onSubmit={async (e) => await submit(e)}>
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

        <button type="submit" value="Submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Accessing storage...' : 'Go to Storage'}
        </button>
      </form>
    </div>
  );
};

export default Authenticate;
