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
import { getAllNovedad, updateNovedad, postNovedad } from 'redux/novedad/thunks';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const NovedadesForm = () => {
  const dispatch = useDispatch();
  const novedades = useSelector((state) => state.novedad.list);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [novedad, setNovedad] = useState({});
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
      const addNovedadResponse = await dispatch(postNovedad(novedad));
      if (addNovedadResponse.type === 'ADD_NOVEDAD_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editNovedadResponse = await dispatch(updateNovedad(id, novedad));
      if (editNovedadResponse.type === 'EDIT_NOVEDAD_SUCCESS') {
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
    setNovedad(data);
    setModalAddConfirmOpen(true);
  };

  const arrayTipos = ['CVA', 'LUGAR', 'CVT', 'PVT', 'PVA', 'TVT', 'TVA', 'VA', 'VT'];

  const arrayRelaciones = ['Consulta', 'Notificacion', 'Aviso', 'Respuesta'];

  const columnTitleArray = ['Fecha', 'Titulo', 'Tipo', 'Relacion'];
  const columns = ['fecha', 'titulo', 'tipo', 'relacion'];

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

  useEffect(() => {
    getAllNovedad(dispatch);
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
                  ? 'Are sure do you want update this novedad?'
                  : 'Are sure do you want add this novedad?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={id ? 'Novedad edited' : 'Novedad added'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{id ? 'Novedad' : 'Novedad'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.leftGroup}>
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
            <div className={styles.rightGroup}>
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
          <div className={styles.btnContainer}>
            <Button clickAction={() => {}} text={id ? 'Update' : 'Add'} />
            <Button clickAction={() => reset()} text="Reset" />
            <Button text="Cancel" clickAction={() => history.goBack()} />
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
              {novedades.map((row, index) => {
                const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                return (
                  <tr className={rowClass} key={index}>
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

export default NovedadesForm;
