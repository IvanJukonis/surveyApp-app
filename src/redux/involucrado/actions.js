import {
  GET_INVOLUCRADO_PENDING,
  GET_INVOLUCRADO_SUCCESS,
  GET_INVOLUCRADO_ERROR,
  DELETE_INVOLUCRADO_PENDING,
  DELETE_INVOLUCRADO_SUCCESS,
  DELETE_INVOLUCRADO_ERROR,
  POST_INVOLUCRADO_PENDING,
  POST_INVOLUCRADO_SUCCESS,
  POST_INVOLUCRADO_ERROR,
  UPDATE_INVOLUCRADO_PENDING,
  UPDATE_INVOLUCRADO_SUCCESS,
  UPDATE_INVOLUCRADO_ERROR
} from './constants';

export const getInvolucradoPending = (pending) => {
  return {
    type: GET_INVOLUCRADO_PENDING,
    payload: pending
  };
};

export const getInvolucradoSuccess = (list) => {
  return {
    type: GET_INVOLUCRADO_SUCCESS,
    payload: list
  };
};

export const getInvolucradoError = (error) => {
  return {
    type: GET_INVOLUCRADO_ERROR,
    payload: error
  };
};

export const deleteInvolucradoPending = (pending) => {
  return {
    type: DELETE_INVOLUCRADO_PENDING,
    payload: pending
  };
};

export const deleteInvolucradoSuccess = (involucradoID) => {
  return {
    type: DELETE_INVOLUCRADO_SUCCESS,
    payload: involucradoID
  };
};

export const deleteInvolucradoError = (error) => {
  return {
    type: DELETE_INVOLUCRADO_ERROR,
    payload: error
  };
};

export const postInvolucradoPending = (pending) => {
  return {
    type: POST_INVOLUCRADO_PENDING,
    payload: pending
  };
};

export const postInvolucradoSuccess = (involucrado) => {
  return {
    type: POST_INVOLUCRADO_SUCCESS,
    payload: involucrado
  };
};

export const postInvolucradoError = (error) => {
  return {
    type: POST_INVOLUCRADO_ERROR,
    payload: error
  };
};

export const updateInvolucradoPending = (pending) => {
  return {
    type: UPDATE_INVOLUCRADO_PENDING,
    payload: pending
  };
};

export const updateInvolucradoSuccess = (involucrado) => {
  return {
    type: UPDATE_INVOLUCRADO_SUCCESS,
    payload: involucrado
  };
};

export const updateInvolucradoError = (error) => {
  return {
    type: UPDATE_INVOLUCRADO_ERROR,
    payload: error
  };
};
