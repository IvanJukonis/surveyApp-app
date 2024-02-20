import {
  getAdministrativosPending,
  getAdministrativosSuccess,
  getAdministrativosError,
  deleteAdministrativoPending,
  deleteAdministrativoSuccess,
  deleteAdministrativoError,
  addAdministrativoPending,
  addAdministrativoSuccess,
  addAdministrativoError,
  editAdministrativoPending,
  editAdministrativoSuccess,
  editAdministrativoError
} from './actions';

export const getAllAdministrativos = async (dispatch) => {
  const token = sessionStorage.getItem('token');
  try {
    dispatch(getAdministrativosPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativos`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const administrativosList = data.data;
    dispatch(getAdministrativosPending(false));
    return dispatch(getAdministrativosSuccess(administrativosList));
  } catch (error) {
    dispatch(getAdministrativosPending(false));
    dispatch(getAdministrativosError(true));
  }
};

export const administrativoDelete = (administrativoID) => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    try {
      dispatch(deleteAdministrativoPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/administrativos/${administrativoID}`,
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

export const createAdministrativo = async (dispatch, administrativoData) => {
  try {
    const token = sessionStorage.getItem('token');
    dispatch(addAdministrativoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(administrativoData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addAdministrativoPending(false));
      throw new Error(data.message);
    }
    dispatch(addAdministrativoSuccess(data.data));
  } catch (error) {
    dispatch(addAdministrativoPending(false));
    dispatch(addAdministrativoError(error.message));
  }
};

export const updateAdministrativo = async (dispatch, id, administrativoData) => {
  const token = sessionStorage.getItem('token');
  try {
    dispatch(editAdministrativoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: token
      },
      body: JSON.stringify(administrativoData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(editAdministrativoPending(false));
      throw new Error(data.message);
    }

    dispatch(editAdministrativoSuccess(data));
  } catch (error) {
    dispatch(editAdministrativoPending(false));
    dispatch(editAdministrativoError(error.message));
  }
};
