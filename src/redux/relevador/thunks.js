import {
  getRelevadorPending,
  getRelevadorSuccess,
  getRelevadorError,
  deleteRelevadorPending,
  deleteRelevadorSuccess,
  deleteRelevadorError,
  postRelevadorPending,
  postRelevadorSuccess,
  postRelevadorError,
  updateRelevadorPending,
  updateRelevadorSuccess,
  updateRelevadorError
} from './actions';

const token = sessionStorage.getItem('token');

export const getRelevador = async (dispatch) => {
  try {
    dispatch(getRelevadorPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/relevador`, {
      method: 'GET',
      headers: { token: token }
    });
    const data = await reponse.json();
    const relevadoresList = data.data;
    dispatch(getRelevadorPending(false));
    dispatch(getRelevadorSuccess(relevadoresList));
  } catch (error) {
    dispatch(getRelevadorPending(false));
    dispatch(getRelevadorError(true));
  }
};

export const deleteRelevador = (relevadorID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteRelevadorPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/relevador/${relevadorID}`,
        {
          method: 'DELETE',
          headers: { token: token }
        }
      );
      if (response.ok) {
        dispatch(deleteRelevadorPending(false));
        dispatch(deleteRelevadorSuccess(relevadorID));
      }
    } catch (error) {
      dispatch(deleteRelevadorError(error));
    }
  };
};

export const postRelevador = async (dispatch, newRelevador) => {
  try {
    dispatch(postRelevadorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/relevador`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRelevador)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postRelevadorPending(false));
      return dispatch(postRelevadorSuccess(newData.data));
    } else {
      dispatch(postRelevadorPending(false));
      return dispatch(postRelevadorError(true));
    }
  } catch (error) {
    dispatch(postRelevadorPending(false));
    return dispatch(postRelevadorError(true));
  }
};

export const updateRelevador = async (dispatch, id, relevadorData) => {
  try {
    dispatch(updateRelevadorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/relevador/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(relevadorData)
    });

    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateRelevadorPending(false));
      return dispatch(updateRelevadorSuccess(newData.data));
    } else {
      dispatch(updateRelevadorPending(false));
      return dispatch(updateRelevadorError(true));
    }
  } catch (error) {
    dispatch(updateRelevadorPending(false));
    return dispatch(updateRelevadorError(error.message));
  }
};
