import React, { useEffect, useState } from 'react';
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
import { updateVehiculo, postVehiculo, getAllVehiculos } from 'redux/vehiculo/thunks';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const VehiculosForm = () => {
  const dispatch = useDispatch();
  const vehiculos = useSelector((state) => state.vehiculo.list);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [vehiculo, setVehiculo] = useState({});
  const [buttonType, setButtonType] = useState(false);
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
        'any.only': 'Selecciona una "Alarma" permitida'
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
      const vehiculoConSiniestro = { ...vehiculo, siniestro: id };
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
  const columnTitleArray = ['Rol', 'Modelo', 'Dominio', 'Marca', 'Prioridad'];
  const columns = ['rol', 'modelo', 'dominio', 'marca', 'prioridad'];

  const ifNotArrayNotObject = (item, itemContent) => {
    if (typeof item[itemContent] !== 'object' && !Array.isArray(item[itemContent])) {
      if (itemContent === 'firstName') {
        return (
          <span>
            {item?.firstName} {item?.lastName}
          </span>
        );
      } else {
        return item[itemContent];
      }
    }
  };

  const ifNotExist = (item) => {
    if (item?.length === 0) {
      return <span>This element Was Deleted. Edit to add</span>;
    }
  };

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

  const tableClick = (datosFila) => {
    const formattedData = {
      ...datosFila,
      fechaAdquisicion: formatDate(data.fechaAdquisicion)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  useEffect(() => {
    getAllVehiculos(dispatch, id);
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
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{id ? 'Vehiculo' : 'Vehiculo'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
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
                  error={errors.color?.message}
                  register={register}
                  nameTitle="Color"
                  type="text"
                  nameInput="color"
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
                  data={arrayDanos}
                  dataLabel="Daños"
                  name="danos"
                  register={register}
                  error={errors.danos?.message}
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
                  error={errors.marca?.message}
                  register={register}
                  nameTitle="Marca"
                  type="text"
                  nameInput="marca"
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
                  error={errors.fechaAdquisicion?.message}
                  register={register}
                  nameTitle="Fecha de Adquisicion"
                  type="date"
                  nameInput="fechaAdquisicion"
                  required
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
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={() => {}} text={buttonType ? 'Editar' : 'Agregar'} />
            <Button clickAction={resetForm} text="Reiniciar" />
            <Button text="Cancelar" clickAction={() => history.goBack()} />
          </div>
        </form>
        <div className={styles.rightTable}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableContent}>
                {columnTitleArray.map((column, index) => (
                  <th key={index}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((row, index) => {
                const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                return (
                  <tr
                    onClick={() => {
                      tableClick(row);
                    }}
                    className={rowClass}
                    key={index}
                  >
                    {columns.map((column, columnIndex) => (
                      <td key={columnIndex}>
                        {column.startsWith('fecha') ? (
                          formatDate(row[column])
                        ) : (
                          <>
                            {ifNotArrayNotObject(row, column)}
                            {ifNotExist(row[column])}
                          </>
                        )}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default VehiculosForm;
