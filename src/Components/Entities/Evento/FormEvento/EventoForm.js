import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import { ToastError, Button, OptionInput } from 'Components/Shared';
import FormTable from 'Components/Shared/formTable';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import Joi from 'joi';
import { getEventoSiniestro } from 'redux/evento/thunks';

const EventosForm = () => {
  const dispatch = useDispatch();
  const data = useParams();

  const [toastError, setToastErroOpen] = useState(false);
  const currentEvento = useSelector((state) => state.evento.list);

  const arrayTipo = ['Acontesimiento', 'Sospecha'];
  const arrayComprobar = ['A comprobar', 'Sin necesidad', 'Comprobado', 'No comprobado'];
  const arrayComprobable = [
    'Totalmente comprobable',
    'Comprobable',
    'Parcialmente comprobable',
    'No comprobable'
  ];
  const arrayPredisposicion = ['Buena', 'Media', 'Mala', 'Negacion'];
  const columnTitleArrayEvento = ['Fecha', 'Hora', 'Tipo', 'Comprobar', 'Comprobado'];
  const columnsEvento = ['fecha', 'hora', 'tipo', 'comprobar', 'comprobado'];

  const schema = Joi.object({
    visibilidadEntrevista: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad Entrevista" es un campo booleano',
        'boolean.empty': 'El campo "Prioridad" debe tener un valor determinado'
      })
      .required(),
    visibilidadInforme: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad Informe" es un campo booleano',
        'boolean.empty': 'El campo "Visibilidad Informe" debe tener un valor determinado'
      })
      .required(),
    tipo: Joi.string()
      .valid('Acontesimiento', 'Sospecha')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    fecha: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Fecha" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha" no puede permanecer vacio.'
      })
      .required(),
    hora: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Hora" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora" no puede permanecer vacio.'
      })
      .required(),
    descripcion: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 50 caracteres'
      })
      .required(),
    comprobar: Joi.string()
      .valid('A comprobar', 'Sin necesidad', 'Comprobado', 'No comprobado')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    comprobado: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobado" es un campo booleano',
        'boolean.empty': 'El campo "Comprobado" debe tener un valor determinado'
      })
      .required(),
    comprobable: Joi.string()
      .valid('Totalmente comprobable', 'Comprobable', 'Parcialmente comprobable', 'No comprobable')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    predisposicion: Joi.string()
      .valid('Buena', 'Media', 'Mala', 'Negacion')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    resolucion: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 50 caracteres'
      })
      .required(),
    siniestro: Joi.any(),
    evento: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any()
  });

  const {
    register: registerEvento,
    handleSubmit: handleSubmitEvento,
    reset: resetEvento,
    formState: { errors: errorsEvento }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const resetFormEvento = () => {
    const emptyData = {
      visibilidadEntrevista: false,
      visibilidadInforme: false,
      tipo: '',
      fecha: 'dd / mm / aaaa',
      hora: 'dd / mm / aaaa',
      descripcion: '',
      comprobar: '',
      comprobado: false,
      comprobable: '',
      predisposicion: '',
      resolucion: ''
    };
    resetEvento({ ...emptyData });
  };

  const tableClick = (index) => {
    const resetDataEvento = {
      ...currentEvento[index]
    };
    resetEvento({ ...resetDataEvento });
  };

  useEffect(() => {
    getEventoSiniestro(dispatch, data.id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>FORMULARIO EVENTOS</p>
      </div>
      <form className={styles.form} onSubmit={handleSubmitEvento()}>
        <div className={styles.formContainer}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <DateInput
                  error={errorsEvento.fecha?.message}
                  register={registerEvento}
                  nameTitle="Fecha"
                  type="date"
                  nameInput="fecha"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayComprobar}
                  dataLabel="Comprobar"
                  name="comprobar"
                  register={registerEvento}
                  error={errorsEvento.comprobar?.message}
                />
              </div>
              <div className={styles.inputContainerPredisposicion}>
                <OptionInput
                  data={arrayPredisposicion}
                  dataLabel="Predisposicion"
                  name="predisposicion"
                  register={registerEvento}
                  error={errorsEvento.predisposicion?.message}
                />
              </div>
              <div className={styles.inputContainerCheck}>
                <Checkbox
                  error={errorsEvento.visibilidadEntrevista?.message}
                  register={registerEvento}
                  nameTitle="Visibilidad Entrevista"
                  type="checkbox"
                  nameInput="visibilidadEntrevista"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errorsEvento.visibilidadInforme?.message}
                  register={registerEvento}
                  nameTitle="Visibilidad Informe"
                  type="checkbox"
                  nameInput="visibilidadInforme"
                  required
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <DateInput
                  error={errorsEvento.hora?.message}
                  register={registerEvento}
                  nameTitle="Hora"
                  type="date"
                  nameInput="hora"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayComprobable}
                  dataLabel="Comprobable"
                  name="comprobable"
                  register={registerEvento}
                  error={errorsEvento.comprobable?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errorsEvento.descripcion?.message}
                  register={registerEvento}
                  nameTitle="Descripcion"
                  type="text"
                  nameInput="descripcion"
                  styleInput="small"
                  required
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayTipo}
                  dataLabel="Tipo"
                  name="tipo"
                  register={registerEvento}
                  error={errorsEvento.tipo?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errorsEvento.comprobado?.message}
                  register={registerEvento}
                  nameTitle="Comprobado"
                  type="checkbox"
                  nameInput="comprobado"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errorsEvento.resolucion?.message}
                  register={registerEvento}
                  nameTitle="Resolucion"
                  type="text"
                  nameInput="resolucion"
                  styleInput="small"
                  required
                />
              </div>
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={resetFormEvento} text="Reiniciar" />
          </div>
        </div>
        <div className={styles.tableTop}>
          <div className={styles.tableContainerRueda}>
            <FormTable
              data={currentEvento}
              columnTitleArray={columnTitleArrayEvento}
              columns={columnsEvento}
              handleClick={tableClick}
              type={true}
            />
          </div>
        </div>
      </form>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default EventosForm;
