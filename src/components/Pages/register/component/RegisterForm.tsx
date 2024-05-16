import React from 'react';

interface RegisterResultProps {
  setIsRegisterDone: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterForm = ({ setIsRegisterDone }: RegisterResultProps) => {
  function submit() {
    setIsRegisterDone(true);
  }

  return (
    <form method="POST" onSubmit={submit}>
      <label htmlFor="password">Password for storage:</label>
      <br />
      <input type="password" id="password" name="password" required />
      <br />
      <br />

      <label htmlFor="expiration-period">Storage expiration period:</label>
      <br />
      <select id="expiration-period" name="expiration-period" required>
        <option value={10}>10 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={60}>1 hour</option>
        <option value={120}>2 hours</option>
        <option value={180}>3 hours</option>
      </select>
      <br />
      <br />

      <input type="submit" value="Get Storage" />
    </form>
  );
};

export default RegisterForm;
