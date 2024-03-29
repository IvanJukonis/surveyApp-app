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

export const getAllNovedad = async (dispatch, siniestroId) => {
  try {
    dispatch(getNovedadPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/novedad`);
    const data = await response.json();
    const novedadesListAll = data.data;
    const novedadesList = novedadesListAll.filter((novedad) =>
      novedad.siniestro.includes(siniestroId)
    );
    dispatch(getNovedadPending(false));
    dispatch(getNovedadSuccess(novedadesList));
  } catch (error) {
    dispatch(getNovedadPending(false));
    dispatch(getNovedadError(true));
  }
};

export const getVisibleNovedades = async (dispatch, siniestroId) => {
  try {
    dispatch(getNovedadPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/novedad`);
    const data = await response.json();
    const novedadesListAll = data.data;
    const novedadesList = novedadesListAll.filter((novedad) =>
      novedad.siniestro.includes(siniestroId)
    );
    const visibleNovedadesList = novedadesList.filter((novedad) => novedad.visibilidad === true);

    dispatch(getNovedadPending(false));
    dispatch(getNovedadSuccess(visibleNovedadesList));
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
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postNovedadPending(false));
      return dispatch(postNovedadSuccess(newData.data));
    } else {
      dispatch(postNovedadPending(false));
      return dispatch(postNovedadError(true));
    }
  } catch (error) {
    dispatch(postNovedadPending(false));
    return dispatch(postNovedadError(true));
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
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      console.log(newData);
      dispatch(updateNovedadPending(false));
      return dispatch(updateNovedadSuccess(newData.data));
    } else {
      dispatch(updateNovedadPending(false));
      return dispatch(updateNovedadError(true));
    }
  } catch (error) {
    dispatch(updateNovedadPending(false));
    return dispatch(updateNovedadError(error.message));
  }
};
