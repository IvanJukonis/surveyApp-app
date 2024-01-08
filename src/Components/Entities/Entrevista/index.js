import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllEntrevistaSiniestro,
  deleteEntrevistaSiniestro
} from 'redux/entrevistaSiniestro/thunks';
import {
  getAllEntrevistaRoboRueda,
  deleteEntrevistaRoboRueda
} from 'redux/entrevistaRoboRueda/thunks';
import { Button, OptionInput } from 'Components/Shared';
import { ToastError, TableComponent, Loader } from 'Components/Shared';
import { useHistory, useParams } from 'react-router-dom';
import styles from './entrevista.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

function Entrevista() {
  const dispatch = useDispatch();
  const id = useParams();
  const entrevistaRoboRueda = useSelector((state) => state.entrevistaRoboRueda.list);
  const entrevistaSiniestro = useSelector((state) => state.entrevistaSiniestro.list);
  const isPending = useSelector((state) => state.siniestro.pending);
  const isError = useSelector((state) => state.siniestro.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const entrevistas = [...entrevistaRoboRueda, ...entrevistaSiniestro];

  const columnTitleArray = ['Fecha', 'Rol', 'Tipo', 'Firma'];
  const columns = ['fechaEntrevista', 'rol', 'tipoEntrevista', 'firma'];
  const rolArray = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG'];
  const tipoArray = ['Relevamiento', 'Fraude'];
  const tipoExportacion = ['PDF', 'Word'];

  const relevador = ['/relevador/siniestros'].includes(location.pathname);
  const controlador = ['/controlador/siniestros'].includes(location.pathname);
  const actualUser = ['/relevador/siniestros', '/controlador/siniestros'].includes(
    location.pathname
  );
  console.log(id);

  const schema = Joi.object({
    rol: Joi.string()
      .valid('CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG')
      .messages({
        'any.only': 'Selecciona un tipo de rol permitido'
      }),
    tipo: Joi.string().valid('Relevamiento', 'Fraude').messages({
      'any.only': 'Selecciona un tipo de siniestro permitido'
    }),
    exportacion: Joi.any()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema)
  });

  const getPathPrefix = () => {
    if (relevador) {
      return '/relevador';
    }
    if (controlador) {
      return '/controlador';
    }
    return '/administrativo';
  };

  const handleAddClick = (rol, tipo) => {
    const pathPrefix = getPathPrefix();
    if (tipo == 'Fraude') {
      history.push(`${pathPrefix}/siniestros/entrevistaroborueda/${rol}/${id.id}`);
    } else {
      history.push(`${pathPrefix}/siniestros/entrevistasiniestro/${rol}/${id.id}`);
    }
  };

  const handleEditClick = (item) => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/form/${item._id}`, {
      params: { ...item, mode: 'edit' }
    });
  };

  const onSubmit = (data) => {
    handleAddClick(data.rol, data.tipo);
  };

  const deleteEntrevista = () => {
    deleteEntrevistaRoboRueda;
    deleteEntrevistaSiniestro;
  };
  const deleteButton = actualUser ? undefined : deleteEntrevista;

  useEffect(() => {
    getAllEntrevistaSiniestro(dispatch);
    getAllEntrevistaRoboRueda(dispatch);
  }, []);

  console.log(errors);

  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.leftContainer}>
          {isPending ? (
            <Loader />
          ) : (
            <TableComponent
              columnTitleArray={columnTitleArray}
              data={entrevistas}
              columns={columns}
              handleClick={handleEditClick}
              deleteButton={deleteButton}
            />
          )}
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topContainer}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={rolArray}
                  dataLabel="Seleccionar Rol"
                  name="rol"
                  register={register}
                  error={errors.rol?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <OptionInput
                  data={tipoArray}
                  dataLabel="Seleccionar Tipo"
                  name="tipo"
                  register={register}
                  error={errors.tipo?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Button clickAction={() => {}} text="AGREGAR" />
              </div>
              <div className={`${styles.inputContainer} ${styles.exportacionSpace}`}>
                <OptionInput
                  data={tipoExportacion}
                  dataLabel="Exportaciones"
                  name="exportacion"
                  register={register}
                  error={errors.exportacion?.message}
                />
              </div>
              <div className={styles.inputContainer}>
                <Button clickAction={() => {}} text="EXPORTAR" />
              </div>
            </form>
          </div>
          <div className={styles.bottomContainer}>
            <div className={styles.inputContainer}>
              <Button clickAction={() => {}} text="CANCELAR" />
            </div>
          </div>
        </div>
      </div>

      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in databaseee" />
      )}
    </section>
  );
}
export default Entrevista;
