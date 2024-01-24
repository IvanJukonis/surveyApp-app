import {
  getVehiculoPending,
  getVehiculoSuccess,
  getVehiculoError,
  deleteVehiculoPending,
  deleteVehiculoSuccess,
  deleteVehiculoError,
  postVehiculoPending,
  postVehiculoSuccess,
  postVehiculoError,
  updateVehiculoPending,
  updateVehiculoSuccess,
  updateVehiculoError
} from './actions';

export const getAllVehiculos = async (dispatch, siniestroId) => {
  try {
    dispatch(getVehiculoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehiculo`);
    const data = await response.json();
    const vehiculosListAll = data.data;
    const vehiculosSiniestroList = vehiculosListAll.filter(
      (vehiculo) => vehiculo.siniestro[0] === siniestroId
    );
    dispatch(getVehiculoPending(false));
    dispatch(getVehiculoSuccess(vehiculosSiniestroList));
  } catch (error) {
    dispatch(getVehiculoPending(false));
    dispatch(getVehiculoError(true));
  }
};

export const deleteVehiculo = (vehiculoID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteVehiculoPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehiculo/${vehiculoID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteVehiculoPending(false));
        dispatch(deleteVehiculoSuccess(vehiculoID));
      }
    } catch (error) {
      dispatch(deleteVehiculoError(error));
    }
  };
};

export const postVehiculo = async (dispatch, vehiculoData) => {
  try {
    dispatch(postVehiculoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehiculo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehiculoData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postVehiculoPending(false));
      return dispatch(postVehiculoSuccess(newData.data));
    } else {
      dispatch(postVehiculoPending(false));
      return dispatch(postVehiculoError(true));
    }
  } catch (error) {
    dispatch(postVehiculoPending(false));
    return dispatch(postVehiculoError(true));
  }
};

export const updateVehiculo = async (dispatch, id, vehiculoData) => {
  try {
    dispatch(updateVehiculoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehiculo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehiculoData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateVehiculoPending(false));
      throw new Error(data.message);
    }

    dispatch(updateVehiculoSuccess(data));
  } catch (error) {
    dispatch(updateVehiculoPending(false));
    dispatch(updateVehiculoError(error.message));
  }
};
