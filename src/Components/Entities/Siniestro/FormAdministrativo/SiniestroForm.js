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
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateSiniestro, postSiniestro, getSiniestro } from 'redux/siniestro/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import { getControlador } from 'redux/controlador/thunks';
import { getRelevador } from 'redux/relevador/thunks';
import { getConsultor } from 'redux/consultor/thunks';

const SiniestrosForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [siniestro, setSiniestro] = useState({});
  const relevador = useSelector((state) => state.relevador.list);
  const controlador = useSelector((state) => state.controlador.list);
  const consultor = useSelector((state) => state.consultor.list);
  const location = useLocation();
  const history = useHistory();
  let data;
  if (location.state.params) {
    data = location.state.params;
  }

  const schema = Joi.object({
    numSiniestro: Joi.number()
      .max(9999999999999)
      .integer()
      .messages({
        'number.base': 'El campo "Número de Siniestro" debe ser un número.',
        'number.max': 'El campo "Número de Siniestro" debe ser como máximo 9.999.999.999.999.',
        'number.integer': 'El campo "Número de Siniestro" debe ser un número entero.',
        'number.empty': 'El campo "Número de Siniestro" no puede permanecer vacio.'
      })
      .required(),

    numPoliza: Joi.number()
      .max(9999999999999)
      .integer()
      .messages({
        'number.base': 'El campo "Numero de Poliza" debe ser un número.',
        'number.max': 'El campo "Numero de Poliza" debe ser como máximo 9.999.999.999.999.',
        'number.integer': 'El campo "Numero de Poliza" debe ser un número entero.',
        'number.empty': 'El campo "Numero de Poliza" no puede permanecer vacio.'
      })
      .required(),

    numInforme: Joi.number()
      .max(99999)
      .integer()
      .messages({
        'number.base': 'El campo "Numero de Informe" debe ser un número.',
        'number.empty': 'El campo "Numero de Informe" no puede permanecer vacio.',
        'number.max': 'El campo "Numero de Informe" debe ser como máximo 99.999.',
        'number.integer': 'El campo "Numero de Informe" debe ser un número entero.'
      })
      .required(),

    fechaSiniestro: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Siniestro" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Siniestro" no puede permanecer vacio.'
      })
      .required(),

    fechaDenuncia: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Denuncia" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Denuncia" no puede permanecer vacio.'
      })
      .required(),

    fechaVencimiento: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Vencimiento" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Vencimiento" no puede permanecer vacio.'
      })
      .required(),

    fechaAsignacion: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Asignacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Asignacion" no puede permanecer vacio.'
      })
      .required(),

    hrSiniestro: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Siniestro" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Siniestro" no puede permanecer vacio.'
      })
      .required(),

    cia: Joi.string()
      .valid('San Cristobal', 'Rio Uruguay', 'Sancor', 'La Segunda', 'Rivadavia')
      .messages({
        'any.only': 'El campo "Compañia Aseguradora" debe contener una CIA valida'
      }),

    tipo: Joi.string().valid('Siniestro', 'Fraude', 'Completo').messages({
      'any.only': 'El campo "Tipo" debe contener un tipo de siniestro valido'
    }),

    presencial: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Presencial" es un campo booleano',
        'boolean.empty': 'El campo "Presencial" debe tener un valor determinado'
      })
      .required(),

    instrucciones: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Instrucciones" debe ser una cadena de texto',
        'string.empty': 'El campo "Instrucciones" es un campo requerido',
        'string.min': 'El campo "Instrucciones" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Instrucciones" debe tener como máximo 500 caracteres'
      })
      .required(),

    denuncia: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Denuncia" debe ser una cadena de texto',
        'string.empty': 'El campo "Denuncia" es un campo requerido',
        'string.min': 'El campo "Denuncia" debe tener al menos 3 caracteres'
      })
      .required(),

    relevador: Joi.any(),

    controlador: Joi.any(),

    consultor: Joi.any(),

    requerido: Joi.string()
      .valid(
        'Relevamiento completo',
        'Relevamiento sin cierre',
        'Investigacion de fraude',
        'Relevamiento y comprobacion',
        'Relevamiento y comprobacion, sin cierre'
      )
      .messages({
        'any.only': 'El campo "Requerido" debe contener un requerimiento valido'
      }),

    comisaria: Joi.string().min(3).max(50).messages({
      'string.base': 'El campo "Comisaria" debe ser una cadena de texto',
      'string.empty': 'El campo "Comisaria" es un campo requerido',
      'string.min': 'El campo "Comisaria" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Comisaria" debe tener como máximo 50 caracteres'
    }),

    lugar: Joi.string().min(3).max(50).messages({
      'string.base': 'El campo "Lugar" debe ser una cadena de texto',
      'string.empty': 'El campo "Lugar" es un campo requerido',
      'string.min': 'El campo "Lugar" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Lugar" debe tener como máximo 50 caracteres'
    }),
    conclusionDescripcion: Joi.any,
    conclusionLesiones: Joi.any,
    conclusionDaños: Joi.any,
    conclusionResponsabilidad: Joi.any,
    conclusionCredibilidad: Joi.any,
    conclusionRecomendacion: Joi.any,
    estado: Joi.any,
    autorizacion: Joi.any,
    fechaFinalizacion: Joi.string().allow(''),
    fechaContactoAsegurado: Joi.string().allow(''),
    fechaContactoTercero: Joi.string().allow('')
  });

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const siniestroUpdate = {
    numSiniestro: data.numSiniestro,
    numPoliza: data.numPoliza,
    numInforme: data.numInforme,
    fechaSiniestro: formatDate(data.fechaSiniestro),
    fechaDenuncia: formatDate(data.fechaDenuncia),
    fechaVencimiento: formatDate(data.fechaVencimiento),
    fechaAsignacion: formatDate(data.fechaAsignacion),
    hrSiniestro: formatDate(data.hrSiniestro),
    cia: data.cia,
    tipo: data.tipo,
    presencial: data.presencial,
    instrucciones: data.instrucciones,
    denuncia: data.denuncia,
    relevador: data.relevador,
    controlador: data.controlador,
    consultor: data.consultor,
    requerido: data.requerido,
    comisaria: data.comisaria,
    lugar: data.lugar
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...siniestroUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const addSiniestroResponse = await postSiniestro(dispatch, siniestro);
      if (addSiniestroResponse.type === 'POST_SINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editSiniestroResponse = await updateSiniestro(dispatch, id, siniestro);
      if (editSiniestroResponse.type === 'UPDATE_SINIESTRO_SUCCESS') {
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
    if (data.controlador === '' && data.relevador === '') {
      // eslint-disable-next-line no-unused-vars
      const { controlador, relevador, ...formattedData } = data;
      formattedData.estado = 'Sin asignar';
      setSiniestro(formattedData);
    } else if (data.controlador === '') {
      // eslint-disable-next-line no-unused-vars
      const { controlador, ...formattedData } = data;
      formattedData.estado = 'Sin asignar';
      setSiniestro(formattedData);
    } else if (data.relevador === '') {
      // eslint-disable-next-line no-unused-vars
      const { relevador, ...formattedData } = data;
      formattedData.estado = 'Asignado';
      setSiniestro(formattedData);
    } else {
      const formattedData = {
        ...data,
        estado: 'Inactivo'
      };
      setSiniestro(formattedData);
    }
    setModalAddConfirmOpen(true);
  };

  const tipoArray = ['Siniestro', 'Fraude', 'Completo'];
  const ciaArray = ['San Cristobal', 'Rio Uruguay', 'Sancor', 'La Segunda', 'Rivadavia'];
  const requeridoArray = [
    'Relevamiento completo',
    'Relevamiento sin cierre',
    'Investigacion de fraude',
    'Relevamiento y comprobacion',
    'Relevamiento y comprobacion, sin cierre'
  ];

  useEffect(() => {
    getControlador(dispatch);
    getRelevador(dispatch);
    getSiniestro(dispatch);
    getConsultor(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={id ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                id
                  ? 'Esta seguro que quiere actualizar este siniestro?'
                  : 'Esta seguro que quiere añadir este siniestro?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Siniestro modificado.' : 'Siniestro agregado.'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>FORMULARIO SINIESTRO</p>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <section className={styles.inputGroups}>
              <div className={styles.firstGroup}>
                <div className={styles.firstGroupColumn}>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.numSiniestro?.message}
                      register={register}
                      nameTitle="N° Siniestro"
                      type="number"
                      nameInput="numSiniestro"
                      styleInput="normalInput"
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={ciaArray}
                      dataLabel="CIA"
                      name="cia"
                      register={register}
                      error={errors.cia?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaSiniestro?.message}
                      register={register}
                      nameTitle="Fecha Siniestro"
                      type="date"
                      nameInput="fechaSiniestro"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.hrSiniestro?.message}
                      register={register}
                      nameTitle="Hora Siniestro"
                      type="date"
                      nameInput="hrSiniestro"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={consultor}
                      dataLabel="Consultor"
                      name="consultor"
                      register={register}
                      error={errors.consultor?.message}
                    />
                  </div>
                </div>
                <div className={styles.firstGroupColumn}>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.numPoliza?.message}
                      register={register}
                      nameTitle="N° Poliza"
                      type="number"
                      nameInput="numPoliza"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={controlador}
                      dataLabel="Controlador"
                      name="controlador"
                      register={register}
                      error={errors.controlador?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaDenuncia?.message}
                      register={register}
                      nameTitle="Fecha Denuncia"
                      type="date"
                      nameInput="fechaDenuncia"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={requeridoArray}
                      dataLabel="Requerido"
                      name="requerido"
                      register={register}
                      error={errors.requerido?.message}
                    />
                  </div>
                </div>
                <div className={styles.firstGroupColumn}>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.numInforme?.message}
                      register={register}
                      nameTitle="N° Informe"
                      type="number"
                      nameInput="numInforme"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={relevador}
                      dataLabel="Relevador"
                      name="relevador"
                      register={register}
                      error={errors.relevador?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaVencimiento?.message}
                      register={register}
                      nameTitle="Fecha Vencimiento"
                      type="date"
                      nameInput="fechaVencimiento"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.comisaria?.message}
                      register={register}
                      nameTitle="Comisaria"
                      type="text"
                      nameInput="comisaria"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                </div>
                <div className={styles.firstGroupColumn}>
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
                    <DateInput
                      error={errors.fechaAsignacion?.message}
                      register={register}
                      nameTitle="Fecha Asignacion"
                      type="date"
                      nameInput="fechaAsignacion"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.lugar?.message}
                      register={register}
                      nameTitle="Lugar"
                      type="text"
                      nameInput="lugar"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      register={register}
                      nameTitle="Presencial"
                      type="checkbox"
                      nameInput="presencial"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.thirdGroup}>
                <div className={`${styles.inputContainer} ${styles.textAreaSpace}`}>
                  <TextArea
                    error={errors.instrucciones?.message}
                    register={register}
                    nameTitle="Instrucciones"
                    type="text"
                    nameInput="instrucciones"
                    styleInput="big"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextArea
                    error={errors.denuncia?.message}
                    register={register}
                    nameTitle="Denuncia"
                    type="text"
                    nameInput="denuncia"
                    styleInput="big"
                    required
                  />
                </div>
              </div>
            </section>
            <div className={styles.btnGroup}>
              <Button clickAction={() => {}} text={id ? 'Actualizar' : 'Agregar'} />
              <Button clickAction={() => reset()} text="Reiniciar" />
              <Button text="Cancelar" clickAction={() => history.goBack()} />
            </div>
          </div>
        </form>
      </div>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="{isError.message}" />}
    </div>
  );
};

export default SiniestrosForm;
