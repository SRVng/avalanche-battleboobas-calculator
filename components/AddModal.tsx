import React from 'react';
import ReactModal from 'react-modal';
import styles from '../styles/AddModal.module.css';

interface AddModalProps {
  text: string
  css: {
    content: any
  } 
  children?: React.ReactChild
  isOpen: boolean
  setIsOpen: Function
}

const AddModal = (props: AddModalProps) => {

  const isOpen = props.isOpen;
  const setIsOpen = props.setIsOpen;

    const openModal = () => {
        setIsOpen(true)
    };

    const closeModal = () => {
        setIsOpen(false)
    };

  return (
    <div className={styles.container}>
      <button onClick={openModal} className={styles.button}>{props.text}</button>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        style={props.css}>
          <button onClick={closeModal} className={styles.closeButton}>X</button>
          {props.children}
          
      </ReactModal>
    </div>
  )
};

export default AddModal;
