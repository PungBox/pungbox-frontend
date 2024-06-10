import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from '/src/components/Module/Register.module.css';
import { HTMLFormElement, IHTMLFormControlsCollection } from 'happy-dom';
import { createBucket } from '../../../../service/service';

interface RegisterResultProps {
  setIsRegisterDone: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessCode: React.Dispatch<React.SetStateAction<string>>;
}

interface RegisterFormElements extends IHTMLFormControlsCollection {
  password: HTMLInputElement;
  'expiration-period': HTMLSelectElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: RegisterFormElements;
}

const RegisterForm = ({ setIsRegisterDone, setAccessCode }: RegisterResultProps) => {
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: expiration period은 사용되고 있지 않음. 추후 /bucket/create endpoint에 넘길 수 있어야 함
    const formElements = (e.currentTarget as unknown as RegisterFormElement).elements;
    const createBucketResponse = await createBucket(formElements.password.value);
    if (!(Object.hasOwn(createBucketResponse, 'id'))) {
      console.error('Failed to create bucket');
      return;
    }
    const bucketId = createBucketResponse.id;
    setAccessCode(bucketId);
    setIsRegisterDone(true);
  }
  
  const location = useLocation();
  const { files } = location.state;
  //TO DO:: Home에서 state로 받아온 files를 사용하여 register 완료후 Get Storage 버튼 누르면 업로드 진행
  
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
      
      <input type="submit" value="Get Storage" />
    </form>
  );
};

export default RegisterForm;
