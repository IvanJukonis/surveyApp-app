import React, { useState, useEffect } from 'react';
import styles from './signUp.module.css';
import { Inputs, OptionInput, Button, ToastError, Loader } from 'Components/Shared';
import ModalSignUp from 'Components/Shared/Modals/ModalSignUp';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { signUpConsultor } from 'redux/auth/thunks';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess/index';

const SignForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openModalSuccess, setOpenModalSuccess] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState('');
  const [toastError, setToastError] = useState(null);

  const tipoArray = ['Consultor'];

  const schema = Joi.object({
    tipo: Joi.string().valid('Relevador', 'Controlador', 'Administrativo', 'Consultor').messages({
      'any.only': 'El campo "Tipo" debe contener una tipo valido'
    }),

    nombre: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.base': 'El campo "Nombre" debe ser una cadena de texto',
        'string.empty': 'El campo "Nombre" es un campo requerido',
        'string.min': 'El campo "Nombre" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Nombre" debe tener como máximo 30 caracteres'
      })
      .required(),

    apellido: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.base': 'El campo "Apellido" debe ser una cadena de texto',
        'string.empty': 'El campo "Apellido" es un campo requerido',
        'string.min': 'El campo "Apellido" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Apellido" debe tener como máximo 30 caracteres'
      })
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'string.base': 'El campo "Email" debe ser una cadena de texto',
        'string.empty': 'El campo "Email" es un campo requerido',
        'string.email': 'El campo "Email" debe ser una dirección de correo válida',
        'string.minDomainSegments': 'El campo "Email" debe tener al menos 2 segmentos de dominio',
        'string.tlds.allow':
          'El campo "Email" debe tener un dominio de nivel superior válido (com o net)'
      })
      .required(),

    dni: Joi.number().min(10000000).max(99999999).integer().messages({
      'number.base': 'El DNI debe ser un número',
      'number.empty': 'El DNI es un campo requerido',
      'number.min': 'El DNI debe ser al menos 10,000,000',
      'number.max': 'El DNI debe ser como máximo 99,999,999',
      'number.integer': 'El DNI debe ser un número entero'
    }),

    aseguradora: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.base': 'El campo "Aseguradora" debe ser una cadena de texto',
        'string.empty': 'El campo "Aseguradora" es un campo requerido',
        'string.min': 'El campo "Aseguradora" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Aseguradora" debe tener como máximo 30 caracteres'
      })
      .required(),

    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
      .required()
      .messages({
        'string.pattern.base':
          'The password must contain at least one lowercase letter, one uppercase letter, and one digit',
        'string.min': 'The password must be at least 8 characters long',
        'string.empty': 'The password field is required'
      }),

    repeatPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': "Passwords don't match"
    })
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const onSubmit = async (data) => {
    const consultorEdit = {
      tipo: data.tipo,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      dni: data.dni,
      aseguradora: data.aseguradora,
      atendido: false,
      activo: false,
      password: data.password
    };

    if (Object.values(errors).length === 0) {
      try {
        const responseSignUp = await dispatch(signUpConsultor(consultorEdit));
        if (responseSignUp.type === 'SIGN_UP_SUCCESS') {
          setOpenModalSuccess(true);
          setTimeout(() => {
            setOpenModalSuccess(false);
            history.push('/auth/login');
          }, 2000);
        }
        if (responseSignUp.type === 'SIGN_UP_ERROR') {
          setToastError(true);
          if (responseSignUp.payload.message.includes('auth')) {
            setMessageError('Email already exists');
          } else {
            setMessageError(responseSignUp.payload.message);
          }
        }
      } catch (error) {
        setToastError(true);
      }
    }
  };

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role) {
      setModalShow(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.wholeContainer}>
          {openModalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setOpenModalSuccess}
              message={'Sign In Successfully!'}
              testId="member-modal-success"
            />
          )}

          {toastError && (
            <ToastError
              setToastErroOpen={setToastError}
              message={messageError}
              testId="member-form-toast-error"
            />
          )}
          {modalShow && <ModalSignUp setModalShow={setModalShow} />}
          {error && (
            <div className={styles.boxError} data-testid="signUp-error-pop">
              <div className={styles.lineError}>
                <div className={styles.errorLogo}>!</div>
                Sign In error
                <div
                  onClick={() => {
                    setError(false);
                  }}
                  className={styles.close_icon}
                ></div>
              </div>
              <p className={styles.MsgError}>Email is already user</p>
            </div>
          )}
          <div className={styles.imgTop}>
            <p className={styles.imgText}>CREAR CONSULTOR</p>
          </div>
          <div className={styles.innerContainer}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className={styles.formContainer}
              encType="multipart/form-data"
            >
              <div className={styles.form}>
                <div className={styles.formContainer}>
                  <div className={styles.groupContainer}>
                    <div className={styles.inputColumnLeft}>
                      <div className={styles.inputContainer}>
                        <OptionInput
                          data={tipoArray}
                          dataLabel="Tipo"
                          name="tipo"
                          register={register}
                          error={errors.tipo?.message}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.nombre?.message}
                          register={register}
                          nameTitle="Nombre"
                          type="text"
                          nameInput="nombre"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.apellido?.message}
                          register={register}
                          nameTitle="Apellido"
                          type="text"
                          nameInput="apellido"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.email?.message}
                          register={register}
                          nameTitle="Email"
                          type="text"
                          nameInput="email"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.inputColumn}>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.dni?.message}
                          register={register}
                          nameTitle="Dni"
                          type="text"
                          nameInput="dni"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          nameTitle="Contraseña"
                          nameInput="password"
                          register={register}
                          type="password"
                          error={errors.password?.message}
                          testId="signup-password-input"
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          nameTitle="Repetir Contraseña"
                          nameInput="repeatPassword"
                          register={register}
                          type="password"
                          error={errors.repeatPassword?.message}
                          testId="signup-repeatpassword-input"
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.aseguradora?.message}
                          register={register}
                          nameTitle="Aseguradora"
                          type="text"
                          nameInput="aseguradora"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.buttonsGroup}>
                  <Button clickAction={() => {}} text="Registrarse" testId="signup-btn" />
                  <Button
                    text="Cancelar"
                    clickAction={() => history.goBack()}
                    testId="signup-cancel-btn"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignForm;
