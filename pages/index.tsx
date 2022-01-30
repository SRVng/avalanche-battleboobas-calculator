import type { NextPage } from 'next';
import React from 'react';
import styles from '../styles/Home.module.css';
import Price from '../components/Price';
import AddNft from '../components/AddNft';
import BattleLogo from '../components/BattleLogo';
import Header from '../components/Header';

const Home: NextPage = () => {

  const [tokenDetails, updateTokenDetails] = React.useState({
    name: '',
    price: ''
});

  return (
    <div className={styles.content_bg}>
      <Header/>
      <BattleLogo />
      <Price 
        symbol='MILK' 
        address='0x46abb394b656a07a34272fabaae520f696307a0e'
        tokenDetails={tokenDetails}
        updateTokenDetails={updateTokenDetails} />
      <AddNft tokenDetails={tokenDetails}/>
    </div>
  )
}

export default Home
