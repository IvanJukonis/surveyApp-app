import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';
import { getVehiculoSiniestro } from 'redux/vehiculo/thunks';
import { getInvolucradoSiniestro } from 'redux/involucrado/thunks';
import FormTable from 'Components/Shared/formTable';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getRuedasSiniestro } from 'redux/rueda/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { ToastError, Inputs, Button, OptionInput } from 'Components/Shared';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';

const RuedasForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const [toastError, setToastErroOpen] = useState(false);
  const [fraudRueda, setFraudRueda] = useState([]);
  const [selectedInvolucradosRueda, setSelectedInvolucradosRueda] = useState([]);
  const [selectedVehiculosRueda, setSelectedVehiculosRueda] = useState([]);

  const currentRueda = useSelector((state) => state.rueda.list);
  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);
  const ruedas = useSelector((state) => state.rueda.list);

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
  const arrayTipo = ['Original', 'Suplente', 'Prestada'];
  const arrayTipoLlanta = ['Aleacion', 'Chapa', 'Otro'];
  const arrayPosicionActual = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayPosicionPrevia = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayPosicionTransitoria = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayEstado = ['Nuevo', 'Medio desgastado', 'Desgastado'];
  const arrayAporteFoto = ['Se aportan fotos previas', 'No se aportan fotos previas'];
  const arrayMetadatosFoto = ['Metadatos presentes', 'Sin metadatos presentes'];

  const columnTitleArray = [
    'Marca',
    'Dot',
    'Llanta',
    'Estado',
    'Inspeccion',
    'Entrevista',
    'Sustraida'
  ];
  const columns = [
    'marca',
    'numDot',
    'numLlanta',
    'estado',
    'ruedaInspeccion',
    'ruedaEntrevista',
    'sustraida'
  ];

  const schema = Joi.object({
    descripcion: Joi.string()
      .min(3)
      .max(100)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 100 caracteres'
      })
      .required(),
    marca: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 20 caracteres'
      })
      .required(),
    numDot: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 20 caracteres'
      })
      .required(),
    numLlanta: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 20 caracteres'
      })
      .required(),
    tipo: Joi.string().valid('Original', 'Suplente', 'Prestada').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    tipoLlanta: Joi.string().valid('Aleacion', 'Chapa', 'Otro').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    posicionActual: Joi.string().valid('DI', 'DD', 'TI', 'TD', 'AUX', 'N/N').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    fechaColocacion: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Fecha" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha" no puede permanecer vacio.'
      })
      .required(),
    posicionPrevia: Joi.string().valid('DI', 'DD', 'TI', 'TD', 'AUX', 'N/N').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    posicionTransitoria: Joi.string().valid('DI', 'DD', 'TI', 'TD', 'AUX', 'N/N').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    sustraida: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Sustraida" es un campo booleano',
        'boolean.empty': 'El campo "Sustraida" debe tener un valor determinado'
      })
      .required(),
    estado: Joi.string().valid('Nuevo', 'Medio desgastado', 'Desgastado').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    aporteFoto: Joi.string()
      .valid('Se aportan fotos previas', 'No se aportan fotos previas')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    metadatosFoto: Joi.string().valid('Metadatos presentes', 'Sin metadatos presentes').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    factura: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Factura" es un campo booleano',
        'boolean.empty': 'El campo "Factura" debe tener un valor determinado'
      })
      .required(),
    aporteFactura: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporte Factura" es un campo booleano',
        'boolean.empty': 'El campo "Aporte Factura" debe tener un valor determinado'
      })
      .required(),
    anotaciones: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.base': 'El campo "Anotaciones" debe ser una cadena de texto',
        'string.empty': 'El campo "Anotaciones" es un campo requerido',
        'string.min': 'El campo "Anotaciones" debe tener al menos 3 caracteres'
      })
      .required(),
    siniestro: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any(),
    vehiculo: Joi.any(),
    involucrado: Joi.any()
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const tableClick = (index) => {
    const resetDataRueda = {
      ...currentRueda[index]
    };
    reset({ ...resetDataRueda });
    setSelectedInvolucradosRueda(resetDataRueda.involucrado);
    setSelectedVehiculosRueda(resetDataRueda.vehiculo);
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

  const checkStateSelectedVehiculoRueda = (column, index) => {
    if (column === 'selected' && currentRueda && currentRueda.vehiculo) {
      if (selectedVehiculosRueda.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    if (currentRueda) {
      if (selectedVehiculosRueda.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxSelectedVehiculoRueda = (index) => {
    const isSelectedVehiculoRueda = selectedVehiculosRueda.find(
      (vehiculo) => vehiculos[index]._id === vehiculo
    );
    if (isSelectedVehiculoRueda) {
      const newListSelectedVehiculosRueda = selectedVehiculosRueda.filter(
        (vehiculo) => vehiculos[index]._id !== vehiculo
      );
      setSelectedVehiculosRueda(newListSelectedVehiculosRueda);
    } else {
      setSelectedVehiculosRueda([vehiculos[index]._id]);
    }
  };

  const checkStateSelectedRueda = (column, index) => {
    if (column === 'selected' && currentRueda) {
      if (
        selectedInvolucradosRueda.find((involucrado) => involucrado === involucrados[index]._id)
      ) {
        return true;
      }
    }
    if (!currentRueda) {
      if (
        selectedInvolucradosRueda.find((involucrado) => involucrado === involucrados[index]._id)
      ) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxSelectedRueda = (index) => {
    const isSelectedInvolucradoRueda = selectedInvolucradosRueda.find(
      (involucrado) => involucrados[index]._id === involucrado
    );
    if (isSelectedInvolucradoRueda) {
      const newListSelectedInvolucradosRueda = selectedInvolucradosRueda.filter(
        (involucrado) => involucrados[index]._id !== involucrado
      );
      setSelectedInvolucradosRueda(newListSelectedInvolucradosRueda);
    } else {
      setSelectedInvolucradosRueda((prevState) => [...prevState, involucrados[index]._id]);
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

  const checkFraud = () => {
    const ruedasNoSustraidaList = currentRueda.filter((rueda) => !rueda.sustraida);
    const ruedasSustraidaList = currentRueda.filter((rueda) => rueda.sustraida);

    const estrategias = {
      marca: {
        comparar: (rueda1, rueda2) => rueda1.marca === rueda2.marca
      },
      numDot: {
        comparar: (rueda1, rueda2) => rueda1.numDot === rueda2.numDot
      },
      numLlanta: {
        comparar: (rueda1, rueda2) => rueda1.numLlanta === rueda2.numLlanta
      }
    };

    const compararRuedas = (estrategia, sustraida, noSustraida) => {
      const comparador = estrategias[estrategia].comparar;
      return comparador(sustraida, noSustraida);
    };

    const coincidenciasList = [];

    for (const sustraida of ruedasSustraidaList) {
      for (const noSustraida of ruedasNoSustraidaList) {
        for (const estrategia in estrategias) {
          if (compararRuedas(estrategia, sustraida, noSustraida)) {
            coincidenciasList.push({ sustraida, noSustraida });
            break;
          }
        }
      }
    }

    setFraudRueda(coincidenciasList);
  };

  const handleInvolucrado = () => {
    history.push(`/controlador/siniestros/involucrado/form/${data.id}`, {
      params: { mode: 'create' }
    });
  };

  const handleVehiculo = () => {
    history.push(`/controlador/siniestros/vehiculo/form/${data.id}`, {
      params: { mode: 'create' }
    });
  };

  useEffect(() => {
    getRuedasSiniestro(dispatch, data.id);
    getVehiculoSiniestro(dispatch, data.id);
    getInvolucradoSiniestro(dispatch, data.id);
    checkFraud();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>RUEDAS</p>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit()}>
          <div className={styles.formContainer}>
            <section className={styles.inputGroups}>
              <div className={styles.inputColumn}>
                <div className={styles.inputContainerRueda}>
                  <TextArea
                    error={errors.descripcion?.message}
                    register={register}
                    nameTitle="Descripción"
                    type="text"
                    nameInput="descripcion"
                    styleInput="small"
                    required
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
                  <Inputs
                    error={errors.numLlanta?.message}
                    register={register}
                    nameTitle="Numero Llanta"
                    type="text"
                    nameInput="numLlanta"
                  />
                </div>
                <div className={styles.inputContainer}>
                  <TextArea
                    error={errors.anotaciones?.message}
                    register={register}
                    nameTitle="Anotaciones"
                    type="text"
                    nameInput="anotaciones"
                    styleInput="threeInputs"
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
                    data={arrayTipo}
                    dataLabel="Tipo"
                    name="tipo"
                    register={register}
                    error={errors.tipo?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayPosicionPrevia}
                    dataLabel="Posición Previa"
                    name="posicionPrevia"
                    register={register}
                    error={errors.posicionPrevia?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <DateInput
                    error={errors.fechaColocacion?.message}
                    register={register}
                    nameTitle="Fecha Colocación"
                    type="date"
                    nameInput="fechaColocacion"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayMetadatosFoto}
                    dataLabel="Metadatos Fotos"
                    name="metadatosFoto"
                    register={register}
                    error={errors.metadatosFoto?.message}
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
              </div>
              <div className={styles.inputColumn}>
                <div className={styles.inputContainer}>
                  <Inputs
                    error={errors.numDot?.message}
                    register={register}
                    nameTitle="Dot"
                    type="text"
                    nameInput="numDot"
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
                    data={arrayPosicionTransitoria}
                    dataLabel="Posición Transitoria"
                    name="posicionTransitoria"
                    register={register}
                    error={errors.posicionTransitoria?.message}
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayAporteFoto}
                    dataLabel="Aporte Fotos"
                    name="aporteFoto"
                    register={register}
                    error={errors.aporteFoto?.message}
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
              </div>
            </section>
            <div className={styles.btnContainer}>
              <Button text="Cancelar" clickAction={cancelForm} />
            </div>
          </div>
          <div className={styles.bottomTable}>
            <div className={styles.tableContainer}>
              <Button submition={true} clickAction={handleInvolucrado} text="Involucrados" />
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
                                onChange={() => handleCheckboxSelectedRueda(index)}
                                checked={checkStateSelectedRueda(column, index)}
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
              <Button submition={true} clickAction={handleVehiculo} text="Vehiculos" />
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
                                onChange={() => handleCheckboxSelectedVehiculoRueda(index)}
                                checked={checkStateSelectedVehiculoRueda(column, index)}
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
        <div className={styles.tableTop}>
          <div className={styles.tableContainerRueda}>
            <FormTable
              data={ruedas}
              columnTitleArray={columnTitleArray}
              columns={columns}
              handleClick={tableClick}
              deleted={true}
            />
          </div>
          <div className={styles.btnContainerAnalisis}>
            <Button text="COMPARAR" clickAction={() => checkFraud()} />
          </div>
          {
            <div>
              {fraudRueda.length > 0 && (
                <div className={styles.warningContainer}>
                  <div className={styles.warningContainerTitle}>
                    <p>Atención.</p>
                    <img
                      className={styles.icon}
                      src={`${process.env.PUBLIC_URL}/assets/images/exclamacion.jpg`}
                      alt="Exclamation Icon"
                    />
                  </div>
                  <div className={styles.warningContainerText}>
                    <p>
                      Coincidencia encontrada entre ruedas. Posible acción fraudulenta detectada.
                    </p>
                    {fraudRueda.map((coincidencia, index) => (
                      <div key={index}>
                        <p>
                          Rueda Sustraída: Dotacion ({coincidencia.sustraida.numDot}) / Llanta (
                          {coincidencia.sustraida.numLlanta}) / Marca (
                          {coincidencia.sustraida.marca})
                        </p>
                        <p>
                          Rueda No sustraída: Dotacion ({coincidencia.noSustraida.numDot}) / Llanta
                          ({coincidencia.noSustraida.numLlanta}) / Marca (
                          {coincidencia.noSustraida.marca})
                        </p>
                        <p>____________________________________</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          }
          {
            <div>
              {fraudRueda.length == 0 && (
                <div className={styles.successContainer}>
                  <div className={styles.successContainerTitle}>
                    <p>Atención.</p>
                  </div>
                  <div className={styles.successContainerText}>
                    <p>
                      No se encuentran similitudes significativas entre las ruedas sustraidas y las
                      no sustraidas.
                    </p>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default RuedasForm;
