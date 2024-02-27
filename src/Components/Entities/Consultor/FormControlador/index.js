import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastError, Loader } from 'Components/Shared';
import TableList from '../../../Shared/listTable/index';
import styles from './Controlador.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { postNovedad, updateNovedad } from 'redux/novedad/thunks';
import { Inputs, OptionInput, Button } from 'Components/Shared';
import ModalSuccess from 'Components/Shared/Modals/ModalSuccess/index';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import ModalConfirm from 'Components/Shared/Modals/ModalConfirm/index';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import TextArea from 'Components/Shared/Inputs/TextAreaInput';
import FormTable from 'Components/Shared/formTable';
import { deleteNovedad } from 'redux/novedad/thunks';
import { getVisibleNovedades } from 'redux/novedad/thunks';
import { getConsultor } from 'redux/consultor/thunks';
import { getFirebaseUidFromToken } from '../../../../Config/firebase-config';
import { getSiniestroConsultor } from 'redux/siniestro/thunks';

function Controlador() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [siniestro, setSiniestro] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const [userCurrent, setUserCurrent] = useState('');
  const [consultorId, setConsultorId] = useState('');

  const role = sessionStorage.getItem('role');
  const [novedadCopy, setNovedadCopy] = useState({});
  const [novedad, setNovedad] = useState({});
  const [novedadUser, setNovedadUser] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userCondition, setUserCondition] = useState(false);
  const [methodType, setMethodType] = useState(false);

  const novedades = useSelector((state) => state.novedad.list);
  const consultores = useSelector((state) => state.consultor.list);
  const consultor = consultores.find((oneConsultor) => oneConsultor.email === userCurrent);

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const deleteButton = deleteNovedad;

  const arrayTipos = ['Consulta', 'Notificacion', 'Aviso', 'Respuesta'];
  const arrayRelaciones = ['CVA', 'LUGAR', 'CVT', 'PVT', 'PVA', 'TVT', 'TVA', 'VA', 'VT'];
  const columnTitleArrayNovedad = [
    'Relacion',
    'Fecha',
    'Hora',
    'Responsable',
    'Tipo',
    'Titulo',
    'Respuesta'
  ];
  const columnsNovedad = [
    'relacion',
    'fecha',
    'hora',
    'responsable',
    'tipo',
    'titulo',
    'respuesta'
  ];

  const columnTitleArray = [
    'N°Siniestro',
    'N°Informe',
    'Fecha',
    'Vencimiento',
    'Asignacion',
    'Estado',
    'Tipo'
  ];
  const columns = [
    'numSiniestro',
    'numInforme',
    'fechaSiniestro',
    'fechaVencimiento',
    'fechaAsignacion',
    'estado',
    'tipo'
  ];

  const siniestros = useSelector((state) => state.siniestro.list);
  const controladores = useSelector((state) => state.controlador.list);
  const isPending = useSelector((state) => state.controlador.pending);

  const [toastErroOpen, setToastErroOpen] = useState(false);

  const schema = Joi.object({
    fecha: Joi.date()
      .messages({
        'date.base': 'El campo "fecha" debe ser una fecha válida',
        'date.empty': 'El campo "fecha" es un campo requerido'
      })
      .required(),

    hora: Joi.date()
      .messages({
        'date.base': 'El campo "hora" debe ser una fecha válida',
        'date.empty': 'El campo "hora" es un campo requerido'
      })
      .required(),

    titulo: Joi.string()
      .min(3)
      .max(15)
      .messages({
        'string.base': 'El campo "titulo" debe ser una cadena de texto',
        'string.empty': 'El campo "titulo" es un campo requerido',
        'string.min': 'El campo "titulo" debe tener al menos 3 caracteres',
        'string.max': 'El campo "titulo" debe tener como máximo 15 caracteres'
      })
      .required(),

    tipo: Joi.string()
      .valid('Consulta', 'Notificacion', 'Aviso', 'Respuesta')
      .messages({
        'any.only': 'Selecciona un "Tipo" permitido'
      })
      .required(),

    relacion: Joi.string()
      .valid('CVA', 'LUGAR', 'CVT', 'PVT', 'PVA', 'TVT', 'TVA', 'VA', 'VT')
      .messages({
        'any.only': 'Selecciona una "Relacion" permitida'
      })
      .required(),

    descripcion: Joi.string()
      .min(3)
      .max(150)
      .messages({
        'string.base': 'El campo "descripcion" debe ser una cadena de texto',
        'string.empty': 'El campo "descripcion" es un campo requerido',
        'string.min': 'El campo "descripcion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "descripcion" debe tener como máximo 15 caracteres'
      })
      .required(),

    visibilidad: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Visibilidad" es un campo booleano',
        'boolean.empty': 'El campo "Visibilidad" debe tener un valor determinado'
      })
      .required(),

    informe: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Informe" es un campo booleano',
        'boolean.empty': 'El campo "Informe" debe tener un valor determinado'
      })
      .required(),

    respuesta: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Respuesta" es un campo booleano',
        'boolean.empty': 'El campo "Respuesta" debe tener un valor determinado'
      })
      .required(),

    siniestro: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any(),
    responsable: Joi.any()
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
    defaultValues: { ...controladores }
  });

  const tableClick = (index) => {
    const formattedData = {
      ...siniestros[index]
    };
    setSiniestro(formattedData);
    reset({ ...formattedData });
  };

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      hora: 'dd / mm / aaaa',
      fecha: 'dd / mm / aaaa',
      relacion: '',
      respuesta: false,
      tipo: '',
      visibilidad: false,
      informe: false,
      titulo: '',
      descripcion: ''
    };
    reset({ ...emptyData });
  };

  const onConfirmFunction = async () => {
    setMethodType(false);
    if (!buttonType) {
      const novedadConSiniestro = { ...novedad, siniestro: id };
      const addNovedadResponse = await postNovedad(dispatch, novedadConSiniestro);
      if (addNovedadResponse.type === 'POST_NOVEDAD_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      setMethodType(true);
      const editNovedadResponse = await updateNovedad(dispatch, novedad._id, novedad);
      if (editNovedadResponse.type === 'UPDATE_NOVEDAD_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    }
  };

  const onSubmit = async (data) => {
    if (buttonType) {
      setNovedadUser(data.responsable);
      if (novedadUser == userRole) {
        const formattedData = {
          ...data,
          fecha: formatDate(data.fecha),
          hora: formatDate(data.hora),
          responsable: userRole
        };
        setNovedad(formattedData);
        setModalAddConfirmOpen(true);
      } else {
        setToastErroOpen(true);
      }
    } else {
      const formattedData = {
        ...data,
        responsable: userRole,
        fecha: formatDate(data.fecha),
        hora: formatDate(data.hora)
      };
      setNovedad(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const tableClickNovedad = (index) => {
    setNovedadUser(novedades[index].responsable);
    const formattedData = {
      ...novedades[index],
      fecha: formatDate(novedades[index].fecha),
      hora: formatDate(novedades[index].hora)
    };
    setNovedadCopy(formattedData);
  };

  useEffect(() => {
    currentUser();
    if (consultor?._id) setConsultorId(consultor._id);
  }, [consultor]);

  useEffect(() => {
    getSiniestroConsultor(dispatch, consultorId);
  }, [consultorId]);

  useEffect(() => {
    getConsultor(dispatch);
  }, []);

  useEffect(() => {
    getVisibleNovedades(dispatch, siniestro._id);
    setUserCondition(false);
    setUserRole(role);
  }, [siniestro]);

  useEffect(() => {
    setUserCondition(false);
  }, [novedades]);

  useEffect(() => {
    setUserCondition(novedadUser === userRole);
    reset({ ...novedadCopy });
    setButtonType(true);
  }, [novedadCopy]);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Editar' : 'Agregar'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                id
                  ? 'Esta seguro que quiere editar esta novedad?'
                  : 'Esta seguro que quiere agregar esta novedad?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={methodType ? 'Novedad actualizada.' : 'Novedad agregada.'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>LISTADO DE SINIESTROS</p>
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
                  data={siniestros}
                  columns={columns}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.novedadContainer}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.inputGroups}>
              <div className={styles.leftGroup}>
                <div className={styles.topGroup}>
                  <div className={styles.inputColumnPad}>
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
                      <Inputs
                        error={errors.titulo?.message}
                        register={register}
                        nameTitle="Titulo"
                        type="text"
                        nameInput="titulo"
                        styleInput="normalInput"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayTipos}
                        dataLabel="Tipo"
                        name="tipo"
                        register={register}
                        error={errors.tipo?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errors.informe?.message}
                        register={register}
                        nameTitle="Informe"
                        type="checkbox"
                        nameInput="informe"
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
                        data={arrayRelaciones}
                        dataLabel="Relacion"
                        name="relacion"
                        register={register}
                        error={errors.relacion?.message}
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errors.visibilidad?.message}
                        register={register}
                        nameTitle="Visibilidad"
                        type="checkbox"
                        nameInput="visibilidad"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Checkbox
                        error={errors.respuesta?.message}
                        register={register}
                        nameTitle="Respuesta"
                        type="checkbox"
                        nameInput="respuesta"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.botGroup}>
                  <div className={styles.inputContainer}>
                    <TextArea
                      error={errors.descripcion?.message}
                      register={register}
                      nameTitle="Descripcion"
                      type="text"
                      nameInput="descripcion"
                      styleInput="big"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.btnContainer}>
                <Button clickAction={() => {}} text={buttonType ? 'Editar' : 'Agregar'} />
                <Button clickAction={resetForm} text="Reiniciar" />
                <Button text="Cancelar" clickAction={() => history.goBack()} />
              </div>
            </section>
          </form>
          <div className={styles.rightTable}>
            <div className={styles.rightTable}>
              <FormTable
                data={novedades}
                columnTitleArray={columnTitleArrayNovedad}
                columns={columnsNovedad}
                handleClick={tableClickNovedad}
                deleteButton={deleteButton}
                userCondition={userCondition}
              />
            </div>
          </div>
        </div>
      </div>
      {toastErroOpen && (
        <ToastError
          setToastErroOpen={setToastErroOpen}
          message="No posee permisos sobre la novedad seleccionada."
        />
      )}
    </div>
  );
}
export default Controlador;
