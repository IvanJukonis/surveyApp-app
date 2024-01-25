import {
  GET_EVENTO_PENDING,
  GET_EVENTO_SUCCESS,
  GET_EVENTO_ERROR,
  DELETE_EVENTO_PENDING,
  DELETE_EVENTO_SUCCESS,
  DELETE_EVENTO_ERROR,
  POST_EVENTO_PENDING,
  POST_EVENTO_SUCCESS,
  POST_EVENTO_ERROR,
  UPDATE_EVENTO_PENDING,
  UPDATE_EVENTO_SUCCESS,
  UPDATE_EVENTO_ERROR
} from './constants';

export const getEventoPending = (pending) => {
  return {
    type: GET_EVENTO_PENDING,
    payload: pending
  };
};

export const getEventoSuccess = (list) => {
  return {
    type: GET_EVENTO_SUCCESS,
    payload: list
  };
};

export const getEventoError = (error) => {
  return {
    type: GET_EVENTO_ERROR,
    payload: error
  };
};

export const deleteEventoPending = (pending) => {
  return {
    type: DELETE_EVENTO_PENDING,
    payload: pending
  };
};

export const deleteEventoSuccess = (eventoID) => {
  return {
    type: DELETE_EVENTO_SUCCESS,
    payload: eventoID
  };
};

export const deleteEventoError = (error) => {
  return {
    type: DELETE_EVENTO_ERROR,
    payload: error
  };
};

export const postEventoPending = (pending) => {
  return {
    type: POST_EVENTO_PENDING,
    payload: pending
  };
};

export const postEventoSuccess = (evento) => {
  return {
    type: POST_EVENTO_SUCCESS,
    payload: evento
  };
};

export const postEventoError = (error) => {
  return {
    type: POST_EVENTO_ERROR,
    payload: error
  };
};

export const updateEventoPending = (pending) => {
  return {
    type: UPDATE_EVENTO_PENDING,
    payload: pending
  };
};

export const updateEventoSuccess = (evento) => {
  return {
    type: UPDATE_EVENTO_SUCCESS,
    payload: evento
  };
};

export const updateEventoError = (error) => {
  return {
    type: UPDATE_EVENTO_ERROR,
    payload: error
  };
};
