import {
  getInspeccionSiniestroPending,
  getInspeccionSiniestroSuccess,
  getInspeccionSiniestroError,
  deleteInspeccionSiniestroPending,
  deleteInspeccionSiniestroSuccess,
  deleteInspeccionSiniestroError,
  postInspeccionSiniestroPending,
  postInspeccionSiniestroSuccess,
  postInspeccionSiniestroError,
  updateInspeccionSiniestroPending,
  updateInspeccionSiniestroSuccess,
  updateInspeccionSiniestroError
} from './actions';

export const getAllInspeccionSiniestro = async (dispatch, sinId) => {
  try {
    dispatch(getInspeccionSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionSiniestro`);
    const data = await response.json();
    const inspeccionSiniestrosList = data.data;
    const inspeccionSiniestrosSiniestroList = inspeccionSiniestrosList.filter(
      (inspeccionSiniestro) => inspeccionSiniestro.siniestro[0] === sinId
    );
    dispatch(getInspeccionSiniestroPending(false));
    dispatch(getInspeccionSiniestroSuccess(inspeccionSiniestrosSiniestroList));
  } catch (error) {
    dispatch(getInspeccionSiniestroPending(false));
    dispatch(getInspeccionSiniestroError(true));
  }
};

export const getInspeccionSiniestro = async (dispatch) => {
  try {
    dispatch(getInspeccionSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionSiniestro`);
    const data = await response.json();
    const inspeccionSiniestrosListAll = data.data;
    dispatch(getInspeccionSiniestroPending(false));
    dispatch(getInspeccionSiniestroSuccess(inspeccionSiniestrosListAll));
  } catch (error) {
    dispatch(getInspeccionSiniestroPending(false));
    dispatch(getInspeccionSiniestroError(true));
  }
};

export const deleteInspeccionSiniestro = (inspeccionSiniestroID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteInspeccionSiniestroPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/inspeccionSiniestro/${inspeccionSiniestroID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteInspeccionSiniestroPending(false));
        dispatch(deleteInspeccionSiniestroSuccess(inspeccionSiniestroID));
      }
    } catch (error) {
      dispatch(deleteInspeccionSiniestroError(error));
    }
  };
};

export const postInspeccionSiniestro = async (dispatch, inspeccionSiniestroData) => {
  try {
    dispatch(postInspeccionSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionSiniestro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspeccionSiniestroData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postInspeccionSiniestroPending(false));
      return dispatch(postInspeccionSiniestroSuccess(newData.data));
    } else {
      dispatch(postInspeccionSiniestroPending(false));
      return dispatch(postInspeccionSiniestroError(true));
    }
  } catch (error) {
    dispatch(postInspeccionSiniestroPending(false));
    return dispatch(postInspeccionSiniestroError(true));
  }
};

export const updateInspeccionSiniestro = async (dispatch, id, inspeccionSiniestroData) => {
  try {
    dispatch(updateInspeccionSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionSiniestro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspeccionSiniestroData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateInspeccionSiniestroPending(false));
      return dispatch(updateInspeccionSiniestroSuccess(newData.data));
    } else {
      dispatch(updateInspeccionSiniestroPending(false));
      return dispatch(updateInspeccionSiniestroError(true));
    }
  } catch (error) {
    dispatch(updateInspeccionSiniestroPending(false));
    return dispatch(updateInspeccionSiniestroError(error.message));
  }
};
