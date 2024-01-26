import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './form.module.css';
import {
  ModalConfirm,
  ModalSuccess,
  ToastError,
  Inputs,
  Button,
  OptionInput
} from 'Components/Shared';
import FormTable from 'Components/Shared/formTable';
import DateInput from 'Components/Shared/Inputs/DateInput';
import Checkbox from 'Components/Shared/Inputs/CheckboxInput';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import {
  updateInspeccionRoboRueda,
  postInspeccionRoboRueda,
  getAllInspeccionRoboRueda,
  deleteInspeccionRoboRueda
} from 'redux/inspeccionRoboRueda/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const InspeccionRoboInspeccionRoboRuedasForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [toastError, setToastErroOpen] = useState(false);
  const [modalAddConfirmOpen, setModalAddConfirmOpen] = useState(false);
  const inspeccionRoboRuedas = useSelector((state) => state.inspeccionRoboRueda.list);
  const [modalSuccess, setModalSuccessOpen] = useState(false);
  const [inspeccionRoboRueda, setInspeccionRoboRueda] = useState({});
  const [buttonType, setButtonType] = useState(false);
  const data = useParams();
  const location = useLocation();
  const { params } = location.state || {};
  const { createdEntity } = params || {};

  const schema = Joi.object({
    fotos: Joi.string()
      .valid('Se toman fotografias del VH', 'No se toman fotografias del VH')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
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
    permisos: Joi.string()
      .valid('Inspeccion permitida', 'Inspeccion no permitida', 'Inspeccion dificultada')
      .messages({
        'any.only': 'Seleccione una opción valida'
      }),
    programada: Joi.string().valid('Inspeccion programada', 'Inspeccion no programada').messages({
      'any.only': 'Seleccione una opción valida'
    }),
    disposicion: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Disposicion" debe ser una cadena de texto',
        'string.empty': 'El campo "Disposicion" es un campo requerido',
        'string.min': 'El campo "Disposicion" debe tener al menos 3 caracteres'
      })
      .required(),
    daños: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Daños" debe ser una cadena de texto',
        'string.empty': 'El campo "Daños" es un campo requerido',
        'string.min': 'El campo "Daños" debe tener al menos 3 caracteres'
      })
      .required(),
    conclusion: Joi.string()
      .min(3)
      .max(500)
      .messages({
        'string.base': 'El campo "Conclusion" debe ser una cadena de texto',
        'string.empty': 'El campo "Conclusion" es un campo requerido',
        'string.min': 'El campo "Conclusion" debe tener al menos 3 caracteres'
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

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: { ...inspeccionRoboRueda }
  });

  const onConfirmFunction = async () => {
    if (!buttonType) {
      const inspeccionRoboRuedaConSiniestro = { ...inspeccionRoboRueda, siniestro: data.id };
      const addInspeccionRoboRuedaResponse = await postInspeccionRoboRueda(
        dispatch,
        inspeccionRoboRuedaConSiniestro
      );
      if (addInspeccionRoboRuedaResponse.type === 'POST_INSPECCIONROBORUEDA_SUCCESS') {
        setToastErroOpen(false);
        setModalSuccessOpen(true);
        return setTimeout(() => {}, 1000);
      }
      return setToastErroOpen(true);
    } else {
      const editInspeccionRoboRuedaResponse = await updateInspeccionRoboRueda(
        dispatch,
        inspeccionRoboRueda._id,
        inspeccionRoboRueda
      );
      if (editInspeccionRoboRuedaResponse.type === 'UPDATE_INSPECCIONROBORUEDA_SUCCESS') {
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
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setInspeccionRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    } else {
      const formattedData = {
        ...data,
        fechaNacimiento: formatDate(data.fechaNacimiento)
      };
      setInspeccionRoboRueda(formattedData);
      setModalAddConfirmOpen(true);
    }
  };

  const arrayRoles = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC'];
  const arrayLesiones = ['Lesiones LEVES', 'Lesiones REGULARES', 'Lesiones GRAVES'];
  const arrayCategorias = [
    'A1',
    'A2',
    'A3',
    'B1',
    'B2',
    'C1',
    'C2',
    'C3',
    'D1',
    'D2',
    'D3',
    'D4',
    'E1'
  ];
  const columnTitleArray = ['Nombre', 'Apellido', 'Telefono', 'Rol', 'Prioridad'];
  const columns = ['nombre', 'apellido', 'telefono', 'rol', 'prioridad'];

  const resetForm = () => {
    setButtonType(false);
    const emptyData = {
      prioridad: false,
      relacion: '',
      titular: false,
      dni: '',
      domicilio: '',
      ciudad: '',
      telefono: '',
      email: '',
      pais: '',
      codigoPostal: '',
      cuit: '',
      entrevistado: false,
      ocupacion: '',
      direccionOcupacion: '',
      licenciaAportada: false,
      licenciaVencimiento: 'dd / mm / aaaa',
      licenciaHabilitada: false,
      licenciaCategoria: '',
      nombre: '',
      apellido: '',
      rol: 'Pick tipo',
      lesiones: 'Pick lesiones',
      fechaNacimiento: 'dd / mm / aaaa'
    };
    reset({ ...emptyData });
  };

  const deleteButton = deleteInspeccionRoboRueda;

  const tableClick = (index) => {
    const formattedData = {
      ...inspeccionRoboRuedas[index],
      fechaNacimiento: formatDate(inspeccionRoboRuedas[index].fechaNacimiento),
      licenciaVencimiento: formatDate(inspeccionRoboRuedas[index].licenciaVencimiento)
    };
    reset({ ...formattedData });
    setButtonType(true);
  };

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
    getAllInspeccionRoboRueda(dispatch, data.id);
  }, []);

  return (
    <div className={styles.container}>
      {
        <div>
          {modalAddConfirmOpen && (
            <ModalConfirm
              method={buttonType ? 'Update' : 'Add'}
              onConfirm={() => onConfirmFunction()}
              setModalConfirmOpen={setModalAddConfirmOpen}
              message={
                buttonType
                  ? '¿Estás seguro de que quieres actualizar este inspeccionRoboRueda?'
                  : '¿Estás seguro de que quieres agregar este inspeccionRoboRueda?'
              }
            />
          )}
          {modalSuccess && (
            <ModalSuccess
              setModalSuccessOpen={setModalSuccessOpen}
              message={buttonType ? 'InspeccionRoboRueda editado' : 'InspeccionRoboRueda agregado'}
            />
          )}
        </div>
      }
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{data.id ? 'InspeccionRoboRueda' : 'InspeccionRoboRueda'}</h3>
      </div>
      <div className={styles.innerContainer}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.inputGroups}>
            <div className={styles.leftGroup}>
              <div className={styles.personalData}>
                <div className={styles.personalDataText}>
                  <div className={styles.personalDataTextColumn}>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.nombre?.message}
                        register={register}
                        nameTitle="Nombre"
                        type="text"
                        styleInput="normalInput"
                        nameInput="nombre"
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.dni?.message}
                        register={register}
                        nameTitle="DNI"
                        type="text"
                        styleInput="normalInput"
                        nameInput="dni"
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.telefono?.message}
                        register={register}
                        nameTitle="Telefono"
                        type="text"
                        styleInput="normalInput"
                        nameInput="telefono"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.pais?.message}
                        register={register}
                        nameTitle="Pais"
                        type="pais"
                        styleInput="normalInput"
                        nameInput="pais"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.apellido?.message}
                        register={register}
                        nameTitle="Apellido"
                        type="text"
                        styleInput="normalInput"
                        nameInput="apellido"
                      />
                    </div>
                  </div>
                  <div className={styles.personalDataTextColumn}>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.relacion?.message}
                        register={register}
                        nameTitle="Relacion"
                        type="text"
                        styleInput="normalInput"
                        nameInput="relacion"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.codigoPostal?.message}
                        register={register}
                        nameTitle="Codigo Postal"
                        type="number"
                        styleInput="normalInput"
                        nameInput="codigoPostal"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.cuit?.message}
                        register={register}
                        nameTitle="Cuit"
                        type="number"
                        styleInput="normalInput"
                        nameInput="cuit"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.ocupacion?.message}
                        register={register}
                        nameTitle="Ocupacion"
                        type="text"
                        styleInput="normalInput"
                        nameInput="ocupacion"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <OptionInput
                        data={arrayRoles}
                        dataLabel="Rol"
                        name="rol"
                        register={register}
                        error={errors.rol?.message}
                      />
                    </div>
                  </div>
                  <div className={styles.personalDataTextColumn}>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.direccionOcupacion?.message}
                        register={register}
                        nameTitle="Direccion Ocupacion"
                        type="text"
                        styleInput="normalInput"
                        nameInput="direccionOcupacion"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.ciudad?.message}
                        register={register}
                        nameTitle="Ciudad"
                        type="text"
                        styleInput="normalInput"
                        nameInput="ciudad"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.domicilio?.message}
                        register={register}
                        nameTitle="Domicilio"
                        type="text"
                        styleInput="normalInput"
                        nameInput="domicilio"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <Inputs
                        error={errors.email?.message}
                        register={register}
                        nameTitle="Email"
                        type="email"
                        styleInput="normalInput"
                        nameInput="email"
                        required
                      />
                    </div>
                    <div className={styles.inputContainer}>
                      <DateInput
                        error={errors.fechaNacimiento?.message}
                        register={register}
                        nameTitle="Fecha de Nacimiento"
                        type="date"
                        nameInput="fechaNacimiento"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.personalDataDate}></div>
              <div className={styles.personalDataOption}></div>
              <div className={styles.personalDataBoolean}>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.titular?.message}
                    register={register}
                    nameTitle="Titular"
                    type="checkbox"
                    nameInput="titular"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.entrevistado?.message}
                    register={register}
                    nameTitle="Entrevistado"
                    type="checkbox"
                    nameInput="entrevistado"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <Checkbox
                    error={errors.prioridad?.message}
                    register={register}
                    nameTitle="Prioridad"
                    type="checkbox"
                    nameInput="prioridad"
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <OptionInput
                    data={arrayLesiones}
                    dataLabel="Lesiones"
                    name="lesiones"
                    register={register}
                    error={errors.lesiones?.message}
                  />
                </div>
              </div>
              <div className={styles.licenceData}>
                <div className={styles.licenceDataText}> </div>
                <div className={styles.licenceDataDate}></div>
                <div className={styles.licenceDataOption}>
                  <div className={styles.inputContainer}>
                    <OptionInput
                      data={arrayCategorias}
                      dataLabel="Categoria de Licencias"
                      name="licenciaCategoria"
                      register={register}
                      error={errors.licenciaCategoria?.message}
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <DateInput
                      error={errors.licenciaVencimiento?.message}
                      register={register}
                      nameTitle="Fecha de Vencimiento"
                      type="date"
                      nameInput="licenciaVencimiento"
                      required
                    />
                  </div>
                </div>
                <div className={styles.licenceDataBoolean}>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.licenciaAportada?.message}
                      register={register}
                      nameTitle="Licencia Aportada"
                      type="checkbox"
                      nameInput="licenciaAportada"
                      required
                    />
                  </div>
                  <div className={styles.inputContainer}>
                    <Checkbox
                      error={errors.licenciaHabilitada?.message}
                      register={register}
                      nameTitle="Licencia Habilitada"
                      type="checkbox"
                      nameInput="licenciaHabilitada"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={styles.siniestroData}>
                <div className={styles.siniestroDataText}> </div>
                <div className={styles.siniestroDataDate}> </div>
                <div className={styles.siniestroDataOption}></div>
                <div className={styles.siniestroDataBoolean}> </div>
              </div>
            </div>
          </section>
          <div className={styles.btnContainer}>
            <Button clickAction={handleSubmit(onSubmit)} text={buttonType ? 'Editar' : 'Agregar'} />
            <Button clickAction={resetForm} text="Reiniciar" />
            <Button text="Cancelar" clickAction={cancelForm} />
          </div>
        </form>
        <div className={styles.rightTable}>
          <FormTable
            data={inspeccionRoboRuedas}
            columnTitleArray={columnTitleArray}
            columns={columns}
            handleClick={tableClick}
            deleteButton={deleteButton}
          />
        </div>
      </div>
      {toastError && (
        <ToastError setToastErroOpen={setToastErroOpen} message={'Error in database'} />
      )}
    </div>
  );
};

export default InspeccionRoboInspeccionRoboRuedasForm;
