import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSiniestro, deleteSiniestro } from 'redux/siniestro/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './Siniestro.module.css';

function Siniestro() {
  const dispatch = useDispatch();
  const siniestro = useSelector((state) => state.siniestro.list);
  const isPending = useSelector((state) => state.siniestro.pending);
  const isError = useSelector((state) => state.siniestro.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);

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

  const handleEditClick = (item) => {
    history.push(`/relevador/siniestros/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/relevador/siniestros/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getSiniestro(dispatch);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.btnAdd}>
        <AddButton entity="siniestro" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={siniestro}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={deleteSiniestro}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default Siniestro;
