import {
  GET_RELEVADOR_PENDING,
  GET_RELEVADOR_SUCCESS,
  GET_RELEVADOR_ERROR,
  DELETE_RELEVADOR_PENDING,
  DELETE_RELEVADOR_SUCCESS,
  DELETE_RELEVADOR_ERROR,
  POST_RELEVADOR_PENDING,
  POST_RELEVADOR_SUCCESS,
  POST_RELEVADOR_ERROR,
  UPDATE_RELEVADOR_PENDING,
  UPDATE_RELEVADOR_SUCCESS,
  UPDATE_RELEVADOR_ERROR
} from './constants';

export const getRelevadorPending = (pending) => {
  return {
    type: GET_RELEVADOR_PENDING,
    payload: pending
  };
};

export const getRelevadorSuccess = (list) => {
  return {
    type: GET_RELEVADOR_SUCCESS,
    payload: list
  };
};

export const getRelevadorError = (error) => {
  return {
    type: GET_RELEVADOR_ERROR,
    payload: error
  };
};

export const deleteRelevadorPending = (pending) => {
  return {
    type: DELETE_RELEVADOR_PENDING,
    payload: pending
  };
};

export const deleteRelevadorSuccess = (relevadorID) => {
  return {
    type: DELETE_RELEVADOR_SUCCESS,
    payload: relevadorID
  };
};

export const deleteRelevadorError = (error) => {
  return {
    type: DELETE_RELEVADOR_ERROR,
    payload: error
  };
};

export const postRelevadorPending = (pending) => {
  return {
    type: POST_RELEVADOR_PENDING,
    payload: pending
  };
};

export const postRelevadorSuccess = (relevador) => {
  return {
    type: POST_RELEVADOR_SUCCESS,
    payload: relevador
  };
};

export const postRelevadorError = (error) => {
  return {
    type: POST_RELEVADOR_ERROR,
    payload: error
  };
};

export const updateRelevadorPending = (pending) => {
  return {
    type: UPDATE_RELEVADOR_PENDING,
    payload: pending
  };
};

export const updateRelevadorSuccess = (relevador) => {
  return {
    type: UPDATE_RELEVADOR_SUCCESS,
    payload: relevador
  };
};

export const updateRelevadorError = (error) => {
  return {
    type: UPDATE_RELEVADOR_ERROR,
    payload: error
  };
};
