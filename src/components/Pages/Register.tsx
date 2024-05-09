import React, { useState } from 'react'

const Register = () => {
  const [password, setPassword] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  //입력값 변경 핸들러
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };


  return (
    <div>Register</div>
  )
}

export default Register