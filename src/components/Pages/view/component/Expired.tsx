import React from 'react';
import GoToPreviousPageButton from '../../../../utils/component/GoToPreviousPageButton';
import expiredUrl from '/src/assets/images/icon-cloud-connection.png';
import styles from '/src/components/Module/Expired.module.css';

const Expired = () => {
  return (
    <div className={styles.expired_container}>
      <img src={expiredUrl} alt="storage expired" className={styles.expired_image} />
      <p className={styles.expired_text}>스토리지 만료됨</p>
      <GoToPreviousPageButton innerText="Go Back" className={styles.go_back_button} />
    </div>
  );
};


export default Expired
