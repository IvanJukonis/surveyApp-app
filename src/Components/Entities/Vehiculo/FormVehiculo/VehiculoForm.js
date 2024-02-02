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
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  updateVehiculo,
  postVehiculo,
  getAllVehiculos,
  deleteVehiculo
} from 'redux/vehiculo/thunks';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const VehiculosForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const vehiculos = useSelector((state) => state.vehiculo.list);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [vehiculo, setVehiculo] = useState({});
  const [buttonType, setButtonType] = useState(false);

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

  const columnTitleArray = ['Dominio', 'Modelo', 'Marca', 'Color', 'Rol', 'Tipo', 'Prioridad'];
  const columns = ['dominio', 'modelo', 'marca', 'color', 'rol', 'tipo', 'prioridad'];

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
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'El campo es requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 15 caracteres'
      })
      .required(),
    alarma: Joi.string()
      .valid('Con alarma (Activada)', 'Con alarma (Desactivada)', 'Sin alarma')
      .messages({
        'any.only': 'Selecciona una "Alarma" permitida'
      })
      .required(),
    cierreCentralizado: Joi.string()
      .valid('Con cierre (Activado)', 'Con cierre (Desactivado)', 'Sin cierre')
      .messages({
        'any.only': 'Selecciona un "Cierre Centralizado" permitido'
      })
      .required(),
    siniestro: Joi.any(),

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
    defaultValues: { ...vehiculo }
  });

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const vehiculoConSiniestro = { ...vehiculo, siniestro: data.id };
      const addVehiculoResponse = await postVehiculo(dispatch, vehiculoConSiniestro);
      if (addVehiculoResponse.type === 'POST_VEHICULO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editVehiculoResponse = await updateVehiculo(dispatch, vehiculo._id, vehiculo);
      if (editVehiculoResponse.type === 'UPDATE_VEHICULO_SUCCESS') {
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
        fechaAdquisicion: formatDate(data.fechaAdquisicion),
        fabricacion: formatDate(data.fabricacion)
      };
      setVehiculo(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaAdquisicion: formatDate(data.fechaAdquisicion),
        fabricacion: formatDate(data.fabricacion)
      };
      setVehiculo(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  console.log(errors);

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      rol: 'Pick rol',
      prioridad: '',
      dominio: '',
      marca: '',
      modelo: '',
      color: '',
      uso: 'Pick uso',
      fabricacion: 'dd / mm / aaaa',
      tipo: 'Pick tipo',
      fechaAdquisicion: 'dd / mm / aaaa',
      danos: 'Pick daños',
      descripcionDanos: '',
      alarma: 'Pick cierre',
      cierreCentralizado: 'Pick cierre'
    };
    reset({ ...emptyData });
  };

  const deleteButton = deleteVehiculo;

  const tableClick = (index) => {
    const formattedData = {
      ...vehiculos[index],
      fechaAdquisicion: formatDate(vehiculos[index].fechaAdquisicion)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const cancelForm = () => {
    if (createdEntity) {
      history.push({
        pathname: `/controlador/siniestros/entrevista/entrevistaroborueda/${createdEntity.rol}/${createdEntity.siniestro[0]}`,
        state: {
          params: { ...createdEntity, mode: 'edit', siniestroId: createdEntity.siniestro[0] }
        }
      });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    getAllVehiculos(dispatch, data.id);
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
                  ? 'Estas seguro que quieres editar este vehiculo?'
                  : 'Estas seguro que quieres agregar este vehiculo?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'Vehiculo editado' : 'Vehiculo agregado'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>VEHICULOS</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.tableTop}>
          <div className={styles.tableContainer}>
            <FormTable
              data={vehiculos}
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
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.dominio?.message}
                    register={register}
                    nameTitle="Dominio"
                    type="text"
                    nameInput="dominio"
                  />
                </div>
                <OptionInput
                  data={arrayRol}
                  dataLabel="Rol"
                  name="rol"
                  register={register}
                  error={errors.rol?.message}
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
            <div className={styles.inputColumn}>
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
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.marca?.message}
                  register={register}
                  nameTitle="Marca"
                  type="text"
                  nameInput="marca"
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
                <DateInput
                  error={errors.fabricacion?.message}
                  register={register}
                  nameTitle="Fabricacion"
                  type="date"
                  nameInput="fabricacion"
                  required
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
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
                  data={arrayAlarma}
                  dataLabel="Alarma"
                  name="alarma"
                  register={register}
                  error={errors.alarma?.message}
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
            </div>
            <div className={styles.inputColumn}>
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
                <TextArea
                  error={errors.descripcionDanos?.message}
                  register={register}
                  nameTitle="Descripción Daños"
                  type="text"
                  nameInput="descripcionDanos"
                  styleInput="small"
                  required
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
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default VehiculosForm;
