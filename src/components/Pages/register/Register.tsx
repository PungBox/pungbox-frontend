import React from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

const Register = () => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();

  console.log(registeredBucketInfo.bucketId);
  return registeredBucketInfo.bucketId ? <RegisterResult /> : <RegisterForm />;
};

export default Register;
