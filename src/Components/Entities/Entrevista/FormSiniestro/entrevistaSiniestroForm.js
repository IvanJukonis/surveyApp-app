import React, { useState, useEffect, useRef } from 'react';
import styles from './form.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import { useLocation, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  updateEntrevistaSiniestro,
  postEntrevistaSiniestro,
  getByIdEntrevistaSiniestro
} from 'redux/entrevistaSiniestro/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import { getVehiculoSiniestro } from 'redux/vehiculo/thunks';
import { getInvolucradoSiniestro } from 'redux/involucrado/thunks';
import { getEventoSiniestro, deleteEvento, postEvento, updateEvento } from 'redux/evento/thunks';
import FormTable from 'Components/Shared/formTable';
import { getByIdSiniestro } from 'redux/siniestro/thunks';

const EntrevistaSiniestrosForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const siniestroId = location.state.params.siniestroId;
  const type = data.mode;

  const role = sessionStorage.getItem('role');

  const item = useSelector((state) => state.siniestro.list);
  const [formType, setFormType] = useState(type);
  const [errorMessage, setErrorMessage] = useState('Error');
  const [redirect, setRedirect] = useState(false);
  const [dataEntrevistado, setDataEntrevistado] = useState();
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  const [selectedVehiculos, setSelectedVehiculos] = useState([]);
  const [selectedEntrevistado, setSelectedEntrevistado] = useState([]);
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [evento, setEvento] = useState({});
  const [entrevistaSiniestro, setEntrevistaSiniestro] = useState();
  const [openFormEvento, setOpenFormEvento] = useState(false);
  const [formTypeEvento, setFormTypeEvento] = useState(false);
  const [redirectEntity, setRedirectEntity] = useState('');
  const [idEntrevista, setIdEntrevista] = useState('');
  const [modalAddConfirmOpenEvento, setModalAddConfirmOpenEvento] = useState(false);
  const [modalSuccessEvento, setModalSuccessOpenEvento] = useState(false);

  const involucrados = useSelector((state) => state.involucrado.list);
  const vehiculos = useSelector((state) => state.vehiculo.list);
  const currentEvento = useSelector((state) => state.evento.list);
  const currentEntrevista = useSelector((state) => state.entrevistaSiniestro.list);
  const createdEntrevista = useSelector((state) => state.entrevistaSiniestro.createdEntrevista);

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
  const columnTitleArrayEvento = ['Fecha', 'Hora', 'Tipo', 'Comprobar', 'Comprobado'];
  const columnsEvento = ['fecha', 'hora', 'tipo', 'comprobar', 'comprobado'];

  //Array Entrevistas
  const rol = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG'];
  const firma = ['Sin Firma', 'Firmado', 'Negado', 'Espera'];
  const tipoEntrevista = ['Presencial', 'Telefonica', 'Videollamada'];
  const relacionVh = ['Titular', 'Autorizado', 'Pasajero', 'No autorizado'];
  const habilitacionDni = ['DNI habilitado', 'DNI no habilitado'];
  const habilitacionLc = ['Licencia de conducir habilitada', 'Licencia de conducir no habilitada'];
  const habilitacionTv = ['Tarjeta verde habilitada', 'Tarjeta verde no habilitada'];
  const habilitacionTa = ['Tarjeta azul habilitada', 'Tarjeta azul no habilitada'];
  const lesiones = ['Hubo lesionados', 'No hubo lesionados'];
  const tipoLesiones = ['Lesiones GRAVES', 'Lesiones LEVES', 'Lesiones REGULARES'];
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

  const schema = Joi.object({
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
      .messages({
        'date.base': 'El campo "Fecha de Siniestro" debe ser una fecha valida.',
        'date.empty': 'El campo "Fecha de Siniestro" no puede permanecer vacio.'
      })
      .required(),

    hrAproximada: Joi.date()
      .messages({
        'date.base': 'El campo "Hora Aproximada" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora Aproximada" no puede permanecer vacio.'
      })
      .required(),

    hrNotificacion: Joi.date()
      .messages({
        'date.base': 'El campo "Hora de Notificacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Notificacion" no puede permanecer vacio.'
      })
      .required(),

    hrConfirmacion: Joi.date()
      .messages({
        'date.base': 'El campo "Hora de Confirmacion" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Confirmacion" no puede permanecer vacio.'
      })
      .required(),

    hrReclamo: Joi.date()
      .messages({
        'date.base': 'El campo "Hora de Reclamo" debe ser una fecha valida.',
        'date.empty': 'El campo "Hora de Reclamo" no puede permanecer vacio.'
      })
      .required(),

    relacionVh: Joi.string().valid('Titular', 'Autorizado', 'Pasajero', 'No autorizado').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    habilitacionDni: Joi.string().valid('DNI habilitado', 'DNI no habilitado').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    habilitacionLc: Joi.string()
      .valid('Licencia de conducir habilitada', 'Licencia de conducir no habilitada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    habilitacionTv: Joi.string()
      .valid('Tarjeta verde habilitada', 'Tarjeta verde no habilitada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    habilitacionTa: Joi.string()
      .valid('Tarjeta azul habilitada', 'Tarjeta azul no habilitada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    aportaDni: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporta Dni" es un campo booleano',
        'boolean.empty': 'El campo "Aporta Dni" debe tener un valor determinado'
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

    lesiones: Joi.string().valid('Hubo lesionados', 'No hubo lesionados').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    reparaciones: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Reparaciones" es un campo booleano',
        'boolean.empty': 'El campo "Reparaciones" debe tener un valor determinado'
      })
      .required(),

    comprobantesDaños: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobantes de Daños" es un campo booleano',
        'boolean.empty': 'El campo "Comprobantes de Daños" debe tener un valor determinado'
      })
      .required(),

    tipoLesiones: Joi.string()
      .valid('Lesiones GRAVES', 'Lesiones LEVES', 'Lesiones REGULARES')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),

    descLesiones: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Descripción Lesiones" debe ser una cadena de texto',
      'string.empty': 'El campo "Descripción Lesiones" es un campo requerido',
      'string.min': 'El campo "Descripción Lesiones" debe tener al menos 3 caracteres'
    }),

    comprobantesLesiones: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobante Lesiones" es un campo booleano',
        'boolean.empty': 'El campo "Comprobante Lesiones" debe tener un valor determinado'
      })
      .required(),

    aporteLesiones: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporte Lesiones" es un campo booleano',
        'boolean.empty': 'El campo "Aporte Lesiones" debe tener un valor determinado'
      })
      .required(),

    fotosLesiones: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Fotos Lesiones" es un campo booleano',
        'boolean.empty': 'El campo "Fotos Lesiones" debe tener un valor determinado'
      })
      .required(),

    gastos: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Gastos" es un campo booleano',
        'boolean.empty': 'El campo "Gastos" debe tener un valor determinado'
      })
      .required(),

    descGastos: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Descripción Gastos" debe ser una cadena de texto',
        'string.empty': 'El campo "Descripción Gastos" es un campo requerido',
        'string.min': 'El campo "Descripción Gastos" debe tener al menos 3 caracteres'
      })
      .required(),

    comprobantesGastos: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Comprobantes Gastos" es un campo booleano',
        'boolean.empty': 'El campo "Comprobantes Gastos" debe tener un valor determinado'
      })
      .required(),

    zonaImpactoVa: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Zona Impacto VA" debe ser una cadena de texto',
      'string.empty': 'El campo "Zona Impacto VA" es un campo requerido',
      'string.min': 'El campo "Zona Impacto VA" debe tener al menos 3 caracteres'
    }),

    zonaImpactoVt: Joi.string().min(3).max(500).messages({
      'string.base': 'El campo "Zona Impacto VT" debe ser una cadena de texto',
      'string.empty': 'El campo "Zona Impacto VT" es un campo requerido',
      'string.min': 'El campo "Zona Impacto VT" debe tener al menos 3 caracteres'
    }),

    relato: Joi.string().min(3).max(500).messages({
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
    lesiones: data.lesiones,
    reparaciones: data.reparaciones,
    comprobantesDaños: data.comprobantesDaños,
    tipoLesiones: data.tipoLesiones,
    descLesiones: data.descLesiones,
    comprobantesLesiones: data.comprobantesLesiones,
    aporteLesiones: data.aporteLesiones,
    fotosLesiones: data.fotosLesiones,
    gastos: data.gastos,
    descGastos: data.descGastos,
    comprobantesGastos: data.comprobantesGastos,
    zonaImpactoVa: data.zonaImpactoVa,
    zonaImpactoVt: data.zonaImpactoVt,
    relato: data.relato
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
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

  const checkStateSelectedVehiculo = (column, index) => {
    if (column === 'selected' && currentEntrevista) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    if (formType === true) {
      if (selectedVehiculos.find((vehiculo) => vehiculo === vehiculos[index]._id)) {
        return true;
      }
    }
    return false;
  };

  const checkStateSelected = (column, index) => {
    if (column === 'selected' && currentEntrevista) {
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
    if (column === 'entrevistado' && currentEntrevista) {
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

  const onConfirmFunction = async () => {
    if (selectedEntrevistado.length > 0) {
      if (formType === false) {
        const addEntrevistaSiniestroResponse = await postEntrevistaSiniestro(
          dispatch,
          entrevistaSiniestro,
          selectedInvolucrados,
          selectedVehiculos,
          siniestroId,
          selectedEntrevistado
        );
        if (addEntrevistaSiniestroResponse.type === 'POST_ENTREVISTASINIESTRO_SUCCESS') {
          setToastErroOpen(false);
          setFormType(true);
          setModalSuccessOpen(true);
          setIdEntrevista(addEntrevistaSiniestroResponse.payload._id);
          return setTimeout(() => {}, 1000);
        }
        return setToastErroOpen(true);
      } else {
        const editEntrevistaSiniestroResponse = await updateEntrevistaSiniestro(
          dispatch,
          idEntrevista,
          entrevistaSiniestro,
          selectedInvolucrados,
          selectedVehiculos,
          siniestroId,
          selectedEntrevistado
        );
        console.log(editEntrevistaSiniestroResponse);
        if (editEntrevistaSiniestroResponse.type === 'UPDATE_ENTREVISTASINIESTRO_SUCCESS') {
          console.log('entro?', editEntrevistaSiniestroResponse);
          setToastErroOpen(false);
          setModalSuccessOpen(true);
          return setTimeout(() => {}, 1000);
        }
        console.log('es por aca');
        setFormType(true);
        return setToastErroOpen(true);
      }
    } else {
      setErrorMessage('Seleccione al entrevistado');
      return setToastErroOpen(true);
    }
  };

  const onConfirmEvento = async () => {
    if (!formTypeEvento) {
      const eventoSiniestro = { ...evento, siniestro: data.id };
      const postEventoFetch = await postEvento(dispatch, eventoSiniestro);
      if (postEventoFetch.type === 'POST_EVENTO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpenEvento(true);
        return setTimeout(() => {}, 1000);
      }
      setFormTypeEvento(true);
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

  const tableClick = (index) => {
    const formattedData = {};
    reset({ ...formattedData, index });
    setFormTypeEvento(true);
  };

  const deleteButton = deleteEvento;

  const openFormEventos = () => {
    if (openFormEvento) {
      setOpenFormEvento(false);
    } else {
      setOpenFormEvento(true);
    }
  };

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      nombreEntrevistado: dataEntrevistado?.nombre,
      apellidoEntrevistado: dataEntrevistado?.apellido
    };
    setEntrevistaSiniestro(formattedData);
    getInvolucradoSiniestro(dispatch, siniestroId);
    setModalAddConfirmOpen(true);
  };

  const involucradoRedirect = () => {
    setRedirect(true);
    setRedirectEntity('involucrado');
  };

  const cancelForm = () => {
    if (role == 'CONTROLADOR') {
      history.push(`/controlador/siniestros/entrevista/${item[0]._id}`, {
        params: { ...item[0], mode: 'edit' }
      });
    }
    if (role == 'RELEVADOR') {
      history.push(`/relevador/siniestros/entrevista/${item[0]._id}`, {
        params: { ...item[0], mode: 'edit' }
      });
    }
    if (role == 'ADMINISTRATIVO') {
      history.push(`/administrativo/siniestros/entrevista/${item[0]._id}`, {
        params: { ...item[0], mode: 'edit' }
      });
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

  const vehiculoRedirect = () => {
    setRedirect(true);
    setRedirectEntity('vehiculo');
  };

  const createdEntrevistaIdRef = useRef(createdEntrevista);
  const [entrevista, setEntrevista] = useState([]);

  useEffect(() => {
    if (data._id) {
      getByIdEntrevistaSiniestro(dispatch, data._id);
    }
    getVehiculoSiniestro(dispatch, siniestroId);
    getInvolucradoSiniestro(dispatch, siniestroId);
    getEventoSiniestro(dispatch, siniestroId);
    getByIdSiniestro(dispatch, siniestroId);
    setIdEntrevista(data._id);
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
        const nuevaEntrevistaSiniestro = {
          nombre: entrevistado?.nombre,
          apellido: entrevistado?.apellido
        };
        setDataEntrevistado(nuevaEntrevistaSiniestro);
      }
    }
  }, [selectedEntrevistado]);

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
              sinId={siniestroId}
              message={formType ? 'Entrevista actualizada' : 'Entrevista agregada'}
            />
          )}
        </div>
      }
      {
        <div>
          {modalAddConfirmOpenEvento && (
            <ModalConfirm
              method={formType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmEvento()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                formType
                  ? '¿Estás seguro de que quieres actualizar este evento?'
                  : '¿Estás seguro de que quieres agregar este evento?'
              }
            />
          )}
          {modalSuccessEvento && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={formType ? 'Evento editado' : 'Evento agregado'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>ENTREVISTA SINIESTRO</p>
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
                    <Inputs
                      error={errors.descLesiones?.message}
                      register={register}
                      nameTitle="Lesiones"
                      type="text"
                      nameInput="descLesiones"
                      styleInput="normalInput"
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
                    <Inputs
                      error={errors.descGastos?.message}
                      register={register}
                      nameTitle="Gastos"
                      type="text"
                      nameInput="descGastos"
                      styleInput="normalInput"
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
                      error={errors.comprobantesGastos?.message}
                      register={register}
                      nameTitle="Comprobantes Gastos"
                      type="checkbox"
                      nameInput="comprobantesGastos"
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
                      error={errors.zonaImpactoVa?.message}
                      register={register}
                      nameTitle="Zona Impacto VA"
                      type="text"
                      nameInput="zonaImpactoVa"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.reparaciones?.message}
                      register={register}
                      nameTitle="Reparaciones"
                      type="checkbox"
                      nameInput="reparaciones"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.comprobantesDaños?.message}
                      register={register}
                      nameTitle="Comprobantes Daños"
                      type="checkbox"
                      nameInput="comprobantesDaños"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.comprobantesLesiones?.message}
                      register={register}
                      nameTitle="Comprobantes Lesiones"
                      type="checkbox"
                      nameInput="comprobantesLesiones"
                      required
                    />
                  </div>
                </div>
                <div className={styles.fourthColumn}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={lesiones}
                      dataLabel="Lesiones"
                      name="lesiones"
                      register={register}
                      error={errors.lesiones?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={tipoLesiones}
                      dataLabel="Tipo de Lesiones"
                      name="tipoLesiones"
                      register={register}
                      error={errors.tipoLesiones?.message}
                    />
                  </div>
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
                    <Inputs
                      error={errors.zonaImpactoVt?.message}
                      register={register}
                      nameTitle="Zona Impacto VT"
                      type="text"
                      nameInput="zonaImpactoVt"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.aporteLesiones?.message}
                      register={register}
                      nameTitle="Aporte Lesiones"
                      type="checkbox"
                      nameInput="aporteLesiones"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.fotosLesiones?.message}
                      register={register}
                      nameTitle="Fotos Lesiones"
                      type="checkbox"
                      nameInput="fotosLesiones"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.gastos?.message}
                      register={register}
                      nameTitle="Gastos"
                      type="checkbox"
                      nameInput="gastos"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.bottomRow}>
                <div className={styles.inputContainer}>
                  <TextArea
                    error={errors.relato?.message}
                    register={register}
                    nameTitle="Relato"
                    type="text"
                    nameInput="relato"
                    styleInput="big"
                    required
                  />
                </div>
              </div>
            </section>
            <div className={styles.btnGroup}>
              <Button clickAction={handleSubmit(onSubmit)} text={formType ? 'Editar' : 'Agregar'} />
              <Button text="Cancelar" clickAction={cancelForm} />
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
            <div className={styles.formEvento}>
              <div className={styles.btnContainerEvento}>
                <Button
                  submition={true}
                  clickAction={openFormEventos}
                  text={openFormEvento ? 'Eventos' : 'Eventos'}
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
                    handleClick={tableClick}
                    deleteButton={deleteButton}
                    type={true}
                  />
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

export default EntrevistaSiniestrosForm;
