import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastError } from 'Components/Shared';
import styles from './Perfil.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { Inputs, OptionInput, Button } from 'Components/Shared';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess/index';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import ModalConfirm from 'Components/Shared/Modals/ModalConfirm/index';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getFirebaseUidFromToken } from '../../../../Config/firebase-config';
import 'firebase/compat/auth';
import { getRelevador, updateRelevador } from 'redux/relevador/thunks';

function Perfil() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState('');
  const [relevador, setRelevador] = useState({});
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [toastErroOpen, setToastErroOpen] = useState(false);

  const relevadors = useSelector((state) => state.relevador.list);
  const userRelevador = relevadors.find((user) => user.email === userCurrent);

  const tipoArray = ['Relevador', 'Relevador', 'Relevador', 'Consultor'];
  const contratoArray = ['Termino Fijo', 'Termino Indefinido', 'Termino Temporal', 'Labor'];
  const oficinaArray = ['Rosario', 'Vgg', 'San Lorenzo'];
  const departamentoArray = ['Administracion', 'Produccion', 'Marketing', 'RRHH'];
  const puestoArray = ['Gerente', 'Empleado'];
  const civilArray = ['Casado/a', 'Soltero/a', 'Viudo/a', 'Divorciado/a'];

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const schema = Joi.object({
    tipo: Joi.string().valid('Relevador', 'Relevador', 'Relevador', 'Consultor').messages({
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
    _id: Joi.any(),
    firebaseUid: Joi.any(),
    any: Joi.any(),
    __v: Joi.any()
  });

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...userRelevador }
  });

  console.log(errors);

  const resetForm = () => {
    if (userRelevador?.tipo) {
      const admData = {
        tipo: userRelevador.tipo,
        nombre: userRelevador.nombre,
        apellido: userRelevador.apellido,
        dni: userRelevador.dni,
        fechaNacimiento: userRelevador.fechaNacimiento,
        fechaContratacion: userRelevador.fechaContratacion,
        direccion: userRelevador.direccion,
        localidad: userRelevador.localidad,
        telefono: userRelevador.telefono,
        contrato: userRelevador.contrato,
        hsLaborales: userRelevador.hsLaborales,
        salario: userRelevador.salario,
        email: userRelevador.email,
        fechaActualizacionSalario: userRelevador.fechaActualizacionSalario,
        numeroSeguridadSocial: userRelevador.numeroSeguridadSocial,
        oficina: userRelevador.oficina,
        any: userRelevador.any,
        departamento: userRelevador.departamento,
        puesto: userRelevador.puesto,
        cantidadHijos: userRelevador.cantidadHijos,
        estadoCivil: userRelevador.estadoCivil,
        activo: userRelevador.activo,
        cuentaBancaria: userRelevador.cuentaBancaria
      };
      reset({ ...admData });
    }
  };

  const onConfirmFunction = async () => {
    const editRelevadorResponse = await updateRelevador(dispatch, userRelevador._id, relevador);
    if (editRelevadorResponse.type === 'UPDATE_RELEVADOR_SUCCESS') {
      setToastErroOpen(false);
      setModalSuccessOpen(true);
      return setTimeout(() => {}, 1000);
    }
    return setToastErroOpen(true);
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      fechaNacimiento: formatDate(data.fechaNacimiento),
      fechaActualizacionSalario: formatDate(data.fechaActualizacionSalario)
    };
    setRelevador(formattedData);
    setModalAddConfirmOpen(true);
  };

  useEffect(() => {
    getRelevador(dispatch);
    currentUser();
  }, []);

  useEffect(() => {
    resetForm();
  }, [userRelevador]);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={'Editar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={'Esta seguro que quiere editar tu perfil?'}
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={'Perfil actualizado.'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>PERFIL DE USUARIO</p>
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
                      isDisabled={true}
                      data={tipoArray}
                      dataLabel="Tipo"
                      name="tipo"
                      register={register}
                      error={errors.tipo?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      isDisabled={true}
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
                      isDisabled={true}
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
                      isDisabled={true}
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
                      isDisabled={true}
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
                      isDisabled={true}
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
                      isDisabled={true}
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
                      isDisabled={true}
                      data={contratoArray}
                      dataLabel="Conrato"
                      name="contrato"
                      register={register}
                      error={errors.contrato?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      isDisabled={true}
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
                      isDisabled={true}
                      error={errors.salario?.message}
                      register={register}
                      nameTitle="Salario"
                      type="number"
                      nameInput="salario"
                      styleInput="numberInput"
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      isDisabled={true}
                      data={oficinaArray}
                      dataLabel="Oficina"
                      name="oficina"
                      register={register}
                      error={errors.oficina?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      isDisabled={true}
                      data={departamentoArray}
                      dataLabel="Departamento"
                      name="departamento"
                      register={register}
                      error={errors.departamento?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      isDisabled={true}
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
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      isDisabled={true}
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
                    <OptionInput
                      data={civilArray}
                      dataLabel="Estado Civil"
                      name="estadoCivil"
                      register={register}
                      error={errors.estadoCivil?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      isDisabled={true}
                      error={errors.fechaActualizacionSalario?.message}
                      register={register}
                      nameTitle="Fecha Actualizacion Salario"
                      type="date"
                      nameInput="fechaActualizacionSalario"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonsGroup}>
              <Button clickAction={() => {}} text="ACTUALIZAR" testId="signup-btn" />
              <Button
                text="Cancelar"
                clickAction={() => history.goBack()}
                testId="signup-cancel-btn"
              />
            </div>
          </div>
        </form>
      </div>
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in databaseee" />
      )}
    </div>
  );
}
export default Perfil;
