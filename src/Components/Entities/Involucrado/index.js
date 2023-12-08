import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllInvolucrados, deleteInvolucrado } from 'redux/involucrado/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Involucrado() {
  const dispatch = useDispatch();
  const involucrado = useSelector((state) => state.involucrado.list);
  const isPending = useSelector((state) => state.involucrado.pending);
  const isError = useSelector((state) => state.involucrado.error);
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
    history.push(`/involucrados/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/involucrados/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllInvolucrados(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="Involucrado" createMode={createMode} />
      </div>
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
