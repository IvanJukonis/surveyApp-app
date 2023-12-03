import {
  getSiniestrosPending,
  getSiniestrosSuccess,
  getSiniestrosError,
  deleteSiniestroPending,
  deleteSiniestroSuccess,
  deleteSiniestroError,
  addSiniestroPending,
  addSiniestroSuccess,
  addSiniestroError,
  updateSiniestroPending,
  updateSiniestroSuccess,
  updateSiniestroError
} from './actions';

export const getAllSiniestros = async (dispatch) => {
  try {
    dispatch(getSiniestrosPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/siniestro`);
    const data = await reponse.json();
    const siniestrosList = data.data;
    dispatch(getSiniestrosPending(false));
    dispatch(getSiniestrosSuccess(siniestrosList));
  } catch (error) {
    dispatch(getSiniestrosPending(false));
    dispatch(getSiniestrosError(true));
  }
};

export const deleteSiniestro = (siniestroID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteSiniestroPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/siniestro/${siniestroID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteSiniestroPending(false));
        dispatch(deleteSiniestroSuccess(siniestroID));
      }
    } catch (error) {
      dispatch(deleteSiniestroError(error));
    }
  };
};

export const createSiniestro = async (dispatch, newSiniestro) => {
  try {
    dispatch(addSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/siniestro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newSiniestro)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(addSiniestroPending(false));
      return dispatch(addSiniestroSuccess(newData.data));
    } else {
      dispatch(addSiniestroPending(false));
      return dispatch(addSiniestroError(true));
    }
  } catch (error) {
    dispatch(addSiniestroPending(false));
    return dispatch(addSiniestroError(true));
  }
};

export const updateSiniestro = async (dispatch, id, siniestroData) => {
  try {
    dispatch(updateSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/siniestro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(siniestroData)
    });

    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateSiniestroPending(false));
      return dispatch(updateSiniestroSuccess(newData.data));
    } else {
      dispatch(updateSiniestroPending(false));
      return dispatch(updateSiniestroError(true));
    }
  } catch (error) {
    dispatch(updateSiniestroPending(false));
    return dispatch(updateSiniestroError(error.message));
  }
};
