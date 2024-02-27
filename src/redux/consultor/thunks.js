import {
  getConsultorPending,
  getConsultorSuccess,
  getConsultorError,
  deleteConsultorPending,
  deleteConsultorSuccess,
  deleteConsultorError,
  postConsultorPending,
  postConsultorSuccess,
  postConsultorError,
  updateConsultorPending,
  updateConsultorSuccess,
  updateConsultorError
} from './actions';

const token = sessionStorage.getItem('token');

export const getConsultor = async (dispatch) => {
  try {
    dispatch(getConsultorPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/consultor`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const consultoresList = data.data;
    dispatch(getConsultorPending(false));
    console.log(consultoresList, 'llega a los consultores?');
    dispatch(getConsultorSuccess(consultoresList));
  } catch (error) {
    dispatch(getConsultorPending(false));
    dispatch(getConsultorError(true));
  }
};

export const deleteConsultor = (consultorID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteConsultorPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/consultor/${consultorID}`,
        {
          method: 'DELETE',
          headers: { token: token }
        }
      );
      if (response.ok) {
        dispatch(deleteConsultorPending(false));
        dispatch(deleteConsultorSuccess(consultorID));
      }
    } catch (error) {
      dispatch(deleteConsultorError(error));
    }
  };
};

export const postConsultor = async (dispatch, newConsultor) => {
  try {
    dispatch(postConsultorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/consultor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newConsultor)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postConsultorPending(false));
      return dispatch(postConsultorSuccess(newData.data));
    } else {
      dispatch(postConsultorPending(false));
      return dispatch(postConsultorError(true));
    }
  } catch (error) {
    dispatch(postConsultorPending(false));
    return dispatch(postConsultorError(true));
  }
};

export const updateConsultor = async (dispatch, id, consultorData) => {
  try {
    dispatch(updateConsultorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/consultor/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(consultorData)
    });

    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateConsultorPending(false));
      return dispatch(updateConsultorSuccess(newData.data));
    } else {
      dispatch(updateConsultorPending(false));
      return dispatch(updateConsultorError(true));
    }
  } catch (error) {
    dispatch(updateConsultorPending(false));
    return dispatch(updateConsultorError(error.message));
  }
};
