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
import {
  updateInspeccionSiniestro,
  postInspeccionSiniestro,
  getAllInspeccionSiniestro,
  deleteInspeccionSiniestro
} from 'redux/inspeccionSiniestro/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const InspeccionSiniestrosForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const inspeccionSiniestros = useSelector((state) => state.inspeccionSiniestro.list);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [inspeccionSiniestro, setInspeccionSiniestro] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const schema = Joi.object({
    fotos: Joi.string()
      .valid('Se toman fotografias del VH', 'No se toman fotografias del VH')
      .messages({
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
        'date.base': 'El campo "Hora" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora" no puede permanecer vacio.'
      })
      .required(),
    permisos: Joi.string()
      .valid('Inspeccion permitida', 'Inspeccion no permitida', 'Inspeccion dificultada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    programada: Joi.string().valid('Inspeccion programada', 'Inspeccion no programada').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    daños: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Daños" debe ser una cadena de texto',
        'string.empty': 'El campo "Daños" es un campo requerido',
        'string.min': 'El campo "Daños" debe tener al menos 3 caracteres'
      })
      .required(),
    tipoDaños: Joi.string().valid('Daños graves', 'Daños leves', 'Daños medios').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    descripcionDaños: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Descripción Daños" debe ser una cadena de texto',
        'string.empty': 'El campo "Descripción Daños" es un campo requerido',
        'string.min': 'El campo "Descripción Daños" debe tener al menos 3 caracteres'
      })
      .required(),
    numChasis: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Numero chasis" debe ser una cadena de texto',
        'string.empty': 'El campo "Numero chasis" es un campo requerido',
        'string.min': 'El campo "Numero chasis" debe tener al menos 3 caracteres'
      })
      .required(),
    reparacion: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Reparacion" es un campo booleano',
        'boolean.empty': 'El campo "Reparacion" debe tener un valor determinado'
      })
      .required(),
    coincidenciaDaños: Joi.string()
      .valid('Coincidentes', 'No coincidentes', 'Con inconsistencias')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    conclusion: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Conclusion" debe ser una cadena de texto',
        'string.empty': 'El campo "Conclusion" es un campo requerido',
        'string.min': 'El campo "Conclusion" debe tener al menos 3 caracteres'
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
    defaultValues: { ...inspeccionSiniestro }
  });

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const inspeccionSiniestroConSiniestro = { ...inspeccionSiniestro, siniestro: data.id };
      const addInspeccionSiniestroResponse = await postInspeccionSiniestro(
        dispatch,
        inspeccionSiniestroConSiniestro
      );
      if (addInspeccionSiniestroResponse.type === 'POST_INSPECCIONSINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editInspeccionSiniestroResponse = await updateInspeccionSiniestro(
        dispatch,
        inspeccionSiniestro._id,
        inspeccionSiniestro
      );
      if (editInspeccionSiniestroResponse.type === 'UPDATE_INSPECCIONSINIESTRO_SUCCESS') {
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
      setInspeccionSiniestro(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setInspeccionSiniestro(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const arrayFotos = ['Se toman fotografias del VH', 'No se toman fotografias del VH'];
  const arrayPermisos = [
    'Inspeccion permitida',
    'Inspeccion no permitida',
    'Inspeccion dificultada'
  ];
  const arrayProgramada = ['Inspeccion programada', 'Inspeccion no programada'];
  const arrayTipoDaños = ['Daños graves', 'Daños leves', 'Daños medios'];
  const arrayCoincidenciaDaños = ['Coincidentes', 'No coincidentes', 'Con inconsistencias'];
  const columnTitleArray = ['Nombre', 'Apellido', 'Telefono', 'Rol', 'Prioridad'];
  const columns = ['nombre', 'apellido', 'telefono', 'rol', 'prioridad'];

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      fecha: 'dd / mm / aaaa',
      hora: 'dd / mm / aaaa',
      fotos: 'Pick foto',
      permiso: 'Pick permiso',
      programada: 'Pick programada',
      daños: '',
      tipoDaños: 'Pick tipo daño',
      descripcionDaños: '',
      numChasis: '',
      reparacion: '',
      coincidenciaDaños: 'Pick coincidencia',
      conclusion: ''
    };
    reset({ ...emptyData });
  };

  const deleteButton = deleteInspeccionSiniestro;

  const tableClick = (index) => {
    const formattedData = {
      ...inspeccionSiniestros[index],
      fechaNacimiento: formatDate(inspeccionSiniestros[index].fechaNacimiento),
      licenciaVencimiento: formatDate(inspeccionSiniestros[index].licenciaVencimiento)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const cancelForm = () => {
    if (createdEntity) {
      history.push({
        pathname: `/controlador/siniestros/entrevista/entrevistaroboinspeccionSiniestro/${createdEntity.rol}/${createdEntity.siniestro[0]}`,
        state: {
          params: { ...createdEntity, mode: 'edit', siniestroId: createdEntity.siniestro[0] }
        }
      });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    getAllInspeccionSiniestro(dispatch, data.id);
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
                  ? '¿Estás seguro de que quieres actualizar este inspeccionSiniestro?'
                  : '¿Estás seguro de que quieres agregar este inspeccionSiniestro?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'InspeccionSiniestro editado' : 'InspeccionSiniestro agregado'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{data.id ? 'InspeccionSiniestro' : 'InspeccionSiniestro'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayFotos}
                  dataLabel="Fotos"
                  name="fotos"
                  register={register}
                  error={errors.fotos?.message}
                />
              </div>
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
                <OptionInput
                  data={arrayPermisos}
                  dataLabel="Permisos"
                  name="permisos"
                  register={register}
                  error={errors.permisos?.message}
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayProgramada}
                  dataLabel="Programada"
                  name="programada"
                  register={register}
                  error={errors.programada?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.daños?.message}
                  register={register}
                  nameTitle="Daños"
                  type="text"
                  nameInput="daños"
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayTipoDaños}
                  dataLabel="Tipo Daños"
                  name="tipoDaños"
                  register={register}
                  error={errors.tipoDaños?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.descripcionDaños?.message}
                  register={register}
                  nameTitle="Descripcion Daños"
                  type="text"
                  nameInput="descripcionDaños"
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.numChasis?.message}
                  register={register}
                  nameTitle="Chasis"
                  type="text"
                  nameInput="numChasis"
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.reparacion?.message}
                  register={register}
                  nameTitle="Reparacion"
                  type="checkbox"
                  nameInput="reparacion"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayCoincidenciaDaños}
                  dataLabel="Coincidencia Daños"
                  name="coincidenciaDaños"
                  register={register}
                  error={errors.coincidenciaDaños?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.conclusion?.message}
                  register={register}
                  nameTitle="Conclusion"
                  type="text"
                  nameInput="conclusion"
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
            data={inspeccionSiniestros}
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

export default InspeccionSiniestrosForm;
