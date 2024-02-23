import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getControlador } from 'redux/controlador/thunks';
import { ToastError, Loader } from 'Components/Shared';
import TableList from '../../../Shared/listTable/index';
import InputsStats from 'Components/Shared/Inputs/statsInput';
import styles from './Controlador.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { getSiniestroStats } from 'redux/siniestro/thunks';
import { updateControlador } from 'redux/controlador/thunks';
import { Inputs, OptionInput, Button } from 'Components/Shared';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess/index';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import ModalConfirm from 'Components/Shared/Modals/ModalConfirm/index';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Controlador() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showStats, setShowStats] = useState(false);
  const [controlador, setControlador] = useState({});
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const controladores = useSelector((state) => state.controlador.list);
  const isPending = useSelector((state) => state.controlador.pending);
  const isError = useSelector((state) => state.controlador.error);
  const siniestros = useSelector((state) => state.siniestro.list);

  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const [idControlador, setIdControlador] = useState('');
  const [selectedControlador, setSelectedControlador] = useState('');
  const [siniestrosEvaluados, setSiniestrosEvaluados] = useState('');
  const [statsSolicitudCorreccion, setStatsSolicitudCorreccion] = useState([]);
  const [statsGramaticaProlijidad, setStatsGramaticaProlijidad] = useState([]);
  const [statsDesarrolloSiniestro, setStatsDesarrolloSiniestro] = useState([]);
  const [statsJustificacionDemoras, setStatsJustificacionDemoras] = useState([]);
  const [statsCorrecciones, setCorreccion] = useState();
  const [statsProlijidad, setProlijidad] = useState();
  const [statsSiniestro, setDesarrollo] = useState();
  const [statsDemoras, setJustificacion] = useState();
  const [statsTotal, setTotal] = useState();

  const tipoArray = ['Relevador', 'Controlador', 'Administrativo', 'Consultor'];
  const contratoArray = ['Termino Fijo', 'Termino Indefinido', 'Termino Temporal', 'Labor'];
  const oficinaArray = ['Rosario', 'Vgg', 'San Lorenzo'];
  const departamentoArray = ['Administracion', 'Produccion', 'Marketing', 'RRHH'];
  const puestoArray = ['Gerente', 'Empleado'];
  const civilArray = ['Casado/a', 'Soltero/a', 'Viudo/a', 'Divorciado/a'];

  const schema = Joi.object({
    tipo: Joi.string().valid('Relevador', 'Controlador', 'Administrativo', 'Consultor').messages({
      'any.only': 'El campo "Tipo" debe contener una tipo valido'
    }),

    nombre: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.base': 'El campo "Nombre" debe ser una cadena de texto',
        'string.empty': 'El campo "Nombre" es un campo requerido',
        'string.min': 'El campo "Nombre" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Nombre" debe tener como máximo 30 caracteres'
      })
      .required(),

    apellido: Joi.string()
      .min(3)
      .max(30)
      .messages({
        'string.base': 'El campo "Apellido" debe ser una cadena de texto',
        'string.empty': 'El campo "Apellido" es un campo requerido',
        'string.min': 'El campo "Apellido" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Apellido" debe tener como máximo 30 caracteres'
      })
      .required(),

    dni: Joi.number().min(10000000).max(99999999).integer().messages({
      'number.base': 'El DNI debe ser un número',
      'number.empty': 'El DNI es un campo requerido',
      'number.min': 'El DNI debe ser al menos 10,000,000',
      'number.max': 'El DNI debe ser como máximo 99,999,999',
      'number.integer': 'El DNI debe ser un número entero'
    }),

    fechaNacimiento: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Nacimiento" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Nacimiento" no puede permanecer vacio.'
      })
      .required(),

    fechaContratacion: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Contratacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Contratacion" no puede permanecer vacio.'
      })
      .required(),

    direccion: Joi.string()
      .min(2)
      .max(15)
      .messages({
        'string.base': 'El campo "Direccion" debe ser una cadena de texto',
        'string.empty': 'El campo "Direccion" es un campo requerido',
        'string.min': 'El campo "Direccion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Direccion" debe tener como máximo 15 caracteres'
      })
      .required(),

    localidad: Joi.string()
      .min(2)
      .max(15)
      .messages({
        'string.base': 'El campo "Localidad" debe ser una cadena de texto',
        'string.empty': 'El campo "Localidad" es un campo requerido',
        'string.min': 'El campo "Localidad" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Localidad" debe tener como máximo 15 caracteres'
      })
      .required(),

    telefono: Joi.number()
      .min(99999999)
      .max(999999999999)
      .messages({
        'string.base': 'El campo "Telefono" debe ser una cadena numerica',
        'string.empty': 'El campo "Telefono" es un campo requerido',
        'string.min': 'El campo "Telefono" debe tener al menos 9 caracteres',
        'string.max': 'El campo "Telefono" debe tener como máximo 12 caracteres'
      })
      .required(),

    contrato: Joi.string()
      .valid('Termino Fijo', 'Termino Indefinido', 'Termino Temporal', 'Labor')
      .messages({
        'any.only': 'El campo "Contrato" debe contener un contrato valida'
      }),

    hsLaborales: Joi.number()
      .min(3)
      .max(8)
      .messages({
        'string.base': 'El campo "Horas Laborales" debe ser una cadena numerica',
        'string.empty': 'El campo "Horas Laborales" es un campo requerido',
        'string.min': 'El campo "Horas Laborales" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Horas Laborales" debe tener como máximo 8 caracteres'
      })
      .required(),

    salario: Joi.number()
      .min(9999)
      .max(999999999)
      .messages({
        'string.base': 'El campo "Salario" debe ser una cadena numerica',
        'string.empty': 'El campo "Salario" es un campo requerido',
        'string.min': 'El campo "Salario" debe tener al menos 4 caracteres',
        'string.max': 'El campo "Salario" debe tener como máximo 9 caracteres'
      })
      .required(),

    fechaActualizacionSalario: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Actualizacion de Salario" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Actualizacion de Salario" no puede permanecer vacio.'
      })
      .required(),

    numeroSeguridadSocial: Joi.number()
      .min(999)
      .max(999999999999)
      .messages({
        'string.base': 'El campo "Numero de Seguridad Social" debe ser una cadena numerica',
        'string.empty': 'El campo "Numero de Seguridad Social" es un campo requerido',
        'string.min': 'El campo "Numero de Seguridad Social" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Numero de Seguridad Social" debe tener como máximo 12 caracteres'
      })
      .required(),

    oficina: Joi.string().valid('Rosario', 'Vgg', 'San Lorenzo').messages({
      'any.only': 'El campo "Oficina" debe contener una oficina valida'
    }),

    departamento: Joi.string().valid('Administracion', 'Produccion', 'Marketing', 'RRHH').messages({
      'any.only': 'El campo "Departamento" debe contener un departamento valido'
    }),

    puesto: Joi.string().valid('Gerente', 'Empleado').messages({
      'any.only': 'El campo "Puesto" debe contener un puesto valido'
    }),

    cantidadHijos: Joi.number()
      .min(0)
      .max(20)
      .messages({
        'string.base': 'El campo "Cantidad Hijos" debe ser una cadena numerica',
        'string.empty': 'El campo "Cantidad Hijos" es un campo requerido',
        'string.min': 'El campo "Cantidad Hijos" debe tener al menos 0 caracteres',
        'string.max': 'El campo "Cantidad Hijos" debe tener como máximo 2 caracteres'
      })
      .required(),

    estadoCivil: Joi.string().valid('Casado/a', 'Soltero/a', 'Viudo/a', 'Divorciado/a').messages({
      'any.only': 'El campo "Compañia Aseguradora" debe contener una CIA valida'
    }),

    activo: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Activo" es un campo booleano',
        'boolean.empty': 'El campo "Activo" debe tener un valor determinado'
      })
      .required(),

    cuentaBancaria: Joi.number()
      .min(9999)
      .max(999999999999)
      .messages({
        'string.base': 'El campo "Cuenta Bancaria" debe ser una cadena numerica',
        'string.empty': 'El campo "Cuenta Bancaria" es un campo requerido',
        'string.min': 'El campo "Cuenta Bancaria" debe tener al menos 4 caracteres',
        'string.max': 'El campo "Cuenta Bancaria" debe tener como máximo 12 caracteres'
      })
      .required()
  });

  const columnTitleArray = [
    'Nombre',
    'Apellido',
    'Tipo',
    'DNI',
    'Departamento',
    'Oficina',
    'Puesto'
  ];
  const columns = ['nombre', 'apellido', 'tipo', 'dni', 'departamento', 'oficina', 'puesto'];

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
    defaultValues: { ...controladores }
  });

  const calculateStats = (siniestros) => {
    if (
      siniestros.length === 0 ||
      (siniestros.length === 1 && siniestros[0].statsGramaticaProlijidad == undefined)
    ) {
      getSiniestroStats(dispatch, idControlador, 'controlador');
      setSiniestrosEvaluados(0);
      setCorreccion(0);
      setProlijidad(0);
      setDesarrollo(0);
      setJustificacion(0);
      setTotal(0);
    } else {
      const nuevoArray = siniestros.map((siniestro) => {
        const {
          statsSolicitudCorreccion,
          statsGramaticaProlijidad,
          statsDesarrolloSiniestro,
          statsJustificacionDemoras
        } = siniestro;
        return {
          statsSolicitudCorreccion,
          statsGramaticaProlijidad,
          statsDesarrolloSiniestro,
          statsJustificacionDemoras
        };
      });
      setSiniestrosEvaluados(nuevoArray.length);
      const arrayStatsSolicitudCorreccion = [];
      const arrayStatsGramaticaProlijidad = [];
      const arrayStatsDesarrolloSiniestro = [];
      const arrayStatsJustificacionDemoras = [];
      nuevoArray.forEach((objeto) => {
        arrayStatsSolicitudCorreccion.push(objeto.statsSolicitudCorreccion);
        arrayStatsGramaticaProlijidad.push(objeto.statsGramaticaProlijidad);
        arrayStatsDesarrolloSiniestro.push(objeto.statsDesarrolloSiniestro);
        arrayStatsJustificacionDemoras.push(objeto.statsJustificacionDemoras);
      });
      const transformArrays = () => {
        const transformarArray = (array, mapeo) => {
          return array
            .filter((valor) => valor !== undefined)
            .map((valor) => (mapeo[valor] !== undefined ? mapeo[valor] : valor));
        };
        const mapeoGramaticaSolicitud = {
          'Muy alto': 1,
          Alto: 2,
          Moderado: 3,
          Bajo: 4,
          Nulo: 5
        };
        const mapeoDesarrolloSiniestro = {
          'Muy alto': 5,
          Alto: 4,
          Moderado: 3,
          Bajo: 2,
          Nulo: 1
        };
        const mapeoJustificacionDemoras = {
          No: 2,
          Si: 1,
          Moderado: 1.5
        };
        setStatsSolicitudCorreccion(
          transformarArray(arrayStatsSolicitudCorreccion, mapeoGramaticaSolicitud)
        );
        setStatsGramaticaProlijidad(
          transformarArray(arrayStatsGramaticaProlijidad, mapeoGramaticaSolicitud)
        );
        setStatsDesarrolloSiniestro(
          transformarArray(arrayStatsDesarrolloSiniestro, mapeoDesarrolloSiniestro)
        );
        setStatsJustificacionDemoras(
          transformarArray(arrayStatsJustificacionDemoras, mapeoJustificacionDemoras)
        );
      };
      transformArrays();
      const calculate = (array) => {
        if (array.length === 0) {
          return 0;
        }
        const suma = array.reduce((acc, valor) => acc + valor, 0);
        const resultado = suma / array.length;
        return resultado;
      };

      const calculateJustificacion = (array) => {
        if (array.length === 0) {
          return 0;
        }
        const cantidadDeNo = array.filter((valor) => valor === 2).length;
        const cantidadDeModerados = array.filter((valor) => valor === 1.5).length;
        const nuevaCantidadDeModerados = cantidadDeModerados / 2;
        const porcentajeDeDos = ((cantidadDeNo + nuevaCantidadDeModerados) / array.length) * 100;
        return porcentajeDeDos;
      };
      setJustificacion(calculateJustificacion(statsJustificacionDemoras));
      setCorreccion(calculate(statsSolicitudCorreccion));
      setProlijidad(calculate(statsGramaticaProlijidad));
      setDesarrollo(calculate(statsDesarrolloSiniestro));
      const calculateTotal = (valor1, valor2, valor3, justificacion) => {
        const justificacionRedondeada = Math.round(justificacion);
        if (justificacionRedondeada >= 0 && justificacionRedondeada <= 10) {
          return (valor1 + valor2 + valor3) / 1;
        } else if (justificacionRedondeada === 100) {
          return (valor1 + valor2 + valor3) / 100;
        } else {
          return (valor1 + valor2 + valor3) / justificacionRedondeada;
        }
      };
      setTotal(calculateTotal(statsCorrecciones, statsProlijidad, statsSiniestro, statsDemoras));
    }
  };

  const tableClick = (index) => {
    const formattedData = {
      ...controladores[index]
    };
    setShowButton(true);
    setSelectedControlador(`${formattedData.nombre} ${formattedData.apellido}`);
    setIdControlador(formattedData._id);
    reset({ ...formattedData });
    setShowStats(true);
    calculateStats(siniestros);
  };

  const onConfirmFunction = async () => {
    const editControladorResponse = await updateControlador(dispatch, controlador._id, controlador);
    if (editControladorResponse.type === 'UPDATE_NOVEDAD_SUCCESS') {
      setToastErroOpen(false);
      setModalSuccessOpen(true);
      return setTimeout(() => {}, 1000);
    }
    return setToastErroOpen(true);
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      fechaNacimiento: formatDate(data.fechaNacimiento),
      fechaActualizacionSalario: formatDate(data.fechaActualizacionSalario)
    };
    setControlador(formattedData);
    setModalAddConfirmOpen(true);
  };

  useEffect(() => {
    getControlador(dispatch);
    getSiniestroStats(dispatch, idControlador, 'controlador');
  }, []);

  useEffect(() => {
    getSiniestroStats(dispatch, idControlador, 'controlador');
    calculateStats(siniestros);
  }, [idControlador]);

  useEffect(() => {
    calculateStats(siniestros);
  }, [siniestros]);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={'Editar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={'Esta seguro que quiere editar este controlador?'}
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={'Novedad actualizada.'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>LISTADO DE CONTROLADORES</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.topTable}>
          <div className={styles.form}>
            <div className={styles.formContainer}>
              {isPending ? (
                <Loader />
              ) : (
                <TableList
                  handleClick={tableClick}
                  columnTitleArray={columnTitleArray}
                  data={controladores}
                  columns={columns}
                />
              )}
            </div>
          </div>
          {showStats ? (
            <div className={styles.formStats}>
              <div className={styles.titleContainer}>
                <p className={styles.title}>DESEMPEÑO DE CONTROLADOR</p>
              </div>
              <div className={styles.subTitleContainer}>
                <p className={styles.subTitle}>{selectedControlador}</p>
              </div>
              <div className={styles.inputContainer}>
                <InputsStats
                  data={siniestrosEvaluados}
                  nameTitle="Siniestros Evaluados"
                  type="number"
                  nameInput="numSiniestro"
                />
              </div>
              <div className={styles.inputContainer}>
                <InputsStats
                  data={statsCorrecciones}
                  nameTitle="Puntaje de Correcciones"
                  type="number"
                  nameInput="numSiniestro"
                />
              </div>
              <div className={styles.inputContainer}>
                <InputsStats
                  data={statsProlijidad}
                  nameTitle="Puntaje de Prolijidad"
                  type="number"
                  nameInput="numSiniestro"
                />
              </div>
              <div className={styles.inputContainer}>
                <InputsStats
                  data={statsSiniestro}
                  nameTitle="Puntaje de Desarrollo"
                  type="number"
                  nameInput="numSiniestro"
                />
              </div>
              <div className={styles.inputContainer}>
                <InputsStats
                  data={statsDemoras}
                  nameTitle="Porcentaje de Demoras"
                  type="number"
                  nameInput="numSiniestro"
                />
              </div>
              <div className={styles.inputContainer}>
                <InputsStats
                  data={statsTotal}
                  nameTitle="Puntaje Total"
                  type="number"
                  nameInput="numSiniestro"
                />
              </div>
              <div className={styles.subTextContainer}>
                <p className={styles.subText}>
                  *Los valores -Puntaje- varian entre 0 - 5 en relacion al desempeño. El valor
                  -Porcentaje- indica una estadistica de demoras presentadas. Puntaje final
                  relaciona los valores aportados anteriormente estableciendo un indice de desempeño
                  final.
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles.formContainer}
          encType="multipart/form-data"
        >
          <div className={styles.form}>
            <div className={styles.formContainer}>
              <div className={styles.groupContainer}>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={tipoArray}
                      dataLabel="Tipo"
                      name="tipo"
                      register={register}
                      error={errors.tipo?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.nombre?.message}
                      register={register}
                      nameTitle="Nombre"
                      type="text"
                      nameInput="nombre"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.apellido?.message}
                      register={register}
                      nameTitle="Apellido"
                      type="text"
                      nameInput="apellido"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.email?.message}
                      register={register}
                      isDisabled={true}
                      nameTitle="Email"
                      type="text"
                      nameInput="email"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.numeroSeguridadSocial?.message}
                      register={register}
                      nameTitle="N° Seguridad Social"
                      type="number"
                      nameInput="numeroSeguridadSocial"
                      styleInput="numberInput"
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.dni?.message}
                      register={register}
                      nameTitle="Dni"
                      type="text"
                      nameInput="dni"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaNacimiento?.message}
                      register={register}
                      nameTitle="Fecha Nacimiento"
                      type="date"
                      nameInput="fechaNacimiento"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaContratacion?.message}
                      register={register}
                      nameTitle="Fecha Contratacion"
                      type="date"
                      nameInput="fechaContratacion"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.direccion?.message}
                      register={register}
                      nameTitle="Direccion"
                      type="text"
                      nameInput="direccion"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.localidad?.message}
                      register={register}
                      nameTitle="Localidad"
                      type="text"
                      nameInput="localidad"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.telefono?.message}
                      register={register}
                      nameTitle="Telefono"
                      type="text"
                      nameInput="telefono"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={contratoArray}
                      dataLabel="Conrato"
                      name="contrato"
                      register={register}
                      error={errors.contrato?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.hsLaborales?.message}
                      register={register}
                      nameTitle="HsLaborales"
                      type="number"
                      nameInput="hsLaborales"
                      styleInput="numberInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.salario?.message}
                      register={register}
                      nameTitle="Salario"
                      type="number"
                      nameInput="salario"
                      styleInput="numberInput"
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={oficinaArray}
                      dataLabel="Oficina"
                      name="oficina"
                      register={register}
                      error={errors.oficina?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={departamentoArray}
                      dataLabel="Departamento"
                      name="departamento"
                      register={register}
                      error={errors.departamento?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={puestoArray}
                      dataLabel="Puesto"
                      name="puesto"
                      register={register}
                      error={errors.puesto?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.cantidadHijos?.message}
                      register={register}
                      nameTitle="Cantidad Hijos"
                      type="number"
                      nameInput="cantidadHijos"
                      styleInput="numberInput"
                      required
                    />
                  </div>
                </div>
                <div className={styles.inputColumn}>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.activo?.message}
                      register={register}
                      nameTitle="Activo"
                      type="checkbox"
                      nameInput="activo"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.cuentaBancaria?.message}
                      register={register}
                      nameTitle="Cuenta Bancaria"
                      type="number"
                      nameInput="cuentaBancaria"
                      styleInput="numberInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={civilArray}
                      dataLabel="Estado Civil"
                      name="estadoCivil"
                      register={register}
                      error={errors.estadoCivil?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaActualizacionSalario?.message}
                      register={register}
                      nameTitle="Fecha Actualizacion Salario"
                      type="date"
                      nameInput="fechaActualizacionSalario"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonsGroup}>
              {showButton && (
                <Button clickAction={() => {}} text="ACTUALIZAR" testId="signup-btn" />
              )}
              <Button
                text="Cancelar"
                clickAction={() => history.goBack()}
                testId="signup-cancel-btn"
              />
            </div>
          </div>
        </form>
      </div>
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in databaseee" />
      )}
    </div>
  );
}
export default Controlador;
