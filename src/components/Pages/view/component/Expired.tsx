import React from 'react';
import GoToPreviousPageButton from '../../../../utils/component/GoToPreviousPageButton';

const Expired = () => {
  return (
    <div>
      <img src="src/assets/icon/free-icon-cloud-connection-7734277.png" alt="storage expired" />
      <p>스토리지 만료됨</p>
      <GoToPreviousPageButton innerText="Go Back" />
    </div>
  );
};

export default Expired;
