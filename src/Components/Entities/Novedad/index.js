import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNovedades, deleteNovedad } from 'redux/novedad/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Novedad() {
  const dispatch = useDispatch();
  const novedad = useSelector((state) => state.novedad.list);
  const isPending = useSelector((state) => state.novedad.pending);
  const isError = useSelector((state) => state.novedad.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const columnTitleArray = [
    'Nombre',
    'Apellido',
    'DNI',
    'Telefono',
    'Email',
    'Ciudad',
    'Tipo',
    'Lesiones',
    'Direccion',
    'Pais'
  ];
  const columns = [
    'nombre',
    'apellido',
    'DNI',
    'telefono',
    'email',
    'ciudad',
    'tipo',
    'lesiones',
    'direccion',
    'pais'
  ];

  const handleEditClick = (item) => {
    history.push(`/novedades/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/novedades/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllNovedades(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="Novedad" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={novedad}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={deleteNovedad}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default Novedad;
