import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getRelevador, deleteRelevador } from 'redux/relevador/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './Relevador.module.css';

function Relevador() {
  const dispatch = useDispatch();
  const relevador = useSelector((state) => state.relevador.list);
  const isPending = useSelector((state) => state.relevador.pending);
  const isError = useSelector((state) => state.relevador.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);

  const columnTitleArray = [
    'Nombre',
    'Apellido',
    'Tipo',
    'DNI',
    'Departamento',
    'Oficina',
    'Puesto'
  ];
  const columns = ['nombre', 'apellido', 'tipo', 'dni', 'departamento', 'oficina', 'puesto'];

  const getPathPrefix = () => {
    if (relevadorPath) {
      return '/relevador';
    }
    if (controladorPath) {
      return '/controlador';
    }
    return '/administrativo';
  };

  const handleEditClick = (item) => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/relevadores/form/${item._id}`, {
      params: { ...item, mode: 'edit' }
    });
  };

  const createMode = () => {
    history.push(`relevador/form/`, { params: { mode: 'create' } });
  };

  const relevadorPath = ['/relevador/relevadores'].includes(location.pathname);
  const controladorPath = ['/controlador/controladores'].includes(location.pathname);

  const actualUser = ['/relevador/controladores', '/controlador/controladores'].includes(
    location.pathname
  );

  const deleteButton = actualUser ? undefined : deleteRelevador;

  useEffect(() => {
    getRelevador(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>RELEVADORES</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.form}>
          <div className={styles.formContainer}>
            {!actualUser && (
              <div className={styles.btnAdd}>
                <AddButton entity="relevador" createMode={createMode} />
              </div>
            )}
            {isPending ? (
              <Loader />
            ) : (
              <TableComponent
                columnTitleArray={columnTitleArray}
                data={relevador}
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
export default Relevador;
