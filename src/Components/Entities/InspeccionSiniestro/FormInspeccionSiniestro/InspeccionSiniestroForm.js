import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import FormTable from 'Components/Shared/formTable';
import { getInvolucradoSiniestro } from 'redux/involucrado/thunks';
import { getVehiculoSiniestro } from 'redux/vehiculo/thunks';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import {
  updateInspeccionSiniestro,
  postInspeccionSiniestro,
  getAllInspeccionSiniestro,
  deleteInspeccionSiniestro
} from 'redux/inspeccionSiniestro/thunks';

const InspeccionSiniestrosForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};
  const siniestroId = location.state.params.siniestroId;

  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [inspeccionSiniestro, setInspeccionSiniestro] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);

  const currentInspeccionSiniestro = useSelector((state) => state.inspeccionSiniestro.list);
  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);

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
    permiso: Joi.string()
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

  const formType = 'create';
  const onConfirmFunction = async () => {
    if (formType == 'create') {
      const addInspeccionSiniestroResponse = await postInspeccionSiniestro(
        dispatch,
        inspeccionSiniestro,
        selectedInvolucrados,
        selectedVehiculos,
        data
      );
      if (addInspeccionSiniestroResponse.type === 'POST_INSPECCIONSINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editEntrevistaRoboRuedaResponse = await updateInspeccionSiniestro(
        dispatch,
        selectedInvolucrados,
        selectedVehiculos,
        siniestroId
      );
      if (editEntrevistaRoboRuedaResponse.type === 'UPDATE_ENTREVISTAROBORUEDA_SUCCESS') {
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
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora)
      };
      setInspeccionSiniestro(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora)
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

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      fecha: 'dd / mm / aaaa',
      hora: 'dd / mm / aaaa',
      fotos: '',
      permiso: '',
      programada: '',
      daños: '',
      tipoDaños: '',
      descripcionDaños: '',
      numChasis: '',
      reparacion: '',
      coincidenciaDaños: '',
      conclusion: ''
    };
    reset({ ...emptyData });
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

  const checkStateSelectedVehiculo = (column, index) => {
    if (
      column === 'selected' &&
      currentInspeccionSiniestro &&
      currentInspeccionSiniestro.vehiculo
    ) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    if (currentInspeccionSiniestro) {
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
    if (column === 'selected' && currentInspeccionSiniestro) {
      if (selectedInvolucrados.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    if (!currentInspeccionSiniestro) {
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
      ...involucrados[index],
      fechaNacimiento: formatDate(involucrados[index].fechaNacimiento),
      licenciaVencimiento: formatDate(involucrados[index].licenciaVencimiento)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const deleteButton = deleteInspeccionSiniestro;

  useEffect(() => {
    getAllInspeccionSiniestro(dispatch, data.id);
    getInvolucradoSiniestro(dispatch, data.id || siniestroId);
    getVehiculoSiniestro(dispatch, data.id || siniestroId);
  }, []);

  useEffect(() => {
    if (currentInspeccionSiniestro?.involucrado) {
      setSelectedInvolucrados(currentInspeccionSiniestro.involucrado);
    }
  }, [currentInspeccionSiniestro?.involucrado?.length]);

  useEffect(() => {
    if (currentInspeccionSiniestro?.vehiculo) {
      setSelectedVehiculos(currentInspeccionSiniestro.vehiculo);
    }
  }, [currentInspeccionSiniestro?.vehiculo?.length]);

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
      <div className={styles.imgTop}>
        <p className={styles.imgText}>INSPECCION SINIESTRO</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.tableTop}>
          <div className={styles.tableContainer}>
            <FormTable
              data={currentInspeccionSiniestro}
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
                    dataLabel="Permiso"
                    name="permiso"
                    register={register}
                    error={errors.permiso?.message}
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
                  <Inputs
                    error={errors.conclusion?.message}
                    register={register}
                    nameTitle="Conclusion"
                    type="text"
                    nameInput="conclusion"
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
                  <Checkbox
                    error={errors.reparacion?.message}
                    register={register}
                    nameTitle="Reparacion"
                    type="checkbox"
                    nameInput="reparacion"
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

export default InspeccionSiniestrosForm;
