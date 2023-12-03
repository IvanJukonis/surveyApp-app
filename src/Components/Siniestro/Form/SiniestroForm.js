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
import { updateSiniestro, createSiniestro } from 'redux/siniestro/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';

const SiniestrosForm = () => {
  const dispatch = useDispatch();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [siniestro, setSiniestro] = useState({});
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

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
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El campo "Instrucciones" debe ser una cadena de texto',
        'string.empty': 'El campo "Instrucciones" es un campo requerido',
        'string.min': 'El campo "Instrucciones" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Instrucciones" debe tener como máximo 50 caracteres',
        'string.pattern.base': 'El campo "Instrucciones" debe contener solo letras'
      })
      .required(),

    denuncia: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El campo "Denuncia" debe ser una cadena de texto',
        'string.empty': 'El campo "Denuncia" es un campo requerido',
        'string.min': 'El campo "Denuncia" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Denuncia" debe tener como máximo 50 caracteres',
        'string.pattern.base': 'El campo "Denuncia" debe contener solo letras'
      })
      .required()
  });

  const siniestroUpdate = {
    numSiniestro: data.numSiniestro,
    numPoliza: data.numPoliza,
    numInforme: data.numInforme,
    fechaSiniestro: data.fechaSiniestro,
    fechaDenuncia: data.fechaDenuncia,
    fechaVencimiento: data.fechaVencimiento,
    fechaAsignacion: data.fechaAsignacion,
    hrSiniestro: data.hrSiniestro,
    cia: data.cia,
    tipo: data.tipo,
    presencial: data.presencial,
    instrucciones: data.instrucciones,
    denuncia: data.denuncia
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
      const addSiniestroResponse = await createSiniestro(dispatch, siniestro);
      if (addSiniestroResponse.type === 'ADD_SINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editSiniestroResponse = await updateSiniestro(dispatch, id, siniestro);
      console.log(editSiniestroResponse);
      if (editSiniestroResponse.type === 'UPDATE_SINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      console.log('aca');
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    setSiniestro(data);
    setModalAddConfirmOpen(true);
  };

  const tipoArray = ['Siniestro', 'Fraude', 'Completo'];

  const ciaArray = ['San Cristobal', 'Rio Uruguay', 'Sancor', 'La Segunda', 'Rivadavia'];

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
          <div className={styles.inputContainer}>
            <Inputs
              error={errors.numSiniestro?.message}
              register={register}
              nameTitle="N° Siniestro"
              type="number"
              nameInput="numSiniestro"
            />
          </div>
          <div className={styles.inputContainer}>
            <Inputs
              error={errors.numPoliza?.message}
              register={register}
              nameTitle="N° Poliza"
              type="number"
              nameInput="numPoliza"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <Inputs
              error={errors.numInforme?.message}
              register={register}
              nameTitle="N° Informe"
              type="number"
              nameInput="numInforme"
              required
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
              error={errors.fechaDenuncia?.message}
              register={register}
              nameTitle="Fecha Denuncia"
              type="date"
              nameInput="fechaDenuncia"
              required
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
              data={tipoArray}
              dataLabel="Tipo"
              name="tipo"
              register={register}
              error={errors.tipo?.message}
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
            <Inputs
              error={errors.instrucciones?.message}
              register={register}
              nameTitle="Instrucciones"
              type="text"
              nameInput="instrucciones"
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <Inputs
              error={errors.denuncia?.message}
              register={register}
              nameTitle="Denuncia"
              type="text"
              nameInput="denuncia"
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
        </section>
        <div className={styles.btnGroup}>
          <Button clickAction={() => {}} text={id ? 'Update' : 'Add'} />
          <Button clickAction={() => reset()} text="Reset" />
          <Button text="Cancel" clickAction={() => history.goBack()} />
        </div>
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="{isError.message}" />}
    </div>
  );
};

export default SiniestrosForm;
