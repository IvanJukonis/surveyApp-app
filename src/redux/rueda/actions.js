import {
  GET_RUEDA_PENDING,
  GET_RUEDA_SUCCESS,
  GET_RUEDA_ERROR,
  DELETE_RUEDA_PENDING,
  DELETE_RUEDA_SUCCESS,
  DELETE_RUEDA_ERROR,
  POST_RUEDA_PENDING,
  POST_RUEDA_SUCCESS,
  POST_RUEDA_ERROR,
  UPDATE_RUEDA_PENDING,
  UPDATE_RUEDA_SUCCESS,
  UPDATE_RUEDA_ERROR
} from './constants';

export const getRuedaPending = (pending) => {
  return {
    type: GET_RUEDA_PENDING,
    payload: pending
  };
};

export const getRuedaSuccess = (list) => {
  return {
    type: GET_RUEDA_SUCCESS,
    payload: list
  };
};

export const getRuedaError = (error) => {
  return {
    type: GET_RUEDA_ERROR,
    payload: error
  };
};

export const deleteRuedaPending = (pending) => {
  return {
    type: DELETE_RUEDA_PENDING,
    payload: pending
  };
};

export const deleteRuedaSuccess = (involucradoID) => {
  return {
    type: DELETE_RUEDA_SUCCESS,
    payload: involucradoID
  };
};

export const deleteRuedaError = (error) => {
  return {
    type: DELETE_RUEDA_ERROR,
    payload: error
  };
};

export const postRuedaPending = (pending) => {
  return {
    type: POST_RUEDA_PENDING,
    payload: pending
  };
};

export const postRuedaSuccess = (involucrado) => {
  return {
    type: POST_RUEDA_SUCCESS,
    payload: involucrado
  };
};

export const postRuedaError = (error) => {
  return {
    type: POST_RUEDA_ERROR,
    payload: error
  };
};

export const updateRuedaPending = (pending) => {
  return {
    type: UPDATE_RUEDA_PENDING,
    payload: pending
  };
};

export const updateRuedaSuccess = (involucrado) => {
  return {
    type: UPDATE_RUEDA_SUCCESS,
    payload: involucrado
  };
};

export const updateRuedaError = (error) => {
  return {
    type: UPDATE_RUEDA_ERROR,
    payload: error
  };
};
