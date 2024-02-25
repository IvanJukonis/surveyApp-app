import React, { useEffect, useState } from 'react';
import styles from './recoverPassword.module.css';
import { Inputs, Button, ModalSuccess } from 'Components/Shared';
import ModalError from 'Components/Shared/Modals/ModalError/index';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';
import { recoverPassword } from 'redux/auth/thunks';
import { login } from 'redux/auth/thunks';
import { logout } from 'redux/auth/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAdministrativo } from 'redux/administrativo/thunks';
import { getRelevador } from 'redux/relevador/thunks';
import { getControlador } from 'redux/controlador/thunks';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .messages({
      'string.base': 'El correo electrónico debe ser una cadena de texto',
      'string.empty': 'El correo electrónico es un campo obligatorio',
      'string.email': 'El correo electrónico debe ser una dirección de correo electrónico válida',
      'string.minDomainSegments':
        'El correo electrónico debe tener al menos 2 segmentos de dominio',
      'string.tlds.allow':
        'El correo electrónico debe tener un dominio de nivel superior válido (.com o .net)'
    })
});

const RecoverPassword = () => {
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [message, setMessage] = useState('');
  const [headerMessage, setHeaderMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const administrativos = useSelector((state) => state.administrativo.list);
  const controladores = useSelector((state) => state.controlador.list);
  const relevadores = useSelector((state) => state.relevador.list);
  const token = sessionStorage.getItem('token');
  const data = {
    email: 'superadmin@hotmail.com',
    password: 'Ivanjuko123'
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const logForData = async () => {
    await dispatch(login(data));
  };

  const logOut = async () => {
    await dispatch(logout());
  };

  const emailExistsInDB = (data) => {
    if (administrativos?.some((administrativo) => administrativo.email === data.email)) {
      return true;
    }
    if (controladores?.some((controlador) => controlador.email === data.email)) {
      return true;
    }
    if (relevadores?.some((relevador) => relevador.email === data.email)) {
      return true;
    }
  };

  const dataManage = async (data) => {
    if (emailExistsInDB(data)) {
      await dispatch(recoverPassword(data));
      setModalSuccess(true);
      setTimeout(() => {
        setModalSuccess(false);
        history.push('/auth/login');
      }, 2000);
      logOut();
    } else {
      setHeaderMessage('Error');
      setMessage('No existe un usuario registrado con este correo');
      setModalError(true);
      logOut();
    }
  };

  const onSubmit = (data) => {
    dataManage(data);
  };

  useEffect(() => {
    logForData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getAdministrativo(dispatch);
      getRelevador(dispatch);
      getControlador(dispatch);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      logOut();
    }, 1500);
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>RECUPERAR CONTRASEÑA</p>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.formSuperAdmin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wholeContainer}>
            <h1 className={styles.titleLogin}>Recuperar Contraseña</h1>
            <div className={styles.containerForm}>
              <p className={styles.textInfo}>
                Un codigo de recuperación sera enviado a su correo electronico.
              </p>
            </div>
            <div className={styles.containerUsername}>
              <Inputs
                type="email"
                nameInput={'email'}
                nameTitle={'Email'}
                register={register}
                error={errors.email?.message}
              />
            </div>
            <div className={styles.sub_buttons}>
              <Button className={styles.buttonLogin} clickAction={() => {}} text="Confirmar" />
              <Button text="Cancelar" clickAction={() => history.goBack()} />
            </div>
          </div>

          {modalSuccess && (
            <ModalSuccess
              message={'El codigo de verificación ha sido enviado a su correo.'}
              setModalSuccessOpen={setModalSuccess}
            />
          )}
          {modalError && (
            <ModalError
              setModalErrorOpen={setModalError}
              message={message}
              headerMessage={headerMessage}
            />
          )}
        </form>
      </div>
    </div>
  );
};
export default RecoverPassword;
