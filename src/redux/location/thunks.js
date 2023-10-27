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
  editLocationPending,
  editLocationSuccess,
  editLocationError
} from './actions';

export const getAllLocations = async (dispatch) => {
  try {
    dispatch(getLocationsPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/ocurrenceLocation`);
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

export const locationDelete = (locationID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteLocationPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/ocurrenceLocation/${locationID}`,
        {
          method: 'DELETE'
        }
      );
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocurrenceLocation`, {
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
    dispatch(editLocationPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocurrenceLocation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(locationData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(editLocationPending(false));
      throw new Error(data.message);
    }

    dispatch(editLocationSuccess(data));
  } catch (error) {
    dispatch(editLocationPending(false));
    dispatch(editLocationError(error.message));
  }
};
