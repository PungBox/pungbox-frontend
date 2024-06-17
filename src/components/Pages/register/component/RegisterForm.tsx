import React, { useState } from 'react';
import styles from '/src/components/Module/Register.module.css';
import { HTMLFormElement, IHTMLFormControlsCollection } from 'happy-dom';
import { createBucket } from '../../../../service/service';
import { useBucketInfoContext } from 'context/BucketInfoProvider';
import { useLocation } from 'react-router-dom';
import useUploadFiles from 'components/Pages/view/hooks/useUploadFiles';

interface RegisterFormElements extends IHTMLFormControlsCollection {
  password: HTMLInputElement;
  'expiration-period': HTMLSelectElement;
}

interface RegisterFormElement extends HTMLFormElement {
  readonly elements: RegisterFormElements;
}

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { state } = useLocation();
  const { setBucketInfo } = useBucketInfoContext();
  const { uploadFiles } = useUploadFiles();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: expiration period은 사용되고 있지 않음. 추후 /bucket/create endpoint에 넘길 수 있어야 함
    const formElements = (e.currentTarget as unknown as RegisterFormElement).elements;
    try {
      const createBucketResponse = await createBucket({
        durationMin: formElements['expiration-period'].value,
        password: formElements.password.value,
        files: state?.files.map(({ object }: { object: File }) => ({ fileName: object.name, size: object.size })),
      });
      if (!Object.hasOwn(createBucketResponse, 'bucketId')) {
        console.error('Failed to create bucket');
        return;
      }

      const { bucketId, bucketCode, expiredAt } = createBucketResponse;

      const now = new Date();
      const expirationUtc = new Date(expiredAt);

      const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000;
      const expirationLocal = new Date(expirationUtc.getTime() - timezoneOffsetMs).toString();
      setBucketInfo({ bucketId, bucketCode, expiredAt: expirationLocal });

      await uploadFiles({ bucketId, files: state?.files.map(({ object }: { object: File }) => object) });
    } catch (e) {
      console.error('Failed to create bucket', e);
      setHasError(true);
    }
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

      <input
        type="submit"
        value={hasError ? 'Error occured while creating a storage' : isLoading ? 'Creating Storage...' : 'Get Storage'}
        disabled={isLoading || hasError}
      />
    </form>
  );
};

export default RegisterForm;
