import {
  GET_SINIESTRO_PENDING,
  GET_SINIESTRO_SUCCESS,
  GET_SINIESTRO_ERROR,
  DELETE_SINIESTRO_PENDING,
  DELETE_SINIESTRO_SUCCESS,
  DELETE_SINIESTRO_ERROR,
  POST_SINIESTRO_PENDING,
  POST_SINIESTRO_SUCCESS,
  POST_SINIESTRO_ERROR,
  UPDATE_SINIESTRO_PENDING,
  UPDATE_SINIESTRO_SUCCESS,
  UPDATE_SINIESTRO_ERROR
} from './constants';

export const getSiniestroPending = (pending) => {
  return {
    type: GET_SINIESTRO_PENDING,
    payload: pending
  };
};

export const getSiniestroSuccess = (list) => {
  return {
    type: GET_SINIESTRO_SUCCESS,
    payload: list
  };
};

export const getSiniestroError = (error) => {
  return {
    type: GET_SINIESTRO_ERROR,
    payload: error
  };
};

export const deleteSiniestroPending = (pending) => {
  return {
    type: DELETE_SINIESTRO_PENDING,
    payload: pending
  };
};

export const deleteSiniestroSuccess = (siniestroID) => {
  return {
    type: DELETE_SINIESTRO_SUCCESS,
    payload: siniestroID
  };
};

export const deleteSiniestroError = (error) => {
  return {
    type: DELETE_SINIESTRO_ERROR,
    payload: error
  };
};

export const postSiniestroPending = (pending) => {
  return {
    type: POST_SINIESTRO_PENDING,
    payload: pending
  };
};

export const postSiniestroSuccess = (siniestro) => {
  return {
    type: POST_SINIESTRO_SUCCESS,
    payload: siniestro
  };
};

export const postSiniestroError = (error) => {
  return {
    type: POST_SINIESTRO_ERROR,
    payload: error
  };
};

export const updateSiniestroPending = (pending) => {
  return {
    type: UPDATE_SINIESTRO_PENDING,
    payload: pending
  };
};

export const updateSiniestroSuccess = (siniestro) => {
  return {
    type: UPDATE_SINIESTRO_SUCCESS,
    payload: siniestro
  };
};

export const updateSiniestroError = (error) => {
  return {
    type: UPDATE_SINIESTRO_ERROR,
    payload: error
  };
};
