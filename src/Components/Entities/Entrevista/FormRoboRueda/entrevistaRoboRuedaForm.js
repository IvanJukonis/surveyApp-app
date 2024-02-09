import React, { useState, useEffect, useRef } from 'react';
import styles from './form.module.css';
import { getInvolucradoSiniestro } from 'redux/involucrado/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import FormTable from 'Components/Shared/formTable';
import { getVehiculoSiniestro } from 'redux/vehiculo/thunks';
import { postRueda, getRuedaSiniestro } from 'redux/rueda/thunks';
import { updateEvento, postEvento, getEventoSiniestro, deleteEvento } from 'redux/evento/thunks';
import { useLocation, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import {
  updateEntrevistaRoboRueda,
  postEntrevistaRoboRueda,
  getByIdEntrevistaRoboRueda
} from 'redux/entrevistaRoboRueda/thunks';

const EntrevistaRoboRuedasForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const siniestroId = location.state.params.siniestroId;
  const { params } = location.state || {};
  const { createdEntity } = params || {};
  const type = data.mode;

  const [formType, setFormType] = useState(type);
  const [errorMessage, setErrorMessage] = useState('Error');
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [entrevistaRoboRueda, setEntrevistaRoboRueda] = useState();
  const [dataEntrevistado, setDataEntrevistado] = useState();
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);
  const [selectedEntrevistado, setSelectedEntrevistado] = useState([]);
  const [buttonType, setButtonType] = useState(false);
  const [rueda, setRueda] = useState({});
  const [evento, setEvento] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [selectedInvolucradosRueda, setSelectedInvolucradosRueda] = useState([]);
  const [selectedVehiculosRueda, setSelectedVehiculosRueda] = useState([]);
  const [modalAddConfirmOpenEvento, setModalAddConfirmOpenEvento] = useState(false);
  const [modalSuccessEvento, setModalSuccessOpenEvento] = useState(false);
  const [modalAddConfirmOpenRueda, setModalAddConfirmOpenRueda] = useState(false);
  const [openFormRueda, setOpenFormRueda] = useState(false);
  const [openFormEvento, setOpenFormEvento] = useState(false);
  const [redirectEntity, setRedirectEntity] = useState('');

  const currentRueda = useSelector((state) => state.rueda.list);
  const currentEvento = useSelector((state) => state.evento.list);
  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);
  const currentEntrevista = useSelector((state) => state.entrevistaRoboRueda.list);
  const createdEntrevista = useSelector((state) => state.entrevistaRoboRueda.createdEntrevista);

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

  //Array Entrevista
  const rol = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG'];
  const firma = ['Sin Firma', 'Firmado', 'Negado', 'Espera'];
  const tipoEntrevista = ['Presencial', 'Telefonica', 'Videollamada'];
  const relacionVh = ['Titular', 'Autorizado', 'Pasajero', 'No autorizado'];
  const habilitacionDni = ['DNI habilitado', 'DNI no habilitado'];
  const habilitacionLc = ['Licencia de conducir habilitada', 'Licencia de conducir no habilitada'];
  const habilitacionTv = ['Tarjeta verde habilitada', 'Tarjeta verde no habilitada'];
  const habilitacionTa = ['Tarjeta azul habilitada', 'Tarjeta azul no habilitada'];
  const usoVh = ['Particular', 'Profesional', 'Servicio', 'Otro'];
  const columnTitleArray = [
    'Entrevistado',
    'Seleccionar',
    'Nombre',
    'Apellido',
    'Rol',
    'Telefono',
    'Prioridad'
  ];
  const columns = [
    'entrevistado',
    'selected',
    'nombre',
    'apellido',
    'rol',
    'telefono',
    'prioridad'
  ];
  const columnTitleVehiculo = ['Seleccionar', 'Modelo', 'Marca', 'Dominio', 'Prioridad'];
  const columnVehiculo = ['selected', 'modelo', 'marca', 'dominio', 'prioridad'];

  const schemaFormEntrevistaRoboRueda = Joi.object({
    fechaEntrevista: Joi.date()
      .messages({
        'date.base': 'El campo "Fecha de Entrevista" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Entrevista" no puede permanecer vacio.'
      })
      .required(),

    hrEntrevista: Joi.date()
      .messages({
        'date.base': 'El campo "Hora de Entrevista" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Entrevista" no puede permanecer vacio.'
      })
      .required(),

    rol: Joi.string()
      .valid('CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    firma: Joi.string().valid('Sin Firma', 'Firmado', 'Negado', 'Espera').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    tipoEntrevista: Joi.string().valid('Presencial', 'Telefonica', 'Videollamada').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    fechaSiniestro: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Fecha de Siniestro" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Siniestro" no puede permanecer vacio.'
      })
      .required(),

    hrAproximada: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Hora Aproximada" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora Aproximada" no puede permanecer vacio.'
      })
      .required(),

    hrNotificacion: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Hora de Notificacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Notificacion" no puede permanecer vacio.'
      })
      .required(),

    hrConfirmacion: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Hora de Confirmacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Confirmacion" no puede permanecer vacio.'
      })
      .required(),

    hrReclamo: Joi.date()
      .empty('')
      .messages({
        'date.base': 'El campo "Hora de Reclamo" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Reclamo" no puede permanecer vacio.'
      })
      .required(),

    relacionVh: Joi.string()
      .empty('')
      .valid('Titular', 'Autorizado', 'Pasajero', 'No autorizado')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    habilitacionDni: Joi.string().empty('').valid('DNI habilitado', 'DNI no habilitado').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    habilitacionLc: Joi.string()
      .empty('')
      .valid('Licencia de conducir habilitada', 'Licencia de conducir no habilitada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    habilitacionTv: Joi.string()
      .empty('')
      .valid('Tarjeta verde habilitada', 'Tarjeta verde no habilitada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    habilitacionTa: Joi.string()
      .empty('')
      .valid('Tarjeta azul habilitada', 'Tarjeta azul no habilitada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    aportaDni: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporta DNI" es un campo booleano',
        'boolean.empty': 'El campo "Aporta DNI" debe tener un valor determinado'
      })
      .required(),

    aportaLc: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporta Lincencia" es un campo booleano',
        'boolean.empty': 'El campo "Aporta Licencia" debe tener un valor determinado'
      })
      .required(),

    aportaTv: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporta Tv" es un campo booleano',
        'boolean.empty': 'El campo "Aporta Tv" debe tener un valor determinado'
      })
      .required(),

    aportaTa: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporta Ta" es un campo booleano',
        'boolean.empty': 'El campo "Aporta Ta" debe tener un valor determinado'
      })
      .required(),

    usoVh: Joi.string().empty('').valid('Particular', 'Profesional', 'Servicio', 'Otro').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    tipoUsoVh: Joi.string().empty('').max(500).messages({
      'string.base': 'El campo "Tipo de Uso" debe ser una cadena de texto',
      'string.empty': 'El campo "Tipo de Uso" es un campo requerido',
      'string.min': 'El campo "Tipo de Uso" debe tener al menos 3 caracteres'
    }),

    alarmaActiva: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Alarma" es un campo booleano',
        'boolean.empty': 'El campo "Alarma" debe tener un valor determinado'
      })
      .required(),

    cierreCentralizado: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Cierre Centralizado" es un campo booleano',
        'boolean.empty': 'El campo "Cierre Centralizado" debe tener un valor determinado'
      })
      .required(),

    duenoPrevio: Joi.string().empty('').max(500).messages({
      'string.base': 'El campo "Dueño previo" debe ser una cadena de texto'
    }),

    aportaDueñoPrevio: Joi.boolean().empty('').messages({
      'boolean.base': 'El campo "Aporte de Dueño Previo" es un campo booleano',
      'boolean.empty': 'El campo "Aporte de Dueño Previo" debe tener un valor determinado'
    }),

    tuercaDeSeguridad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Tuerca de Seguridad" es un campo booleano',
        'boolean.empty': 'El campo "Tuerca de Seguridad" debe tener un valor determinado'
      })
      .required(),

    bulones: Joi.string().max(500).empty('').messages({
      'string.base': 'El campo "Bulones" debe ser una cadena de texto',
      'string.max': 'El campo "Bulones" no debe exceder los 500 caracteres'
    }),

    prestaRueda: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Presta Ruedas" es un campo booleano',
        'boolean.empty': 'El campo "Presta Ruedas" debe tener un valor determinado'
      })
      .required(),

    intervensionPolicial: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Intervension Policial" es un campo booleano',
        'boolean.empty': 'El campo "Intervension Policial" debe tener un valor determinado'
      })
      .required(),

    actaIntervensionPolicial: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Acta" es un campo booleano',
        'boolean.empty': 'El campo "Acta" debe tener un valor determinado'
      })
      .required(),

    relato: Joi.string().empty('').max(500).messages({
      'string.base': 'El campo "Relato" debe ser una cadena de texto',
      'string.empty': 'El campo "Relato" es un campo requerido',
      'string.min': 'El campo "Relato" debe tener al menos 3 caracteres'
    })
  });

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
    _id: Joi.any()
  });

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const entrevistaUpdate = {
    fechaEntrevista: formatDate(data.fechaEntrevista),
    hrEntrevista: formatDate(data.hrEntrevista),
    rol: data.rol,
    firma: data.firma,
    tipoEntrevista: data.tipoEntrevista,
    fechaSiniestro: formatDate(data.fechaSiniestro),
    hrAproximada: formatDate(data.hrAproximada),
    hrNotificacion: formatDate(data.hrNotificacion),
    hrConfirmacion: formatDate(data.hrConfirmacion),
    hrReclamo: formatDate(data.hrReclamo),
    relacionVh: data.relacionVh,
    habilitacionDni: data.habilitacionDni,
    habilitacionLc: data.habilitacionLc,
    habilitacionTv: data.habilitacionTv,
    habilitacionTa: data.habilitacionTa,
    aportaDni: data.aportaDni,
    aportaLc: data.aportaLc,
    aportaTv: data.aportaTv,
    aportaTa: data.aportaTa,
    usoVh: data.usoVh,
    tipoUsoVh: data.tipoUsoVh,
    alarmaActiva: data.alarmaActiva,
    cierreCentralizado: data.cierreCentralizado,
    relato: data.relato,
    duenoPrevio: data.duenoPrevio,
    aportaDueñoPrevio: data.aportaDueñoPrevio,
    tuercaDeSeguridad: data.tuercaDeSeguridad,
    bulones: data.bulones,
    prestaRueda: data.prestaRueda,
    intervensionPolicial: data.intervensionPolicial,
    actaIntervensionPolicial: data.actaIntervensionPolicial
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schemaFormEntrevistaRoboRueda),
    defaultValues: { ...entrevistaUpdate }
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

  const resetFormEvento = () => {
    setButtonType(false);
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
    setButtonType(false);
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

  const checkStateSelectedVehiculo = (column, index) => {
    if (column === 'selected' && currentEntrevista) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    if (formType === true) {
      console.log(selectedVehiculos);
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
    if (column === 'selected' && currentEntrevista && currentEntrevista.involucrado) {
      if (selectedInvolucrados.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    if (formType === true) {
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

  const checkStateEntrevistado = (column, index) => {
    if (column === 'entrevistado' && currentEntrevista && currentEntrevista.entrevistado) {
      if (selectedEntrevistado.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    if (formType === true) {
      if (selectedEntrevistado.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxEntrevistado = (index) => {
    const isSelectedEntrevistado = selectedEntrevistado.find(
      (involucrado) => involucrados[index]._id === involucrado
    );
    if (isSelectedEntrevistado) {
      const newListSelectedEntrevistado = selectedEntrevistado.filter(
        (involucrado) => involucrados[index]._id !== involucrado
      );
      setSelectedEntrevistado(newListSelectedEntrevistado);
    } else {
      setSelectedEntrevistado([involucrados[index]._id]);
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

  const onConfirmEvento = async () => {
    if (!buttonType) {
      const eventoSiniestro = { ...evento, siniestro: data.id };
      const postEventoFetch = await postEvento(dispatch, eventoSiniestro);
      if (postEventoFetch.type === 'POST_EVENTO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpenEvento(true);
        return setTimeout(() => {}, 1000);
      }
      setFormType(true);
      return setToastErroOpen(true);
    } else {
      const editInspeccionRoboRuedaResponse = await updateEvento(dispatch);
      if (editInspeccionRoboRuedaResponse.type === 'UPDATE_INSPECCIONROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpenEvento(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onConfirmRueda = async () => {
    if (!buttonType) {
      const ruedaSiniestro = { ...rueda };
      const postRuedaFetch = await postRueda(
        dispatch,
        ruedaSiniestro,
        selectedInvolucradosRueda,
        selectedVehiculosRueda,
        data.id
      );
      if (postRuedaFetch.type === 'POST_RUEDA_SUCCESS') {
        setToastErroOpen(false);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editInspeccionRoboRuedaResponse = await updateEvento(dispatch);
      if (editInspeccionRoboRuedaResponse.type === 'UPDATE_INSPECCIONROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onConfirmFunction = async () => {
    if (selectedEntrevistado.length > 0) {
      if (formType === false) {
        const addEntrevistaRoboRuedaResponse = await postEntrevistaRoboRueda(
          dispatch,
          entrevistaRoboRueda,
          selectedInvolucrados,
          selectedVehiculos,
          siniestroId,
          selectedEntrevistado
        );
        if (addEntrevistaRoboRuedaResponse.type === 'POST_ENTREVISTAROBORUEDA_SUCCESS') {
          setToastErroOpen(false);
          setModalSuccessOpen(true);
          setFormType(true);
          return setTimeout(() => {}, 1000);
        }
        return setToastErroOpen(true);
      } else {
        const editEntrevistaRoboRuedaResponse = await updateEntrevistaRoboRueda(
          dispatch,
          id,
          entrevistaRoboRueda,
          selectedInvolucrados,
          selectedVehiculos,
          siniestroId,
          selectedEntrevistado
        );
        if (editEntrevistaRoboRuedaResponse.type === 'UPDATE_ENTREVISTAROBORUEDA_SUCCESS') {
          setToastErroOpen(false);
          setModalSuccessOpen(true);
          return setTimeout(() => {}, 1000);
        }
        setFormType(true);
        return setToastErroOpen(true);
      }
    } else {
      setErrorMessage('Seleccione al entrevistado');
      return setToastErroOpen(true);
    }
  };

  const onSubmitEvento = async (data) => {
    if (buttonType) {
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
    if (buttonType) {
      const formattedData = {
        ...data,
        fechaColocacion: formatDate(data.fechaColocacion)
      };
      setRueda(formattedData);
      setModalAddConfirmOpenRueda(true);
    } else {
      const formattedData = {
        ...data,
        fechaColocacion: formatDate(data.fechaColocacion)
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

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      nombreEntrevistado: dataEntrevistado?.nombre,
      apellidoEntrevistado: dataEntrevistado?.apellido
    };
    setEntrevistaRoboRueda(formattedData);
    getInvolucradoSiniestro(dispatch, siniestroId.id);
    setModalAddConfirmOpen(true);
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

  const involucradoRedirect = () => {
    setRedirect(true);
    setRedirectEntity('involucrado');
  };

  const vehiculoRedirect = () => {
    setRedirect(true);
    setRedirectEntity('vehiculo');
  };

  const tableClick = (index) => {
    const formattedData = {};
    reset({ ...formattedData, index });
    setButtonType(true);
  };

  const deleteButton = deleteEvento;

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
    if (data._id) {
      getByIdEntrevistaRoboRueda(dispatch, data._id);
    }
    getVehiculoSiniestro(dispatch, siniestroId.id || siniestroId);
    getInvolucradoSiniestro(dispatch, siniestroId.id || siniestroId);
    getEventoSiniestro(dispatch, siniestroId.id || siniestroId);
    getRuedaSiniestro(dispatch, siniestroId.id || siniestroId);
  }, []);

  useEffect(() => {
    createdEntrevistaIdRef.current = createdEntrevista;
    setEntrevista(createdEntrevistaIdRef.current);
  }, [createdEntrevista]);

  useEffect(() => {
    if (currentEntrevista?.vehiculo) {
      setSelectedVehiculos(currentEntrevista.vehiculo);
    }
  }, [currentEntrevista?.vehiculo?.length]);

  useEffect(() => {
    if (currentEntrevista?.involucrado) {
      setSelectedInvolucrados(currentEntrevista.involucrado);
    }
  }, [currentEntrevista?.involucrado?.length]);

  useEffect(() => {
    if (currentEntrevista?.entrevistado) {
      setSelectedEntrevistado(currentEntrevista.entrevistado);
    }
  }, [currentEntrevista?.entrevistado?.length]);

  useEffect(() => {
    if (involucrados.length > 0) {
      if (selectedEntrevistado.length > 0) {
        const entrevistado = involucrados.find(
          (involucrado) => involucrado._id === selectedEntrevistado[0]
        );
        const nuevaEntrevistaRoboRueda = {
          nombre: entrevistado?.nombre,
          apellido: entrevistado?.apellido
        };
        setDataEntrevistado(nuevaEntrevistaRoboRueda);
      }
    }
  }, [selectedEntrevistado]);

  const createdEntrevistaIdRef = useRef(createdEntrevista);
  const [entrevista, setEntrevista] = useState([]);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={formType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                formType
                  ? 'Esta seguro que quiere actualizar esta entrevista?'
                  : 'Esta seguro que quiere añadir esta entrevista?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              redirect={redirect}
              redirectEntity={redirectEntity}
              createdEntity={entrevista}
              sinId={siniestroId.id}
              message={formType ? 'Entrevista actualizada' : 'Entrevista agregada'}
            />
          )}
        </div>
      }
      {
        <div>
          {modalAddConfirmOpenEvento && (
            <ModalConfirm
              method={buttonType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmEvento()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? '¿Estás seguro de que quieres actualizar este evento?'
                  : '¿Estás seguro de que quieres agregar este evento?'
              }
            />
          )}
          {modalSuccessEvento && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'Evento editado' : 'Evento agregado'}
            />
          )}
        </div>
      }
      {
        <div>
          {modalAddConfirmOpenRueda && (
            <ModalConfirm
              method={buttonType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmRueda()}
              setModalConfirmOpen={setModalAddConfirmOpenRueda}
              message={
                buttonType
                  ? '¿Estás seguro de que quieres actualizar esta rueda?'
                  : '¿Estás seguro de que quieres agregar esta rueda?'
              }
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>ENTREVISTA ROBO RUEDA</p>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer}>
            <section className={styles.inputGroupsTop}>
              <div className={styles.topRow}>
                <div className={styles.firstColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={rol}
                      dataLabel="Rol"
                      name="rol"
                      register={register}
                      error={errors.rol?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={firma}
                      dataLabel="Firma"
                      name="firma"
                      register={register}
                      error={errors.firma?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={tipoEntrevista}
                      dataLabel="Tipo"
                      name="tipoEntrevista"
                      register={register}
                      error={errors.tipoEntrevista?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaSiniestro?.message}
                      register={register}
                      nameTitle="Fecha de Siniestro"
                      type="date"
                      nameInput="fechaSiniestro"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.hrAproximada?.message}
                      register={register}
                      nameTitle="Hora Siniestro"
                      type="date"
                      nameInput="hrAproximada"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.aportaDni?.message}
                      register={register}
                      nameTitle="Aporta DNI"
                      type="checkbox"
                      nameInput="aportaDni"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.aportaLc?.message}
                      register={register}
                      nameTitle="Aporta LC"
                      type="checkbox"
                      nameInput="aportaLc"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.intervensionPolicial?.message}
                      register={register}
                      nameTitle="Intervensión Policial"
                      type="checkbox"
                      nameInput="intervensionPolicial"
                      required
                    />
                  </div>
                </div>
                <div className={styles.secondColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={relacionVh}
                      dataLabel="Relacion VH"
                      name="relacionVh"
                      register={register}
                      error={errors.relacionVh?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={habilitacionDni}
                      dataLabel="Habilitacion DNI"
                      name="habilitacionDni"
                      register={register}
                      error={errors.habilitacionDni?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={habilitacionLc}
                      dataLabel="Habilitacion LC"
                      name="habilitacionLc"
                      register={register}
                      error={errors.habilitacionLc?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.hrNotificacion?.message}
                      register={register}
                      nameTitle="Hora Notificacion"
                      type="date"
                      nameInput="hrNotificacion"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.aportaTv?.message}
                      register={register}
                      nameTitle="Aporta TV"
                      type="checkbox"
                      nameInput="aportaTv"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.aportaTa?.message}
                      register={register}
                      nameTitle="Aporta TA"
                      type="checkbox"
                      nameInput="aportaTa"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.actaIntervensionPolicial?.message}
                      register={register}
                      nameTitle="Acta Policial"
                      type="checkbox"
                      nameInput="actaIntervensionPolicial"
                      required
                    />
                  </div>
                </div>
                <div className={styles.thirdColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={habilitacionTv}
                      dataLabel="Habilitacion TV"
                      name="habilitacionTv"
                      register={register}
                      error={errors.habilitacionTv?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={habilitacionTa}
                      dataLabel="Habilitacion TA"
                      name="habilitacionTa"
                      register={register}
                      error={errors.habilitacionTa?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.hrConfirmacion?.message}
                      register={register}
                      nameTitle="Hora Confirmación"
                      type="date"
                      nameInput="hrConfirmacion"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.hrReclamo?.message}
                      register={register}
                      nameTitle="Hora Reclamo"
                      type="date"
                      nameInput="hrReclamo"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.duenoPrevio?.message}
                      register={register}
                      nameTitle="Dueño Previo"
                      type="text"
                      nameInput="duenoPrevio"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.alarmaActiva?.message}
                      register={register}
                      nameTitle="Alarma Activa"
                      type="checkbox"
                      nameInput="alarmaActiva"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.cierreCentralizado?.message}
                      register={register}
                      nameTitle="Cierre Centralizado"
                      type="checkbox"
                      nameInput="cierreCentralizado"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.prestaRueda?.message}
                      register={register}
                      nameTitle="Presta Rueda"
                      type="checkbox"
                      nameInput="prestaRueda"
                      required
                    />
                  </div>
                </div>
                <div className={styles.fourthColumn}>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.hrEntrevista?.message}
                      register={register}
                      nameTitle="Hora Entrevista"
                      type="date"
                      nameInput="hrEntrevista"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.fechaEntrevista?.message}
                      register={register}
                      nameTitle="Fecha Entrevista"
                      type="date"
                      nameInput="fechaEntrevista"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={usoVh}
                      dataLabel="Uso VH"
                      name="usoVh"
                      register={register}
                      error={errors.usoVh?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.tipoUsoVh?.message}
                      register={register}
                      nameTitle="Tipo de Uso"
                      type="text"
                      nameInput="tipoUsoVh"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Inputs
                      error={errors.bulones?.message}
                      register={register}
                      nameTitle="Bulones"
                      type="text"
                      nameInput="bulones"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.aportaDueñoPrevio?.message}
                      register={register}
                      nameTitle="Aporta Datos"
                      type="checkbox"
                      nameInput="aportaDueñoPrevio"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.tuercaDeSeguridad?.message}
                      register={register}
                      nameTitle="Tuercas"
                      type="checkbox"
                      nameInput="tuercaDeSeguridad"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.bottomRow}>
                <div className={styles.inputContainerRelato}>
                  <TextArea
                    error={errors.relato?.message}
                    register={register}
                    nameTitle="Relato"
                    type="text"
                    nameInput="relato"
                    styleInput="relato"
                    required
                  />
                </div>
              </div>
            </section>
            <div className={styles.btnGroup}>
              <Button clickAction={() => {}} text={formType ? 'Editar' : 'Agregar'} />
              <Button clickAction={() => reset()} text="Reset" />
              <Button text="Cancelar" clickAction={() => history.goBack()} />
            </div>
          </div>
          <div className={styles.bottomTable}>
            <div className={styles.tableContainer}>
              <Button clickAction={() => involucradoRedirect()} text="Involucrados" />
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
                    const rowClass =
                      index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                    return (
                      <tr className={rowClass} key={index}>
                        {columns.map((column, columnIndex) => (
                          <td key={columnIndex}>
                            {column === 'selected' ? (
                              <input
                                type="checkbox"
                                className={styles.checkboxInput}
                                onChange={() => handleCheckboxSelected(index)}
                                checked={checkStateSelected(column, index)}
                              />
                            ) : column === 'entrevistado' ? (
                              <input
                                type="checkbox"
                                className={styles.checkboxInput}
                                onChange={() => handleCheckboxEntrevistado(index)}
                                checked={checkStateEntrevistado(column, index)}
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
          </div>
        </form>
        <div className={styles.formEvento}>
          <div className={styles.btnContainerEvento}>
            <Button clickAction={openFormEventos} text={openFormEvento ? 'Eventos' : 'Eventos'} />
            <Button clickAction={openFormRuedas} text={openFormRueda ? 'Ruedas' : 'Ruedas'} />
          </div>
        </div>
        {openFormEvento && (
          <div className={styles.formContainer}>
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
                    text={buttonType ? 'Editar' : 'Agregar'}
                  />
                  <Button clickAction={resetFormEvento} text="Reiniciar" />
                  <Button text="Cancelar" clickAction={cancelForm} />
                </div>
              </div>
              <div className={styles.tableTop}>
                <div className={styles.tableContainer}>
                  <FormTable
                    data={currentEvento}
                    columnTitleArray={columnTitleArray}
                    columns={columns}
                    handleClick={tableClick}
                    deleteButton={deleteButton}
                    type={true}
                  />
                </div>
              </div>
            </form>
            <div className={styles.formEvento}>
              <div className={styles.btnContainerEvento}>
                <Button
                  clickAction={openFormEventos}
                  text={openFormEvento ? 'Eventos' : 'Eventos'}
                />
                <Button clickAction={openFormRuedas} text={openFormRueda ? 'Ruedas' : 'Ruedas'} />
              </div>
            </div>
          </div>
        )}
        {openFormRueda && (
          <div className={styles.formContainer}>
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
                    text={buttonType ? 'Editar' : 'Agregar'}
                  />
                  <Button clickAction={resetFormRueda} text="Reiniciar" />
                  <Button text="Cancelar" clickAction={cancelForm} />
                </div>
              </div>
              <div className={styles.tableTop}>
                <div className={styles.tableContainer}>
                  <FormTable
                    data={currentRueda}
                    columnTitleArray={columnTitleRueda}
                    columns={columnsRueda}
                    handleClick={tableClick}
                    deleteButton={deleteButton}
                    type={true}
                  />
                </div>
                <div className={styles.rightTables}>
                  <div className={styles.tableContainer}>
                    <Button clickAction={openFormRuedas} text={'Involucrados'} />
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
                          const rowClass =
                            index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

                          return (
                            <tr className={rowClass} key={index}>
                              {columns.map((column, columnIndex) => (
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
                    <Button clickAction={openFormRuedas} text={'Vehiculos'} />
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
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={errorMessage} />}
    </div>
  );
};

export default EntrevistaRoboRuedasForm;
