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
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
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
import { updateEvento, postEvento, getEventoSiniestro, deleteEvento } from 'redux/evento/thunks';
import { postRueda, getRuedaSiniestro, updateRueda, deleteRueda } from 'redux/rueda/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { getVehiculoSiniestro } from 'redux/vehiculo/thunks';
import { getInvolucradoSiniestro } from 'redux/involucrado/thunks';
import { getByIdSiniestro } from 'redux/siniestro/thunks';

const InspeccionRoboRuedasForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useParams();
  const siniestroId = data.id;
  const role = sessionStorage.getItem('role');

  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [inspeccionRoboRueda, setInspeccionRoboRueda] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [redirectEntity, setRedirectEntity] = useState('');
  const [idInspeccion, setIdInspeccion] = useState([]);

  const [modalAddConfirmOpenEvento, setModalAddConfirmOpenEvento] = useState(false);
  const [modalSuccessEvento, setModalSuccessOpenEvento] = useState(false);
  const [openFormEvento, setOpenFormEvento] = useState(false);
  const [formTypeEvento, setFormTypeEvento] = useState(false);
  const [evento, setEvento] = useState({});

  const [rueda, setRueda] = useState({});
  const [modalAddConfirmOpenRueda, setModalAddConfirmOpenRueda] = useState(false);
  const [formTypeRueda, setFormTypeRueda] = useState(false);
  const [selectedInvolucradosRueda, setSelectedInvolucradosRueda] = useState([]);
  const [selectedVehiculosRueda, setSelectedVehiculosRueda] = useState([]);
  const [openFormRueda, setOpenFormRueda] = useState(false);

  const currentRueda = useSelector((state) => state.rueda.list);
  const currentEvento = useSelector((state) => state.evento.list);
  const currentInspeccionRoboRueda = useSelector((state) => state.inspeccionRoboRueda.list);
  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);
  const item = useSelector((state) => state.siniestro.list);

  //Array Eventos
  const arrayTipo = ['Acontesimiento', 'Sospecha'];
  const arrayComprobar = ['A comprobar', 'Sin necesidad', 'Comprobado', 'No comprobado'];
  const arrayComprobable = [
    'Totalmente comprobable',
    'Comprobable',
    'Parcialmente comprobable',
    'No comprobable'
  ];
  const arrayPredisposicion = ['Buena', 'Media', 'Mala', 'Negacion'];
  const arrayResultado = ['Inconsistencias', 'Sin inconsistencias', 'Fraudulencia'];
  const arrayPermisos = [
    'Inspeccion permitida',
    'Inspeccion no permitida',
    'Inspeccion dificultada'
  ];
  const arrayProgramada = ['Inspeccion programada', 'Inspeccion no programada'];
  const columnTitleArrayEvento = ['Fecha', 'Hora', 'Tipo', 'Comprobar', 'Comprobado'];
  const columnsEvento = ['fecha', 'hora', 'tipo', 'comprobar', 'comprobado'];

  //Array Ruedas
  const arrayTipoRueda = ['Original', 'Suplente', 'Prestada'];
  const arrayTipoLlanta = ['Aleacion', 'Chapa', 'Otro'];
  const arrayPosicionActual = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayPosicionPrevia = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayPosicionTransitoria = ['DI', 'DD', 'TI', 'TD', 'AUX', 'N/N'];
  const arrayEstado = ['Nuevo', 'Medio desgastado', 'Desgastado'];
  const arrayAporteFoto = ['Se aportan fotos previas', 'No se aportan fotos previas'];
  const arrayMetadatosFoto = ['Metadatos presentes', 'Sin metadatos presentes'];
  const columnTitleRueda = ['DOT', 'Llanta', 'Tipo', 'Marca', 'Actual', 'Sustraida'];
  const columnsRueda = ['numDot', 'numLlanta', 'tipo', 'marca', 'posicionActual', 'sustraida'];

  //Array Inspecciones
  const columnTitleInspeccion = [
    'Fecha',
    'Hora',
    'Direccion',
    'Ciudad',
    'Permiso',
    'Programada',
    'Presencia'
  ];
  const columnsInspeccion = [
    'fecha',
    'hora',
    'direccion',
    'ciudad',
    'permiso',
    'programada',
    'presencia'
  ];
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

  const schemaFormEvento = Joi.object({
    visibilidadEntrevista: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad Entrevista" es un campo booleano',
        'boolean.empty': 'El campo "Prioridad" debe tener un valor determinado'
      })
      .required(),
    visibilidadInforme: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad Informe" es un campo booleano',
        'boolean.empty': 'El campo "Visibilidad Informe" debe tener un valor determinado'
      })
      .required(),
    tipo: Joi.string()
      .valid('Acontesimiento', 'Sospecha')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
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
    descripcion: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 50 caracteres'
      })
      .required(),
    comprobar: Joi.string()
      .valid('A comprobar', 'Sin necesidad', 'Comprobado', 'No comprobado')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    comprobado: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobado" es un campo booleano',
        'boolean.empty': 'El campo "Comprobado" debe tener un valor determinado'
      })
      .required(),
    comprobable: Joi.string()
      .valid('Totalmente comprobable', 'Comprobable', 'Parcialmente comprobable', 'No comprobable')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    predisposicion: Joi.string()
      .valid('Buena', 'Media', 'Mala', 'Negacion')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    resolucion: Joi.string()
      .min(3)
      .max(200)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 50 caracteres'
      })
      .required(),
    siniestro: Joi.any(),
    evento: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any()
  });

  const schemaFormInspeccion = Joi.object({
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
    _id: Joi.any(),
    vehiculo: Joi.any(),
    involucrado: Joi.any(),
    entrevistaRoboRueda: Joi.any(),
    ruedaInspeccion: Joi.any(),
    ruedaEntrevista: Joi.any(),
    inspeccionRoboRueda: Joi.any(),
    rueda: Joi.any()
  });

  const schemaFormRueda = Joi.object({
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
    involucrado: Joi.any(),
    entrevistaRoboRueda: Joi.any(),
    ruedaInspeccion: Joi.any(),
    ruedaEntrevista: Joi.any(),
    inspeccionRoboRueda: Joi.any()
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schemaFormInspeccion),
    defaultValues: { ...inspeccionRoboRueda }
  });

  const {
    register: registerEvento,
    handleSubmit: handleSubmitEvento,
    reset: resetEvento,
    formState: { errors: errorsEvento }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schemaFormEvento),
    defaultValues: { ...evento }
  });

  const {
    register: registerRueda,
    handleSubmit: handleSubmitRueda,
    reset: resetRueda,
    formState: { errors: errorsRueda }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schemaFormRueda),
    defaultValues: { ...rueda }
  });

  const resetFormInspeccion = () => {
    setButtonType(false);
    const emptyData = {
      presencia: false,
      direccion: '',
      ciudad: '',
      fecha: 'dd / mm / aaaa',
      hora: 'dd / mm / aaaa',
      resultado: '',
      permiso: '',
      programada: '',
      disposicion: '',
      daños: '',
      conclusion: ''
    };
    reset({ ...emptyData });
  };

  const resetFormEvento = () => {
    setFormTypeEvento(false);
    const emptyData = {
      visibilidadEntrevista: false,
      visibilidadInforme: false,
      tipo: '',
      fecha: 'dd / mm / aaaa',
      hora: 'dd / mm / aaaa',
      descripcion: '',
      comprobar: '',
      comprobado: false,
      comprobable: '',
      predisposicion: '',
      resolucion: ''
    };
    resetEvento({ ...emptyData });
  };

  const resetFormRueda = () => {
    setFormTypeRueda(false);
    const emptyData = {
      descripcion: '',
      marca: '',
      numDot: '',
      numLlanta: '',
      tipo: '',
      tipoLlanta: '',
      posicionActual: '',
      fechaColocacion: 'dd / mm / aaaa',
      posicionPrevia: '',
      posicionTransitoria: '',
      sustraida: false,
      estado: '',
      aporteFoto: '',
      metadatosFoto: '',
      factura: false,
      aporteFactura: false,
      anotaciones: ''
    };
    resetRueda({ ...emptyData });
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

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const onConfirmInspeccion = async () => {
    if (!buttonType) {
      const inspeccionRoboRuedaSiniestro = { ...inspeccionRoboRueda };
      const postInspeccionRoboRuedaFetch = await postInspeccionRoboRueda(
        dispatch,
        inspeccionRoboRuedaSiniestro,
        selectedInvolucrados,
        selectedVehiculos,
        currentRueda,
        data.id
      );
      if (postInspeccionRoboRuedaFetch.type === 'POST_INSPECCIONROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editInspeccionRoboRuedaResponse = await updateInspeccionRoboRueda(
        dispatch,
        inspeccionRoboRueda._id,
        inspeccionRoboRueda,
        selectedInvolucrados,
        selectedVehiculos,
        currentRueda,
        data.id
      );
      if (editInspeccionRoboRuedaResponse.type === 'UPDATE_INSPECCIONROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onConfirmEvento = async () => {
    if (!formTypeEvento) {
      const eventoSiniestro = { ...evento, siniestro: siniestroId };
      const postEventoFetch = await postEvento(dispatch, eventoSiniestro);
      if (postEventoFetch.type === 'POST_EVENTO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpenEvento(true);
        return setTimeout(() => {}, 1000);
      }
      setFormTypeEvento(true);
      return setToastErroOpen(true);
    } else {
      const fetchUpdateEventoResponse = await updateEvento(dispatch, evento);
      if (fetchUpdateEventoResponse.type === 'UPDATE_EVENTO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpenEvento(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onConfirmRueda = async () => {
    if (buttonType) {
      if (!formTypeRueda) {
        const ruedaSiniestro = { ...rueda };
        const postRuedaFetch = await postRueda(
          dispatch,
          ruedaSiniestro,
          selectedInvolucradosRueda,
          selectedVehiculosRueda,
          idInspeccion,
          siniestroId
        );
        if (postRuedaFetch.type === 'POST_RUEDA_SUCCESS') {
          setToastErroOpen(false);
          return setTimeout(() => {}, 1000);
        }
        return setToastErroOpen(true);
      } else {
        const editRuedaFetch = await updateRueda(
          dispatch,
          rueda,
          selectedInvolucradosRueda,
          selectedVehiculosRueda,
          idInspeccion
        );
        if (editRuedaFetch.type === 'UPDATE_RUEDA_SUCCESS') {
          setToastErroOpen(false);
          return setTimeout(() => {}, 1000);
        }
        return setToastErroOpen(true);
      }
    }
    return setToastErroOpen(true);
  };

  const onSubmit = async (data) => {
    if (buttonType) {
      const formattedData = {
        ...data,
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora),
        siniestro: [siniestroId]
      };
      setInspeccionRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora),
        siniestro: [siniestroId]
      };
      setInspeccionRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const onSubmitEvento = async (data) => {
    if (formTypeEvento) {
      const formattedData = {
        ...data,
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora)
      };
      setEvento(formattedData);
      setModalAddConfirmOpenEvento(true);
    } else {
      const formattedData = {
        ...data,
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora)
      };
      setEvento(formattedData);
      setModalAddConfirmOpenEvento(true);
    }
  };

  const onSubmitRueda = async (data) => {
    if (formTypeRueda) {
      const formattedData = {
        ...data,
        fechaColocacion: formatDate(data.fechaColocacion),
        ruedaEntrevista: false,
        ruedaInspeccion: true
      };
      setRueda(formattedData);
      setModalAddConfirmOpenRueda(true);
    } else {
      const formattedData = {
        ...data,
        fechaColocacion: formatDate(data.fechaColocacion),
        ruedaEntrevista: false,
        ruedaInspeccion: true
      };
      setRueda(formattedData);
      setModalAddConfirmOpenRueda(true);
    }
  };

  const openFormEventos = () => {
    if (openFormEvento) {
      setOpenFormRueda(true);
      setOpenFormEvento(false);
    } else {
      setOpenFormEvento(true);
      setOpenFormRueda(false);
    }
  };

  const openFormRuedas = () => {
    if (openFormRueda) {
      setOpenFormRueda(false);
      setOpenFormEvento(true);
    } else {
      setOpenFormEvento(false);
      setOpenFormRueda(true);
    }
  };

  const deleteButton = deleteInspeccionRoboRueda;

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
      setSelectedVehiculos([vehiculos[index]._id]);
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

  const tableClick = (index) => {
    const formattedData = {
      ...currentInspeccionRoboRueda[index],
      fecha: formatDate(currentInspeccionRoboRueda[index].fecha),
      hora: formatDate(currentInspeccionRoboRueda[index].hora)
    };
    setIdInspeccion(currentInspeccionRoboRueda[index]._id);
    setInspeccionRoboRueda(formattedData);
    reset({ ...formattedData });
    setButtonType(true);
  };

  const tableClickForm = (index) => {
    const resetDataEvento = {
      ...currentEvento[index]
    };
    resetEvento({ ...resetDataEvento });
    const resetDataRueda = {
      ...currentRueda[index]
    };
    resetRueda({ ...resetDataRueda });
    setSelectedInvolucradosRueda(resetDataRueda.involucrado);
    setSelectedVehiculosRueda(resetDataRueda.vehiculo);
    if (openFormRueda) {
      setFormTypeRueda(true);
    } else {
      setFormTypeEvento(true);
    }
  };

  const involucradoRedirect = () => {
    setRedirect(true);
    setRedirectEntity('involucrado');
  };

  const vehiculoRedirect = () => {
    setRedirect(true);
    setRedirectEntity('vehiculo');
  };

  const deleteButtonEvento = deleteEvento;
  const deleteButtonRueda = deleteRueda;

  const cancelForm = () => {
    if (role == 'CONTROLADOR') {
      history.push(`/controlador/siniestros/form/${item[0]._id}`, {
        params: { ...item[0], mode: 'edit' }
      });
    }
    if (role == 'RELEVADOR') {
      history.push(`/relevador/siniestros/form/${item[0]._id}`, {
        params: { ...item[0], mode: 'edit' }
      });
    }
    if (role == 'ADMINISTRATIVO') {
      history.push(`/administrativo/siniestros/form/${item[0]._id}`, {
        params: { ...item[0], mode: 'edit' }
      });
    }
  };

  useEffect(() => {
    resetFormRueda();
    resetFormEvento();
    getByIdSiniestro(dispatch, data.id);
  }, [currentRueda, currentEvento]);

  useEffect(() => {
    if (currentInspeccionRoboRueda?.vehiculo) {
      setSelectedVehiculos(currentInspeccionRoboRueda.vehiculo);
    }
  }, [currentInspeccionRoboRueda?.vehiculo?.length]);

  useEffect(() => {
    if (currentInspeccionRoboRueda?.involucrado) {
      setSelectedInvolucrados(currentInspeccionRoboRueda.involucrado);
    }
  }, [currentInspeccionRoboRueda?.involucrado?.length]);

  useEffect(() => {
    if (inspeccionRoboRueda?.involucrado) {
      setSelectedInvolucrados(inspeccionRoboRueda.involucrado);
    }
    if (inspeccionRoboRueda?.vehiculo) {
      setSelectedVehiculos(inspeccionRoboRueda.vehiculo);
    }
  }, [idInspeccion]);

  useEffect(() => {
    getEventoSiniestro(dispatch, siniestroId);
    getRuedaSiniestro(dispatch, siniestroId, idInspeccion);
  }, [openFormEvento, openFormRueda, idInspeccion]);

  useEffect(() => {
    getAllInspeccionRoboRueda(dispatch, data.id);
    getVehiculoSiniestro(dispatch, data.id);
    getInvolucradoSiniestro(dispatch, data.id);
    getEventoSiniestro(dispatch, data.id, idInspeccion);
    getRuedaSiniestro(dispatch, data.id);
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmInspeccion()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? '¿Estás seguro de que quieres actualizar esta inspeccion?'
                  : '¿Estás seguro de que quieres agregar esta inspeccion?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              redirect={redirect}
              redirectEntity={redirectEntity}
              createdEntity={inspeccionRoboRueda}
              sinId={siniestroId}
              message={buttonType ? 'Inspeccion editada' : 'Inspeccion agregada'}
            />
          )}
        </div>
      }
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmInspeccion()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? '¿Estás seguro de que quieres actualizar esta inspeccion?'
                  : '¿Estás seguro de que quieres agregar esta inspeccion?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              redirect={redirect}
              redirectEntity={redirectEntity}
              createdEntity={inspeccionRoboRueda}
              sinId={siniestroId}
              message={buttonType ? 'Inspeccion editada' : 'Inspeccion agregada'}
            />
          )}
        </div>
      }
      {
        <div>
          {modalAddConfirmOpenEvento && (
            <ModalConfirm
              method={formTypeEvento ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmEvento()}
              setModalAddConfirmOpenEvento={setModalAddConfirmOpenEvento}
              message={
                formTypeEvento
                  ? '¿Estás seguro de que quieres actualizar este evento?'
                  : '¿Estás seguro de que quieres agregar este evento?'
              }
            />
          )}
          {modalSuccessEvento && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpenEvento}
              message={formTypeEvento ? 'Se ha modificado un evento.' : 'Se ha agregado un evento.'}
            />
          )}
        </div>
      }
      {
        <div>
          {modalAddConfirmOpenRueda && (
            <ModalConfirm
              method={formTypeRueda ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmRueda()}
              setModalConfirmOpen={setModalAddConfirmOpenRueda}
              message={
                formTypeRueda
                  ? '¿Estás seguro de que quieres actualizar esta rueda?'
                  : '¿Estás seguro de que quieres agregar esta rueda?'
              }
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
              columnTitleArray={columnTitleInspeccion}
              columns={columnsInspeccion}
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
                  <Checkbox
                    error={errors.presencia?.message}
                    register={register}
                    nameTitle="Presencia"
                    type="checkbox"
                    nameInput="presencia"
                    required
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
                    error={errors.direccion?.message}
                    register={register}
                    nameTitle="Direccion"
                    type="text"
                    nameInput="direccion"
                  />
                </div>
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
              <Button clickAction={resetFormInspeccion} text="Reiniciar" />
              <Button submition={true} text="Cancelar" clickAction={cancelForm} />
            </div>
          </div>
          <div className={styles.bottomTable}>
            <div className={styles.tableContainerEntities}>
              <Button clickAction={() => involucradoRedirect()} text="Involucrados" />
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
            <div className={styles.tableContainerEntities}>
              <Button clickAction={() => vehiculoRedirect()} text="Vehiculos" />
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
            <div className={styles.formEvento}>
              <div className={styles.btnContainerEvento}>
                <Button
                  submition={true}
                  clickAction={openFormEventos}
                  text={openFormEvento ? 'Eventos' : 'Eventos'}
                />
                <Button
                  submition={true}
                  clickAction={openFormRuedas}
                  text={openFormRueda ? 'Ruedas' : 'Ruedas'}
                />
              </div>
            </div>
          </div>
        </form>
        {openFormEvento && (
          <div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>FORMULARIO EVENTOS</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmitEvento(onSubmitEvento)}>
              <div className={styles.formContainer}>
                <section className={styles.inputGroups}>
                  <div className={styles.inputColumn}>
                    <div className={styles.inputContainer}>
                      <DateInput
                        error={errorsEvento.fecha?.message}
                        register={registerEvento}
                        nameTitle="Fecha"
                        type="date"
                        nameInput="fecha"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayComprobar}
                        dataLabel="Comprobar"
                        name="comprobar"
                        register={registerEvento}
                        error={errorsEvento.comprobar?.message}
                      />
                    </div>
                    <div className={styles.inputContainerPredisposicion}>
                      <OptionInput
                        data={arrayPredisposicion}
                        dataLabel="Predisposicion"
                        name="predisposicion"
                        register={registerEvento}
                        error={errorsEvento.predisposicion?.message}
                      />
                    </div>
                    <div className={styles.inputContainerCheck}>
                      <Checkbox
                        error={errorsEvento.visibilidadEntrevista?.message}
                        register={registerEvento}
                        nameTitle="Visibilidad Entrevista"
                        type="checkbox"
                        nameInput="visibilidadEntrevista"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errorsEvento.visibilidadInforme?.message}
                        register={registerEvento}
                        nameTitle="Visibilidad Informe"
                        type="checkbox"
                        nameInput="visibilidadInforme"
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputColumn}>
                    <div className={styles.inputContainer}>
                      <DateInput
                        error={errorsEvento.hora?.message}
                        register={registerEvento}
                        nameTitle="Hora"
                        type="date"
                        nameInput="hora"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayComprobable}
                        dataLabel="Comprobable"
                        name="comprobable"
                        register={registerEvento}
                        error={errorsEvento.comprobable?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <TextArea
                        error={errorsEvento.descripcion?.message}
                        register={registerEvento}
                        nameTitle="Descripcion"
                        type="text"
                        nameInput="descripcion"
                        styleInput="small"
                        required
                      />
                    </div>
                  </div>
                  <div className={styles.inputColumn}>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayTipo}
                        dataLabel="Tipo"
                        name="tipo"
                        register={registerEvento}
                        error={errorsEvento.tipo?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errorsEvento.comprobado?.message}
                        register={registerEvento}
                        nameTitle="Comprobado"
                        type="checkbox"
                        nameInput="comprobado"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <TextArea
                        error={errorsEvento.resolucion?.message}
                        register={registerEvento}
                        nameTitle="Resolucion"
                        type="text"
                        nameInput="resolucion"
                        styleInput="small"
                        required
                      />
                    </div>
                  </div>
                </section>
                <div className={styles.btnContainer}>
                  <Button
                    clickAction={handleSubmitEvento(onSubmitEvento)}
                    text={formTypeEvento ? 'Editar' : 'Agregar'}
                  />
                  <Button clickAction={resetFormEvento} text="Reiniciar" />
                </div>
              </div>
              <div className={styles.tableTop}>
                <div className={styles.tableContainerRueda}>
                  <FormTable
                    data={currentEvento}
                    columnTitleArray={columnTitleArrayEvento}
                    columns={columnsEvento}
                    handleClick={tableClickForm}
                    deleteButton={deleteButtonEvento}
                    type={true}
                  />
                </div>
              </div>
            </form>
          </div>
        )}
        {openFormRueda && (
          <div>
            <div className={styles.titleContainer}>
              <p className={styles.title}>FORMULARIO RUEDAS</p>
            </div>
            <form className={styles.form} onSubmit={handleSubmitRueda(onSubmitRueda)}>
              <div className={styles.formContainer}>
                <section className={styles.inputGroups}>
                  <div className={styles.inputColumn}>
                    <div className={styles.inputContainerRueda}>
                      <TextArea
                        error={errorsRueda.descripcion?.message}
                        register={registerRueda}
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
                        register={registerRueda}
                        error={errorsRueda.posicionActual?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errorsRueda.numLlanta?.message}
                        register={registerRueda}
                        nameTitle="Numero Llanta"
                        type="text"
                        nameInput="numLlanta"
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <TextArea
                        error={errorsRueda.anotaciones?.message}
                        register={registerRueda}
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
                        error={errorsRueda.marca?.message}
                        register={registerRueda}
                        nameTitle="Marca"
                        type="text"
                        nameInput="marca"
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayTipoRueda}
                        dataLabel="Tipo"
                        name="tipo"
                        register={registerRueda}
                        error={errorsRueda.tipo?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayPosicionPrevia}
                        dataLabel="Posición Previa"
                        name="posicionPrevia"
                        register={registerRueda}
                        error={errorsRueda.posicionPrevia?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <DateInput
                        error={errorsRueda.fechaColocacion?.message}
                        register={registerRueda}
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
                        register={registerRueda}
                        error={errorsRueda.metadatosFoto?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errorsRueda.aporteFactura?.message}
                        register={registerRueda}
                        nameTitle="Aporte Factura"
                        type="checkbox"
                        nameInput="aporteFactura"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errorsRueda.sustraida?.message}
                        register={registerRueda}
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
                        error={errorsRueda.numDot?.message}
                        register={registerRueda}
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
                        register={registerRueda}
                        error={errorsRueda.tipoLlanta?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayPosicionTransitoria}
                        dataLabel="Posición Transitoria"
                        name="posicionTransitoria"
                        register={registerRueda}
                        error={errorsRueda.posicionTransitoria?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayAporteFoto}
                        dataLabel="Aporte Fotos"
                        name="aporteFoto"
                        register={registerRueda}
                        error={errorsRueda.aporteFoto?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayEstado}
                        dataLabel="Estado"
                        name="estado"
                        register={registerRueda}
                        error={errorsRueda.estado?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errorsRueda.factura?.message}
                        register={registerRueda}
                        nameTitle="Factura"
                        type="checkbox"
                        nameInput="factura"
                        required
                      />
                    </div>
                  </div>
                </section>
                <div className={styles.btnContainer}>
                  <Button
                    clickAction={handleSubmitRueda(onSubmitRueda)}
                    text={formTypeRueda ? 'Editar' : 'Agregar'}
                  />
                  <Button clickAction={resetFormRueda} text="Reiniciar" />
                </div>
              </div>
              <div className={styles.tableTop}>
                <div className={styles.tableContainerRueda}>
                  <FormTable
                    data={currentRueda}
                    columnTitleArray={columnTitleRueda}
                    columns={columnsRueda}
                    handleClick={tableClickForm}
                    deleteButton={deleteButtonRueda}
                    type={true}
                  />
                </div>
                <div className={styles.rightTables}>
                  <div className={styles.tableContainerBottom}>
                    <div className={styles.titleContainer}>
                      <p className={styles.title}>INVOLUCRADOS</p>
                    </div>
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
                  <div className={styles.tableContainerBottom}>
                    <div className={styles.titleContainer}>
                      <p className={styles.title}>VEHICULOS</p>
                    </div>
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
              </div>
            </form>
          </div>
        )}
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Seleccione una inspeccion'} />
      )}
    </div>
  );
};

export default InspeccionRoboRuedasForm;
