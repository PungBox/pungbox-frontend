import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';

const Register = () => {
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  const [accessCode, setAccessCode] = useState('000000');
  
  return isRegisterDone ? <RegisterResult accessCode={accessCode} /> :
    <RegisterForm setIsRegisterDone={setIsRegisterDone} setAccessCode={setAccessCode} />;
};

export default Register;
