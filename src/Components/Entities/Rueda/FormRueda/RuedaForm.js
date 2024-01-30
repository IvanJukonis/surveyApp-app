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
import { getAllVehiculos } from 'redux/vehiculo/thunks';
import { getAllInvolucrado } from 'redux/involucrado/thunks';
import FormTable from 'Components/Shared/formTable';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { updateRueda, postRueda, getAllRueda, getRueda, deleteRueda } from 'redux/rueda/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const RuedasForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [rueda, setRueda] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);

  const currentRueda = useSelector((state) => state.rueda.list);
  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);
  const ruedas = useSelector((state) => state.rueda.completeList);

  const columnTitleInvolucrado = [
    'Seleccionar',
    'Nombre',
    'Apellido',
    'Rol',
    'Telefono',
    'Prioridad'
  ];
  const columnInvolucrado = ['selected', 'nombre', 'apellido', 'rol', 'telefono', 'prioridad'];
  const columnTitleVehiculo = ['Seleccionar', 'Modelo', 'Marca', 'Dominio', 'Prioridad'];
  const columnVehiculo = ['selected', 'modelo', 'marca', 'dominio', 'prioridad'];

  const schema = Joi.object({
    descripcion: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'La descripcion debe ser una cadena de texto',
        'string.empty': 'La descripcion es un campo requerido',
        'string.min': 'La descripcion debe tener al menos 3 caracteres',
        'string.max': 'La descripcion debe tener como máximo 15 caracteres',
        'string.pattern.base': 'La descripcion debe contener solo letras'
      })
      .required(),
    marca: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'La marca debe ser una cadena de texto',
        'string.empty': 'La marca es un campo requerido',
        'string.min': 'La marca debe tener al menos 3 caracteres',
        'string.max': 'La marca debe tener como máximo 15 caracteres',
        'string.pattern.base': 'La marca debe contener solo letras'
      })
      .required(),
    numDot: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El DOT debe ser una cadena de texto',
        'string.empty': 'El DOT es un campo requerido',
        'string.min': 'El DOT debe tener al menos 3 caracteres',
        'string.max': 'El DOT debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El DOT debe contener solo letras'
      })
      .required(),
    numLlanta: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'El numero de llanta debe ser una cadena de texto',
        'string.empty': 'El numero de llanta es un campo requerido',
        'string.min': 'El numero de llanta debe tener al menos 3 caracteres',
        'string.max': 'El numero de llanta debe tener como máximo 15 caracteres',
        'string.pattern.base': 'El numero de llanta debe contener solo letras'
      })
      .required(),
    tipo: Joi.string()
      .valid('Original', 'Suplente', 'Prestada')
      .messages({
        'any.only': 'Selecciona un tipo permitido'
      })
      .required(),
    tipoLlanta: Joi.string()
      .valid('Aleacion', 'Chapa', 'Otro')
      .messages({
        'any.only': 'Selecciona un tipo de llanta permitido'
      })
      .required(),
    posicionActual: Joi.string()
      .valid('DI', 'DD', 'TI', 'TD', 'AUX', 'N/N')
      .messages({
        'any.only': 'Selecciona un tipo de posicion permitida'
      })
      .required(),
    fechaColocacion: Joi.date()
      .messages({
        'date.base': 'Ingrese una fecha válida',
        'date.empty': 'La fecha de colocacion es un campo requerido'
      })
      .required(),
    posicionPrevia: Joi.string()
      .valid('DI', 'DD', 'TI', 'TD', 'AUX', 'N/N')
      .messages({
        'any.only': 'Selecciona un tipo de posicion permitida'
      })
      .required(),
    posicionTransitoria: Joi.string()
      .valid('DI', 'DD', 'TI', 'TD', 'AUX', 'N/N')
      .messages({
        'any.only': 'Selecciona un tipo de posicion permitida'
      })
      .required(),
    sustraida: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Sustraida" es un campo booleano',
        'boolean.empty': 'El campo "Sustraida" debe tener un valor determinado'
      })
      .required(),
    estado: Joi.string()
      .valid('Nuevo', 'Medio desgastado', 'Desgastado')
      .messages({
        'any.only': 'Selecciona un tipo de estado permitido'
      })
      .required(),
    aporteFoto: Joi.string()
      .valid('Se aportan fotos previas', 'No se aportan fotos previas')
      .messages({
        'any.only': 'Selecciona un tipo de aporte de fotos permitido'
      })
      .required(),
    metadatosFoto: Joi.string()
      .valid('Metadatos presentes', 'Sin metadatos presentes')
      .messages({
        'any.only': 'Selecciona un tipo de metadato permitido'
      })
      .required(),
    factura: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Factura" es un campo booleano',
        'boolean.empty': 'El campo "Factura" debe tener un valor determinado'
      })
      .required(),
    aporteFactura: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporte de factura" es un campo booleano',
        'boolean.empty': 'El campo "Aporte de factura" debe tener un valor determinado'
      })
      .required(),
    anotaciones: Joi.string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z ]+$/)
      .messages({
        'string.base': 'Las anotaciones debe ser una cadena de texto',
        'string.empty': 'Las anotaciones es un campo requerido',
        'string.min': 'Las anotaciones debe tener al menos 3 caracteres',
        'string.max': 'Las anotaciones debe tener como máximo 15 caracteres',
        'string.pattern.base': 'Las anotaciones debe contener solo letras'
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
    defaultValues: { ...rueda }
  });

  const onConfirmFunction = async () => {
    const formType = 'create';
    if (formType == 'create') {
      const addRuedaResponse = await postRueda(
        dispatch,
        rueda,
        selectedInvolucrados,
        selectedVehiculos,
        data.id
      );
      if (addRuedaResponse.type === 'POST_RUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editRuedaResponse = await updateRueda(dispatch, rueda._id, rueda);
      if (editRuedaResponse.type === 'UPDATE_RUEDA_SUCCESS') {
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
      setRueda(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setRueda(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const arrayTipo = ['Original', 'Suplente', 'Prestada'];
  const arrayTipoLlanta = ['Aleacion', 'Chapa', 'Otro'];
  const arrayPosicionActual = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayPosicionPrevia = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayPosicionTransitoria = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayEstado = ['Nuevo', 'Medio desgastado', 'Desgastado'];
  const arrayAporteFoto = ['Se aportan fotos previas', 'No se aportan fotos previas'];
  const arrayMetadatosFoto = ['Metadatos presentes', 'Sin metadatos presentes'];

  const columnTitleArray = ['Marca', 'Dot', 'Estado'];
  const columns = ['marca', 'dot', 'estado'];

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      descripcion: '',
      marca: '',
      numDot: '',
      numLlanta: '',
      tipo: 'Pick tipo',
      tipoLlanta: 'Pick llanta',
      posicionActual: 'Pick actual',
      posicionPrevia: 'Pick previa',
      fechaColocacion: 'dd / mm / aaaa',
      posicionTransitoria: 'Pick transitoria',
      sustraida: false,
      factura: false,
      aporteFactura: false,
      aporteFoto: 'Pick foto',
      metadatosFoto: 'Pick metadatos',
      anotaciones: '',
      estado: 'Pick estado'
    };
    reset({ ...emptyData });
  };

  const deleteButton = deleteRueda;

  const tableClick = () => {
    const formattedData = {};
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

  const checkStateSelectedVehiculo = (column, index) => {
    if (column === 'selected' && currentRueda && currentRueda.vehiculo) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    if (currentRueda) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxSelectedVehiculo = (index) => {
    const isSelectedVehiculo = selectedVehiculos.find(
      (vehiculo) => vehiculos[index]._id === vehiculo
    );
    if (isSelectedVehiculo) {
      const newListSelectedVehiculos = selectedVehiculos.filter(
        (vehiculo) => vehiculos[index]._id !== vehiculo
      );
      setSelectedVehiculos(newListSelectedVehiculos);
    } else {
      setSelectedVehiculos((prevState) => [...prevState, vehiculos[index]._id]);
    }
  };

  const checkStateSelected = (column, index) => {
    if (column === 'selected' && currentRueda) {
      if (selectedInvolucrados.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    if (!currentRueda) {
      if (selectedInvolucrados.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxSelected = (index) => {
    const isSelectedInvolucrado = selectedInvolucrados.find(
      (involucrado) => involucrados[index]._id === involucrado
    );
    if (isSelectedInvolucrado) {
      const newListSelectedInvolucrados = selectedInvolucrados.filter(
        (involucrado) => involucrados[index]._id !== involucrado
      );
      setSelectedInvolucrados(newListSelectedInvolucrados);
    } else {
      setSelectedInvolucrados((prevState) => [...prevState, involucrados[index]._id]);
      console.log(selectedInvolucrados);
    }
  };

  const checkState = (index, entity) => {
    if (entity === 'inv') {
      if (involucrados[index].prioridad) {
        if (involucrados.find((singleData) => singleData.prioridad === true)) {
          return true;
        }
      }
      return false;
    }
    if (entity === 'veh') {
      if (vehiculos[index].prioridad) {
        if (vehiculos.find((singleData) => singleData.prioridad === true)) {
          return true;
        }
      }
      return false;
    }
  };

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
    getAllRueda(dispatch, data.id);
    getRueda(dispatch);
    getAllVehiculos(dispatch, data.id);
    getAllInvolucrado(dispatch, data.id);
  }, []);

  useEffect(() => {
    if (currentRueda?.involucrado) {
      setSelectedInvolucrados(currentRueda.involucrado);
    }
  }, [currentRueda?.involucrado?.length]);

  useEffect(() => {
    if (currentRueda?.vehiculo) {
      setSelectedVehiculos(currentRueda.vehiculo);
    }
  }, [currentRueda?.vehiculo?.length]);

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
                  ? '¿Estás seguro de que quieres actualizar este rueda?'
                  : '¿Estás seguro de que quieres agregar este rueda?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'Rueda editado' : 'Rueda agregado'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{data.id ? 'Rueda' : 'Rueda'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
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
                <Inputs
                  error={errors.marca?.message}
                  register={register}
                  nameTitle="Marca"
                  type="text"
                  nameInput="marca"
                />
              </div>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.numDot?.message}
                  register={register}
                  nameTitle="DOT"
                  type="text"
                  nameInput="numDot"
                />
              </div>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.numLlanta?.message}
                  register={register}
                  nameTitle="Numero Llanta"
                  type="text"
                  nameInput="numLlanta"
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
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
                  data={arrayTipoLlanta}
                  dataLabel="Tipo Llanta"
                  name="tipoLlanta"
                  register={register}
                  error={errors.tipoLlanta?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayPosicionActual}
                  dataLabel="Posicion Actual"
                  name="posicionActual"
                  register={register}
                  error={errors.posicionActual?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <DateInput
                  error={errors.fechaColocacion?.message}
                  register={register}
                  nameTitle="Fecha Colocacion"
                  type="date"
                  nameInput="fechaColocacion"
                  required
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayPosicionPrevia}
                  dataLabel="Posicion Previa"
                  name="posicionPrevia"
                  register={register}
                  error={errors.posicionPrevia?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayPosicionTransitoria}
                  dataLabel="Posicion Transitoria"
                  name="posicionTransitoria"
                  register={register}
                  error={errors.posicionTransitoria?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.sustraida?.message}
                  register={register}
                  nameTitle="Sustraida"
                  type="checkbox"
                  nameInput="sustraida"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayEstado}
                  dataLabel="Estado"
                  name="estado"
                  register={register}
                  error={errors.estado?.message}
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayAporteFoto}
                  dataLabel="Aporte Foto"
                  name="aporteFoto"
                  register={register}
                  error={errors.aporteFoto?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayMetadatosFoto}
                  dataLabel="Metadatos Foto"
                  name="metadatosFoto"
                  register={register}
                  error={errors.metadatosFoto?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.factura?.message}
                  register={register}
                  nameTitle="Factura"
                  type="checkbox"
                  nameInput="factura"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.aporteFactura?.message}
                  register={register}
                  nameTitle="Aporte Factura"
                  type="checkbox"
                  nameInput="aporteFactura"
                  required
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.anotaciones?.message}
                  register={register}
                  nameTitle="Anotaciones"
                  type="text"
                  nameInput="anotaciones"
                />
              </div>
            </div>
          </section>
          <div className={styles.bottomTable}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableContent}>
                  {columnTitleInvolucrado.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {involucrados.map((row, index) => {
                  const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                  return (
                    <tr className={rowClass} key={index}>
                      {columnInvolucrado.map((column, columnIndex) => (
                        <td key={columnIndex}>
                          {column === 'selected' ? (
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              onChange={() => handleCheckboxSelected(index)}
                              checked={checkStateSelected(column, index)}
                            />
                          ) : column.startsWith('prioridad') ? (
                            <input
                              className={styles.checkboxInput}
                              type="checkbox"
                              readOnly
                              checked={checkState(index, 'inv')}
                            />
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
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableContent}>
                  {columnTitleVehiculo.map((column, index) => (
                    <th key={index}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vehiculos.map((row, index) => {
                  const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                  return (
                    <tr className={rowClass} key={index}>
                      {columnVehiculo.map((column, columnIndex) => (
                        <td key={columnIndex}>
                          {column === 'selected' ? (
                            <input
                              type="checkbox"
                              className={styles.checkboxInput}
                              onChange={() => handleCheckboxSelectedVehiculo(index)}
                              checked={checkStateSelectedVehiculo(column, index)}
                            />
                          ) : column.startsWith('prioridad') ? (
                            <input
                              className={styles.checkboxInput}
                              type="checkbox"
                              readOnly
                              checked={checkState(index, 'veh')}
                            />
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
          <div className={styles.btnContainer}>
            <Button clickAction={handleSubmit(onSubmit)} text={buttonType ? 'Editar' : 'Agregar'} />
            <Button clickAction={resetForm} text="Reiniciar" />
            <Button text="Cancelar" clickAction={cancelForm} />
          </div>
        </form>
        <div className={styles.rightTable}>
          <FormTable
            data={ruedas}
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

export default RuedasForm;
