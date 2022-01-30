import React from 'react';
import Logo from '../public/Logo.png';
import Logo2 from '../public/Logo2.png';
import Image from 'next/image';
import styles from '../styles/Logo.module.css';

const BattleLogo = () => {

  return (
    <div className={styles.container}>
      <div className={styles.battleLogo}>
        <Image
          src={Logo}
          alt=""
          width={'300px'}
          height={'150px'} />
      </div>
      <div className={styles.calculator}>
        <Image
          src={Logo2}
          alt=""
          width={'60px'}
          height={'65px'} />
      </div>
    </div>
  )
};
export default BattleLogo;
