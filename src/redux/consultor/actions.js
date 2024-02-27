import {
  GET_CONSULTOR_PENDING,
  GET_CONSULTOR_SUCCESS,
  GET_CONSULTOR_ERROR,
  DELETE_CONSULTOR_PENDING,
  DELETE_CONSULTOR_SUCCESS,
  DELETE_CONSULTOR_ERROR,
  POST_CONSULTOR_PENDING,
  POST_CONSULTOR_SUCCESS,
  POST_CONSULTOR_ERROR,
  UPDATE_CONSULTOR_PENDING,
  UPDATE_CONSULTOR_SUCCESS,
  UPDATE_CONSULTOR_ERROR
} from './constants';

export const getConsultorPending = (pending) => {
  return {
    type: GET_CONSULTOR_PENDING,
    payload: pending
  };
};

export const getConsultorSuccess = (list) => {
  return {
    type: GET_CONSULTOR_SUCCESS,
    payload: list
  };
};

export const getConsultorError = (error) => {
  return {
    type: GET_CONSULTOR_ERROR,
    payload: error
  };
};

export const deleteConsultorPending = (pending) => {
  return {
    type: DELETE_CONSULTOR_PENDING,
    payload: pending
  };
};

export const deleteConsultorSuccess = (consultorID) => {
  return {
    type: DELETE_CONSULTOR_SUCCESS,
    payload: consultorID
  };
};

export const deleteConsultorError = (error) => {
  return {
    type: DELETE_CONSULTOR_ERROR,
    payload: error
  };
};

export const postConsultorPending = (pending) => {
  return {
    type: POST_CONSULTOR_PENDING,
    payload: pending
  };
};

export const postConsultorSuccess = (consultor) => {
  return {
    type: POST_CONSULTOR_SUCCESS,
    payload: consultor
  };
};

export const postConsultorError = (error) => {
  return {
    type: POST_CONSULTOR_ERROR,
    payload: error
  };
};

export const updateConsultorPending = (pending) => {
  return {
    type: UPDATE_CONSULTOR_PENDING,
    payload: pending
  };
};

export const updateConsultorSuccess = (consultor) => {
  return {
    type: UPDATE_CONSULTOR_SUCCESS,
    payload: consultor
  };
};

export const updateConsultorError = (error) => {
  return {
    type: UPDATE_CONSULTOR_ERROR,
    payload: error
  };
};
