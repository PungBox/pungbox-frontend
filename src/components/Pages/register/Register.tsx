import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';
import { useLocation } from 'react-router-dom';
import { useBucketInfoContext } from 'context/BucketInfoProvider';

const Register = () => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();

  return registeredBucketInfo.id ? <RegisterResult /> : <RegisterForm />;
};

export default Register;
