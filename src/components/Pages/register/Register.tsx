import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';

const Register = () => {
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  
  
  return isRegisterDone ? <RegisterResult /> : <RegisterForm setIsRegisterDone={setIsRegisterDone} />;
  
  // return isLoading ? (
  //   <div>Loading...</div> // 로딩 중에 보여줄 화면
  // ) : isRegisterDone ? (
  //   <RegisterResult />
  // ) : (
  //   <RegisterForm setIsRegisterDone={setIsRegisterDone} handleUpload={handleUpload} />
  // );
};

export default Register;
