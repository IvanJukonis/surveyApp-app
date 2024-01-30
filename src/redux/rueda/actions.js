import {
  GET_RUEDA_PENDING,
  GET_RUEDA_SUCCESS,
  GET_RUEDA_ERROR,
  GET_RUEDAS_PENDING,
  GET_RUEDAS_SUCCESS,
  GET_RUEDAS_ERROR,
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

export const getRuedasPending = (pending) => {
  return {
    type: GET_RUEDAS_PENDING,
    payload: pending
  };
};

export const getRuedasSuccess = (list) => {
  return {
    type: GET_RUEDAS_SUCCESS,
    payload: list
  };
};

export const getRuedasError = (error) => {
  return {
    type: GET_RUEDAS_ERROR,
    payload: error
  };
};

export const deleteRuedaPending = (pending) => {
  return {
    type: DELETE_RUEDA_PENDING,
    payload: pending
  };
};

export const deleteRuedaSuccess = (ruedaID) => {
  return {
    type: DELETE_RUEDA_SUCCESS,
    payload: ruedaID
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

export const postRuedaSuccess = (rueda) => {
  return {
    type: POST_RUEDA_SUCCESS,
    payload: rueda
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

export const updateRuedaSuccess = (rueda) => {
  return {
    type: UPDATE_RUEDA_SUCCESS,
    payload: rueda
  };
};

export const updateRuedaError = (error) => {
  return {
    type: UPDATE_RUEDA_ERROR,
    payload: error
  };
};
