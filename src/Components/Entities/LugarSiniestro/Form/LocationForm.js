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
import { updateLugarSiniestro, createLugarSiniestro } from 'redux/involucrado/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const LugarSiniestrosForm = () => {
  const dispatch = useDispatch();
  const isError = useSelector((state) => state.lugarSiniestro.errorForm);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [lugarSiniestro, setLugarSiniestro] = useState({});
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

  const schema = Joi.object({
    prioridad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Prioridad" es un campo booleano',
        'boolean.empty': 'El campo "Prioridad" debe tener un valor determinado'
      })
      .required(),
    calleVa: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'La calle debe ser una cadena de texto',
        'string.empty': 'La calle es un campo requerido',
        'string.min': 'La calle debe tener al menos 3 caracteres',
        'string.max': 'La calle debe tener como máximo 20 caracteres'
      })
      .required(),
    orientacionVa: Joi.string()
      .valid('SUR', 'ESTE', 'OESTE', 'NORTE', 'SUDOESTE', 'NOROESTE', 'NORESTE', 'SUDESTE')
      .messages({
        'any.only': 'Ingrese una orientacion permitida'
      })
      .required(),
    direcionCalleVa: Joi.string()
      .valid('SUR', 'ESTE', 'OESTE', 'NORTE', 'SUDOESTE', 'NOROESTE', 'NORESTE', 'SUDESTE')
      .messages({
        'any.only': 'Ingrese una direccion permitida'
      })
      .required(),
    estadoCalleVa: Joi.string()
      .valid('Buen', 'Regular', 'Mal')
      .messages({
        'any.only': 'Ingrese un estado permitido'
      })
      .required(),
    tipoCalleVa: Joi.string()
      .valid('Asfalto', 'Tierra', 'Pavimento', 'Grava', 'Piedra')
      .messages({
        'any.only': 'Ingrese un tipo permitido'
      })
      .required(),
    badenCalleVa: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Baden" es un campo booleano',
        'boolean.empty': 'El campo "Baden" debe tener un valor determinado'
      })
      .required(),
    semaforoCalleVa: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Semaforo" es un campo booleano',
        'boolean.empty': 'El campo "Semaforo" debe tener un valor determinado'
      })
      .required(),
    cartelPareCalleVa: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Cartel" es un campo booleano',
        'boolean.empty': 'El campo "Cartel" debe tener un valor determinado'
      })
      .required(),
    camaraCalleVa: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Camara" es un campo booleano',
        'boolean.empty': 'El campo "Camara" debe tener un valor determinado'
      })
      .required(),
    calleVt: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'La calle debe ser una cadena de texto',
        'string.empty': 'La calle es un campo requerido',
        'string.min': 'La calle debe tener al menos 3 caracteres',
        'string.max': 'La calle debe tener como máximo 15 caracteres'
      })
      .required(),
    orientacionVt: Joi.string()
      .valid('SUR', 'ESTE', 'OESTE', 'NORTE', 'SUDOESTE', 'NOROESTE', 'NORESTE', 'SUDESTE')
      .messages({
        'any.only': 'Ingrese una orientación permitida'
      })
      .required(),
    direccionCalleVt: Joi.string()
      .valid('SUR', 'ESTE', 'OESTE', 'NORTE', 'SUDOESTE', 'NOROESTE', 'NORESTE', 'SUDESTE')
      .messages({
        'any.only': 'Ingrese una direccion permitida'
      })
      .required(),
    estadoCalleVt: Joi.string()
      .valid('Buen', 'Regular', 'Mal')
      .messages({
        'any.only': 'Ingrese un estado permitido'
      })
      .required(),
    tipoCalleVt: Joi.string()
      .valid('Asfalto', 'Tierra', 'Pavimento', 'Grava', 'Piedra')
      .messages({
        'any.only': 'Ingrese un tipo permitido'
      })
      .required(),
    badenCalleVt: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Baden" es un campo booleano',
        'boolean.empty': 'El campo "Baden" debe tener un valor determinado'
      })
      .required(),
    semaforoCalleVt: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Semaforo" es un campo booleano',
        'boolean.empty': 'El campo "Semaforo" debe tener un valor determinado'
      })
      .required(),
    cartelPareCalleVt: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Cartel" es un campo booleano',
        'boolean.empty': 'El campo "Cartel" debe tener un valor determinado'
      })
      .required(),
    camaraCalleVt: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Camara" es un campo booleano',
        'boolean.empty': 'El campo "Camara" debe tener un valor determinado'
      })
      .required(),
    calleAd: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'La calle debe ser una cadena de texto',
        'string.empty': 'La calle es un campo requerido',
        'string.min': 'La calle debe tener al menos 3 caracteres',
        'string.max': 'La calle debe tener como máximo 20 caracteres'
      })
      .required(),
    ciudad: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'La ciudad debe ser una cadena de texto',
        'string.empty': 'La ciudad es un campo requerido',
        'string.min': 'La ciudad debe tener al menos 3 caracteres',
        'string.max': 'La ciudad debe tener como máximo 20 caracteres'
      })
      .required(),
    provincia: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'La provincia debe ser una cadena de texto',
        'string.empty': 'La provincia es un campo requerido',
        'string.min': 'La provincia debe tener al menos 3 caracteres',
        'string.max': 'La provincia debe tener como máximo 20 caracteres'
      })
      .required(),
    descripcion: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'La descripción debe ser una cadena de texto',
        'string.empty': 'La descripción es un campo requerido',
        'string.min': 'La descripción debe tener al menos 3 caracteres',
        'string.max': 'La descripción debe tener como máximo 20 caracteres'
      })
      .required(),

    siniestro: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any()
  });

  const lugarSiniestroUpdate = {
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
    defaultValues: { ...lugarSiniestroUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const addLugarSiniestroResponse = await dispatch(createLugarSiniestro(lugarSiniestro));
      if (addLugarSiniestroResponse.type === 'POST_LUGARSINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editLugarSiniestroResponse = await dispatch(updateLugarSiniestro(id, lugarSiniestro));
      if (editLugarSiniestroResponse.type === 'UPDATE_LUGARSINIESTRO_SUCCESS') {
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
    setLugarSiniestro(data);
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
                  ? 'Are sure do you want update this lugarSiniestro?'
                  : 'Are sure do you want add this lugarSiniestro?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'LugarSiniestro edited' : 'LugarSiniestro added'}
            />
          )}
        </div>
      }
      <h3 className={styles.title}>{id ? 'Edit LugarSiniestro' : 'Add LugarSiniestro'}</h3>
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
        <Button text="Cancel" clickAction={() => history.goBack()} />
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={isError.message} />}
    </div>
  );
};

export default LugarSiniestrosForm;
