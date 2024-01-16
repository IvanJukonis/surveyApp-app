import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getSinEntrevistaSiniestro,
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
  const history = useHistory();
  const entrevistaRoboRueda = useSelector((state) => state.entrevistaRoboRueda.list);
  const entrevistaSiniestro = useSelector((state) => state.entrevistaSiniestro.list);
  const isPending = useSelector((state) => state.siniestro.pending);
  const isError = useSelector((state) => state.siniestro.error);
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const entrevistas = [...entrevistaRoboRueda, ...entrevistaSiniestro];

  const columnTitleArray = ['Nombre', 'Apellido', 'Fecha', 'Rol', 'Tipo', 'Firma'];
  const columns = [
    'nombreEntrevistado',
    'apellidoEntrevistado',
    'fechaEntrevista',
    'rol',
    'tipoEntrevista',
    'firma'
  ];
  const rolArray = ['CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG'];
  const tipoArray = ['Relevamiento', 'Fraude'];
  const tipoExportacion = ['PDF', 'Word'];

  const actualUser = ['/relevador/siniestros', '/controlador/siniestros'].includes(
    location.pathname
  );

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

  const handleAddClick = (rol, tipo) => {
    if (tipo == 'Fraude') {
      history.push(`entrevistaroborueda/${rol}/${id.id}`, {
        params: { mode: 'create' }
      });
    } else {
      history.push(`entrevistasiniestro/${rol}/${id.id}`, {
        params: { mode: 'create' }
      });
    }
  };

  const handleEditClick = (item) => {
    if (item.alarmaActiva == undefined) {
      history.push(`entrevistasiniestro/${item.rol}/${item._id}`, {
        params: { ...item, mode: 'edit', siniestroId: id }
      });
    } else {
      history.push(`entrevistaroborueda/${item.rol}/${item._id}`, {
        params: { ...item, mode: 'edit', siniestroId: id }
      });
    }
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
    getSinEntrevistaSiniestro(dispatch, id.id);
    getAllEntrevistaRoboRueda(dispatch);
  }, []);

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
              <Button text="Cancel" clickAction={() => history.goBack()} />
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
