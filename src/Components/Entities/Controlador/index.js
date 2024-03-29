import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getControlador, deleteControlador } from 'redux/controlador/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './Controlador.module.css';

function Controlador() {
  const dispatch = useDispatch();
  const controlador = useSelector((state) => state.controlador.list);
  const isPending = useSelector((state) => state.controlador.pending);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(false);

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
    if (relevador) {
      return '/relevador';
    }
    if (controladorPath) {
      return '/controlador';
    }
    if (administrativoPath) {
      return '/administrativo';
    }
    return '/superadmin';
  };

  const handleEditClick = (item) => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/controlador/form/${item._id}`, {
      params: { ...item, mode: 'edit' }
    });
  };

  const createMode = () => {
    history.push(`controlador/form/`, { params: { mode: 'create' } });
  };

  const relevador = ['/relevador/controlador'].includes(location.pathname);
  const controladorPath = ['/controlador/controlador'].includes(location.pathname);
  const administrativoPath = ['/administrativo/controlador'].includes(location.pathname);

  const actualUser = ['/relevador/controladores', '/controlador/controladores'].includes(
    location.pathname
  );

  const deleteButton = actualUser ? undefined : deleteControlador;

  useEffect(() => {
    getControlador(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>CONTROLADORES</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.form}>
          {!actualUser && (
            <div className={styles.btnAdd}>
              <AddButton entity="controlador" createMode={createMode} />
            </div>
          )}
          <div className={styles.formContainer}>
            {isPending ? (
              <Loader />
            ) : (
              <TableComponent
                columnTitleArray={columnTitleArray}
                data={controlador}
                columns={columns}
                handleClick={handleEditClick}
                deleteButton={deleteButton}
              />
            )}
          </div>
        </div>
      </div>
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </div>
  );
}
export default Controlador;
