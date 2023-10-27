import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLocations, deleteLocation } from 'redux/location/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function location() {
  const dispatch = useDispatch();
  const location = useSelector((state) => state.location.list);
  const isPending = useSelector((state) => state.location.pending);
  const isError = useSelector((state) => state.location.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const columnTitleArray = [
    'calleVT',
    'calleVA',
    'direccionVA',
    'direccionVT',
    'direccionCalleVA',
    'direccionCalleVT',
    'estadoCalleVA',
    'estadoCalleVT',
    'calleAdicional',
    'direccionCalleAdicional',
    'ciudad',
    'localidad'
  ];
  const columns = [
    'calleVA',
    'calleVT',
    'direccionVA',
    'direccionVT',
    'direccionCalleVA',
    'direccionCalleVT',
    'estadoCalleVA',
    'estadoCalleVT',
    'calleAdicional',
    'direccionCalleAdicional',
    'ciudad',
    'localidad'
  ];

  const handleEditClick = (item) => {
    history.push(`/location/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/location/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllLocations(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="location" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={location}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={deleteLocation}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default location;
