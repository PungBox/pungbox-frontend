import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';

const Register = () => {
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  return isRegisterDone ? <RegisterResult /> : <RegisterForm setIsRegisterDone={setIsRegisterDone} />;
};

export default Register;
