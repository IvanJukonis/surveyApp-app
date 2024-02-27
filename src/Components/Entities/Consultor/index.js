import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getConsultor, updateConsultor } from 'redux/consultor/thunks';
import { ToastError } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import styles from './Controlador.module.css';
import { Inputs } from 'Components/Shared';
import FormTable from 'Components/Shared/formTable';
import Button from 'Components/Shared/Button/index';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { joiResolver } from '@hookform/resolvers/joi';
import { OptionInput } from 'Components/Shared';
import { ModalConfirm, ModalSuccess } from 'Components/Shared';

function Consultor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [consultor, setConsultor] = useState([]);
  const [toastErroOpen, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [buttonType, setButtonType] = useState(false);

  const consultores = useSelector((state) => state.consultor.list);

  const columnTitleArray = [
    'Nombre',
    'Apellido',
    'Tipo',
    'DNI',
    'Aseguradora',
    'Activo',
    'Atendido'
  ];
  const columns = ['nombre', 'apellido', 'tipo', 'dni', 'aseguradora', 'activo', 'atendido'];
  const tipoArray = ['Relevador', 'Controlador', 'Administrativo', 'Consultor'];

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

    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .messages({
        'string.base': 'El campo "Email" debe ser una cadena de texto',
        'string.empty': 'El campo "Email" es un campo requerido',
        'string.email': 'El campo "Email" debe ser una dirección de correo válida',
        'string.minDomainSegments': 'El campo "Email" debe tener al menos 2 segmentos de dominio',
        'string.tlds.allow':
          'El campo "Email" debe tener un dominio de nivel superior válido (com o net)'
      })
      .required(),

    dni: Joi.number().min(10000000).max(99999999).integer().messages({
      'number.base': 'El DNI debe ser un número',
      'number.empty': 'El DNI es un campo requerido',
      'number.min': 'El DNI debe ser al menos 10,000,000',
      'number.max': 'El DNI debe ser como máximo 99,999,999',
      'number.integer': 'El DNI debe ser un número entero'
    }),

    aseguradora: Joi.string()
      .min(2)
      .max(15)
      .messages({
        'string.base': 'El campo "Direccion" debe ser una cadena de texto',
        'string.empty': 'El campo "Direccion" es un campo requerido',
        'string.min': 'El campo "Direccion" debe tener al menos 3 caracteres',
        'string.max': 'El campo "Direccion" debe tener como máximo 15 caracteres'
      })
      .required(),

    activo: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Activo" es un campo booleano',
        'boolean.empty': 'El campo "Activo" debe tener un valor determinado'
      })
      .required(),

    atendido: Joi.boolean()
      .messages({
        'boolean.base': 'El campo "Atendido" es un campo booleano',
        'boolean.empty': 'El campo "Atendido" debe tener un valor determinado'
      })
      .required(),
    firebaseUid: Joi.any(),
    __v: Joi.any(),
    _id: Joi.any()
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...consultor }
  });

  const tableClick = (index) => {
    const formattedData = {
      ...consultores[index]
    };
    setConsultor(formattedData);
    reset({ ...formattedData });
    setButtonType(true);
  };

  console.log(errors);

  const onConfirm = async () => {
    const editConsultorResponse = await updateConsultor(dispatch, consultor._id, consultor);
    if (editConsultorResponse.type === 'UPDATE_CONSULTOR_SUCCESS') {
      setToastErroOpen(false);
      setModalSuccessOpen(true);
      return setTimeout(() => {}, 1000);
    }
    return setToastErroOpen(true);
  };

  const onSubmit = async (data) => {
    if (buttonType) {
      const formattedData = {
        ...data
      };
      setConsultor(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data
      };
      setConsultor(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  useEffect(() => {
    getConsultor(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={'Actualizar'}
              onConfirm={() => onConfirm()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={'Esta seguro que quiere actualizar este consultor?'}
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={'Consultor actualizado'}
            />
          )}
        </div>
      }
      <div className={styles.imgTop}>
        <p className={styles.imgText}>CONSULTORES</p>
      </div>
      <div className={styles.innerContainer}>
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
                      nameTitle="Email"
                      type="text"
                      nameInput="email"
                      styleInput="normalInput"
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
                    <Checkbox
                      error={errors.atendido?.message}
                      register={register}
                      nameTitle="Atendido"
                      type="checkbox"
                      nameInput="atendido"
                      required
                    />
                  </div>
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
                      error={errors.aseguradora?.message}
                      register={register}
                      nameTitle="Aseguradora"
                      type="text"
                      nameInput="aseguradora"
                      styleInput="normalInput"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.buttonsGroup}>
              <Button clickAction={() => {}} text="Actualizar" testId="signup-btn" />
              <Button
                text="Cancelar"
                clickAction={() => history.goBack()}
                testId="signup-cancel-btn"
              />
            </div>
          </div>
        </form>
        <div className={styles.tableTop}>
          <div className={styles.tableContainer}>
            <FormTable
              data={consultores}
              columnTitleArray={columnTitleArray}
              columns={columns}
              handleClick={tableClick}
              deleted={true}
            />
          </div>
        </div>
      </div>
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </div>
  );
}
export default Consultor;
