import {
  GET_SINIESTRO_PENDING,
  GET_SINIESTRO_SUCCESS,
  GET_SINIESTRO_ERROR,
  DELETE_SINIESTRO_PENDING,
  DELETE_SINIESTRO_SUCCESS,
  DELETE_SINIESTRO_ERROR,
  ADD_SINIESTRO_PENDING,
  ADD_SINIESTRO_SUCCESS,
  ADD_SINIESTRO_ERROR,
  UPDATE_SINIESTRO_PENDING,
  UPDATE_SINIESTRO_SUCCESS,
  UPDATE_SINIESTRO_ERROR
} from './constants';

export const getSiniestrosPending = (pending) => {
  return {
    type: GET_SINIESTRO_PENDING,
    payload: pending
  };
};

export const getSiniestrosSuccess = (list) => {
  return {
    type: GET_SINIESTRO_SUCCESS,
    payload: list
  };
};

export const getSiniestrosError = (error) => {
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

export const addSiniestroPending = (pending) => {
  return {
    type: ADD_SINIESTRO_PENDING,
    payload: pending
  };
};

export const addSiniestroSuccess = (siniestro) => {
  return {
    type: ADD_SINIESTRO_SUCCESS,
    payload: siniestro
  };
};

export const addSiniestroError = (error) => {
  return {
    type: ADD_SINIESTRO_ERROR,
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
