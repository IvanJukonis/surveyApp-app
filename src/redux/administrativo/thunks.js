import {
  getAdministrativoPending,
  getAdministrativoSuccess,
  getAdministrativoError,
  deleteAdministrativoPending,
  deleteAdministrativoSuccess,
  deleteAdministrativoError,
  postAdministrativoPending,
  postAdministrativoSuccess,
  postAdministrativoError,
  updateAdministrativoPending,
  updateAdministrativoSuccess,
  updateAdministrativoError
} from './actions';

const token = sessionStorage.getItem('token');

export const getAdministrativo = async (dispatch) => {
  try {
    dispatch(getAdministrativoPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativo`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const administrativosList = data.data;
    dispatch(getAdministrativoPending(false));
    dispatch(getAdministrativoSuccess(administrativosList));
  } catch (error) {
    dispatch(getAdministrativoPending(false));
    dispatch(getAdministrativoError(true));
  }
};

export const deleteAdministrativo = (administrativoID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteAdministrativoPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/administrativo/${administrativoID}`,
        {
          method: 'DELETE',
          headers: { token: token }
        }
      );
      if (response.ok) {
        dispatch(deleteAdministrativoPending(false));
        dispatch(deleteAdministrativoSuccess(administrativoID));
      }
    } catch (error) {
      dispatch(deleteAdministrativoError(error));
    }
  };
};

export const postAdministrativo = async (dispatch, newAdministrativo) => {
  try {
    dispatch(postAdministrativoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAdministrativo)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postAdministrativoPending(false));
      return dispatch(postAdministrativoSuccess(newData.data));
    } else {
      dispatch(postAdministrativoPending(false));
      return dispatch(postAdministrativoError(true));
    }
  } catch (error) {
    dispatch(postAdministrativoPending(false));
    return dispatch(postAdministrativoError(true));
  }
};

export const updateAdministrativo = async (dispatch, id, administrativoData) => {
  try {
    dispatch(updateAdministrativoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativo/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(administrativoData)
    });

    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateAdministrativoPending(false));
      return dispatch(updateAdministrativoSuccess(newData.data));
    } else {
      dispatch(updateAdministrativoPending(false));
      return dispatch(updateAdministrativoError(true));
    }
  } catch (error) {
    dispatch(updateAdministrativoPending(false));
    return dispatch(updateAdministrativoError(error.message));
  }
};
