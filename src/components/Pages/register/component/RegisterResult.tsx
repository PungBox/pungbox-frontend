import React from 'react';
import ResultContainer from './ResultContainer';
import styles from '/src/components/Module/Register.module.css';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

interface RegisterResultProps {
  handleButtonClick: () => Promise<void>;
}

const RegisterResult = ({ handleButtonClick }: RegisterResultProps) => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();
  const url = `https://www.pungbox.com/box/${registeredBucketInfo.bucketCode}`;

  return (
    <div className={styles.registerResultContainer}>
      <ResultContainer title="URL for Storage:" content={url} copyable />
      <ResultContainer title="Access Code for Storage:" content={registeredBucketInfo.bucketCode} copyable />
      <ResultContainer title="Expiration Date:" content={registeredBucketInfo.expiredAt} />
      
      <button className={styles.gotobutton} onClick={async () => handleButtonClick}>Go to Storage</button>
    </div>
  );
};

export default RegisterResult;
