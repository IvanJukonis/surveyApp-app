import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllInvestigators, investigatorDelete } from 'redux/investigator/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Investigator() {
  const dispatch = useDispatch();
  const history = useHistory();

  const investigator = useSelector((state) => state.investigator.list);
  const isPending = useSelector((state) => state.investigator.pending);
  const isError = useSelector((state) => state.investigator.error);

  const [toastErroOpen, setToastErroOpen] = useState(isError);

  const columnTitleArray = [
    'nombre',
    'apellido',
    'correoElectronico',
    'DNI',
    'telefono',
    'direccion',
    'activo',
    'localidad'
  ];
  const columns = [
    'nombre',
    'apellido',
    'correoElectronico',
    'DNI',
    'telefono',
    'direccion',
    'activo',
    'localidad'
  ];

  const handleEditClick = (item) => {
    history.push(`/investigator/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/investigator/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllInvestigators(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="Investigator" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={investigator}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={investigatorDelete}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}

export default Investigator;
