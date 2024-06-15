import React, { SetStateAction, useState } from 'react';
import styles from '/src/components/Module/Register.module.css';
import { HTMLFormElement, IHTMLFormControlsCollection } from 'happy-dom';
import { createBucket } from '../../../../service/service';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

interface RegisterFormElements extends IHTMLFormControlsCollection {
  password: HTMLInputElement;
  'expiration-period': HTMLSelectElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: RegisterFormElements;
}

interface RegisterFormProps {
  setPassword: React.Dispatch<SetStateAction<string>>;
}

const RegisterForm = ({ setPassword }: RegisterFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const { setBucketInfo } = useBucketInfoContext();
  
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: expiration period은 사용되고 있지 않음. 추후 /bucket/create endpoint에 넘길 수 있어야 함
    const formElements = (e.currentTarget as unknown as RegisterFormElement).elements;
    const createBucketResponse = await createBucket({
      durationMin: formElements['expiration-period'].value,
      password: formElements.password.value,
    });
    if (!Object.hasOwn(createBucketResponse, 'id')) {
      alert('Failed to create storage, due to server error');
      console.error(createBucketResponse);
      setIsLoading(false);
      return;
    }
    const { id: bucketId, expiredAt } = createBucketResponse;
    setBucketInfo({ id: bucketId, expiredAt });
    setPassword(formElements.password.value);
    setIsLoading(false);
  }
  
  return (
    <form className={styles.form} method="POST" onSubmit={async (e) => await submit(e)}>
      <label htmlFor="password">Password for storage:</label>
      <br />
      <input type="password" id="password" name="password" required />
      <br />
      <br />
      
      <label htmlFor="expiration-period">Storage expiration period:</label>
      <br />
      <select id="expiration-period" name="expiration-period" required>
        <option value={10}>10 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={60}>1 hour</option>
        <option value={120}>2 hours</option>
        <option value={180}>3 hours</option>
      </select>
      <br />
      <br />
      
      <input type="submit" value={isLoading ? 'Creating Storage...' : 'Get Storage'} disabled={isLoading} />
    </form>
  );
};

export default RegisterForm;
