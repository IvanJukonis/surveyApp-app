import {
  getEntrevistaSiniestroPending,
  getEntrevistaSiniestroSuccess,
  getEntrevistaSiniestroError,
  deleteEntrevistaSiniestroPending,
  deleteEntrevistaSiniestroSuccess,
  deleteEntrevistaSiniestroError,
  postEntrevistaSiniestroPending,
  postEntrevistaSiniestroSuccess,
  postEntrevistaSiniestroError,
  updateEntrevistaSiniestroPending,
  updateEntrevistaSiniestroSuccess,
  updateEntrevistaSiniestroError
} from './actions';

export const getAllEntrevistaSiniestro = async (dispatch) => {
  try {
    dispatch(getEntrevistaSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro`);
    const data = await response.json();

    const EntrevistaSiniestrosListAll = data.data;
    console.log(data.data + 'llega?');
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroSuccess(EntrevistaSiniestrosListAll));
  } catch (error) {
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroError(true));
  }
};

export const deleteEntrevistaSiniestro = (entrevistaSiniestroID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteEntrevistaSiniestroPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro/${entrevistaSiniestroID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteEntrevistaSiniestroPending(false));
        dispatch(deleteEntrevistaSiniestroSuccess(entrevistaSiniestroID));
      }
    } catch (error) {
      dispatch(deleteEntrevistaSiniestroError(error));
    }
  };
};

export const postEntrevistaSiniestro = async (dispatch, entrevistaSiniestroData) => {
  try {
    dispatch(postEntrevistaSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entrevistaSiniestroData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postEntrevistaSiniestroPending(false));
      return dispatch(postEntrevistaSiniestroSuccess(newData.data));
    } else {
      dispatch(postEntrevistaSiniestroPending(false));
      return dispatch(postEntrevistaSiniestroError(true));
    }
  } catch (error) {
    dispatch(postEntrevistaSiniestroPending(false));
    return dispatch(postEntrevistaSiniestroError(true));
  }
};

export const updateEntrevistaSiniestro = async (dispatch, id, entrevistaSiniestroData) => {
  try {
    dispatch(updateEntrevistaSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entrevistaSiniestroData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateEntrevistaSiniestroPending(false));
      return dispatch(updateEntrevistaSiniestroSuccess(newData.data));
    } else {
      dispatch(updateEntrevistaSiniestroPending(false));
      return dispatch(updateEntrevistaSiniestroError(true));
    }
  } catch (error) {
    dispatch(updateEntrevistaSiniestroPending(false));
    return dispatch(updateEntrevistaSiniestroError(error.message));
  }
};
