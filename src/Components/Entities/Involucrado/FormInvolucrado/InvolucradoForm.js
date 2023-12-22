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
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/DateInput';
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateInvolucrado, postInvolucrado, getAllInvolucrado } from 'redux/involucrado/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const InvolucradosForm = () => {
  const dispatch = useDispatch();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const involucrados = useSelector((state) => state.involucrado.list);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [involucrado, setInvolucrado] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const { id } = useParams();

  const schema = Joi.object({
    prioridad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Prioridad" es un campo booleano',
        'boolean.empty': 'El campo "Prioridad" debe tener un valor determinado'
      })
      .required(),
    rol: Joi.string()
      .valid('CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC')
      .messages({
        'any.only': 'Ingrese un rol permitido'
      })
      .required(),
    apellido: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El apellido debe ser una cadena de texto',
        'string.empty': 'El apellido es un campo requerido',
        'string.min': 'El apellido debe tener al menos 3 caracteres',
        'string.max': 'El apellido debe tener como máximo 15 caracteres'
      })
      .required(),
    nombre: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El nombre debe ser una cadena de texto',
        'string.empty': 'El nombre es un campo requerido',
        'string.min': 'El nombre debe tener al menos 3 caracteres',
        'string.max': 'El nombre debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El nombre debe contener solo letras'
      })
      .required(),
    relacion: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El campo "Relacion" debe ser una cadena de texto',
        'string.empty': 'El campo "Relacion" es un campo requerido',
        'string.min': 'El campo "Relacion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Relacion" debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El campo "Relacion" debe contener solo letras'
      })
      .required(),
    titular: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Titular" es un campo booleano',
        'boolean.empty': 'El campo "Titular" debe tener un valor determinado'
      })
      .required(),
    dni: Joi.number().min(10000000).max(99999999).integer().messages({
      'number.base': 'El DNI debe ser un número',
      'number.empty': 'El DNI es un campo requerido',
      'number.min': 'El DNI debe ser al menos 10,000,000',
      'number.max': 'El DNI debe ser como máximo 99,999,999',
      'number.integer': 'El DNI debe ser un número entero'
    }),
    fechaDeNacimiento: Joi.date()
      .messages({
        'date.base': 'La fecha de nacimiento debe ser una fecha válida',
        'date.empty': 'La fecha de nacimiento es un campo requerido'
      })
      .required(),
    domicilio: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El campo "Domicilio" debe ser una cadena de texto',
        'string.empty': 'El campo "Domicilio" es un campo requerido',
        'string.min': 'El campo "Domicilio" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Domicilio" debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El campo "Domicilio" debe contener solo letras'
      })
      .required(),
    ciudad: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'La ciudad debe ser una cadena de texto',
        'string.empty': 'La ciudad es un campo requerido',
        'string.min': 'La ciudad debe tener al menos 3 caracteres',
        'string.max': 'La ciudad debe tener como máximo 15 caracteres'
      })
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'string.base': 'El correo electrónico debe ser una cadena de texto',
        'string.empty': 'El correo electrónico es un campo requerido',
        'string.email': 'El correo electrónico debe ser una dirección de correo válida',
        'string.minDomainSegments':
          'El correo electrónico debe tener al menos 2 segmentos de dominio',
        'string.tlds.allow':
          'El correo electrónico debe tener un dominio de nivel superior válido (com o net)'
      })
      .required(),
    pais: Joi.string()
      .min(3)
      .max(15)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El país debe ser una cadena de texto',
        'string.empty': 'El país es un campo requerido',
        'string.min': 'El país debe tener al menos 3 caracteres',
        'string.max': 'El país debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El país debe contener solo letras'
      })
      .required(),
    codigoPostal: Joi.string()
      .min(4)
      .messages({
        'string.base': 'El número de codigo postal debe ser una cadena de texto',
        'string.empty': 'El número de codigo postal es un campo requerido',
        'string.min': 'El número de codigo postal debe tener al menos 4 dígitos'
      })
      .required(),
    telefono: Joi.string()
      .min(10)
      .messages({
        'string.base': 'El número de teléfono debe ser una cadena de texto',
        'string.empty': 'El número de teléfono es un campo requerido',
        'string.min': 'El número de teléfono debe tener al menos 10 dígitos'
      })
      .required(),
    cuit: Joi.string()
      .min(10)
      .messages({
        'string.base': 'El número de CUIT debe ser una cadena de texto',
        'string.empty': 'El número de CUIT es un campo requerido',
        'string.min': 'El número de CUIT debe tener al menos 10 dígitos'
      })
      .required(),
    lesiones: Joi.string()
      .valid('Lesiones GRAVES', 'Lesiones LEVES', 'Lesiones REGULARES')
      .messages({
        'any.only':
          'Las lesiones solo pueden ser Lesiones GRAVES, Lesiones LEVES, Lesiones REGULARES'
      })
      .required(),
    entrevistado: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Entrevistado" es un campo booleano',
        'boolean.empty': 'El campo "Entrevistado" debe tener un valor determinado'
      })
      .required(),
    ocupacion: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "Ocupacion" debe ser una cadena de texto',
        'string.empty': 'El campo "Ocupacion" es un campo requerido',
        'string.min': 'El campo "Ocupacion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Ocupacion" debe tener como máximo 15 caracteres'
      })
      .required(),
    direccionOcupacion: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "Direccion Ocupacion" debe ser una cadena de texto',
        'string.empty': 'El campo "Direccion Ocupacion" es un campo requerido',
        'string.min': 'El campo "Direccion Ocupacion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Direccion Ocupacion" debe tener como máximo 15 caracteres'
      })
      .required(),
    licenciaAportada: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Licencia Aportada" es un campo booleano',
        'boolean.empty': 'El campo "Licencia Aportada" debe tener un valor determinado'
      })
      .required(),
    licenciaVencimiento: Joi.date()
      .messages({
        'date.base': 'El campo "Licencia Vencimiento" debe ser una fecha válida',
        'date.empty': 'El campo "Licencia Vencimiento" es un campo requerido'
      })
      .required(),
    licenciaHabilitada: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Licencia Habilitada" es un campo booleano',
        'boolean.empty': 'El campo "Licencia Habilitada" debe tener un valor determinado'
      })
      .required(),
    licenciaCategoria: Joi.string()
      .valid('A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3', 'D1', 'D2', 'D3', 'D4', 'E1')
      .messages({
        'any.only': 'Ingrese una categoria permitida'
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
    defaultValues: { ...involucrado }
  });

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const involucradoConSiniestro = { ...involucrado, siniestro: id };
      const addInvolucradoResponse = await postInvolucrado(dispatch, involucradoConSiniestro);
      if (addInvolucradoResponse.type === 'POST_INVOLUCRADO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      console.log('entre');
      const editInvolucradoResponse = await updateInvolucrado(
        dispatch,
        involucrado._id,
        involucrado
      );
      if (editInvolucradoResponse.type === 'UPDATE_INVOLUCRADO_SUCCESS') {
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
        fechaDeNacimiento: formatDate(data.fechaDeNacimiento)
      };
      setInvolucrado(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaDeNacimiento: formatDate(data.fechaDeNacimiento)
      };
      setInvolucrado(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const arrayRoles = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC'];
  const arrayLesiones = ['Lesiones LEVES', 'Lesiones REGULARES', 'Lesiones GRAVES'];
  const arrayCategorias = [
    'A1',
    'A2',
    'A3',
    'B1',
    'B2',
    'C1',
    'C2',
    'C3',
    'D1',
    'D2',
    'D3',
    'D4',
    'E1'
  ];
  const columnTitleArray = ['Nombre', 'Apellido', 'Telefono', 'Rol', 'Prioridad'];
  const columns = ['nombre', 'apellido', 'telefono', 'rol', 'prioridad'];

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
      nombre: '',
      apellido: '',
      domicilio: '',
      ciudad: '',
      email: '',
      dni: '',
      telefono: '',
      rol: 'Pick tipo',
      lesiones: 'Pick lesiones',
      fechaDeNacimiento: 'dd / mm / aaaa'
    };
    reset({ ...emptyData });
  };

  const tableClick = (datosFila) => {
    const formattedData = {
      ...datosFila,
      fechaDeNacimiento: formatDate(data.fechaDeNacimiento)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  useEffect(() => {
    getAllInvolucrado(dispatch, id);
  }, []);

  console.log(errors);

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
                  ? 'Are sure do you want update this involucrado?'
                  : 'Are sure do you want add this involucrado?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'Involucrado edited' : 'Involucrado added'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{id ? 'Involucrado' : 'Involucrado'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.leftGroup}>
              <div className={styles.leftLeftGroup}>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.nombre?.message}
                    register={register}
                    nameTitle="Nombre"
                    type="text"
                    styleInput="normalInput"
                    nameInput="nombre"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.apellido?.message}
                    register={register}
                    nameTitle="Apellido"
                    type="text"
                    styleInput="normalInput"
                    nameInput="apellido"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.dni?.message}
                    register={register}
                    nameTitle="DNI"
                    type="number"
                    styleInput="normalInput"
                    nameInput="dni"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.telefono?.message}
                    register={register}
                    nameTitle="Telefono"
                    type="number"
                    styleInput="normalInput"
                    nameInput="telefono"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <DateInput
                    error={errors.fechaDeNacimiento?.message}
                    register={register}
                    nameTitle="Fecha De Nacimiento"
                    type="date"
                    nameInput="fechaDeNacimiento"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <DateInput
                    error={errors.licenciaVencimiento?.message}
                    register={register}
                    nameTitle="Licencia de Vencimiento"
                    type="date"
                    nameInput="licenciaVencimiento"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayCategorias}
                    dataLabel="Categoria de Licencias"
                    name="licenciaCategoria"
                    register={register}
                    error={errors.licenciaCategoria?.message}
                  />
                </div>
              </div>
              <div className={styles.leftMiddleGroup}>
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
                    error={errors.relacion?.message}
                    register={register}
                    nameTitle="Relacion"
                    type="text"
                    styleInput="normalInput"
                    nameInput="relacion"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.titular?.message}
                    register={register}
                    nameTitle="Titular"
                    type="checkbox"
                    nameInput="titular"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.codigoPostal?.message}
                    register={register}
                    nameTitle="Codigo Postal"
                    type="number"
                    styleInput="normalInput"
                    nameInput="codigoPostal"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.cuit?.message}
                    register={register}
                    nameTitle="Cuit"
                    type="number"
                    styleInput="normalInput"
                    nameInput="cuit"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.entrevistado?.message}
                    register={register}
                    nameTitle="Entrevistado"
                    type="checkbox"
                    nameInput="entrevistado"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.ocupacion?.message}
                    register={register}
                    nameTitle="Ocupacion"
                    type="text"
                    styleInput="normalInput"
                    nameInput="ocupacion"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.direccionOcupacion?.message}
                    register={register}
                    nameTitle="Direccion Ocupacion"
                    type="text"
                    styleInput="normalInput"
                    nameInput="direccionOcupacion"
                    required
                  />
                </div>
              </div>
              <div className={styles.leftRightGroup}>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.ciudad?.message}
                    register={register}
                    nameTitle="Ciudad"
                    type="text"
                    styleInput="normalInput"
                    nameInput="ciudad"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.domicilio?.message}
                    register={register}
                    nameTitle="Domicilio"
                    type="text"
                    styleInput="normalInput"
                    nameInput="domicilio"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayRoles}
                    dataLabel="Rol"
                    name="rol"
                    register={register}
                    error={errors.rol?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.email?.message}
                    register={register}
                    nameTitle="Email"
                    type="email"
                    styleInput="normalInput"
                    nameInput="email"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayLesiones}
                    dataLabel="Lesiones"
                    name="lesiones"
                    register={register}
                    error={errors.lesiones?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.pais?.message}
                    register={register}
                    nameTitle="Pais"
                    type="pais"
                    styleInput="normalInput"
                    nameInput="pais"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.licenciaAportada?.message}
                    register={register}
                    nameTitle="Licencia Aportada"
                    type="checkbox"
                    nameInput="licenciaAportada"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.licenciaHabilitada?.message}
                    register={register}
                    nameTitle="Licencia Habilitada"
                    type="checkbox"
                    nameInput="licenciaHabilitada"
                    required
                  />
                </div>
              </div>
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={() => {}} text={buttonType ? 'Update' : 'Add'} />
            <Button clickAction={resetForm} text="Reset" />
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
              {involucrados.map((row, index) => {
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

export default InvolucradosForm;
