import {
  getEntrevistaRoboRuedaPending,
  getEntrevistaRoboRuedaSuccess,
  getEntrevistaRoboRuedaError,
  deleteEntrevistaRoboRuedaPending,
  deleteEntrevistaRoboRuedaSuccess,
  deleteEntrevistaRoboRuedaError,
  postEntrevistaRoboRuedaPending,
  postEntrevistaRoboRuedaSuccess,
  postEntrevistaRoboRuedaError,
  updateEntrevistaRoboRuedaPending,
  updateEntrevistaRoboRuedaSuccess,
  updateEntrevistaRoboRuedaError
} from './actions';

export const getAllEntrevistaRoboRueda = async (dispatch, siniestroId) => {
  try {
    dispatch(getEntrevistaRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaRoboRueda`);
    const data = await response.json();
    const entrevistaRoboRuedasListAll = data.data;
    const entrevistaRoboRuedasList = entrevistaRoboRuedasListAll.filter((entrevistaRoboRueda) =>
      entrevistaRoboRueda.siniestro.includes(siniestroId)
    );
    dispatch(getEntrevistaRoboRuedaPending(false));
    dispatch(getEntrevistaRoboRuedaSuccess(entrevistaRoboRuedasList));
  } catch (error) {
    dispatch(getEntrevistaRoboRuedaPending(false));
    dispatch(getEntrevistaRoboRuedaError(true));
  }
};

export const deleteEntrevistaRoboRueda = (entrevistaRoboRuedaID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteEntrevistaRoboRuedaPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/entrevistaRoboRueda/${entrevistaRoboRuedaID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteEntrevistaRoboRuedaPending(false));
        dispatch(deleteEntrevistaRoboRuedaSuccess(entrevistaRoboRuedaID));
      }
    } catch (error) {
      dispatch(deleteEntrevistaRoboRuedaError(error));
    }
  };
};

export const postEntrevistaRoboRueda = async (dispatch, entrevistaRoboRuedaData) => {
  try {
    dispatch(postEntrevistaRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaRoboRueda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entrevistaRoboRuedaData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postEntrevistaRoboRuedaPending(false));
      return dispatch(postEntrevistaRoboRuedaSuccess(newData.data));
    } else {
      dispatch(postEntrevistaRoboRuedaPending(false));
      return dispatch(postEntrevistaRoboRuedaError(true));
    }
  } catch (error) {
    dispatch(postEntrevistaRoboRuedaPending(false));
    return dispatch(postEntrevistaRoboRuedaError(true));
  }
};

export const updateEntrevistaRoboRueda = async (dispatch, id, entrevistaRoboRuedaData) => {
  try {
    dispatch(updateEntrevistaRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaRoboRueda/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entrevistaRoboRuedaData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateEntrevistaRoboRuedaPending(false));
      return dispatch(updateEntrevistaRoboRuedaSuccess(newData.data));
    } else {
      dispatch(updateEntrevistaRoboRuedaPending(false));
      return dispatch(updateEntrevistaRoboRuedaError(true));
    }
  } catch (error) {
    dispatch(updateEntrevistaRoboRuedaPending(false));
    return dispatch(updateEntrevistaRoboRuedaError(error.message));
  }
};
