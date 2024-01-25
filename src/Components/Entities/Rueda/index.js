import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllInvolucrado, deleteInvolucrado } from 'redux/involucrado/thunks';
import { ToastError, TableComponent, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Involucrado() {
  const dispatch = useDispatch();
  const involucrado = useSelector((state) => state.involucrado.list);
  const isPending = useSelector((state) => state.involucrado.pending);
  const isError = useSelector((state) => state.involucrado.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);

  const columnTitleArray = ['Nombre', 'Apellido', 'DNI', 'Telefono', 'Email', 'Ciudad', 'Tipo'];
  const columns = ['nombre', 'apellido', 'dni', 'telefono', 'email', 'ciudad', 'tipo'];

  const handleEditClick = (item) => {
    history.push(`/involucrados/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  useEffect(() => {
    getAllInvolucrado(dispatch);
  }, []);

  return (
    <section>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={involucrado}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={deleteInvolucrado}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default Involucrado;
