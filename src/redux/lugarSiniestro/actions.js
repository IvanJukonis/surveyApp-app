import {
  GET_LUGARSINIESTRO_PENDING,
  GET_LUGARSINIESTRO_SUCCESS,
  GET_LUGARSINIESTRO_ERROR,
  DELETE_LUGARSINIESTRO_PENDING,
  DELETE_LUGARSINIESTRO_SUCCESS,
  DELETE_LUGARSINIESTRO_ERROR,
  POST_LUGARSINIESTRO_PENDING,
  POST_LUGARSINIESTRO_SUCCESS,
  POST_LUGARSINIESTRO_ERROR,
  UPDATE_LUGARSINIESTRO_PENDING,
  UPDATE_LUGARSINIESTRO_SUCCESS,
  UPDATE_LUGARSINIESTRO_ERROR
} from './constants';

export const getLugarSiniestroPending = (pending) => {
  return {
    type: GET_LUGARSINIESTRO_PENDING,
    payload: pending
  };
};

export const getLugarSiniestroSuccess = (list) => {
  return {
    type: GET_LUGARSINIESTRO_SUCCESS,
    payload: list
  };
};

export const getLugarSiniestroError = (error) => {
  return {
    type: GET_LUGARSINIESTRO_ERROR,
    payload: error
  };
};

export const deleteLugarSiniestroPending = (pending) => {
  return {
    type: DELETE_LUGARSINIESTRO_PENDING,
    payload: pending
  };
};

export const deleteLugarSiniestroSuccess = (lugarSiniestroID) => {
  return {
    type: DELETE_LUGARSINIESTRO_SUCCESS,
    payload: lugarSiniestroID
  };
};

export const deleteLugarSiniestroError = (error) => {
  return {
    type: DELETE_LUGARSINIESTRO_ERROR,
    payload: error
  };
};

export const postLugarSiniestroPending = (pending) => {
  return {
    type: POST_LUGARSINIESTRO_PENDING,
    payload: pending
  };
};

export const postLugarSiniestroSuccess = (lugarSiniestro) => {
  return {
    type: POST_LUGARSINIESTRO_SUCCESS,
    payload: lugarSiniestro
  };
};

export const postLugarSiniestroError = (error) => {
  return {
    type: POST_LUGARSINIESTRO_ERROR,
    payload: error
  };
};

export const updateLugarSiniestroPending = (pending) => {
  return {
    type: UPDATE_LUGARSINIESTRO_PENDING,
    payload: pending
  };
};

export const updateLugarSiniestroSuccess = (lugarSiniestro) => {
  return {
    type: UPDATE_LUGARSINIESTRO_SUCCESS,
    payload: lugarSiniestro
  };
};

export const updateLugarSiniestroError = (error) => {
  return {
    type: UPDATE_LUGARSINIESTRO_ERROR,
    payload: error
  };
};
