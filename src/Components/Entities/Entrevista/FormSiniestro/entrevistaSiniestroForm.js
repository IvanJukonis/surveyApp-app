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
  updateEntrevistaSiniestro,
  postEntrevistaSiniestro,
  getAllEntrevistaSiniestro
} from 'redux/entrevistaSiniestro/thunks';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import DateInput from 'Components/Shared/Inputs/DateInput';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';

const SiniestrosForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [entrevistaSiniestro, setEntrevistaSiniestro] = useState();
  const location = useLocation();
  const history = useHistory();
  const data = location.state.params;
  const formType = data.mode;

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

    descLesiones: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Descripción Lesiones" debe ser una cadena de texto',
        'string.empty': 'El campo "Descripción Lesiones" es un campo requerido',
        'string.min': 'El campo "Descripción Lesiones" debe tener al menos 3 caracteres'
      })
      .required(),

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

    zonaImpactoVa: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Zona Impacto VA" debe ser una cadena de texto',
        'string.empty': 'El campo "Zona Impacto VA" es un campo requerido',
        'string.min': 'El campo "Zona Impacto VA" debe tener al menos 3 caracteres'
      })
      .required(),

    zonaImpactoVt: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Zona Impacto VT" debe ser una cadena de texto',
        'string.empty': 'El campo "Zona Impacto VT" es un campo requerido',
        'string.min': 'El campo "Zona Impacto VT" debe tener al menos 3 caracteres'
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
      .required()
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

  const onConfirmFunction = async () => {
    if (!id) {
      const addEntrevistaSiniestroResponse = await postEntrevistaSiniestro(
        dispatch,
        entrevistaSiniestro
      );
      if (addEntrevistaSiniestroResponse.type === 'POST_ENTREVISTASINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editEntrevistaSiniestroResponse = await updateEntrevistaSiniestro(
        dispatch,
        id,
        entrevistaSiniestro
      );
      if (editEntrevistaSiniestroResponse.type === 'UPDATE_ENTREVISTASINIESTRO_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {
          history.goBack();
        }, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    setEntrevistaSiniestro(data);
    setModalAddConfirmOpen(true);
  };

  const rol = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG'];
  const firma = ['SIN FIRMA', 'FIRMADO', 'NEGADO', 'ESPERA'];
  const tipoEntrevista = ['PRESENCIAL', 'TELEFONICA', 'VIDEOLLAMADA'];
  const relacionVh = ['Titular', 'Autorizado', 'Pasajero', 'No autorizado'];
  const habilitacionDni = ['DNI habilitado', 'DNI no habilitado'];
  const habilitacionLc = ['Licencia de conducir habilitada', 'Licencia de conducir no habilitada'];
  const habilitacionTv = ['Tarjeta verde habilitada', 'Tarjeta verde no habilitada'];
  const habilitacionTa = ['Tarjeta azul habilitada', 'Tarjeta azul no habilitada'];
  const lesiones = ['Hubo lesionados', 'No hubo lesionados'];
  const tipoLesiones = ['Lesiones GRAVES', 'Lesiones LEVES', 'Lesiones REGULARES'];

  useEffect(() => {
    getAllEntrevistaSiniestro(dispatch);
  }, []);

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
          <Button clickAction={() => {}} text={formType == 'edit' ? 'Actualizar' : 'Agregar'} />
          <Button clickAction={() => reset()} text="Reset" />
          <Button text="Cancel" clickAction={() => history.goBack()} />
        </div>
      </form>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message="{isError.message}" />}
    </div>
  );
};

export default SiniestrosForm;
