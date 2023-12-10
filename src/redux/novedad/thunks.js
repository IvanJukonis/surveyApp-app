import {
  getNovedadPending,
  getNovedadSuccess,
  getNovedadError,
  deleteNovedadPending,
  deleteNovedadSuccess,
  deleteNovedadError,
  postNovedadPending,
  postNovedadSuccess,
  postNovedadError,
  updateNovedadPending,
  updateNovedadSuccess,
  updateNovedadError
} from './actions';

export const getAllNovedad = async (dispatch) => {
  try {
    dispatch(getNovedadPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/novedad`);
    const data = await reponse.json();
    const novedadesList = data.data;
    dispatch(getNovedadPending(false));
    dispatch(getNovedadSuccess(novedadesList));
  } catch (error) {
    dispatch(getNovedadPending(false));
    dispatch(getNovedadError(true));
  }
};

export const deleteNovedad = (novedadID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteNovedadPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/novedad/${novedadID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteNovedadPending(false));
        dispatch(deleteNovedadSuccess(novedadID));
      }
    } catch (error) {
      dispatch(deleteNovedadError(error));
    }
  };
};

export const postNovedad = async (dispatch, novedadData) => {
  try {
    dispatch(postNovedadPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/novedad`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novedadData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(postNovedadPending(false));
      throw new Error(data.message);
    }
    dispatch(postNovedadSuccess(data.result));
  } catch (error) {
    dispatch(postNovedadPending(false));
    dispatch(postNovedadError(error.message));
  }
};

export const updateNovedad = async (dispatch, id, novedadData) => {
  try {
    dispatch(updateNovedadPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/novedad/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novedadData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateNovedadPending(false));
      throw new Error(data.message);
    }

    dispatch(updateNovedadSuccess(data));
  } catch (error) {
    dispatch(updateNovedadPending(false));
    dispatch(updateNovedadError(error.message));
  }
};
