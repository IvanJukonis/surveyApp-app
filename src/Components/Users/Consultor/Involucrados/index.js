import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllInvolveds, involvedDelete } from 'redux/involved/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Involved() {
  const dispatch = useDispatch();
  const involved = useSelector((state) => state.involved.list);
  const isPending = useSelector((state) => state.involved.pending);
  const isError = useSelector((state) => state.involved.error);
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
    getAllInvolveds(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="Involved" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={involved}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={involvedDelete}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default Involved;
