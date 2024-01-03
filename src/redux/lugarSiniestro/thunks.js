import {
  getLugarSiniestroPending,
  getLugarSiniestroSuccess,
  getLugarSiniestroError,
  deleteLugarSiniestroPending,
  deleteLugarSiniestroSuccess,
  deleteLugarSiniestroError,
  postLugarSiniestroPending,
  postLugarSiniestroSuccess,
  postLugarSiniestroError,
  updateLugarSiniestroPending,
  updateLugarSiniestroSuccess,
  updateLugarSiniestroError
} from './actions';

export const getAllLugarSiniestro = async (dispatch, siniestroId) => {
  try {
    dispatch(getLugarSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarSiniestro`);
    const data = await response.json();
    const lugaresSiniestroListAll = data.data;
    const lugaresSiniestroList = lugaresSiniestroListAll.filter((lugarSiniestro) =>
      lugarSiniestro.siniestro.includes(siniestroId)
    );
    dispatch(getLugarSiniestroPending(false));
    dispatch(getLugarSiniestroSuccess(lugaresSiniestroList));
  } catch (error) {
    dispatch(getLugarSiniestroPending(false));
    dispatch(getLugarSiniestroError(true));
  }
};

export const deleteLugarSiniestro = (lugarSiniestroID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteLugarSiniestroPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/lugarSiniestro/${lugarSiniestroID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteLugarSiniestroPending(false));
        dispatch(deleteLugarSiniestroSuccess(lugarSiniestroID));
      }
    } catch (error) {
      dispatch(deleteLugarSiniestroError(error));
    }
  };
};

export const postLugarSiniestro = async (dispatch, lugarSiniestroData) => {
  try {
    dispatch(postLugarSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarSiniestro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lugarSiniestroData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postLugarSiniestroPending(false));
      return dispatch(postLugarSiniestroSuccess(newData.data));
    } else {
      dispatch(postLugarSiniestroPending(false));
      return dispatch(postLugarSiniestroError(true));
    }
  } catch (error) {
    dispatch(postLugarSiniestroPending(false));
    return dispatch(postLugarSiniestroError(true));
  }
};

export const updateLugarSiniestro = async (dispatch, id, lugarSiniestroData) => {
  try {
    dispatch(updateLugarSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/lugarSiniestro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lugarSiniestroData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateLugarSiniestroPending(false));
      throw new Error(data.message);
    }

    dispatch(updateLugarSiniestroSuccess(data));
  } catch (error) {
    dispatch(updateLugarSiniestroPending(false));
    dispatch(updateLugarSiniestroError(error.message));
  }
};
