import React from 'react';

const RegisterForm = () => {
  function submit() {}

  return (
    <form method="POST" onSubmit={submit}>
      <label htmlFor="password">Password for Storage:</label>
      <br />
      <input type="password" id="password" name="password" required />
      <br />
      <br />

      <label htmlFor="expiration-period">Expiration Period:</label>
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
