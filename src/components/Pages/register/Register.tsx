import React, { useEffect, useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';
import { useBucketInfoContext } from 'context/BucketInfoProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import { IFileTypes } from '../home/Home';
import { authenticate, isAuthenticated } from '../../../service/service';

const Register = () => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let files: IFileTypes[] = [];

  useEffect(() => {
    try {
      files = location.state.files;
    } catch {
      navigate('/');
      return;
    }
    if (files.length === 0) {
      navigate('/');
      return;
    }
  }, []);

  const handleGoToStorageButtonClick = async () => {
    await authenticate({ bucketCode: registeredBucketInfo.bucketCode, password });
    if (isAuthenticated()) {
      navigate('/view', { state: { files } });
    } else {
      window.alert('Failed to authenticate');
    }
  };

  return registeredBucketInfo.bucketCode ? (
    <RegisterResult handleButtonClick={handleGoToStorageButtonClick} />
  ) : (
    <RegisterForm setPassword={setPassword} />
  );
};

export default Register;
