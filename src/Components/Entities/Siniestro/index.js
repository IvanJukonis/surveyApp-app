import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSiniestroStats, deleteSiniestro } from 'redux/siniestro/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './Siniestro.module.css';
import { getFirebaseUidFromToken } from '../../../Config/firebase-config';
import 'firebase/compat/auth';

function Siniestro() {
  const dispatch = useDispatch();
  const siniestro = useSelector((state) => state.siniestro.list);
  const isPending = useSelector((state) => state.siniestro.pending);
  const isError = useSelector((state) => state.siniestro.error);
  const history = useHistory();

  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const [userCurrent, setUserCurrent] = useState('');

  const controladores = useSelector((state) => state.controlador.list);
  const relevadores = useSelector((state) => state.relevador.list);
  const administrativos = useSelector((state) => state.administrativo.list);

  const columnTitleArray = [
    'N°Siniestro',
    'N°Informe',
    'Fecha',
    'Vencimiento',
    'Asignacion',
    'CIA',
    'Tipo'
  ];
  const columns = [
    'numSiniestro',
    'numInforme',
    'fechaSiniestro',
    'fechaVencimiento',
    'fechaAsignacion',
    'cia',
    'tipo'
  ];

  const controladorEmail = controladores.find(
    (oneControlador) => oneControlador.email === userCurrent
  );
  const relevadorEmail = relevadores.find((oneRelevador) => oneRelevador.email === userCurrent);
  const administrativoEmail = administrativos.find(
    (oneAdministrativo) => oneAdministrativo.email === userCurrent
  );

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const getPathPrefix = () => {
    if (relevador) {
      return '/relevador';
    }
    if (controlador) {
      return '/controlador';
    }
    return '/administrativo';
  };

  const handleEditClick = (item) => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/form/${item._id}`, {
      params: { ...item, mode: 'edit' }
    });
  };

  const createMode = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/siniestros/form`, { params: { mode: 'create' } });
  };

  const relevador = ['/relevador/siniestros'].includes(location.pathname);
  const controlador = ['/controlador/siniestros'].includes(location.pathname);

  const actualUser = ['/relevador/siniestros', '/controlador/siniestros'].includes(
    location.pathname
  );

  const deleteButton = actualUser ? undefined : deleteSiniestro;

  useEffect(() => {
    currentUser();
  }, []);

  useEffect(() => {
    if (controladorEmail?._id) {
      getSiniestroStats(dispatch, controladorEmail._id, 'controlador');
    }
    if (relevadorEmail?._id) {
      getSiniestroStats(dispatch, relevadorEmail._id, 'relevador');
    }
    if (administrativoEmail?._id) {
      getSiniestroStats(dispatch, administrativoEmail._id, 'administrativo');
    }
  }, [userCurrent]);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>LISTADO DE SINIESTRO</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.form}>
          {!actualUser && (
            <div className={styles.btnAdd}>
              <AddButton entity="siniestro" createMode={createMode} />
            </div>
          )}
          <div className={styles.formContainer}>
            {isPending ? (
              <Loader />
            ) : (
              <TableComponent
                columnTitleArray={columnTitleArray}
                data={siniestro}
                columns={columns}
                handleClick={handleEditClick}
                deleteButton={deleteButton}
              />
            )}
          </div>
        </div>
      </div>
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in databaseee" />
      )}
    </div>
  );
}
export default Siniestro;
