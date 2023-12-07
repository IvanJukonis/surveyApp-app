import {
  GET_CONTROLADOR_PENDING,
  GET_CONTROLADOR_SUCCESS,
  GET_CONTROLADOR_ERROR,
  DELETE_CONTROLADOR_PENDING,
  DELETE_CONTROLADOR_SUCCESS,
  DELETE_CONTROLADOR_ERROR,
  POST_CONTROLADOR_PENDING,
  POST_CONTROLADOR_SUCCESS,
  POST_CONTROLADOR_ERROR,
  UPDATE_CONTROLADOR_PENDING,
  UPDATE_CONTROLADOR_SUCCESS,
  UPDATE_CONTROLADOR_ERROR
} from './constants';

export const getControladorPending = (pending) => {
  return {
    type: GET_CONTROLADOR_PENDING,
    payload: pending
  };
};

export const getControladorSuccess = (list) => {
  return {
    type: GET_CONTROLADOR_SUCCESS,
    payload: list
  };
};

export const getControladorError = (error) => {
  return {
    type: GET_CONTROLADOR_ERROR,
    payload: error
  };
};

export const deleteControladorPending = (pending) => {
  return {
    type: DELETE_CONTROLADOR_PENDING,
    payload: pending
  };
};

export const deleteControladorSuccess = (controladorID) => {
  return {
    type: DELETE_CONTROLADOR_SUCCESS,
    payload: controladorID
  };
};

export const deleteControladorError = (error) => {
  return {
    type: DELETE_CONTROLADOR_ERROR,
    payload: error
  };
};

export const postControladorPending = (pending) => {
  return {
    type: POST_CONTROLADOR_PENDING,
    payload: pending
  };
};

export const postControladorSuccess = (controlador) => {
  return {
    type: POST_CONTROLADOR_SUCCESS,
    payload: controlador
  };
};

export const postControladorError = (error) => {
  return {
    type: POST_CONTROLADOR_ERROR,
    payload: error
  };
};

export const updateControladorPending = (pending) => {
  return {
    type: UPDATE_CONTROLADOR_PENDING,
    payload: pending
  };
};

export const updateControladorSuccess = (controlador) => {
  return {
    type: UPDATE_CONTROLADOR_SUCCESS,
    payload: controlador
  };
};

export const updateControladorError = (error) => {
  return {
    type: UPDATE_CONTROLADOR_ERROR,
    payload: error
  };
};
