import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSinEntrevistaSiniestro } from 'redux/entrevistaSiniestro/thunks';
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
  const [selectedEntrevista, setSelectedEntrevista] = useState([]);

  let entrevistas = [];

  if (Array.isArray(entrevistaSiniestro) && Array.isArray(entrevistaRoboRueda)) {
    entrevistas = [...entrevistaSiniestro, ...entrevistaRoboRueda];
  } else if (Array.isArray(entrevistaSiniestro)) {
    entrevistas = [...entrevistaSiniestro];
  } else if (Array.isArray(entrevistaRoboRueda)) {
    entrevistas = [...entrevistaRoboRueda];
  }

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
  const tipoArray = ['Fraude', 'Siniestro'];
  const tipoExportacion = ['PDF', 'Word'];

  const schema = Joi.object({
    rol: Joi.string()
      .valid('CVA', 'CVT', 'PVA', 'PVT', 'TTG', 'TER', 'TVT', 'TVA', 'SOC', 'ABG')
      .messages({
        'any.only': 'Selecciona un tipo de rol permitido'
      }),
    tipo: Joi.string().valid('Fraude', 'Siniestro').messages({
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
        params: { mode: false, siniestroId: id.id }
      });
    } else {
      history.push(`entrevistasiniestro/${rol}/${id.id}`, {
        params: { mode: false, siniestroId: id.id }
      });
    }
  };

  const handleEditClick = (item) => {
    if (item.alarmaActiva == undefined) {
      history.push(`entrevistasiniestro/${item.rol}/${item._id}`, {
        params: { ...item, mode: true, siniestroId: id.id }
      });
    } else {
      history.push(`entrevistaroborueda/${item.rol}/${item._id}`, {
        params: { ...item, mode: true, siniestroId: id.id }
      });
    }
  };

  const onSubmit = (data) => {
    handleAddClick(data.rol, data.tipo);
  };

  useEffect(() => {
    getSinEntrevistaSiniestro(dispatch, id.id);
    getAllEntrevistaRoboRueda(dispatch, id.id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>ENTREVISTAS</p>
      </div>
      <section className={styles.innerContainer}>
        <div className={styles.formContainer}>
          <div className={styles.inputGroups}>
            {isPending ? (
              <Loader />
            ) : (
              <TableComponent
                columnTitleArray={columnTitleArray}
                data={entrevistas}
                columns={columns}
                handleClick={handleEditClick}
                deleteButton={deleteEntrevistaRoboRueda}
                exportExcel={true}
                selectedEntrevista={selectedEntrevista}
                setSelectedEntrevista={setSelectedEntrevista}
              />
            )}
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.topContainer}>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <section className={styles.inputGroupsForm}>
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
                  <div className={styles.inputContainerBtn}>
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
                  <div className={styles.inputContainerBtn}>
                    <Button clickAction={() => {}} text="EXPORTAR" />
                  </div>
                </section>
              </form>
            </div>
            <div className={styles.bottomContainer}>
              <div className={styles.inputContainerBtn}>
                <Button text="Cancelar" clickAction={() => history.goBack()} />
              </div>
            </div>
          </div>
        </div>

        {toastErroOpen && (
          <ToastError setToastErroOpen={setToastErroOpen} message="Error in databaseee" />
        )}
      </section>
    </div>
  );
}
export default Entrevista;
