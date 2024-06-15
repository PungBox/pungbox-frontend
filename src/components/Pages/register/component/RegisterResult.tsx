import React from 'react';
import { Link } from 'react-router-dom';
import ResultContainer from './ResultContainer';
import styles from '/src/components/Module/Register.module.css';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

const RegisterResult = () => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();
  // TODO: url을 통해 들어오는 사용자들 대처해야 함 (routing) 이미 auth 완료한 사용자 / auth 완료하지 않은 사용자 구분
  const url = `https://www.pungbox.com/box/${registeredBucketInfo.id}`;

  return (
    <div className={styles.registerResultContainer}>
      <ResultContainer title="URL for Storage:" content={url} copyable />
      <ResultContainer title="Access Code for Storage:" content={registeredBucketInfo.id} copyable />
      <ResultContainer title="Expiration Date:" content={registeredBucketInfo.expiredAt} />

      <Link to={`/view?bucketCode=${registeredBucketInfo}`}>
        <button className={styles.gotobutton}>Go to Storage</button>
      </Link>
    </div>
  );
};

export default RegisterResult;
