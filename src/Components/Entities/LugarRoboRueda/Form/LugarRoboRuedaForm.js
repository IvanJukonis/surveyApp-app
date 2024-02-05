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
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import FormTable from 'Components/Shared/formTable';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getAllLugarRoboRueda,
  postLugarRoboRueda,
  deleteLugarRoboRueda,
  updateLugarRoboRueda
} from 'redux/lugarRoboRueda/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const LugarRoboRuedaForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [lugarRoboRueda, setLugarRoboRueda] = useState();
  const [buttonType, setButtonType] = useState(false);

  const lugarRoboRuedas = useSelector((state) => state.lugarRoboRueda.list ?? []);

  const arrayEvidenciaDanos = ['Daños visibles', 'Sin daños', 'Daños inconsistentes'];
  const arrayPermiso = ['Permitida', 'Dificultada', 'No permitida'];
  const arrayMascotas = [
    'Proteccion de mascotas',
    'Sin proteccion de mascotas',
    'Mascotas alertando'
  ];
  const arrayZona = [
    'Muy transitada',
    'Medianamente transitada',
    'Poco transitada',
    ' Transito nulo'
  ];
  const arrayAlarma = ['Activada', 'Desactivada', 'Desconoce', 'Probablemente activa'];
  const arrayTestigos = ['Encontrados', 'No encontrados', 'No colaboradores'];
  const arrayDisposicionVehiculo = [
    'Apoyado sin daños',
    'Apoyado con daños',
    'Suelo sin soporte',
    'Suelo acomodado',
    'Acomodado'
  ];
  const arrayUsoEntorno = ['No utilzado', 'Utilizado', 'Sin evidencia'];
  const columnTitleArray = [
    'Direccion',
    'Ciudad',
    'Provincia',
    'Inspeccion',
    'Permiso',
    'Testigos',
    'Prioridad'
  ];
  const columns = [
    'direccion',
    'ciudad',
    'provincia',
    'inspeccion',
    'permiso',
    'testigos',
    'prioridad'
  ];

  const schema = Joi.object({
    prioridad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Prioridad" es un campo booleano',
        'boolean.empty': 'El campo "Prioridad" debe tener un valor determinado'
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
    provincia: Joi.string()
      .min(3)
      .max(20)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 20 caracteres'
      })
      .required(),
    evidenciaDanos: Joi.string()
      .valid('Daños visibles', 'Sin daños', 'Daños inconsistentes')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    daños: Joi.string()
      .min(3)
      .max(50)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 50 caracteres'
      })
      .required(),
    inspeccion: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Inspeccion" es un campo booleano',
        'boolean.empty': 'El campo "Inspeccion" debe tener un valor determinado'
      })
      .required(),
    permiso: Joi.string()
      .valid('Permitida', 'Dificultada', 'No permitida')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    mascotas: Joi.string()
      .valid('Proteccion de mascotas', 'Sin proteccion de mascotas', 'Mascotas alertando')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    zona: Joi.string()
      .valid('Muy transitada', 'Medianamente transitada', 'Poco transitada', ' Transito nulo')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    alarma: Joi.string()
      .valid('Activada', 'Desactivada', 'Desconoce', 'Probablemente activa')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    testigos: Joi.string()
      .valid('Encontrados', 'No encontrados', 'No colaboradores')
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    presencia: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Presencia" es un campo booleano',
        'boolean.empty': 'El campo "Presencia" debe tener un valor determinado'
      })
      .required(),
    disposicionVehiculo: Joi.string()
      .valid(
        'Apoyado sin daños',
        'Apoyado con daños',
        'Suelo sin soporte',
        'Suelo acomodado',
        'Acomodado'
      )
      .messages({
        'any.only': 'Ingrese un valor permitido'
      })
      .required(),
    usoEntorno: Joi.string()
      .valid('No utilzado', 'Utilizado', 'Sin evidencia')
      .messages({
        'any.only': 'Ingrese una orientación permitida'
      })
      .required(),
    descripcion: Joi.string()
      .min(3)
      .max(50)
      .messages({
        'string.base': 'El campo debe ser una cadena de texto',
        'string.empty': 'Campo requerido',
        'string.min': 'El campo debe tener al menos 3 caracteres',
        'string.max': 'El campo debe tener como máximo 50 caracteres'
      })
      .required(),

    siniestro: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any()
  });

  let updatedLugarRoboRueda;

  if (lugarRoboRuedas?.length > 0) {
    updatedLugarRoboRueda = {
      siniestro: lugarRoboRuedas[0].siniestro,
      entrevistaRoboRueda: lugarRoboRuedas[0].entrevistaRoboRueda,
      prioridad: lugarRoboRuedas[0].prioridad,
      direccion: lugarRoboRuedas[0].direccion,
      ciudad: lugarRoboRuedas[0].ciudad,
      provincia: lugarRoboRuedas[0].provincia,
      evidenciaDanos: lugarRoboRuedas[0].evidenciaDanos,
      daños: lugarRoboRuedas[0].daños,
      inspeccion: lugarRoboRuedas[0].inspeccion,
      permiso: lugarRoboRuedas[0].permiso,
      mascotas: lugarRoboRuedas[0].mascotas,
      zona: lugarRoboRuedas[0].zona,
      testigos: lugarRoboRuedas[0].testigos,
      alarma: lugarRoboRuedas[0].alarma,
      presencia: lugarRoboRuedas[0].presencia,
      disposicionVehiculo: lugarRoboRuedas[0].disposicionVehiculo,
      usoEntorno: lugarRoboRuedas[0].usoEntorno,
      descripcion: lugarRoboRuedas[0].descripcion
    };
  }

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...updatedLugarRoboRueda }
  });

  const deleteButton = deleteLugarRoboRueda;

  const tableClick = (index) => {
    const formattedData = {
      ...lugarRoboRuedas[index]
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const lugarRoboRuedaConSiniestro = { ...lugarRoboRueda, siniestro: id };
      const addLugarRoboRuedaResponse = await postLugarRoboRueda(
        dispatch,
        lugarRoboRuedaConSiniestro
      );
      if (addLugarRoboRuedaResponse.type === 'POST_LUGARROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return;
      }
      return setToastErroOpen(true);
    } else {
      const editLugarRoboRuedaResponse = await updateLugarRoboRueda(
        dispatch,
        lugarRoboRueda._id,
        lugarRoboRueda
      );
      if (editLugarRoboRuedaResponse.type === 'UPDATE_LUGARROBORUEDA_SUCCESS') {
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
        ...data
      };
      setLugarRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data
      };
      setLugarRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  useEffect(() => {
    getAllLugarRoboRueda(dispatch, id);
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Actualizar' : 'Agregar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? 'Esta seguro que quiere actualizar este lugar de robo?'
                  : 'Esta seguro que quiere añadir este lugar de robo?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'Lugar robo rueda actualizado' : 'Lugar robo rueda agregado'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>LUGAR ROBO RUEDA</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.tableTop}>
          <div className={styles.tableContainer}>
            <FormTable
              data={lugarRoboRuedas}
              columnTitleArray={columnTitleArray}
              columns={columns}
              handleClick={tableClick}
              deleteButton={deleteButton}
            />
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.direccion?.message}
                  register={register}
                  nameTitle="Direccion"
                  type="text"
                  styleInput="normalInput"
                  nameInput="direccion"
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayEvidenciaDanos}
                  dataLabel="Evidencia Daños"
                  name="evidenciaDanos"
                  register={register}
                  error={errors.evidenciaDanos?.message}
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
                  styleInput="normalInput"
                  nameInput="ciudad"
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayPermiso}
                  dataLabel="Permiso"
                  name="permiso"
                  register={register}
                  error={errors.permiso?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayTestigos}
                  dataLabel="Testigos"
                  name="testigos"
                  register={register}
                  error={errors.testigos?.message}
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Inputs
                  error={errors.provincia?.message}
                  register={register}
                  nameTitle="Provincia"
                  type="text"
                  styleInput="normalInput"
                  nameInput="provincia"
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayMascotas}
                  dataLabel="Mascotas"
                  name="mascotas"
                  register={register}
                  error={errors.mascotas?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayDisposicionVehiculo}
                  dataLabel="Disposicion Vehiculo"
                  name="disposicionVehiculo"
                  register={register}
                  error={errors.disposicionVehiculo?.message}
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
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
                <OptionInput
                  data={arrayZona}
                  dataLabel="Zona"
                  name="zona"
                  register={register}
                  error={errors.zona?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayUsoEntorno}
                  dataLabel="Uso Entorno"
                  name="usoEntorno"
                  register={register}
                  error={errors.usoEntorno?.message}
                />
              </div>
            </div>
            <div className={styles.inputColumn}>
              <div className={styles.inputContainer}>
                <Checkbox
                  error={errors.inspeccion?.message}
                  register={register}
                  nameTitle="Inspeccion"
                  type="checkbox"
                  nameInput="inspeccion"
                  required
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={arrayAlarma}
                  dataLabel="Alarma"
                  name="alarma"
                  register={register}
                  error={errors.alarma?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <TextArea
                  error={errors.descripcion?.message}
                  register={register}
                  nameTitle="Descripcion"
                  type="text"
                  nameInput="descripcion"
                  styleInput="threeInputs"
                  required
                />
              </div>
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={handleSubmit(onSubmit)} text={buttonType ? 'Editar' : 'Agregar'} />
            <Button clickAction={() => {}} text={'Actualizar'} />
            <Button text="Cancelar" clickAction={() => history.goBack()} />
          </div>
        </form>
      </div>
      {toastError && <ToastError setToastErroOpen={setToastErroOpen} message={'Error'} />}
    </div>
  );
};

export default LugarRoboRuedaForm;
