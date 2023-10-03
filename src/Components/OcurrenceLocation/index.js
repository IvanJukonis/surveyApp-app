import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllOcurrenceLocations, ocurrenceLocationDelete } from 'redux/ocurrenceLocation/thunks';
import { ToastError, TableComponent, Loader, AddButton } from 'Components/Shared';
import { useHistory } from 'react-router-dom';

function OcurrenceLocation() {
  const dispatch = useDispatch();
  const ocurrenceLocation = useSelector((state) => state.ocurrenceLocation.list);
  const isPending = useSelector((state) => state.ocurrenceLocation.pending);
  const isError = useSelector((state) => state.ocurrenceLocation.error);
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
    history.push(`/ocurrenceLocation/form/${item._id}`, { params: { ...item, mode: 'edit' } });
  };

  const createMode = () => {
    history.push('/ocurrenceLocation/form/', { params: { mode: 'create' } });
  };

  useEffect(() => {
    getAllOcurrenceLocations(dispatch);
  }, []);

  return (
    <section>
      <div>
        <AddButton entity="OcurrenceLocation" createMode={createMode} />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <TableComponent
          columnTitleArray={columnTitleArray}
          data={ocurrenceLocation}
          columns={columns}
          handleClick={handleEditClick}
          deleteButton={ocurrenceLocationDelete}
        />
      )}
      {toastErroOpen && (
        <ToastError setToastErroOpen={setToastErroOpen} message="Error in database" />
      )}
    </section>
  );
}
export default OcurrenceLocation;
