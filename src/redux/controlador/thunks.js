import {
  getControladorPending,
  getControladorSuccess,
  getControladorError,
  deleteControladorPending,
  deleteControladorSuccess,
  deleteControladorError,
  postControladorPending,
  postControladorSuccess,
  postControladorError,
  updateControladorPending,
  updateControladorSuccess,
  updateControladorError
} from './actions';

const token = sessionStorage.getItem('token');

export const getControlador = async (dispatch) => {
  try {
    dispatch(getControladorPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/controlador`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const controladoresList = data.data;
    dispatch(getControladorPending(false));
    dispatch(getControladorSuccess(controladoresList));
  } catch (error) {
    dispatch(getControladorPending(false));
    dispatch(getControladorError(true));
  }
};

export const deleteControlador = (controladorID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteControladorPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/controlador/${controladorID}`,
        {
          method: 'DELETE',
          headers: { token: token }
        }
      );
      if (response.ok) {
        dispatch(deleteControladorPending(false));
        dispatch(deleteControladorSuccess(controladorID));
      }
    } catch (error) {
      dispatch(deleteControladorError(error));
    }
  };
};

export const postControlador = async (dispatch, newControlador) => {
  try {
    dispatch(postControladorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/controlador`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(newControlador)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postControladorPending(false));
      return dispatch(postControladorSuccess(newData.data));
    } else {
      dispatch(postControladorPending(false));
      return dispatch(postControladorError(true));
    }
  } catch (error) {
    dispatch(postControladorPending(false));
    return dispatch(postControladorError(true));
  }
};

export const updateControlador = async (dispatch, id, controladorData) => {
  try {
    dispatch(updateControladorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/controlador/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(controladorData)
    });

    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateControladorPending(false));
      return dispatch(updateControladorSuccess(newData.data));
    } else {
      dispatch(updateControladorPending(false));
      return dispatch(updateControladorError(true));
    }
  } catch (error) {
    dispatch(updateControladorPending(false));
    return dispatch(updateControladorError(error.message));
  }
};
