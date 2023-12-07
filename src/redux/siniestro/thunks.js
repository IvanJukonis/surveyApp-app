import {
  getSiniestroPending,
  getSiniestroSuccess,
  getSiniestroError,
  deleteSiniestroPending,
  deleteSiniestroSuccess,
  deleteSiniestroError,
  postSiniestroPending,
  postSiniestroSuccess,
  postSiniestroError,
  updateSiniestroPending,
  updateSiniestroSuccess,
  updateSiniestroError
} from './actions';

export const getSiniestro = async (dispatch) => {
  try {
    dispatch(getSiniestroPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/siniestro`);
    const data = await reponse.json();
    const siniestrosList = data.data;
    dispatch(getSiniestroPending(false));
    dispatch(getSiniestroSuccess(siniestrosList));
    dispatch(getSiniestroError(false));
  } catch (error) {
    dispatch(getSiniestroPending(false));
    dispatch(getSiniestroError(true));
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

export const postSiniestro = async (dispatch, newSiniestro) => {
  try {
    dispatch(postSiniestroPending(true));
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
      dispatch(postSiniestroPending(false));
      return dispatch(postSiniestroSuccess(newData.data));
    } else {
      dispatch(postSiniestroPending(false));
      return dispatch(postSiniestroError(true));
    }
  } catch (error) {
    dispatch(postSiniestroPending(false));
    return dispatch(postSiniestroError(true));
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
