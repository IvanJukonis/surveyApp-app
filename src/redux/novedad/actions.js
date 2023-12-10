import {
  GET_NOVEDAD_PENDING,
  GET_NOVEDAD_SUCCESS,
  GET_NOVEDAD_ERROR,
  DELETE_NOVEDAD_PENDING,
  DELETE_NOVEDAD_SUCCESS,
  DELETE_NOVEDAD_ERROR,
  POST_NOVEDAD_PENDING,
  POST_NOVEDAD_SUCCESS,
  POST_NOVEDAD_ERROR,
  UPDATE_NOVEDAD_PENDING,
  UPDATE_NOVEDAD_SUCCESS,
  UPDATE_NOVEDAD_ERROR
} from './constants';

export const getNovedadPending = (pending) => {
  return {
    type: GET_NOVEDAD_PENDING,
    payload: pending
  };
};

export const getNovedadSuccess = (list) => {
  return {
    type: GET_NOVEDAD_SUCCESS,
    payload: list
  };
};

export const getNovedadError = (error) => {
  return {
    type: GET_NOVEDAD_ERROR,
    payload: error
  };
};

export const deleteNovedadPending = (pending) => {
  return {
    type: DELETE_NOVEDAD_PENDING,
    payload: pending
  };
};

export const deleteNovedadSuccess = (novedadID) => {
  return {
    type: DELETE_NOVEDAD_SUCCESS,
    payload: novedadID
  };
};

export const deleteNovedadError = (error) => {
  return {
    type: DELETE_NOVEDAD_ERROR,
    payload: error
  };
};

export const postNovedadPending = (pending) => {
  return {
    type: POST_NOVEDAD_PENDING,
    payload: pending
  };
};

export const postNovedadSuccess = (novedad) => {
  return {
    type: POST_NOVEDAD_SUCCESS,
    payload: novedad
  };
};

export const postNovedadError = (error) => {
  return {
    type: POST_NOVEDAD_ERROR,
    payload: error
  };
};

export const updateNovedadPending = (pending) => {
  return {
    type: UPDATE_NOVEDAD_PENDING,
    payload: pending
  };
};

export const updateNovedadSuccess = (novedad) => {
  return {
    type: UPDATE_NOVEDAD_SUCCESS,
    payload: novedad
  };
};

export const updateNovedadError = (error) => {
  return {
    type: UPDATE_NOVEDAD_ERROR,
    payload: error
  };
};
