import {
  getRuedaPending,
  getRuedaSuccess,
  getRuedaError,
  deleteRuedaPending,
  deleteRuedaSuccess,
  deleteRuedaError,
  postRuedaPending,
  postRuedaSuccess,
  postRuedaError,
  updateRuedaPending,
  updateRuedaSuccess,
  updateRuedaError
} from './actions';

export const getAllRueda = async (dispatch, sinId) => {
  try {
    dispatch(getRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rueda`);
    const data = await response.json();
    const ruedasList = data.data;
    const ruedasSiniestroList = ruedasList.filter((rueda) => rueda.siniestro[0] === sinId);
    dispatch(getRuedaPending(false));
    dispatch(getRuedaSuccess(ruedasSiniestroList));
  } catch (error) {
    dispatch(getRuedaPending(false));
    dispatch(getRuedaError(true));
  }
};

export const getRueda = async (dispatch) => {
  try {
    dispatch(getRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rueda`);
    const data = await response.json();
    const ruedasListAll = data.data;
    dispatch(getRuedaPending(false));
    dispatch(getRuedaSuccess(ruedasListAll));
  } catch (error) {
    dispatch(getRuedaPending(false));
    dispatch(getRuedaError(true));
  }
};

export const deleteRueda = (ruedaID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteRuedaPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rueda/${ruedaID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteRuedaPending(false));
        dispatch(deleteRuedaSuccess(ruedaID));
      }
    } catch (error) {
      dispatch(deleteRuedaError(error));
    }
  };
};

export const postRueda = async (dispatch, ruedaData) => {
  try {
    dispatch(postRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rueda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ruedaData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postRuedaPending(false));
      return dispatch(postRuedaSuccess(newData.data));
    } else {
      dispatch(postRuedaPending(false));
      return dispatch(postRuedaError(true));
    }
  } catch (error) {
    dispatch(postRuedaPending(false));
    return dispatch(postRuedaError(true));
  }
};

export const updateRueda = async (dispatch, id, ruedaData) => {
  try {
    dispatch(updateRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/rueda/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ruedaData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateRuedaPending(false));
      return dispatch(updateRuedaSuccess(newData.data));
    } else {
      dispatch(updateRuedaPending(false));
      return dispatch(updateRuedaError(true));
    }
  } catch (error) {
    dispatch(updateRuedaPending(false));
    return dispatch(updateRuedaError(error.message));
  }
};