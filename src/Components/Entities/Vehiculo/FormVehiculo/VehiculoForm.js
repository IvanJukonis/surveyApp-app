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
import { updateVehiculo, postVehiculo } from 'redux/vehiculo/thunks';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import DateInput from 'Components/Shared/Inputs/DateInput';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const VehiculosForm = () => {
  const dispatch = useDispatch();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [vehiculo, setVehiculo] = useState({});
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

  const schema = Joi.object({
    rol: Joi.string()
      .valid('VA', 'VT', 'VT2', 'VT3', 'VAd')
      .messages({
        'any.only': 'Selecciona un "Rol" permitido'
      })
      .required(),

    prioridad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Prioridad" es un campo booleano',
        'boolean.empty': 'El campo "Prioridad" debe tener un valor determinado'
      })
      .required(),

    dominio: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "dominio" debe ser una cadena de texto',
        'string.empty': 'El campo "dominio" es un campo requerido',
        'string.min': 'El campo "dominio" debe tener al menos 3 caracteres',
        'string.max': 'El campo "dominio" debe tener como máximo 15 caracteres'
      })
      .required(),

    marca: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "marca" debe ser una cadena de texto',
        'string.empty': 'El campo "marca" es un campo requerido',
        'string.min': 'El campo "marca" debe tener al menos 3 caracteres',
        'string.max': 'El campo "marca" debe tener como máximo 15 caracteres'
      })
      .required(),

    modelo: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "modelo" debe ser una cadena de texto',
        'string.empty': 'El campo "modelo" es un campo requerido',
        'string.min': 'El campo "modelo" debe tener al menos 3 caracteres',
        'string.max': 'El campo "modelo" debe tener como máximo 15 caracteres'
      })
      .required(),

    color: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "color" debe ser una cadena de texto',
        'string.empty': 'El campo "color" es un campo requerido',
        'string.min': 'El campo "color" debe tener al menos 3 caracteres',
        'string.max': 'El campo "color" debe tener como máximo 15 caracteres'
      })
      .required(),

    uso: Joi.string()
      .valid('Particular', 'Profesional', 'Servicio', 'Otro')
      .messages({
        'any.only': 'Selecciona un "Uso" permitido'
      })
      .required(),

    fabricacion: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Fabricacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Fabricacion" no puede permanecer vacio.'
      })
      .required(),
    tipo: Joi.string()
      .valid('Automovil', 'Camioneta', 'Motocicleta', 'Bicicleta', 'Cuatrimoto', 'Camion', 'Otro')
      .messages({
        'any.only': 'Selecciona un "Tipo" permitido'
      })
      .required(),

    fechaAdquisicion: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Adquisición" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Adquisición" no puede permanecer vacio.'
      })
      .required(),
    danos: Joi.string()
      .valid('Graves', 'Leves', 'Medios', 'Sin Daños')
      .messages({
        'any.only': 'Selecciona un "Daño" permitido'
      })
      .required(),
    descripcionDanos: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "Descripcion Daños" debe ser una cadena de texto',
        'string.empty': 'El campo "Descripcion Daños" es un campo requerido',
        'string.min': 'El campo "Descripcion Daños" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Descripcion Daños" debe tener como máximo 15 caracteres'
      })
      .required(),
    alarma: Joi.string()
      .valid('Con alarma (Activada)', 'Con alarma (Desactivada)', 'Sin alarma')
      .messages({
        'any.only': 'Selecciona una "Alarma" permitido'
      })
      .required(),
    cierreCentralizado: Joi.string()
      .valid('Con cierre (Activado)', 'Con cierre (Desactivado)', 'Sin cierre')
      .messages({
        'any.only': 'Selecciona un "Cierre Centralizado" permitido'
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

  const vehiculoUpdate = {
    rol: data.rol,
    prioridad: data.prioridad,
    dominio: data.dominio,
    marca: data.marca,
    modelo: data.modelo,
    color: data.color,
    uso: data.uso,
    fabricacion: formatDate(data.fabricacion),
    tipo: data.tipo,
    fechaAdquisicion: formatDate(data.fechaAdquisicion),
    danos: data.danos,
    descripcionDanos: data.descripcionDanos,
    alarma: data.alarma,
    cierreCentralizado: data.cierreCentralizado
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...vehiculoUpdate }
  });

  const onConfirmFunction = async () => {
    if (!id) {
      const addVehiculoResponse = await dispatch(postVehiculo(vehiculo));
      if (addVehiculoResponse.type === 'ADD_VEHICULO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editVehiculoResponse = await dispatch(updateVehiculo(id, vehiculo));
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

  const arrayRol = ['VA', 'VT', 'VT2', 'VT3', 'VAd'];
  const arrayUso = ['Particular', 'Profesional', 'Servicio', 'Otro'];
  const arrayTipo = [
    'Automovil',
    'Camioneta',
    'Motocicleta',
    'Bicicleta',
    'Cuatrimoto',
    'Camion',
    'Otro'
  ];
  const arrayDanos = ['Graves', 'Leves', 'Medios', 'Sin Daños'];
  const arrayAlarma = ['Con alarma (Activada)', 'Con alarma (Desactivada)', 'Sin alarma'];
  const arrayCierre = ['Con cierre (Activado)', 'Con cierre (Desactivado)', 'Sin cierre'];

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
                  ? 'Are sure do you want update this vehiculo?'
                  : 'Are sure do you want add this vehiculo?'
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
              <OptionInput
                data={arrayRol}
                dataLabel="Rol"
                name="rol"
                register={register}
                error={errors.rol?.message}
              />
            </div>
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
                error={errors.dominio?.message}
                register={register}
                nameTitle="Dominio"
                type="text"
                nameInput="dominio"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.marca?.message}
                register={register}
                nameTitle="Marca"
                type="text"
                nameInput="marca"
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.modelo?.message}
                register={register}
                nameTitle="Modelo"
                type="text"
                nameInput="modelo"
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.color?.message}
                register={register}
                nameTitle="Color"
                type="text"
                nameInput="color"
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayUso}
                dataLabel="Uso"
                name="uso"
                register={register}
                error={errors.uso?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <DateInput
                error={errors.fabricacion?.message}
                register={register}
                nameTitle="Fabricacion"
                type="date"
                nameInput="fabricacion"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayTipo}
                dataLabel="Tipo"
                name="tipo"
                register={register}
                error={errors.tipo?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <DateInput
                error={errors.fechaAdquisicion?.message}
                register={register}
                nameTitle="Fecha de Adquisicion"
                type="date"
                nameInput="fechaAdquisicion"
                required
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayDanos}
                dataLabel="Daños"
                name="danos"
                register={register}
                error={errors.danos?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <Inputs
                error={errors.descripcionDanos?.message}
                register={register}
                nameTitle="Descripcion Daños"
                type="text"
                nameInput="descripcionDanos"
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayAlarma}
                dataLabel="Alarma"
                name="alarma"
                register={register}
                error={errors.alarma?.message}
              />
            </div>
            <div className={styles.inputContainer}>
              <OptionInput
                data={arrayCierre}
                dataLabel="Cierre Centralizado"
                name="cierreCentralizado"
                register={register}
                error={errors.cierreCentralizado?.message}
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
