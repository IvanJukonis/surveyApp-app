import React, { useState } from 'react';
import styles from './form.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateInvolved, createInvolved } from 'redux/involucrado/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const InvolvedsForm = () => {
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.involved.errorForm);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [involved, setInvolved] = useState({});
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

  const schema = Joi.object({
    nombre: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El nombre debe ser una cadena de texto',
        'string.empty': 'El nombre es un campo requerido',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El nombre debe contener solo letras'
      })
      .required(),

    apellido: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El apellido debe ser una cadena de texto',
        'string.empty': 'El apellido es un campo requerido',
        'string.min': 'El apellido debe tener al menos 3 caracteres',
        'string.max': 'El apellido debe tener como máximo 15 caracteres'
      })
      .required(),

    dni: Joi.number().min(10000000).max(99999999).integer().messages({
      'number.base': 'El DNI debe ser un número',
      'number.empty': 'El DNI es un campo requerido',
      'number.min': 'El DNI debe ser al menos 10,000,000',
      'number.max': 'El DNI debe ser como máximo 99,999,999',
      'number.integer': 'El DNI debe ser un número entero'
    }),

    telefono: Joi.string()
      .min(10)
      .messages({
        'string.base': 'El número de teléfono debe ser una cadena de texto',
        'string.empty': 'El número de teléfono es un campo requerido',
        'string.min': 'El número de teléfono debe tener al menos 10 dígitos'
      })
      .required(),

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'string.base': 'El correo electrónico debe ser una cadena de texto',
        'string.empty': 'El correo electrónico es un campo requerido',
        'string.email': 'El correo electrónico debe ser una dirección de correo válida',
        'string.minDomainSegments':
          'El correo electrónico debe tener al menos 2 segmentos de dominio',
        'string.tlds.allow':
          'El correo electrónico debe tener un dominio de nivel superior válido (com o net)'
      })
      .required(),

    ciudad: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'La ciudad debe ser una cadena de texto',
        'string.empty': 'La ciudad es un campo requerido',
        'string.min': 'La ciudad debe tener al menos 3 caracteres',
        'string.max': 'La ciudad debe tener como máximo 15 caracteres'
      })
      .required(),

    tipo: Joi.string()
      .valid('CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TERCERO', 'ABOG')
      .messages({
        'any.only': 'Los tipos solo pueden ser CVA, CVT, PVA, PVT, TTG, TERCERO, ABOG'
      })
      .required(),

    lesiones: Joi.string()
      .valid('Lesiones GRAVES', 'Lesiones LEVES', 'Lesiones REGULARES')
      .messages({
        'any.only':
          'Las lesiones solo pueden ser Lesiones GRAVES, Lesiones LEVES, Lesiones REGULARES'
      })
      .required(),

    fechaDeNacimiento: Joi.date()
      .messages({
        'date.base': 'La fecha de nacimiento debe ser una fecha válida',
        'date.empty': 'La fecha de nacimiento es un campo requerido'
      })
      .required(),

    direccion: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'La dirección debe ser una cadena de texto',
        'string.empty': 'La dirección es un campo requerido',
        'string.min': 'La dirección debe tener al menos 3 caracteres',
        'string.max': 'La dirección debe tener como máximo 15 caracteres',
        'string.pattern.base': 'La dirección debe contener solo letras'
      })
      .required(),

    pais: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El país debe ser una cadena de texto',
        'string.empty': 'El país es un campo requerido',
        'string.min': 'El país debe tener al menos 3 caracteres',
        'string.max': 'El país debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El país debe contener solo letras'
      })
      .required()
  });

  const involvedUpdate = {
    nombre: data.nombre,
    apellido: data.apellido,
    dni: data.dni,
    telefono: data.telefono,
    email: data.email,
    ciudad: data.ciudad,
    tipo: data.tipo,
    lesiones: data.lesiones,
    fechaDeNacimiento: data.fechaDeNacimiento,
    direccion: data.direccion,
    pais: data.pais
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...involvedUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const addInvolvedResponse = await dispatch(createInvolved(involved));
      if (addInvolvedResponse.type === 'ADD_INVOLVED_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editInvolvedResponse = await dispatch(updateInvolved(id, involved));
      if (editInvolvedResponse.type === 'EDIT_INVOLVED_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    setInvolved(data);
    setModalAddConfirmOpen(true);
  };

  const arrayTipos = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'ABOG', 'TERCERO'];

  const arrayLesiones = ['Lesiones LEVES', 'Lesiones REGULARES', 'Lesiones GRAVES'];

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={id ? 'Update' : 'Add'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                id
                  ? 'Are sure do you want update this involved?'
                  : 'Are sure do you want add this involved?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Involved edited' : 'Involved added'}
            />
          )}
        </div>
      }
      <h3 className={styles.title}>{id ? 'Edit Involved' : 'Add Involved'}</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.nombre?.message}
                register={register}
                nameTitle="Nombre"
                type="text"
                nameInput="nombre"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.apellido?.message}
                register={register}
                nameTitle="Apellido"
                type="text"
                nameInput="apellido"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.dni?.message}
                register={register}
                nameTitle="DNI"
                type="number"
                nameInput="dni"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.telefono?.message}
                register={register}
                nameTitle="Telefono"
                type="number"
                nameInput="telefono"
                required
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.email?.message}
                register={register}
                nameTitle="Email"
                type="email"
                nameInput="email"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.ciudad?.message}
                register={register}
                nameTitle="Ciudad"
                type="text"
                nameInput="ciudad"
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
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayTipos}
                dataLabel="Tipo"
                name="tipo"
                register={register}
                error={errors.tipo?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.fechaDeNacimiento?.message}
                register={register}
                nameTitle="FechaDeNacimiento"
                type="date"
                nameInput="fechaDeNacimiento"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayLesiones}
                dataLabel="Lesiones"
                name="lesiones"
                register={register}
                error={errors.lesiones?.message}
              />
            </div>
          </div>
        </section>

        <Button clickAction={() => {}} text={id ? 'Update' : 'Add'} />
        <Button clickAction={() => reset()} text="Reset" />
        <Button text="Cancelar" clickAction={() => history.goBack()} />
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={isError.message} />}
    </div>
  );
};

export default InvolvedsForm;
