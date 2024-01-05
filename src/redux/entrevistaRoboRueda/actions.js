import {
  GET_ENTREVISTASINIESTRO_PENDING,
  GET_ENTREVISTASINIESTRO_SUCCESS,
  GET_ENTREVISTASINIESTRO_ERROR,
  DELETE_ENTREVISTASINIESTRO_PENDING,
  DELETE_ENTREVISTASINIESTRO_SUCCESS,
  DELETE_ENTREVISTASINIESTRO_ERROR,
  POST_ENTREVISTASINIESTRO_PENDING,
  POST_ENTREVISTASINIESTRO_SUCCESS,
  POST_ENTREVISTASINIESTRO_ERROR,
  UPDATE_ENTREVISTASINIESTRO_PENDING,
  UPDATE_ENTREVISTASINIESTRO_SUCCESS,
  UPDATE_ENTREVISTASINIESTRO_ERROR
} from './constants';

export const getEntrevistaSiniestroPending = (pending) => {
  return {
    type: GET_ENTREVISTASINIESTRO_PENDING,
    payload: pending
  };
};

export const getEntrevistaSiniestroSuccess = (list) => {
  return {
    type: GET_ENTREVISTASINIESTRO_SUCCESS,
    payload: list
  };
};

export const getEntrevistaSiniestroError = (error) => {
  return {
    type: GET_ENTREVISTASINIESTRO_ERROR,
    payload: error
  };
};

export const deleteEntrevistaSiniestroPending = (pending) => {
  return {
    type: DELETE_ENTREVISTASINIESTRO_PENDING,
    payload: pending
  };
};

export const deleteEntrevistaSiniestroSuccess = (entrevistaSiniestroID) => {
  return {
    type: DELETE_ENTREVISTASINIESTRO_SUCCESS,
    payload: entrevistaSiniestroID
  };
};

export const deleteEntrevistaSiniestroError = (error) => {
  return {
    type: DELETE_ENTREVISTASINIESTRO_ERROR,
    payload: error
  };
};

export const postEntrevistaSiniestroPending = (pending) => {
  return {
    type: POST_ENTREVISTASINIESTRO_PENDING,
    payload: pending
  };
};

export const postEntrevistaSiniestroSuccess = (entrevistaSiniestro) => {
  return {
    type: POST_ENTREVISTASINIESTRO_SUCCESS,
    payload: entrevistaSiniestro
  };
};

export const postEntrevistaSiniestroError = (error) => {
  return {
    type: POST_ENTREVISTASINIESTRO_ERROR,
    payload: error
  };
};

export const updateEntrevistaSiniestroPending = (pending) => {
  return {
    type: UPDATE_ENTREVISTASINIESTRO_PENDING,
    payload: pending
  };
};

export const updateEntrevistaSiniestroSuccess = (entrevistaSiniestro) => {
  return {
    type: UPDATE_ENTREVISTASINIESTRO_SUCCESS,
    payload: entrevistaSiniestro
  };
};

export const updateEntrevistaSiniestroError = (error) => {
  return {
    type: UPDATE_ENTREVISTASINIESTRO_ERROR,
    payload: error
  };
};
