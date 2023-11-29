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
    console.log('hola');
    dispatch(getSiniestrosPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/siniestro`);
    const data = await reponse.json();
    const siniestrosList = data.data;
    dispatch(getSiniestrosPending(false));
    dispatch(getSiniestrosSuccess(siniestrosList));
    console.log(data);
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

export const createSiniestro = async (dispatch, siniestroData) => {
  try {
    dispatch(addSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/siniestro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(siniestroData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addSiniestroPending(false));
      throw new Error(data.message);
    }
    dispatch(addSiniestroSuccess(data.result));
  } catch (error) {
    dispatch(addSiniestroPending(false));
    dispatch(addSiniestroError(error.message));
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
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateSiniestroPending(false));
      throw new Error(data.message);
    }

    dispatch(updateSiniestroSuccess(data));
  } catch (error) {
    dispatch(updateSiniestroPending(false));
    dispatch(updateSiniestroError(error.message));
  }
};
