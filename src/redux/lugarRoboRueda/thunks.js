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

export const getAllLugarRoboRueda = async (dispatch) => {
  try {
    dispatch(getLugarRoboRuedaPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarRoboRueda`);
    const data = await reponse.json();
    const lugaresRoboRuedaList = data.data;
    dispatch(getLugarRoboRuedaPending(false));
    dispatch(getLugarRoboRuedaSuccess(lugaresRoboRuedaList));
    console.log(lugaresRoboRuedaList);
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
    const data = await response.json();
    if (!response.ok) {
      dispatch(postLugarRoboRuedaPending(false));
      throw new Error(data.message);
    }
    dispatch(postLugarRoboRuedaSuccess(data.result));
  } catch (error) {
    dispatch(postLugarRoboRuedaPending(false));
    dispatch(postLugarRoboRuedaError(error.message));
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
