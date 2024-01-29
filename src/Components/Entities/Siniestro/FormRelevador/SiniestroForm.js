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

const SiniestrosForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [siniestro, setSiniestro] = useState();
  const siniestros = useSelector((state) => state.siniestro.list);
  const relevador = useSelector((state) => state.relevador.list);
  const controlador = useSelector((state) => state.controlador.list);
  const siniestroActual = siniestros.find((item) => item._id === id);
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;

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

    relevador: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().hex().length(24).required()).min(1),
        Joi.string().hex().length(24).required(),
        Joi.string()
      )
      .required()
      .messages({
        'any.only': 'Please select a relevador',
        'any.required': 'Please select a relevador',
        'array.min': 'Please select at least one relevador'
      }),

    controlador: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().hex().length(24).required()).min(1),
        Joi.string().hex().length(24).required(),
        Joi.string()
      )
      .required()
      .messages({
        'any.only': 'Please select a controlador',
        'any.required': 'Please select a controlador',
        'array.min': 'Please select at least one controlador'
      }),

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

    conclusionDescripcion: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Conclusion descripcion" debe ser una cadena de texto',
      'string.empty': 'El campo "Conclusion descripcion" es un campo requerido',
      'string.min': 'El campo "Conclusion descripcion" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Conclusion descripcion" debe tener como máximo 500 caracteres'
    }),

    conclusionLesiones: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Conclusion lesiones" debe ser una cadena de texto',
      'string.empty': 'El campo "Conclusion lesiones" es un campo requerido',
      'string.min': 'El campo "Conclusion lesiones" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Conclusion lesiones" debe tener como máximo 500 caracteres'
    }),

    conclusionDaños: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Conclusion daños" debe ser una cadena de texto',
      'string.empty': 'El campo "Conclusion daños" es un campo requerido',
      'string.min': 'El campo "Conclusion daños" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Conclusion daños" debe tener como máximo 500 caracteres'
    }),

    conclusionResponsabilidad: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Conclusion responsabilidad" debe ser una cadena de texto',
      'string.empty': 'El campo "Conclusion responsabilidad" es un campo requerido',
      'string.min': 'El campo "Conclusion responsabilidad" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Conclusion responsabilidad" debe tener como máximo 500 caracteres'
    }),

    conclusionCredibilidad: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Conclusion credibilidad" debe ser una cadena de texto',
      'string.empty': 'El campo "Conclusion credibilidad" es un campo requerido',
      'string.min': 'El campo "Conclusion credibilidad" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Conclusion credibilidad" debe tener como máximo 500 caracteres'
    }),

    conclusionRecomendacion: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Conclusion recomendacion" debe ser una cadena de texto',
      'string.empty': 'El campo "Conclusion recomendacion" es un campo requerido',
      'string.min': 'El campo "Conclusion recomendacion" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Conclusion recomendacion" debe tener como máximo 500 caracteres'
    }),

    estado: Joi.string()
      .valid('Sin asignar', 'Asignado', 'Activo', 'Finalizado', 'Controlado', 'Completado')
      .messages({
        'any.only': 'El campo "Estado" debe contener un estado valido'
      }),

    autorizacion: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Autorizacion" debe ser una cadena de texto',
      'string.empty': 'El campo "Autorizacion" es un campo requerido',
      'string.min': 'El campo "Autorizacion" debe tener al menos 3 caracteres',
      'string.max': 'El campo "Autorizacion" debe tener como máximo 500 caracteres'
    }),

    fechaFinalizacion: Joi.date().messages({
      'date.base': 'El campo "Fecha de Finalizacion" debe ser una fecha valida.',
      'date.empty': 'El campo "Fecha de Finalizacion" no puede permanecer vacio.'
    }),

    fechaContactoAsegurado: Joi.date().messages({
      'date.base': 'El campo "Fecha de Contacto Asegurado" debe ser una fecha valida.',
      'date.empty': 'El campo "Fecha de Contacto Asegurado" no puede permanecer vacio.'
    }),

    fechaContactoTercero: Joi.date().messages({
      'date.base': 'El campo "Fecha de Contacto Tercero" debe ser una fecha valida.',
      'date.empty': 'El campo "Fecha de  Contacto Tercero" no puede permanecer vacio.'
    })
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
    requerido: data.requerido,
    comisaria: data.comisaria,
    lugar: data.lugar
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
    setSiniestro(data);
    setModalAddConfirmOpen(true);
  };

  const tipoArray = ['Siniestro', 'Fraude', 'Completo'];
  const ciaArray = ['San Cristobal', 'Rio Uruguay', 'Sancor', 'La Segunda', 'Rivadavia'];
  const estadoArray = [
    'Sin asignar',
    'Asignado',
    'Activo',
    'Finalizado',
    'Controlado',
    'Completado'
  ];
  const requeridoArray = [
    'Relevamiento completo',
    'Relevamiento sin cierre',
    'Investigacion de fraude',
    'Relevamiento y comprobacion',
    'Relevamiento y comprobacion, sin cierre'
  ];

  const getPathPrefix = () => {
    if (relevadorPath) {
      return '/relevador';
    }
    if (controladorPath) {
      return '/controlador';
    }
    return '/administrativo';
  };

  const handleInvolucrado = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/involucrado/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleVehiculo = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/vehiculo/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleNovedad = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/novedad/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleLugarO = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/LugarSiniestro/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleLugarR = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/LugarRoboRueda/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleInspeccionO = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/inspeccionSiniestro/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleInspeccionR = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/inspeccionRoboRueda/form/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const handleEntrevista = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/entrevista/${siniestroActual._id}`, {
      params: { ...siniestroActual, mode: 'create' }
    });
  };

  const relevadorPath = /\/relevador\/siniestro/.test(location.pathname);
  const controladorPath = /\/controlador\/siniestro/.test(location.pathname);

  useEffect(() => {
    getControlador(dispatch);
    getRelevador(dispatch);
    getSiniestro(dispatch);
  }, []);

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
                  ? 'Esta seguro que quiere actualizar este siniestro?'
                  : 'Esta seguro que quiere añadir este siniestro?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Siniestro edited' : 'Siniestro added'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{id ? 'Editar Siniestro' : 'Agregar Siniestro'}</h3>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                  error={errors.presencial?.message}
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
                styleInput="medium"
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
          <div className={styles.entitiesButtons}>
            <Button clickAction={handleInvolucrado} text="Involucrados" />
            <Button clickAction={handleNovedad} text="Novedades" />
            <Button clickAction={handleVehiculo} text="Vehiculos" />
            <Button clickAction={handleEntrevista} text="Entrevista" />
            <Button clickAction={handleLugarO} text="LugarO" />
            <Button clickAction={handleLugarR} text="LugarR" />
            <Button clickAction={handleInspeccionO} text="InspeccionO" />
            <Button clickAction={handleInspeccionR} text="InspeccionR" />
          </div>
          <div className={styles.textAreasGroup}>
            <div className={`${styles.textAreaColumn} ${styles.textAreaSpace}`}>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.conclusionDescripcion?.message}
                  register={register}
                  nameTitle="Conclusion Descripcion"
                  type="text"
                  styleInput="big"
                  nameInput="conclusionDescripcion"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.conclusionCredibilidad?.message}
                  register={register}
                  nameTitle="Conclusion Credibilidad"
                  type="text"
                  styleInput="big"
                  nameInput="conclusionCredibilidad"
                  required
                />
              </div>
            </div>
            <div className={styles.textAreaColumn}>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.conclusionResponsabilidad?.message}
                  register={register}
                  nameTitle="Conclusion Responsabilidad"
                  type="text"
                  styleInput="small"
                  nameInput="conclusionResponsabilidad"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.conclusionRecomendacion?.message}
                  register={register}
                  nameTitle="Conclusion Recomendacion"
                  type="text"
                  styleInput="small"
                  nameInput="conclusionRecomendacion"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.autorizacion?.message}
                  register={register}
                  nameTitle="Autorizacion"
                  type="text"
                  styleInput="small"
                  nameInput="autorizacion"
                  required
                />
              </div>
            </div>
            <div className={styles.textAreaColumn}>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.conclusionLesiones?.message}
                  register={register}
                  nameTitle="Conclusion Lesiones"
                  type="text"
                  styleInput="small"
                  nameInput="conclusionLesiones"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.conclusionDaños?.message}
                  register={register}
                  nameTitle="Conclusion Daños"
                  type="text"
                  styleInput="small"
                  nameInput="conclusionDaños"
                  required
                />
              </div>
              <div className={styles.inputContainerEstado}>
                <OptionInput
                  data={estadoArray}
                  dataLabel="Estado"
                  name="estado"
                  register={register}
                  error={errors.estado?.message}
                />
              </div>
            </div>
          </div>
          <div className={styles.eightGroup}></div>
          <div className={styles.nineGroup}>
            <div className={styles.inputContainer}>
              <DateInput
                error={errors.fechaFinalizacion?.message}
                register={register}
                nameTitle="Fecha Finalizacion"
                type="date"
                nameInput="fechaFinalizacion"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <DateInput
                error={errors.fechaContactoAsegurado?.message}
                register={register}
                nameTitle="Fecha Contacto Asegurado"
                type="date"
                nameInput="fechaContactoAsegurado"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <DateInput
                error={errors.fechaContactoTercero?.message}
                register={register}
                nameTitle="Fecha Contacto Tercero"
                type="date"
                nameInput="fechaContactoTercero"
                required
              />
            </div>
          </div>
        </section>
        <div className={styles.btnGroup}>
          <Button clickAction={() => {}} text={id ? 'Actualizar' : 'Agregar'} />
          <Button text="Cancelar" clickAction={() => history.goBack()} />
        </div>
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="{isError.message}" />}
    </div>
  );
};

export default SiniestrosForm;
