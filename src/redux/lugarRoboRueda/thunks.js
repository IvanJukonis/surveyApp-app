import {
  getLugarRoboRuedaPending,
  getLugarRoboRuedaSuccess,
  getLugarRoboRuedaError,
  deleteLugarRoboRuedaPending,
  deleteLugarRoboRuedaSuccess,
  deleteLugarRoboRuedaError,
  postLugarRoboRuedaPending,
  postLugarRoboRuedaSuccess,
  postLugarRoboRuedaError,
  updateLugarRoboRuedaPending,
  updateLugarRoboRuedaSuccess,
  updateLugarRoboRuedaError
} from './actions';

export const getAllLugarRoboRueda = async (dispatch, siniestroId) => {
  try {
    dispatch(getLugarRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarRoboRueda`);
    const data = await response.json();
    const lugarRoboRuedasListAll = data.data;
    const lugarRoboRuedasList = lugarRoboRuedasListAll.filter((lugarRoboRueda) =>
      lugarRoboRueda.siniestro.includes(siniestroId)
    );
    dispatch(getLugarRoboRuedaPending(false));
    dispatch(getLugarRoboRuedaSuccess(lugarRoboRuedasList));
  } catch (error) {
    dispatch(getLugarRoboRuedaPending(false));
    dispatch(getLugarRoboRuedaError(true));
  }
};

export const deleteLugarRoboRueda = (lugarRoboRuedaID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteLugarRoboRuedaPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/lugarRoboRueda/${lugarRoboRuedaID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteLugarRoboRuedaPending(false));
        dispatch(deleteLugarRoboRuedaSuccess(lugarRoboRuedaID));
      }
    } catch (error) {
      dispatch(deleteLugarRoboRuedaError(error));
    }
  };
};

export const postLugarRoboRueda = async (dispatch, lugarRoboRuedaData) => {
  try {
    dispatch(postLugarRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarRoboRueda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lugarRoboRuedaData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postLugarRoboRuedaPending(false));
      return dispatch(postLugarRoboRuedaSuccess(newData.data));
    } else {
      dispatch(postLugarRoboRuedaPending(false));
      return dispatch(postLugarRoboRuedaError(true));
    }
  } catch (error) {
    dispatch(postLugarRoboRuedaPending(false));
    return dispatch(postLugarRoboRuedaError(true));
  }
};

export const updateLugarRoboRueda = async (dispatch, id, lugarRoboRuedaData) => {
  try {
    dispatch(updateLugarRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarRoboRueda/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lugarRoboRuedaData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateLugarRoboRuedaPending(false));
      throw new Error(data.message);
    }

    dispatch(updateLugarRoboRuedaSuccess(data));
  } catch (error) {
    dispatch(updateLugarRoboRuedaPending(false));
    dispatch(updateLugarRoboRuedaError(error.message));
  }
};
