import React from 'react';
import GoToPreviousPageButton from '../../../../utils/component/GoToPreviousPageButton';
import expiredUrl from '/src/assets/images/icon-cloud-connection.png';

const Expired = () => {
  return (
    <div>
      <img src={expiredUrl} alt="storage expired" />
      <p>스토리지 만료됨</p>
      <GoToPreviousPageButton innerText="Go Back" />
    </div>
  );
};

export default Expired
