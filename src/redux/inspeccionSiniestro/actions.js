import {
  GET_INSPECCIONSINIESTRO_PENDING,
  GET_INSPECCIONSINIESTRO_SUCCESS,
  GET_INSPECCIONSINIESTRO_ERROR,
  DELETE_INSPECCIONSINIESTRO_PENDING,
  DELETE_INSPECCIONSINIESTRO_SUCCESS,
  DELETE_INSPECCIONSINIESTRO_ERROR,
  POST_INSPECCIONSINIESTRO_PENDING,
  POST_INSPECCIONSINIESTRO_SUCCESS,
  POST_INSPECCIONSINIESTRO_ERROR,
  UPDATE_INSPECCIONSINIESTRO_PENDING,
  UPDATE_INSPECCIONSINIESTRO_SUCCESS,
  UPDATE_INSPECCIONSINIESTRO_ERROR
} from './constants';

export const getInspeccionSiniestroPending = (pending) => {
  return {
    type: GET_INSPECCIONSINIESTRO_PENDING,
    payload: pending
  };
};

export const getInspeccionSiniestroSuccess = (list) => {
  return {
    type: GET_INSPECCIONSINIESTRO_SUCCESS,
    payload: list
  };
};

export const getInspeccionSiniestroError = (error) => {
  return {
    type: GET_INSPECCIONSINIESTRO_ERROR,
    payload: error
  };
};

export const deleteInspeccionSiniestroPending = (pending) => {
  return {
    type: DELETE_INSPECCIONSINIESTRO_PENDING,
    payload: pending
  };
};

export const deleteInspeccionSiniestroSuccess = (inspeccionSiniestroID) => {
  return {
    type: DELETE_INSPECCIONSINIESTRO_SUCCESS,
    payload: inspeccionSiniestroID
  };
};

export const deleteInspeccionSiniestroError = (error) => {
  return {
    type: DELETE_INSPECCIONSINIESTRO_ERROR,
    payload: error
  };
};

export const postInspeccionSiniestroPending = (pending) => {
  return {
    type: POST_INSPECCIONSINIESTRO_PENDING,
    payload: pending
  };
};

export const postInspeccionSiniestroSuccess = (inspeccionSiniestro) => {
  return {
    type: POST_INSPECCIONSINIESTRO_SUCCESS,
    payload: inspeccionSiniestro
  };
};

export const postInspeccionSiniestroError = (error) => {
  return {
    type: POST_INSPECCIONSINIESTRO_ERROR,
    payload: error
  };
};

export const updateInspeccionSiniestroPending = (pending) => {
  return {
    type: UPDATE_INSPECCIONSINIESTRO_PENDING,
    payload: pending
  };
};

export const updateInspeccionSiniestroSuccess = (inspeccionSiniestro) => {
  return {
    type: UPDATE_INSPECCIONSINIESTRO_SUCCESS,
    payload: inspeccionSiniestro
  };
};

export const updateInspeccionSiniestroError = (error) => {
  return {
    type: UPDATE_INSPECCIONSINIESTRO_ERROR,
    payload: error
  };
};
