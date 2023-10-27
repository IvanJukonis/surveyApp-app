import {
  getLocationsPending,
  getLocationsSuccess,
  getLocationsError,
  deleteLocationPending,
  deleteLocationSuccess,
  deleteLocationError,
  addLocationPending,
  addLocationSuccess,
  addLocationError,
  updateLocationPending,
  updateLocationSuccess,
  updateLocationError
} from './actions';

export const getAllLocations = async (dispatch) => {
  try {
    dispatch(getLocationsPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/location`);
    const data = await reponse.json();
    const locationsList = data.data;
    dispatch(getLocationsPending(false));
    dispatch(getLocationsSuccess(locationsList));
    console.log(data);
  } catch (error) {
    dispatch(getLocationsPending(false));
    dispatch(getLocationsError(true));
  }
};

export const deleteLocation = (locationID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteLocationPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/location/${locationID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteLocationPending(false));
        dispatch(deleteLocationSuccess(locationID));
      }
    } catch (error) {
      dispatch(deleteLocationError(error));
    }
  };
};

export const createLocation = async (dispatch, locationData) => {
  try {
    dispatch(addLocationPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addLocationPending(false));
      throw new Error(data.message);
    }
    dispatch(addLocationSuccess(data.result));
  } catch (error) {
    dispatch(addLocationPending(false));
    dispatch(addLocationError(error.message));
  }
};

export const updateLocation = async (dispatch, id, locationData) => {
  try {
    dispatch(updateLocationPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/location/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateLocationPending(false));
      throw new Error(data.message);
    }

    dispatch(updateLocationSuccess(data));
  } catch (error) {
    dispatch(updateLocationPending(false));
    dispatch(updateLocationError(error.message));
  }
};
