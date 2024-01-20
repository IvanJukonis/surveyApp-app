import React from 'react';
import styles from './modalSuccess.module.css';
import { useHistory } from 'react-router-dom';

const ModalSuccess = ({ setModalSuccessOpen, message, redirect, sinId }) => {
  const history = useHistory();

  const handleClose = () => {
    setModalSuccessOpen(false);
  };

  const handleRedirect = () => {
    history.replace({
      pathname: `/controlador/siniestros/involucrado/form/${sinId}`,
      state: { params: { mode: 'create' } }
    });
  };

  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <img
          className={styles.close_icon}
          onClick={handleClose}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <div className={styles.text_cont}>
          <h3 className={styles.titleModal}>Exitoso</h3>
          <p className={styles.textModal}>{message}</p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btnAccept}
            onClick={() => {
              if (!redirect) {
                handleClose();
              } else {
                handleClose();
                handleRedirect();
              }
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalSuccess;
