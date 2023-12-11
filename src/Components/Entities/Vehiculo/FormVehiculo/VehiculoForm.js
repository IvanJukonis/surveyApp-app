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
import { updateVehiculo, postVehiculo } from 'redux/novedad/thunks';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const VehiculosForm = () => {
  const dispatch = useDispatch();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [novedad, setVehiculo] = useState({});
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

  const schema = Joi.object({
    fecha: Joi.date()
      .messages({
        'date.base': 'El campo "fecha" debe ser una fecha válida',
        'date.empty': 'El campo "fecha" es un campo requerido'
      })
      .required(),

    hora: Joi.date()
      .messages({
        'date.base': 'El campo "hora" de nacimiento debe ser una fecha válida',
        'date.empty': 'El campo "hora" de nacimiento es un campo requerido'
      })
      .required(),

    titulo: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "titulo" debe ser una cadena de texto',
        'string.empty': 'El campo "titulo" es un campo requerido',
        'string.min': 'El campo "titulo" debe tener al menos 3 caracteres',
        'string.max': 'El campo "titulo" debe tener como máximo 15 caracteres'
      })
      .required(),

    tipo: Joi.string()
      .valid('Consulta', 'Notificacion', 'Aviso', 'Respuesta')
      .messages({
        'any.only': 'Selecciona un "Tipo" permitido'
      })
      .required(),

    relacion: Joi.string()
      .valid('CVA', 'LUGAR', 'CVT', 'PVT', 'PVA', 'TVT', 'TVA', 'VA', 'VT')
      .messages({
        'any.only': 'Selecciona una "Relacion" permitida'
      })
      .required(),

    descripcion: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "descripcion" debe ser una cadena de texto',
        'string.empty': 'El campo "descripcion" es un campo requerido',
        'string.min': 'El campo "descripcion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "descripcion" debe tener como máximo 15 caracteres'
      })
      .required(),

    visibilidad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Presencial" es un campo booleano',
        'boolean.empty': 'El campo "Presencial" debe tener un valor determinado'
      })
      .required(),

    respuesta: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Presencial" es un campo booleano',
        'boolean.empty': 'El campo "Presencial" debe tener un valor determinado'
      })
      .required()
  });

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const novedadUpdate = {
    fecha: formatDate(data.fecha),
    hora: formatDate(data.hora),
    titulo: data.titulo,
    tipo: data.tipo,
    relacion: data.relacion,
    descripcion: data.descripcion,
    visibilidad: data.visibilidad,
    respuesta: data.respuesta
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...novedadUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const addVehiculoResponse = await dispatch(postVehiculo(novedad));
      if (addVehiculoResponse.type === 'ADD_VEHICULO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editVehiculoResponse = await dispatch(updateVehiculo(id, novedad));
      if (editVehiculoResponse.type === 'EDIT_VEHICULO_SUCCESS') {
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
    setVehiculo(data);
    setModalAddConfirmOpen(true);
  };

  const arrayTipos = ['CVA', 'LUGAR', 'CVT', 'PVT', 'PVA', 'TVT', 'TVA', 'VA', 'VT'];

  const arrayRelaciones = ['Consulta', 'Notificacion', 'Aviso', 'Respuesta'];

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
                  ? 'Are sure do you want update this novedad?'
                  : 'Are sure do you want add this novedad?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Vehiculo edited' : 'Vehiculo added'}
            />
          )}
        </div>
      }
      <h3 className={styles.title}>{id ? 'Edit Vehiculo' : 'Add Vehiculo'}</h3>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.inputGroups}>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.fecha?.message}
                register={register}
                nameTitle="Fecha"
                type="date"
                nameInput="fecha"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.hora?.message}
                register={register}
                nameTitle="Hora"
                type="date"
                nameInput="hora"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.titulo?.message}
                register={register}
                nameTitle="Titulo"
                type="text"
                nameInput="titulo"
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
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayRelaciones}
                dataLabel="Relacion"
                name="relacion"
                register={register}
                error={errors.relacion?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.descripcion?.message}
                register={register}
                nameTitle="Descripcion"
                type="text"
                nameInput="descripcion"
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.visibilidad?.message}
                register={register}
                nameTitle="Visibilidad"
                type="checkbox"
                nameInput="visibilidad"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <Checkbox
                error={errors.respuesta?.message}
                register={register}
                nameTitle="Respuesta"
                type="checkbox"
                nameInput="respuesta"
                required
              />
            </div>
          </div>
        </section>

        <Button clickAction={() => {}} text={id ? 'Update' : 'Add'} />
        <Button clickAction={() => reset()} text="Reset" />
        <Button text="Cancel" clickAction={() => history.goBack()} />
      </form>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default VehiculosForm;
