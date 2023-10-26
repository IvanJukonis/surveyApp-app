import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllVehicles, vehicleDelete } from 'redux/vehicle/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Vehicle() {
  const dispatch = useDispatch();
  const vehicle = useSelector((state) => state.vehicle.list);
  const isPending = useSelector((state) => state.vehicle.pending);
  const isError = useSelector((state) => state.vehicle.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const columnTitleArray = [
    'involucrado',
    'dominio',
    'marca',
    'modelo',
    'color',
    'uso',
    'año',
    'descripcionDaños'
  ];
  const columns = [
    'involucrado',
    'dominio',
    'marca',
    'modelo',
    'color',
    'uso',
    'año',
    'descripcionDaños'
  ];

  const handleEditClick = (item) => {
    history.push(`/vehicle/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/vehicle/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllVehicles(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="Vehicle" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={vehicle}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={vehicleDelete}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default Vehicle;
