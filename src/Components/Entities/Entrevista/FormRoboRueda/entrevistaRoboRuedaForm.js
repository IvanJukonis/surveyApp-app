import React, { useState, useEffect } from 'react';
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
import {
  updateEntrevistaRoboRueda,
  postEntrevistaRoboRueda,
  getByIdEntrevistaRoboRueda
} from 'redux/entrevistaRoboRueda/thunks';
import { getInvolucrado } from 'redux/involucrado/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';

const EntrevistaRoboRuedasForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [entrevistaRoboRueda, setEntrevistaRoboRueda] = useState();
  const [selectedInvolucrados, setSelectedInvolucrados] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [involucrado, setInvolucrado] = useState([]);
  const involucrados = useSelector((state) => state.involucrado.list);
  const currentEntrevista = useSelector((state) => state.entrevistaRoboRueda.list);
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const siniestroId = location.state.params.siniestroId;
  const formType = data.mode;

  const rol = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG'];
  const firma = ['SIN FIRMA', 'FIRMADO', 'NEGADO', 'ESPERA'];
  const tipoEntrevista = ['PRESENCIAL', 'TELEFONICA', 'VIDEOLLAMADA'];
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

    firma: Joi.string().valid('SIN FIRMA', 'FIRMADO', 'NEGADO', 'ESPERA').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    tipoEntrevista: Joi.string().valid('PRESENCIAL', 'TELEFONICA', 'VIDEOLLAMADA').messages({
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
      .valid('Tarjeta azul habilitada', 'Tarjeta verde no habilitada')
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

    usoVh: Joi.string().valid('Particular', 'Profesional', 'Servicio', 'Otro').messages({
      'any.only': 'Seleccione una opción valida'
    }),

    tipoUsoVh: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Tipo de Uso" debe ser una cadena de texto',
        'string.empty': 'El campo "Tipo de Uso" es un campo requerido',
        'string.min': 'El campo "Tipo de Uso" debe tener al menos 3 caracteres'
      })
      .required(),

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

    duenoPrevio: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Dueño previo" debe ser una cadena de texto',
        'string.empty': 'El campo "Dueño previo" es un campo requerido',
        'string.min': 'El campo "Dueño previo" debe tener al menos 3 caracteres'
      })
      .required(),

    aportaDueñoPrevio: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Aporte de Dueño Previo" es un campo booleano',
        'boolean.empty': 'El campo "Aporte de Dueño Previo" debe tener un valor determinado'
      })
      .required(),

    tuercaDeSeguridad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Tuerca de Seguridad" es un campo booleano',
        'boolean.empty': 'El campo "Tuerca de Seguridad" debe tener un valor determinado'
      })
      .required(),

    bulones: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Bulones" debe ser una cadena de texto',
        'string.empty': 'El campo "Bulones" es un campo requerido',
        'string.min': 'El campo "Bulones" debe tener al menos 3 caracteres'
      })
      .required(),

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

    relato: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Relato" debe ser una cadena de texto',
        'string.empty': 'El campo "Relato" es un campo requerido',
        'string.min': 'El campo "Relato" debe tener al menos 3 caracteres'
      })
      .required(),
    involucrados: Joi.alternatives()
      .try(
        Joi.array().items(Joi.string().hex().length(24).required()).min(1),
        Joi.string().hex().length(24).required()
      )
      .required()
      .messages({
        'any.only': 'Selecciona un involucrado',
        'any.required': 'Selecciona un involucrado',
        'array.min': 'Selecciona almenos un involucrado'
      })
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
    resolver: joiResolver(schema),
    defaultValues: { ...entrevistaUpdate }
  });

  const checkState = (column, index) => {
    if (column === 'selected' && currentEntrevista && currentEntrevista.involucrado) {
      if (selectedInvolucrados.find((involucrado) => involucrado === involucrados[index]._id)) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxChange = (index) => {
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

  const onConfirmFunction = async () => {
    if (formType == 'create') {
      const addEntrevistaRoboRuedaResponse = await postEntrevistaRoboRueda(
        dispatch,
        entrevistaRoboRueda,
        involucrado.map((inv) => inv._id),
        siniestroId
      );
      if (addEntrevistaRoboRuedaResponse.type === 'POST_ENTREVISTAROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editEntrevistaRoboRuedaResponse = await updateEntrevistaRoboRueda(
        dispatch,
        id,
        entrevistaRoboRueda
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
    setEntrevistaRoboRueda(data);
    getInvolucrado(dispatch);
    setModalAddConfirmOpen(true);
  };

  useEffect(() => {
    if (data._id) {
      getByIdEntrevistaRoboRueda(dispatch, data._id);
    }
    getInvolucrado(dispatch);
  }, []);

  useEffect(() => {
    if (currentEntrevista.involucrado) {
      setSelectedInvolucrados(currentEntrevista.involucrado);
    }
  }, [currentEntrevista.involucrado?.length]);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={formType == 'edit' ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                formType == 'edit'
                  ? 'Esta seguro que quiere actualizar esta entrevista?'
                  : 'Esta seguro que quiere añadir esta entrevista?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={formType == 'edit' ? 'Entrevista actualizada' : 'Entrevista agregada'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>
          {formType == 'edit' ? 'Editar Entrevista' : 'Agregar Entrevista'}
        </h3>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <section className={styles.inputGroups}>
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
          <Button clickAction={() => {}} text={formType == 'edit' ? 'Actualizar' : 'Agregar'} />
          <Button clickAction={() => reset()} text="Reset" />
          <Button text="Cancel" clickAction={() => history.goBack()} />
        </div>
      </form>
      <div className={styles.bottomTable}>
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
                <tr className={rowClass} key={index}>
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {column === 'selected' || column === 'entrevistado' ? (
                        <input
                          type="checkbox"
                          onChange={() => handleCheckboxChange(index)}
                          checked={checkState(column, index)}
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
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="{isError.message}" />}
    </div>
  );
};

export default EntrevistaRoboRuedasForm;
