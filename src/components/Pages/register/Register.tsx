import React, { useState } from 'react';
import RegisterForm from './component/RegisterForm';
import RegisterResult from './component/RegisterResult';

const Register = () => {
  const [isRegisterDone, setIsRegisterDone] = useState(false);
  //TO DO:: 업로드 중 로딩창 생성 (우선순위 낮음)
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const handleUpload = () => {
    setIsLoading(true); // 파일 업로드 시작 시 로딩 상태를 true로 설정
    // 파일 업로드 로직 수행
    // 업로드가 완료되면 setIsLoading(false)와 setIsRegisterDone(true)를 호출하여 로딩 상태를 false로 변경하고 RegisterResult 페이지로 전환
  };

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
