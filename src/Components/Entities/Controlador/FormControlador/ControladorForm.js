import React, { useState, useEffect } from 'react';
import styles from './form.module.css';
import { Inputs, OptionInput, Button, ToastError, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { signUpControlador } from 'redux/auth/thunks';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess/index';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';

const ControladorForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openModalSuccess, setOpenModalSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState('');
  const [toastError, setToastError] = useState(null);

  const tipoArray = ['Relevador', 'Controlador', 'Administrativo', 'Consultor'];
  const contratoArray = ['Termino Fijo', 'Termino Indefinido', 'Termino Temporal', 'Labor'];
  const oficinaArray = ['Rosario', 'Vgg', 'San Lorenzo'];
  const departamentoArray = ['Administracion', 'Produccion', 'Marketing', 'RRHH'];
  const puestoArray = ['Gerente', 'Empleado'];
  const civilArray = ['Casado/a', 'Soltero/a', 'Viudo/a', 'Divorciado/a'];

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

    fechaNacimiento: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Nacimiento" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Nacimiento" no puede permanecer vacio.'
      })
      .required(),

    fechaContratacion: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Contratacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Contratacion" no puede permanecer vacio.'
      })
      .required(),

    direccion: Joi.string()
      .min(2)
      .max(15)
      .messages({
        'string.base': 'El campo "Direccion" debe ser una cadena de texto',
        'string.empty': 'El campo "Direccion" es un campo requerido',
        'string.min': 'El campo "Direccion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Direccion" debe tener como máximo 15 caracteres'
      })
      .required(),

    localidad: Joi.string()
      .min(2)
      .max(15)
      .messages({
        'string.base': 'El campo "Localidad" debe ser una cadena de texto',
        'string.empty': 'El campo "Localidad" es un campo requerido',
        'string.min': 'El campo "Localidad" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Localidad" debe tener como máximo 15 caracteres'
      })
      .required(),

    telefono: Joi.number()
      .min(99999999)
      .max(999999999999)
      .messages({
        'string.base': 'El campo "Telefono" debe ser una cadena numerica',
        'string.empty': 'El campo "Telefono" es un campo requerido',
        'string.min': 'El campo "Telefono" debe tener al menos 9 caracteres',
        'string.max': 'El campo "Telefono" debe tener como máximo 12 caracteres'
      })
      .required(),

    contrato: Joi.string()
      .valid('Termino Fijo', 'Termino Indefinido', 'Termino Temporal', 'Labor')
      .messages({
        'any.only': 'El campo "Contrato" debe contener un contrato valida'
      }),

    hsLaborales: Joi.number()
      .min(3)
      .max(8)
      .messages({
        'string.base': 'El campo "Horas Laborales" debe ser una cadena numerica',
        'string.empty': 'El campo "Horas Laborales" es un campo requerido',
        'string.min': 'El campo "Horas Laborales" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Horas Laborales" debe tener como máximo 8 caracteres'
      })
      .required(),

    salario: Joi.number()
      .min(9999)
      .max(999999999)
      .messages({
        'string.base': 'El campo "Salario" debe ser una cadena numerica',
        'string.empty': 'El campo "Salario" es un campo requerido',
        'string.min': 'El campo "Salario" debe tener al menos 4 caracteres',
        'string.max': 'El campo "Salario" debe tener como máximo 9 caracteres'
      })
      .required(),

    fechaActualizacionSalario: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Actualizacion de Salario" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Actualizacion de Salario" no puede permanecer vacio.'
      })
      .required(),

    numeroSeguridadSocial: Joi.number()
      .min(999)
      .max(999999999999)
      .messages({
        'string.base': 'El campo "Numero de Seguridad Social" debe ser una cadena numerica',
        'string.empty': 'El campo "Numero de Seguridad Social" es un campo requerido',
        'string.min': 'El campo "Numero de Seguridad Social" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Numero de Seguridad Social" debe tener como máximo 12 caracteres'
      })
      .required(),

    oficina: Joi.string().valid('Rosario', 'Vgg', 'San Lorenzo').messages({
      'any.only': 'El campo "Oficina" debe contener una oficina valida'
    }),

    departamento: Joi.string().valid('Administracion', 'Produccion', 'Marketing', 'RRHH').messages({
      'any.only': 'El campo "Departamento" debe contener un departamento valido'
    }),

    puesto: Joi.string().valid('Gerente', 'Empleado').messages({
      'any.only': 'El campo "Puesto" debe contener un puesto valido'
    }),

    cantidadHijos: Joi.number()
      .min(0)
      .max(20)
      .messages({
        'string.base': 'El campo "Cantidad Hijos" debe ser una cadena numerica',
        'string.empty': 'El campo "Cantidad Hijos" es un campo requerido',
        'string.min': 'El campo "Cantidad Hijos" debe tener al menos 0 caracteres',
        'string.max': 'El campo "Cantidad Hijos" debe tener como máximo 2 caracteres'
      })
      .required(),

    estadoCivil: Joi.string().valid('Casado/a', 'Soltero/a', 'Viudo/a', 'Divorciado/a').messages({
      'any.only': 'El campo "Compañia Aseguradora" debe contener una CIA valida'
    }),

    activo: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Activo" es un campo booleano',
        'boolean.empty': 'El campo "Activo" debe tener un valor determinado'
      })
      .required(),

    cuentaBancaria: Joi.number()
      .min(9999)
      .max(999999999999)
      .messages({
        'string.base': 'El campo "Cuenta Bancaria" debe ser una cadena numerica',
        'string.empty': 'El campo "Cuenta Bancaria" es un campo requerido',
        'string.min': 'El campo "Cuenta Bancaria" debe tener al menos 4 caracteres',
        'string.max': 'El campo "Cuenta Bancaria" debe tener como máximo 12 caracteres'
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
    const controladorEdit = {
      tipo: data.tipo,
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      dni: data.dni,
      fechaNacimiento: data.fechaNacimiento,
      fechaContratacion: data.fechaContratacion,
      direccion: data.direccion,
      localidad: data.localidad,
      telefono: data.telefono,
      contrato: data.contrato,
      hsLaborales: data.hsLaborales,
      salario: data.salario,
      fechaActualizacionSalario: data.fechaActualizacionSalario,
      numeroSeguridadSocial: data.numeroSeguridadSocial,
      oficina: data.oficina,
      departamento: data.departamento,
      puesto: data.puesto,
      cantidadHijos: data.cantidadHijos,
      estadoCivil: data.estadoCivil,
      activo: data.activo,
      cuentaBancaria: data.cuentaBancaria,
      password: data.password
    };

    if (Object.values(errors).length === 0) {
      try {
        const responseSignUp = await dispatch(signUpControlador(controladorEdit));
        if (responseSignUp.type === 'SIGN_UP_SUCCESS') {
          setOpenModalSuccess(true);
          setTimeout(() => {}, 2000);
        }
        if (responseSignUp.type === 'SIGN_UP_ERROR') {
          setToastError(true);
          if (responseSignUp.payload.message.includes('auth')) {
            setMessageError('Correo electronico existente');
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
              message={'El controlador ha sido creado.'}
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
            <p className={styles.imgText}>CONTROLADOR</p>
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
                    <div className={styles.inputColumn}>
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
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.numeroSeguridadSocial?.message}
                          register={register}
                          nameTitle="N° Seguridad Social"
                          type="number"
                          nameInput="numeroSeguridadSocial"
                          styleInput="numberInput"
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
                        <DateInput
                          error={errors.fechaNacimiento?.message}
                          register={register}
                          nameTitle="Fecha Nacimiento"
                          type="date"
                          nameInput="fechaNacimiento"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <DateInput
                          error={errors.fechaContratacion?.message}
                          register={register}
                          nameTitle="Fecha Contratacion"
                          type="date"
                          nameInput="fechaContratacion"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.direccion?.message}
                          register={register}
                          nameTitle="Direccion"
                          type="text"
                          nameInput="direccion"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.localidad?.message}
                          register={register}
                          nameTitle="Localidad"
                          type="text"
                          nameInput="localidad"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.inputColumn}>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.telefono?.message}
                          register={register}
                          nameTitle="Telefono"
                          type="text"
                          nameInput="telefono"
                          styleInput="normalInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <OptionInput
                          data={contratoArray}
                          dataLabel="Conrato"
                          name="contrato"
                          register={register}
                          error={errors.contrato?.message}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.hsLaborales?.message}
                          register={register}
                          nameTitle="HsLaborales"
                          type="number"
                          nameInput="hsLaborales"
                          styleInput="numberInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.salario?.message}
                          register={register}
                          nameTitle="Salario"
                          type="number"
                          nameInput="salario"
                          styleInput="numberInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <DateInput
                          error={errors.fechaActualizacionSalario?.message}
                          register={register}
                          nameTitle="Fecha Actualizacion Salario"
                          type="date"
                          nameInput="fechaActualizacionSalario"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.inputColumn}>
                      <div className={styles.inputContainer}>
                        <OptionInput
                          data={oficinaArray}
                          dataLabel="Oficina"
                          name="oficina"
                          register={register}
                          error={errors.oficina?.message}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <OptionInput
                          data={departamentoArray}
                          dataLabel="Departamento"
                          name="departamento"
                          register={register}
                          error={errors.departamento?.message}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <OptionInput
                          data={puestoArray}
                          dataLabel="Puesto"
                          name="puesto"
                          register={register}
                          error={errors.puesto?.message}
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.cantidadHijos?.message}
                          register={register}
                          nameTitle="Cantidad Hijos"
                          type="number"
                          nameInput="cantidadHijos"
                          styleInput="numberInput"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <OptionInput
                          data={civilArray}
                          dataLabel="Estado Civil"
                          name="estadoCivil"
                          register={register}
                          error={errors.estadoCivil?.message}
                        />
                      </div>
                    </div>
                    <div className={styles.inputColumn}>
                      <div className={styles.inputContainer}>
                        <Checkbox
                          error={errors.activo?.message}
                          register={register}
                          nameTitle="Activo"
                          type="checkbox"
                          nameInput="activo"
                          required
                        />
                      </div>
                      <div className={styles.inputContainer}>
                        <Inputs
                          error={errors.cuentaBancaria?.message}
                          register={register}
                          nameTitle="Cuenta Bancaria"
                          type="number"
                          nameInput="cuentaBancaria"
                          styleInput="numberInput"
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
                    </div>
                  </div>
                </div>

                <div className={styles.buttonsGroup}>
                  <Button clickAction={() => {}} text="CREAR" testId="signup-btn" />
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

export default ControladorForm;
