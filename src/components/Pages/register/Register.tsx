import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

const Register = () => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();
  const [password, setPassword] = useState('');
  
  return registeredBucketInfo.id ? <RegisterResult password={password} /> : <RegisterForm setPassword={setPassword} />;
};

export default Register;
