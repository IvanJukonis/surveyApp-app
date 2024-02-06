import {
  getEventoPending,
  getEventoSuccess,
  getEventoError,
  deleteEventoPending,
  deleteEventoSuccess,
  deleteEventoError,
  postEventoPending,
  postEventoSuccess,
  postEventoError,
  updateEventoPending,
  updateEventoSuccess,
  updateEventoError
} from './actions';

export const getAllEvento = async (dispatch, sinId) => {
  try {
    dispatch(getEventoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/evento`);
    const data = await response.json();
    const eventosList = data.data;
    const eventosSiniestroList = eventosList.filter((evento) => evento.siniestro[0] === sinId);
    dispatch(getEventoPending(false));
    dispatch(getEventoSuccess(eventosSiniestroList));
  } catch (error) {
    dispatch(getEventoPending(false));
    dispatch(getEventoError(true));
  }
};

export const getEvento = async (dispatch) => {
  try {
    dispatch(getEventoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/evento`);
    const data = await response.json();
    const eventosListAll = data.data;
    dispatch(getEventoPending(false));
    dispatch(getEventoSuccess(eventosListAll));
  } catch (error) {
    dispatch(getEventoPending(false));
    dispatch(getEventoError(true));
  }
};

export const deleteEvento = (eventoID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteEventoPending(true));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/evento/${eventoID}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        dispatch(deleteEventoPending(false));
        dispatch(deleteEventoSuccess(eventoID));
      }
    } catch (error) {
      dispatch(deleteEventoError(error));
    }
  };
};

export const postEvento = async (dispatch, eventoData) => {
  try {
    const requestBody = {
      ...eventoData
    };
    dispatch(postEventoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/evento`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postEventoPending(false));
      return dispatch(postEventoSuccess(newData.data));
    } else {
      dispatch(postEventoPending(false));
      return dispatch(postEventoError(true));
    }
  } catch (error) {
    dispatch(postEventoPending(false));
    return dispatch(postEventoError(true));
  }
};

export const updateEvento = async (dispatch, id, eventoData) => {
  try {
    dispatch(updateEventoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/evento/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventoData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateEventoPending(false));
      return dispatch(updateEventoSuccess(newData.data));
    } else {
      dispatch(updateEventoPending(false));
      return dispatch(updateEventoError(true));
    }
  } catch (error) {
    dispatch(updateEventoPending(false));
    return dispatch(updateEventoError(error.message));
  }
};
