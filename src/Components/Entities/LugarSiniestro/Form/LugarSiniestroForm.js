import React, { useState, useEffect } from 'react';
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
import FormTable from 'Components/Shared/formTable';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getAllLugarSiniestro,
  postLugarSiniestro,
  deleteLugarSiniestro,
  updateLugarSiniestro
} from 'redux/lugarSiniestro/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const LugarSiniestrosForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [lugarSiniestro, setLugarSiniestro] = useState();
  const [buttonType, setButtonType] = useState(false);
  const [methodType, setMethodType] = useState(false);

  const lugarSiniestros = useSelector((state) => state.lugarSiniestro.list);

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
  const columnTitleArray = [
    'Calle VA',
    'CalleVT',
    'Orientacion VA',
    'Orientacion VT',
    'Tipo VT',
    'Tipo VA',
    'Ciudad',
    'Provincia',
    'Prioridad'
  ];
  const columns = [
    'calleVa',
    'calleVt',
    'orientacionCalleVa',
    'orientacionCalleVt',
    'tipoCalleVt',
    'tipoCalleVa',
    'ciudad',
    'provincia',
    'prioridad'
  ];

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
    direccionCalleVa: Joi.string()
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

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      prioridad: false,
      calleVa: '',
      orientacionCalleVa: '',
      direccionCalleVa: '',
      estadoCalleVa: '',
      tipoCalleVa: '',
      badenCalleVa: false,
      semaforoCalleVa: false,
      cartelPareCalleVa: false,
      camaraCalleVa: false,
      calleVt: '',
      orientacionCalleVt: '',
      direccionCalleVt: '',
      estadoCalleVt: '',
      tipoCalleVt: '',
      badenCalleVt: false,
      semaforoCalleVt: false,
      cartelPareCalleVt: false,
      camaraCalleVt: false,
      calleAd: '',
      ciudad: '',
      provincia: '',
      descripcion: ''
    };
    reset({ ...emptyData });
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...lugarSiniestros }
  });

  const deleteButton = deleteLugarSiniestro;

  const tableClick = (index) => {
    const formattedData = {
      ...lugarSiniestros[index]
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const onConfirmFunction = async () => {
    if (!buttonType) {
      setMethodType(false);
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
    } else {
      setMethodType(true);
      const editLugarSiniestroResponse = await updateLugarSiniestro(
        dispatch,
        lugarSiniestro._id,
        lugarSiniestro
      );
      if (editLugarSiniestroResponse.type === 'UPDATE_LUGARSINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    if (buttonType) {
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

  useEffect(() => {
    getAllLugarSiniestro(dispatch, id);
  }, []);

  useEffect(() => {
    resetForm();
  }, [lugarSiniestros]);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Editar' : 'Agregar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? 'Esta seguro que quiere actualizar este lugar de siniestro?'
                  : 'Esta seguro que quiere añadir este lugar de siniestro?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={
                methodType ? 'Lugar de siniestro actualizado.' : 'Lugar de siniestro agregado.'
              }
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>LUGAR DE SINIESTRO</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.tableTop}>
          <div className={styles.tableContainer}>
            <FormTable
              data={lugarSiniestros}
              columnTitleArray={columnTitleArray}
              columns={columns}
              handleClick={tableClick}
              deleteButton={deleteButton}
            />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
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
                  dataLabel="Orientación VA"
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
            </div>
            <div className={styles.inputColumn}>
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
                  dataLabel="Orientación VT"
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
            </div>
            <div className={styles.inputColumnPad}>
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
              <div className={styles.inputContainerPad}>
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
            <div className={styles.inputColumnPad}>
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
              <div className={styles.inputContainerPad}>
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
            <div className={styles.inputColumnPad}>
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
              <div className={styles.inputContainerPad}>
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
                <TextArea
                  error={errors.descripcion?.message}
                  register={register}
                  nameTitle="Descripción"
                  type="text"
                  nameInput="descripcion"
                  styleInput="threeInputs"
                  required
                />
              </div>
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={handleSubmit(onSubmit)} text={buttonType ? 'Editar' : 'Agregar'} />
            <Button clickAction={resetForm} text={'Reiniciar'} />
            <Button text="Cancelar" clickAction={() => history.goBack()} />
          </div>
        </form>
      </div>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={'Error'} />}
    </div>
  );
};

export default LugarSiniestrosForm;
