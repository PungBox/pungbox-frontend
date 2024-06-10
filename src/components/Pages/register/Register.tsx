import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';
import { useLocation } from 'react-router-dom';

const Register = () => {
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  const location = useLocation();
  
  return isRegisterDone ? <RegisterResult files={location.state.files} /> :
    <RegisterForm setIsRegisterDone={setIsRegisterDone} />;
  
  // return isLoading ? (
  //   <div>Loading...</div> // 로딩 중에 보여줄 화면
  // ) : isRegisterDone ? (
  //   <RegisterResult />
  // ) : (
  //   <RegisterForm setIsRegisterDone={setIsRegisterDone} handleUpload={handleUpload} />
  // );
};

export default Register;
