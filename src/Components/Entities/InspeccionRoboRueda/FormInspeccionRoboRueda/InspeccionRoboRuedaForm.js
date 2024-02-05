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
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import FormTable from 'Components/Shared/formTable';
import DateInput from 'Components/Shared/Inputs/DateInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  updateInspeccionRoboRueda,
  postInspeccionRoboRueda,
  getAllInspeccionRoboRueda,
  deleteInspeccionRoboRueda
} from 'redux/inspeccionRoboRueda/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const InspeccionRoboRuedasForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [inspeccionRoboRueda, setInspeccionRoboRueda] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);

  const currentInspeccionRoboRueda = useSelector((state) => state.inspeccionRoboRueda.list);
  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);

  const arrayResultado = ['Inconsistencias', 'Sin inconsistencias', 'Fraudulencia'];
  const arrayPermisos = [
    'Inspeccion permitida',
    'Inspeccion no permitida',
    'Inspeccion dificultada'
  ];
  const arrayProgramada = ['Inspeccion programada', 'Inspeccion no programada'];
  const columnTitleArray = ['Fecha', 'Hora', 'Permiso', 'Programada'];
  const columns = ['fecha', 'hora', 'permiso', 'programada'];
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
    fecha: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Fecha" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha" no puede permanecer vacio.'
      })
      .required(),
    presencia: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Presencia" es un campo booleano',
        'boolean.empty': 'El campo "Presencia" debe tener un valor determinado'
      })
      .required(),
    hora: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Hora" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora" no puede permanecer vacio.'
      })
      .required(),
    direccion: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 20 caracteres'
      })
      .required(),
    ciudad: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 20 caracteres'
      })
      .required(),
    permiso: Joi.string()
      .valid('Inspeccion permitida', 'Inspeccion no permitida', 'Inspeccion dificultada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    programada: Joi.string()
      .valid('Inspeccion programada', 'Inspeccion no programada', 'Inspeccion neutra')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    resultado: Joi.string()
      .valid('Inconsistencias', 'Sin inconsistencias', 'Fraudulencia')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    disposicion: Joi.string()
      .min(3)
      .max(100)
      .messages({
        'string.base': 'El campo "Disposicion" debe ser una cadena de texto',
        'string.empty': 'El campo "Disposicion" es un campo requerido',
        'string.min': 'El campo "Disposicion" debe tener al menos 3 caracteres'
      })
      .required(),
    daños: Joi.string()
      .min(3)
      .max(100)
      .messages({
        'string.base': 'El campo "Daños" debe ser una cadena de texto',
        'string.empty': 'El campo "Daños" es un campo requerido',
        'string.min': 'El campo "Daños" debe tener al menos 3 caracteres'
      })
      .required(),
    conclusion: Joi.string()
      .min(3)
      .max(200)
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
    defaultValues: { ...inspeccionRoboRueda }
  });

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const inspeccionRoboRuedaConSiniestro = { ...inspeccionRoboRueda, siniestro: data.id };
      const addInspeccionRoboRuedaResponse = await postInspeccionRoboRueda(
        dispatch,
        inspeccionRoboRuedaConSiniestro
      );
      if (addInspeccionRoboRuedaResponse.type === 'POST_INSPECCIONROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editInspeccionRoboRuedaResponse = await updateInspeccionRoboRueda(
        dispatch,
        inspeccionRoboRueda._id,
        inspeccionRoboRueda
      );
      if (editInspeccionRoboRuedaResponse.type === 'UPDATE_INSPECCIONROBORUEDA_SUCCESS') {
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
      setInspeccionRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setInspeccionRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      fecha: 'dd / mm / aaaa',
      hora: 'dd / mm / aaaa',
      fotos: 'Pick foto',
      permiso: 'Pick permiso',
      programada: 'Pick programada',
      daños: '',
      disposicion: '',
      conclusion: ''
    };
    reset({ ...emptyData });
  };
  const deleteButton = deleteInspeccionRoboRueda;

  const checkStateSelectedVehiculo = (column, index) => {
    if (
      column === 'selected' &&
      currentInspeccionRoboRueda &&
      currentInspeccionRoboRueda.vehiculo
    ) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    if (currentInspeccionRoboRueda) {
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
    if (column === 'selected' && currentInspeccionRoboRueda) {
      if (selectedInvolucrados.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    if (!currentInspeccionRoboRueda) {
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

  const tableClick = (index) => {
    const formattedData = {
      ...currentInspeccionRoboRueda[index],
      fechaNacimiento: formatDate(currentInspeccionRoboRueda[index].fechaNacimiento),
      licenciaVencimiento: formatDate(currentInspeccionRoboRueda[index].licenciaVencimiento)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const cancelForm = () => {
    if (createdEntity) {
      history.push({
        pathname: `/controlador/siniestros/entrevista/entrevistaroboinspeccionRoboRueda/${createdEntity.rol}/${createdEntity.siniestro[0]}`,
        state: {
          params: { ...createdEntity, mode: 'edit', siniestroId: createdEntity.siniestro[0] }
        }
      });
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    getAllInspeccionRoboRueda(dispatch, data.id);
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
                  ? '¿Estás seguro de que quieres actualizar este inspeccionRoboRueda?'
                  : '¿Estás seguro de que quieres agregar este inspeccionRoboRueda?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'InspeccionRoboRueda editado' : 'InspeccionRoboRueda agregado'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>INSPECCION ROBO RUEDA</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.tableTop}>
          <div className={styles.tableContainer}>
            <FormTable
              data={currentInspeccionRoboRueda}
              columnTitleArray={columnTitleArray}
              columns={columns}
              handleClick={tableClick}
              deleteButton={deleteButton}
            />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <section className={styles.inputGroups}>
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
                  <OptionInput
                    data={arrayProgramada}
                    dataLabel="Programada"
                    name="programada"
                    register={register}
                    error={errors.programada?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayResultado}
                    dataLabel="Resultado"
                    name="resultado"
                    register={register}
                    error={errors.resultado?.message}
                  />
                </div>
              </div>
              <div className={styles.inputColumn}>
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
                    dataLabel="Permiso"
                    name="permiso"
                    register={register}
                    error={errors.permiso?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextArea
                    error={errors.disposicion?.message}
                    register={register}
                    nameTitle="Disposición"
                    type="text"
                    nameInput="disposicion"
                    styleInput="small"
                    required
                  />
                </div>
              </div>
              <div className={styles.inputColumn}>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.direccion?.message}
                    register={register}
                    nameTitle="Direccion"
                    type="text"
                    nameInput="direccion"
                  />
                </div>
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
                  <TextArea
                    error={errors.daños?.message}
                    register={register}
                    nameTitle="Daños"
                    type="text"
                    nameInput="daños"
                    styleInput="small"
                    required
                  />
                </div>
              </div>
              <div className={styles.inputColumn}>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.ciudad?.message}
                    register={register}
                    nameTitle="Ciudad"
                    type="text"
                    nameInput="ciudad"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextArea
                    error={errors.conclusion?.message}
                    register={register}
                    nameTitle="Conclusión"
                    type="text"
                    nameInput="conclusion"
                    styleInput="threeInputs"
                    required
                  />
                </div>
              </div>
            </section>
            <div className={styles.btnContainer}>
              <Button
                clickAction={handleSubmit(onSubmit)}
                text={buttonType ? 'Editar' : 'Agregar'}
              />
              <Button clickAction={resetForm} text="Reiniciar" />
              <Button text="Cancelar" clickAction={cancelForm} />
            </div>
          </div>
          <div className={styles.rightTables}>
            <div className={styles.tableContainer}>
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
                    const rowClass =
                      index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

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
            </div>
            <div className={styles.tableContainer}>
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
                    const rowClass =
                      index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

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
          </div>
        </form>
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default InspeccionRoboRuedasForm;
