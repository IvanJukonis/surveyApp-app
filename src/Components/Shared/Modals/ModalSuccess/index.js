import React from 'react';
import styles from './modalSuccess.module.css';
import { useHistory } from 'react-router-dom';

const ModalSuccess = ({
  setModalSuccessOpen,
  message,
  redirect,
  redirectEntity,
  sinId,
  createdEntity
}) => {
  const history = useHistory();
  const role = sessionStorage.getItem('role');

  const handleClose = () => {
    setModalSuccessOpen(false);
  };

  const handleRedirect = () => {
    if (role == 'CONTROLADOR') {
      if (redirectEntity === 'involucrado') {
        history.push({
          pathname: `/controlador/siniestros/involucrado/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity } }
        });
      } else if (redirectEntity === 'vehiculo') {
        history.push({
          pathname: `/controlador/siniestros/vehiculo/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity } }
        });
      } else if (redirectEntity === 'rueda') {
        history.push({
          pathname: `/controlador/siniestros/rueda/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity, siniestroId: sinId } }
        });
      }
    }
    if (role == 'RELEVADOR') {
      if (redirectEntity === 'involucrado') {
        history.push({
          pathname: `/relevador/siniestros/involucrado/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity } }
        });
      } else if (redirectEntity === 'vehiculo') {
        history.push({
          pathname: `/relevador/siniestros/vehiculo/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity } }
        });
      } else if (redirectEntity === 'rueda') {
        history.push({
          pathname: `/relevador/siniestros/rueda/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity, siniestroId: sinId } }
        });
      }
    }
    if (role == 'ADMINISTRATIVO') {
      if (redirectEntity === 'involucrado') {
        history.push({
          pathname: `/administrativo/siniestros/involucrado/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity } }
        });
      } else if (redirectEntity === 'vehiculo') {
        history.push({
          pathname: `/administrativo/siniestros/vehiculo/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity } }
        });
      } else if (redirectEntity === 'rueda') {
        history.push({
          pathname: `/administrativo/siniestros/rueda/form/${sinId}`,
          state: { params: { mode: 'create', item: createdEntity, siniestroId: sinId } }
        });
      }
    }
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
                handleRedirect();
                handleClose();
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
