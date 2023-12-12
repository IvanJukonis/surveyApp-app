import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLugarSiniestro, deleteLugarSiniestro } from 'redux/lugarSiniestro/thunks';
import { ToastError, TableComponent, Loader } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function lugarRoboRueda() {
  const dispatch = useDispatch();
  const lugarRoboRueda = useSelector((state) => state.lugarRoboRueda.list);
  const isPending = useSelector((state) => state.lugarRoboRueda.pending);
  const isError = useSelector((state) => state.lugarRoboRueda.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const columnTitleArray = ['direccion', 'ciudad', 'provincia', 'permiso', 'alarma', 'usoEntorno'];
  const columns = ['Direccion', 'Ciudad', 'Provincia', 'Permiso', 'Alarma', 'Uso de Entorno'];

  const handleEditClick = (item) => {
    history.push(`/lugarRoboRueda/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  useEffect(() => {
    getAllLugarSiniestro(dispatch);
  }, []);

  return (
    <section>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={lugarRoboRueda}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={deleteLugarSiniestro}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default lugarRoboRueda;
