import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';
import { useLocation } from 'react-router-dom';

const Register = () => {
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  const [accessCode, setAccessCode] = useState('000000');
  const [expiredAt, setExpiredAt] = useState('');

  return isRegisterDone ? (
    <RegisterResult accessCode={accessCode} expiredAt={expiredAt} />
  ) : (
    <RegisterForm setIsRegisterDone={setIsRegisterDone} setAccessCode={setAccessCode} setExpiredAt={setExpiredAt} />
  );
};

export default Register;
