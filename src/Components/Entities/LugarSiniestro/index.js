import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLugarSiniestro, deleteLugarSiniestro } from 'redux/lugarSiniestro/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function lugarSiniestro() {
  const dispatch = useDispatch();
  const lugarSiniestro = useSelector((state) => state.lugarSiniestro.list);
  const isPending = useSelector((state) => state.lugarSiniestro.pending);
  const isError = useSelector((state) => state.lugarSiniestro.error);
  const history = useHistory();
  const [toastErroOpen, setToastErroOpen] = useState(isError);
  const columnTitleArray = [
    'Calle VA',
    'Calle VT',
    'Direccion VA',
    'Direccion VT',
    'Direccion Calle VA',
    'Direccion Calle VT',
    'ciudad',
    'provincia'
  ];
  const columns = [
    'calleVA',
    'calleVT',
    'direccionVA',
    'direccionVT',
    'direccionCalleVA',
    'direccionCalleVT',
    'ciudad',
    'provincia'
  ];

  const handleEditClick = (item) => {
    history.push(`/lugarSiniestro/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/lugarSiniestro/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllLugarSiniestro(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="lugarSiniestro" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={lugarSiniestro}
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
export default lugarSiniestro;
