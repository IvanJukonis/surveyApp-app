import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllSiniestros, deleteSiniestro } from 'redux/siniestro/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Siniestro() {
  const dispatch = useDispatch();
  const siniestro = useSelector((state) => state.siniestro.list);
  const isPending = useSelector((state) => state.siniestro.pending);
  const isError = useSelector((state) => state.siniestro.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);

  const columnTitleArray = [
    'numSiniestro',
    'numPoliza',
    'numInforme',
    'fechaSiniestro',
    'fechaDenuncia',
    'fechaVencimiento',
    'fechaAsignacion',
    'hrSiniestro',
    'cia',
    'tipo',
    'presencial',
    'instrucciones',
    'denuncia'
  ];
  const columns = [
    'numSiniestro',
    'numPoliza',
    'numInforme',
    'fechaSiniestro',
    'fechaDenuncia',
    'fechaVencimiento',
    'fechaAsignacion',
    'hrSiniestro',
    'cia',
    'tipo',
    'presencial',
    'instrucciones',
    'denuncia'
  ];

  const handleEditClick = (item) => {
    history.push(`/siniestro/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/siniestro/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllSiniestros(dispatch);
  }, []);

  return (
    <section>
      <div>
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
