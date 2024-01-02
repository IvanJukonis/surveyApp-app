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
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { postLugarSiniestro } from 'redux/lugarSiniestro/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const LugarSiniestrosForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [lugarSiniestro, setLugarSiniestro] = useState();

  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;

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
    orientacionCalleVa: Joi.string()
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
    orientacionCalleVt: Joi.string()
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

  const siniestroUpdate = {
    prioridad: data.prioridad,
    calleVa: data.calleVa,
    orientacionCalleVa: data.orientacionCalleVa,
    direcionCalleVa: data.direcionCalleVa,
    estadoCalleVa: data.estadoCalleVa,
    tipoCalleVa: data.tipoCalleVa,
    badenCalleVa: data.badenCalleVa,
    semaforoCalleVa: data.semaforoCalleVa,
    cartelPareCalleVa: data.cartelPareCalleVa,
    camaraCalleVa: data.camaraCalleVa,
    calleVt: data.calleVt,
    orientacionCalleVt: data.orientacionCalleVt,
    direccionCalleVt: data.direccionCalleVt,
    estadoCalleVt: data.estadoCalleVt,
    tipoCalleVt: data.tipoCalleVt,
    badenCalleVt: data.badenCalleVt,
    semaforoCalleVt: data.semaforoCalleVt,
    cartelPareCalleVt: data.cartelPareCalleVt,
    camaraCalleVt: data.camaraCalleVt,
    calleAd: data.calleAd,
    ciudad: data.ciudad,
    provincia: data.provincia,
    descripcion: data.descripcion
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...siniestroUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const lugarSiniestroConSiniestro = { ...lugarSiniestro, siniestro: id };
      const addLugarSiniestroResponse = await postLugarSiniestro(
        dispatch,
        lugarSiniestroConSiniestro
      );
      if (addLugarSiniestroResponse.type === 'POST_LUGARSINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return;
      }
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    if (id) {
      const formattedData = {
        ...data
      };
      setLugarSiniestro(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data
      };
      setLugarSiniestro(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const arrayOrientacion = [
    'SUR',
    'ESTE',
    'OESTE',
    'NORTE',
    'SUDOESTE',
    'NOROESTE',
    'NORESTE',
    'SUDESTE'
  ];
  const arrayEstado = ['Buen', 'Regular', 'Mal'];
  const arrayTipo = ['Asfalto', 'Tierra', 'Pavimento', 'Grava', 'Piedra'];

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
                  ? 'Esta seguro que quiere actualizar este lugar de siniestro?'
                  : 'Esta seguro que quiere añadir este lugar de siniestro?'
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
          <div className={styles.leftColumn}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.calleVa?.message}
                register={register}
                nameTitle="Calle VA"
                type="text"
                styleInput="normalInput"
                nameInput="calleVa"
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayOrientacion}
                dataLabel="Orientación"
                name="orientacionCalleVa"
                register={register}
                error={errors.orientacionCalleVa?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayOrientacion}
                dataLabel="Dirección VA"
                name="direccionCalleVa"
                register={register}
                error={errors.direccionCalleVa?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayEstado}
                dataLabel="Estado VA"
                name="estadoCalleVa"
                register={register}
                error={errors.estadoCalleVa?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayTipo}
                dataLabel="Tipo VA"
                name="tipoCalleVa"
                register={register}
                error={errors.tipoCalleVa?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.badenCalleVa?.message}
                register={register}
                nameTitle="Baden VA"
                type="checkbox"
                nameInput="badenCalleVa"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.semaforoCalleVa?.message}
                register={register}
                nameTitle="Semaforo Va"
                type="checkbox"
                nameInput="semaforoCalleVa"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.cartelPareCalleVa?.message}
                register={register}
                nameTitle="Cartel de Pare VA"
                type="checkbox"
                nameInput="cartelPareCalleVa"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.camaraCalleVa?.message}
                register={register}
                nameTitle="Camara VA"
                type="checkbox"
                nameInput="camaraCalleVa"
                required
              />
            </div>
          </div>
          <div className={styles.middleColumn}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.calleVt?.message}
                register={register}
                nameTitle="Calle VT"
                type="text"
                styleInput="normalInput"
                nameInput="calleVt"
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayOrientacion}
                dataLabel="Orientación"
                name="orientacionCalleVt"
                register={register}
                error={errors.orientacionCalleVt?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayOrientacion}
                dataLabel="Dirección VT"
                name="direccionCalleVt"
                register={register}
                error={errors.direccionCalleVt?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayEstado}
                dataLabel="Estado VT"
                name="estadoCalleVt"
                register={register}
                error={errors.estadoCalleVt?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayTipo}
                dataLabel="Tipo VT"
                name="tipoCalleVt"
                register={register}
                error={errors.tipoCalleVt?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.badenCalleVt?.message}
                register={register}
                nameTitle="Baden VT"
                type="checkbox"
                nameInput="badenCalleVt"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.semaforoCalleVt?.message}
                register={register}
                nameTitle="Semaforo VT"
                type="checkbox"
                nameInput="semaforoCalleVt"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.cartelPareCalleVt?.message}
                register={register}
                nameTitle="Cartel de Pare VT"
                type="checkbox"
                nameInput="cartelPareCalleVt"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.camaraCalleVt?.message}
                register={register}
                nameTitle="Camara VT"
                type="checkbox"
                nameInput="camaraCalleVt"
                required
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.prioridad?.message}
                register={register}
                nameTitle="Prioridad"
                type="checkbox"
                nameInput="prioridad"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.calleAd?.message}
                register={register}
                nameTitle="Calle Adicional"
                type="text"
                styleInput="normalInput"
                nameInput="calleAd"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.ciudad?.message}
                register={register}
                nameTitle="Ciudad"
                type="text"
                styleInput="normalInput"
                nameInput="ciudad"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.provincia?.message}
                register={register}
                nameTitle="Provincia"
                type="text"
                styleInput="normalInput"
                nameInput="provincia"
              />
            </div>
            <div className={styles.inputContainer}>
              <TextArea
                error={errors.descripcion?.message}
                register={register}
                nameTitle="Descripción"
                type="text"
                nameInput="descripcion"
                styleInput="medium"
                required
              />
            </div>
          </div>
        </section>
        <div className={styles.btnContainer}>
          <Button text="Cancelar" clickAction={() => history.goBack()} />
        </div>
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={'Error'} />}
    </div>
  );
};

export default LugarSiniestrosForm;
