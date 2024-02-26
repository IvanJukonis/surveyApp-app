import React from 'react';
import styles from './modalConfirm.module.css';

const ModalConfirm = ({
  message,
  method,
  onConfirm,
  setModalConfirmOpen,
  setModalAddConfirmOpenEvento,
  setModalAddConfirmOpenRueda
}) => {
  const onConfirmFunction = () => {
    console.log(setModalConfirmOpen, 'setModalConfOpen');
    console.log(setModalAddConfirmOpenEvento, 'evvvv');
    console.log(setModalAddConfirmOpenRueda, 'rueddd');
    if (setModalConfirmOpen != undefined) {
      onConfirm(), setTimeout(() => setModalConfirmOpen(false), 800);
      console.log('no por aca');
    } else if (setModalAddConfirmOpenEvento != undefined) {
      console.log('sale por aca');
      onConfirm(), setTimeout(() => setModalAddConfirmOpenEvento(false), 800);
    } else {
      onConfirm(), setTimeout(() => setModalAddConfirmOpenRueda(false), 800);
    }
  };

  const cancelFunction = () => {
    if (setModalConfirmOpen) {
      setModalConfirmOpen(false);
    } else if (setModalAddConfirmOpenEvento) {
      setModalAddConfirmOpenEvento(false);
    } else {
      setModalAddConfirmOpenRueda(false);
    }
  };

  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <img
          className={styles.close_icon}
          onClick={cancelFunction}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <p
          className={styles.titleModal}
          style={method.toLowerCase() === 'eliminar' ? { color: '#F13312' } : { color: '#494E6B' }}
        >
          Confirmar
        </p>
        <p className={styles.textModal}>{message}</p>
        <div className={styles.buttons}>
          <button className={styles.btnCancel} onClick={cancelFunction}>
            Cancelar
          </button>
          <button
            className={
              method.toLowerCase() === 'eliminar' ? styles.btnAcceptDelete : styles.btnAccept
            }
            onClick={onConfirmFunction}
          >
            {method}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
