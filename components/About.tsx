import React from 'react';
import AddModal from './AddModal';
import styles from '../styles/About.module.css';

const About = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    const modalCss = {
        content: {
          top: '100px',
          left: '200px',
          right: '200px',
          bottom: '80px',
          overflow: 'auto',
          border: '20px',
          background: 'linear-gradient(90deg, rgba(208,207,214,1) 0%, rgba(249,230,138,1) 35%, rgba(255,217,0,1) 100%)',
          borderRadius: '20px',
          padding: '20px 30px'
        }
    }

  return (
      <AddModal
        css={modalCss}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        text='About' >
            <div className={styles.container}>
                <h3>About me</h3>
                <p>This is my frontend project for my portfolio. 
                    If you are interested in BattleBoobas NFT project please check 
                    <a href='https://www.battleboobas.com' target="_blank" rel="noreferrer"> this website</a>
                    &nbsp; or secondary market on <b>Avalanche</b> at 
                    <a href='https://www.kalao.io/' target="_blank" rel="noreferrer"> Kalao</a> or 
                    <a href='https://nftrade.com/' target="_blank" rel="noreferrer"> NFTrade</a>
                </p>
                <p>Token price are fetched using MoralisWeb3API.</p>
                <p>*Inspired by <a href='https://milky.money' target='_blank' rel='noreferrer'>https://milky.money</a> by @CryptoTOB</p>
                <p><b>**I didn&apos;t own/involve in the BattleBoobas project**</b></p>
                <p className={styles.myEmail}>snakglom@gmail.com</p>
            </div>
        </AddModal>

  );
};

export default About;
