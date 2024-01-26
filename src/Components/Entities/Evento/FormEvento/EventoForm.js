import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import FormTable from 'Components/Shared/formTable';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateEvento, postEvento, getAllEvento, deleteEvento } from 'redux/evento/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const EventosForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const eventos = useSelector((state) => state.evento.list);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [evento, setEvento] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const schema = Joi.object({
    visibilidadEntrevista: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad Entrevista" es un campo booleano',
        'boolean.empty': 'El campo "Visibilidad Entrevista" debe tener un valor determinado'
      })
      .required(),
    visibilidadInforme: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad Informe" es un campo booleano',
        'boolean.empty': 'El campo "Visibilidad Informe" debe tener un valor determinado'
      })
      .required(),
    tipo: Joi.string().valid('Acontesimiento', 'Sospecha').messages({
      'any.only': 'Seleccione una opción valida'
    }),
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
        'date.base': 'El campo "Fecha" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha" no puede permanecer vacio.'
      })
      .required(),
    descripcion: Joi.string()
      .min(3)
      .max(500)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El campo "Descripcion" debe ser una cadena de texto',
        'string.empty': 'El campo "Descripcion" es un campo requerido',
        'string.min': 'El campo "Descripcion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Descripcion" debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El campo "Descripcion" debe contener solo letras'
      })
      .required(),
    comprobar: Joi.string()
      .valid('A comprobar', 'Sin necesidad', 'Comprobado', 'No comprobado')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    comprobado: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobado" es un campo booleano',
        'boolean.empty': 'El campo "Comprobado" debe tener un valor determinado'
      })
      .required(),
    comprobable: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobable" es un campo booleano',
        'boolean.empty': 'El campo "Comprobable" debe tener un valor determinado'
      })
      .required(),
    resolucion: Joi.string()
      .min(3)
      .max(500)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El campo "Resolucion" debe ser una cadena de texto',
        'string.empty': 'El campo "Resolucion" es un campo requerido',
        'string.min': 'El campo "Resolucion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Resolucion" debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El campo "Resolucion" debe contener solo letras'
      })
      .required(),

    __v: Joi.any(),
    _id: Joi.any()
  });

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...evento }
  });

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const eventoConSiniestro = { ...evento, siniestro: data.id };
      const addEventoResponse = await postEvento(dispatch, eventoConSiniestro);
      if (addEventoResponse.type === 'POST_EVENTO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editEventoResponse = await updateEvento(dispatch, evento._id, evento);
      if (editEventoResponse.type === 'UPDATE_EVENTO_SUCCESS') {
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
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setEvento(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setEvento(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const arrayComprobar = ['A comprobar', 'Sin necesidad', 'Comprobado', 'No comprobado'];
  const arrayTipo = ['Acontesimiento', 'Sospecha'];

  const columnTitleArray = ['Nombre', 'Apellido', 'Telefono', 'Rol', 'Prioridad'];
  const columns = ['nombre', 'apellido', 'telefono', 'rol', 'prioridad'];

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      prioridad: false,
      relacion: '',
      titular: false,
      dni: '',
      domicilio: '',
      ciudad: '',
      telefono: '',
      email: '',
      pais: '',
      codigoPostal: '',
      cuit: '',
      entrevistado: false,
      ocupacion: '',
      direccionOcupacion: '',
      licenciaAportada: false,
      licenciaVencimiento: 'dd / mm / aaaa',
      licenciaHabilitada: false,
      licenciaCategoria: '',
      nombre: '',
      apellido: '',
      rol: 'Pick tipo',
      lesiones: 'Pick lesiones',
      fechaNacimiento: 'dd / mm / aaaa'
    };
    reset({ ...emptyData });
  };

  const deleteButton = deleteEvento;

  const tableClick = (index) => {
    const formattedData = {
      ...eventos[index],
      fechaNacimiento: formatDate(eventos[index].fechaNacimiento),
      licenciaVencimiento: formatDate(eventos[index].licenciaVencimiento)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const cancelForm = () => {
    if (createdEntity) {
      history.push({
        pathname: `/controlador/siniestros/entrevista/entrevistaroboevento/${createdEntity.rol}/${createdEntity.siniestro[0]}`,
        state: {
          params: { ...createdEntity, mode: 'edit', siniestroId: createdEntity.siniestro[0] }
        }
      });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    getAllEvento(dispatch, data.id);
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Update' : 'Add'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? '¿Estás seguro de que quieres actualizar este evento?'
                  : '¿Estás seguro de que quieres agregar este evento?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'Evento editado' : 'Evento agregado'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{data.id ? 'Evento' : 'Evento'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.visibilidadEntrevista?.message}
                  register={register}
                  nameTitle="Visibilidad Entrevista"
                  type="checkbox"
                  nameInput="visibilidadEntrevista"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.visibilidadInforme?.message}
                  register={register}
                  nameTitle="Visibilidad Informe"
                  type="checkbox"
                  nameInput="visibilidadInforme"
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
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <DateInput
                  error={errors.fecha?.message}
                  register={register}
                  nameTitle="Fecha"
                  type="date"
                  nameInput="fecha"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <DateInput
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
                  error={errors.descripcion?.message}
                  register={register}
                  nameTitle="Descripcion"
                  type="text"
                  nameInput="descripcion"
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayComprobar}
                  dataLabel="Comprobar"
                  name="comprobar"
                  register={register}
                  error={errors.comprobar?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.comprobado?.message}
                  register={register}
                  nameTitle="Comprobado"
                  type="checkbox"
                  nameInput="comprobado"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.comprobable?.message}
                  register={register}
                  nameTitle="Comprobable"
                  type="checkbox"
                  nameInput="comprobable"
                  required
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.resolucion?.message}
                  register={register}
                  nameTitle="Resolucion"
                  type="text"
                  nameInput="resolucion"
                />
              </div>
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={handleSubmit(onSubmit)} text={buttonType ? 'Editar' : 'Agregar'} />
            <Button clickAction={resetForm} text="Reiniciar" />
            <Button text="Cancelar" clickAction={cancelForm} />
          </div>
        </form>
        <div className={styles.rightTable}>
          <FormTable
            data={eventos}
            columnTitleArray={columnTitleArray}
            columns={columns}
            handleClick={tableClick}
            deleteButton={deleteButton}
          />
        </div>
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default EventosForm;
