import {
  getVehiclesPending,
  getVehiclesSuccess,
  getVehiclesError,
  deleteVehiclePending,
  deleteVehicleSuccess,
  deleteVehicleError,
  addVehiclePending,
  addVehicleSuccess,
  addVehicleError,
  updateVehiclePending,
  updateVehicleSuccess,
  updateVehicleError
} from './actions';

export const getAllVehicles = async (dispatch) => {
  try {
    dispatch(getVehiclesPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/vehicle`);
    const data = await reponse.json();
    const vehiclesList = data.data;
    dispatch(getVehiclesPending(false));
    dispatch(getVehiclesSuccess(vehiclesList));
    console.log(data);
  } catch (error) {
    dispatch(getVehiclesPending(false));
    dispatch(getVehiclesError(true));
  }
};

export const deleteVehicle = (vehicleID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteVehiclePending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehicle/${vehicleID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteVehiclePending(false));
        dispatch(deleteVehicleSuccess(vehicleID));
      }
    } catch (error) {
      dispatch(deleteVehicleError(error));
    }
  };
};

export const createVehicle = async (dispatch, vehicleData) => {
  try {
    dispatch(addVehiclePending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehicle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addVehiclePending(false));
      throw new Error(data.message);
    }
    dispatch(addVehicleSuccess(data.result));
  } catch (error) {
    dispatch(addVehiclePending(false));
    dispatch(addVehicleError(error.message));
  }
};

export const updateVehicle = async (dispatch, id, vehicleData) => {
  try {
    dispatch(updateVehiclePending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/vehicle/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicleData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateVehiclePending(false));
      throw new Error(data.message);
    }

    dispatch(updateVehicleSuccess(data));
  } catch (error) {
    dispatch(updateVehiclePending(false));
    dispatch(updateVehicleError(error.message));
  }
};
