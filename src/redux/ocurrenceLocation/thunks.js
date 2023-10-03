import {
  getOcurrenceLocationsPending,
  getOcurrenceLocationsSuccess,
  getOcurrenceLocationsError,
  deleteOcurrenceLocationPending,
  deleteOcurrenceLocationSuccess,
  deleteOcurrenceLocationError,
  addOcurrenceLocationPending,
  addOcurrenceLocationSuccess,
  addOcurrenceLocationError,
  editOcurrenceLocationPending,
  editOcurrenceLocationSuccess,
  editOcurrenceLocationError
} from './actions';

export const getAllOcurrenceLocations = async (dispatch) => {
  try {
    dispatch(getOcurrenceLocationsPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/ocurrenceLocation`);
    const data = await reponse.json();
    const ocurrenceLocationsList = data.data;
    dispatch(getOcurrenceLocationsPending(false));
    dispatch(getOcurrenceLocationsSuccess(ocurrenceLocationsList));
    console.log(data);
  } catch (error) {
    dispatch(getOcurrenceLocationsPending(false));
    dispatch(getOcurrenceLocationsError(true));
  }
};

export const ocurrenceLocationDelete = (ocurrenceLocationID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteOcurrenceLocationPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/ocurrenceLocation/${ocurrenceLocationID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteOcurrenceLocationPending(false));
        dispatch(deleteOcurrenceLocationSuccess(ocurrenceLocationID));
      }
    } catch (error) {
      dispatch(deleteOcurrenceLocationError(error));
    }
  };
};

export const createOcurrenceLocation = async (dispatch, ocurrenceLocationData) => {
  try {
    dispatch(addOcurrenceLocationPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocurrenceLocation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ocurrenceLocationData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addOcurrenceLocationPending(false));
      throw new Error(data.message);
    }
    dispatch(addOcurrenceLocationSuccess(data.result));
  } catch (error) {
    dispatch(addOcurrenceLocationPending(false));
    dispatch(addOcurrenceLocationError(error.message));
  }
};

export const updateOcurrenceLocation = async (dispatch, id, ocurrenceLocationData) => {
  try {
    dispatch(editOcurrenceLocationPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/ocurrenceLocation/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ocurrenceLocationData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(editOcurrenceLocationPending(false));
      throw new Error(data.message);
    }

    dispatch(editOcurrenceLocationSuccess(data));
  } catch (error) {
    dispatch(editOcurrenceLocationPending(false));
    dispatch(editOcurrenceLocationError(error.message));
  }
};
