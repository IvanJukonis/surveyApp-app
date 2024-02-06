import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVehiculoSiniestro, deleteVehiculo } from 'redux/vehiculo/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function Vehiculo() {
  const dispatch = useDispatch();
  const vehiculo = useSelector((state) => state.vehiculo.list);
  const isPending = useSelector((state) => state.vehiculo.pending);
  const isError = useSelector((state) => state.vehiculo.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const columnTitleArray = ['Rol', 'Dominio', 'Modelo', 'Marca', 'Color'];
  const columns = ['rol', 'dominio', 'modelo', 'marca', 'color'];

  const handleEditClick = (item) => {
    history.push(`/vehiculos/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/vehiculos/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getVehiculoSiniestro(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="Vehiculo" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={vehiculo}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={deleteVehiculo}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default Vehiculo;
