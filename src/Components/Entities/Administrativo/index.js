import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllAdministrativos, administrativoDelete } from 'redux/administrativo/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './Administrativo.module.css';

function Administrativo() {
  const dispatch = useDispatch();
  const administrativo = useSelector((state) => state.administrativo.list);
  const isPending = useSelector((state) => state.administrativo.pending);
  const isError = useSelector((state) => state.administrativo.error);
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
    if (relevador) {
      return '/relevador';
    }
    if (administrativoPath) {
      return '/administrativo';
    }
    return '/administrativo';
  };

  const handleEditClick = (item) => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/administrativos/form/${item._id}`, {
      params: { ...item, mode: 'edit' }
    });
  };

  const createMode = () => {
    const pathPrefix = getPathPrefix();
    history.push(`${pathPrefix}/administrativos/form/`, { params: { mode: 'create' } });
  };

  const relevador = ['/relevador/administrativos'].includes(location.pathname);
  const administrativoPath = ['/administrativo/administrativos'].includes(location.pathname);

  const actualUser = ['/relevador/administrativos', '/administrativo/administrativos'].includes(
    location.pathname
  );

  const deleteButton = actualUser ? undefined : administrativoDelete;

  useEffect(() => {
    getAllAdministrativos(dispatch);
  }, []);

  return (
    <section className={styles.container}>
      {!actualUser && (
        <div className={styles.btnAdd}>
          <AddButton entity="administrativo" createMode={createMode} />
        </div>
      )}
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
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in databaseee" />
      )}
    </section>
  );
}
export default Administrativo;
