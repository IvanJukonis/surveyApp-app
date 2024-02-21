import React, { useState, useEffect } from 'react';
import styles from './login.module.css';
import { useHistory } from 'react-router-dom';
import { Inputs, Button, Loader } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { login } from 'redux/auth/thunks';

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
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .required()
    .messages({
      'string.pattern.base':
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula y un dígito',
      'string.min': 'La contraseña debe tener al menos 8 caracteres de longitud',
      'string.empty': 'El campo de contraseña es obligatorio'
    })
});

function LoginForm() {
  const [errorPop, setErrorPop] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    switch (role) {
      case 'SUPER_ADMIN':
        history.push('/superadmin');
        break;
      case 'ADMINISTRATIVO':
        history.push('/administrativo');
        break;
      case 'CONTROLADOR':
        history.push('/controlador');
        break;
      case 'RELEVADOR':
        history.push('/relevador');
        break;
      default: {
        break;
      }
    }
  }, []);

  const onSubmit = async (data) => {
    if (Object.values(errors).length === 0) {
      const responseLogin = await dispatch(login(data));
      const role = responseLogin.payload.role;
      switch (role) {
        case 'SUPER_ADMIN':
          history.push('/superadmin');
          break;
        case 'ADMINISTRATIVO':
          history.push('/administrativo');
          break;
        case 'CONTROLADOR':
          history.push('/controlador');
          break;
        case 'RELEVADOR':
          history.push('/relevador');
          break;
        default: {
          setErrorPop(true);
        }
      }
    }
  };

  const eye = `${process.env.PUBLIC_URL}/assets/images/visibility.png`;
  const noEye = `${process.env.PUBLIC_URL}/assets/images/noVisible.png`;
  const [view, setView] = useState(false);

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
        <div className={styles.container}>
          <div className={styles.imgTop}>
            <p className={styles.imgText}>INICIO DE SESION</p>
          </div>
          <div className={styles.innerContainer}>
            <form className={styles.formSuperAdmin} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.wholeContainer}>
                <h1 className={styles.titleLogin}>Ingrese</h1>
                <div className={styles.containerForm}>
                  <div className={styles.containerUsername}>
                    <Inputs
                      type="email"
                      nameInput={'email'}
                      nameTitle={'Correo Electronico'}
                      register={register}
                      error={errors.email?.message}
                      testId="login-input-email"
                      className={styles.inputs}
                    />
                  </div>
                  <div className={styles.containerPasswordEye}>
                    <Inputs
                      type={view ? 'text' : 'password'}
                      nameInput={'password'}
                      nameTitle={'Contraseña'}
                      register={register}
                      error={errors.password?.message}
                      testId="login-input-password"
                      className={styles.inputs}
                    />
                    <img onClick={() => setView(!view)} src={view ? eye : noEye} />
                  </div>
                </div>
                {errorPop ? (
                  <div
                    className={`${styles.boxError} ${styles.shakeAnimation}`}
                    data-testid="login-error-pop"
                  >
                    <div className={styles.lineError}>
                      <div className={styles.errorLogo}>!</div>
                      LogIn Denied
                      <div
                        onClick={() => {
                          setErrorPop(false);
                        }}
                        className={styles.close_icon}
                      ></div>
                    </div>
                    <p className={styles.MsgError}>The username or password is incorrect</p>
                  </div>
                ) : (
                  <div className={styles.emptyBox} data-testid="login-error-pop"></div>
                )}

                <div className={styles.newContainer}>
                  <div className={styles.sub_buttons}>
                    <Button
                      className={styles.buttonLogin}
                      clickAction={() => {}}
                      text="Entrar"
                      testId="enter-login-btn"
                    />
                  </div>
                  <div data-testid="password-forgot-btn">
                    <button
                      className={styles.forgotPass}
                      onClick={() => {
                        history.push('/auth/recover-password');
                      }}
                    >
                      Olvidaste tu contraseña?
                    </button>
                  </div>
                  <div
                    className={styles.notAccountContainer}
                    onClick={() => {
                      history.push('/auth/sign-up');
                    }}
                  >
                    <p> No tiene una cuenta?</p>
                    <button className={styles.signUpThing}>Registrarse</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginForm;
