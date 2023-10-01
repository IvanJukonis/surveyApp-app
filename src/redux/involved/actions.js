import {
  GET_INVOLVED_PENDING,
  GET_INVOLVED_SUCCESS,
  GET_INVOLVED_ERROR,
  DELETE_INVOLVED_PENDING,
  DELETE_INVOLVED_SUCCESS,
  DELETE_INVOLVED_ERROR,
  ADD_INVOLVED_PENDING,
  ADD_INVOLVED_SUCCESS,
  ADD_INVOLVED_ERROR,
  EDIT_INVOLVED_PENDING,
  EDIT_INVOLVED_SUCCESS,
  EDIT_INVOLVED_ERROR
} from './constants';

export const getInvolvedsPending = (pending) => {
  return {
    type: GET_INVOLVED_PENDING,
    payload: pending
  };
};

export const getInvolvedsSuccess = (list) => {
  return {
    type: GET_INVOLVED_SUCCESS,
    payload: list
  };
};

export const getInvolvedsError = (error) => {
  return {
    type: GET_INVOLVED_ERROR,
    payload: error
  };
};

export const deleteInvolvedPending = (pending) => {
  return {
    type: DELETE_INVOLVED_PENDING,
    payload: pending
  };
};

export const deleteInvolvedSuccess = (involvedID) => {
  return {
    type: DELETE_INVOLVED_SUCCESS,
    payload: involvedID
  };
};

export const deleteInvolvedError = (error) => {
  return {
    type: DELETE_INVOLVED_ERROR,
    payload: error
  };
};

export const addInvolvedPending = (pending) => {
  return {
    type: ADD_INVOLVED_PENDING,
    payload: pending
  };
};

export const addInvolvedSuccess = (involved) => {
  return {
    type: ADD_INVOLVED_SUCCESS,
    payload: involved
  };
};

export const addInvolvedError = (error) => {
  return {
    type: ADD_INVOLVED_ERROR,
    payload: error
  };
};

export const editInvolvedPending = (pending) => {
  return {
    type: EDIT_INVOLVED_PENDING,
    payload: pending
  };
};

export const editInvolvedSuccess = (involved) => {
  return {
    type: EDIT_INVOLVED_SUCCESS,
    payload: involved
  };
};

export const editInvolvedError = (error) => {
  return {
    type: EDIT_INVOLVED_ERROR,
    payload: error
  };
};
