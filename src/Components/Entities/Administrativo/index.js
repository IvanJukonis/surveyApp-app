import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAdministrativo, deleteAdministrativo } from 'redux/administrativo/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './Administrativo.module.css';

function Administrativo() {
  const dispatch = useDispatch();
  const administrativo = useSelector((state) => state.administrativo.list);
  const isPending = useSelector((state) => state.administrativo.pending);
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

  const handleEditClick = (item) => {
    history.push(`/superadmin/administrativo/form/${item._id}`, {
      params: { ...item, mode: 'edit' }
    });
  };

  const createMode = () => {
    history.push(`administrativo/form/`, { params: { mode: 'create' } });
  };

  const actualUser = ['/relevador/administrativos', '/administrativo/administrativos'].includes(
    location.pathname
  );

  const deleteButton = actualUser ? undefined : deleteAdministrativo;

  useEffect(() => {
    getAdministrativo(dispatch);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.imgTop}>
        <p className={styles.imgText}>ADMINISTRATIVOS</p>
      </div>
      <div className={styles.innerContainer}>
        <div className={styles.form}>
          {!actualUser && (
            <div className={styles.btnAdd}>
              <AddButton entity="administrativo" createMode={createMode} />
            </div>
          )}
          <div className={styles.formContainer}>
            {isPending ? (
              <Loader />
            ) : (
              <TableComponent
                columnTitleArray={columnTitleArray}
                data={administrativo}
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
export default Administrativo;
