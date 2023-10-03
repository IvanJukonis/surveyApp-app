import {
  GET_OCURRENCELOCATION_PENDING,
  GET_OCURRENCELOCATION_SUCCESS,
  GET_OCURRENCELOCATION_ERROR,
  DELETE_OCURRENCELOCATION_PENDING,
  DELETE_OCURRENCELOCATION_SUCCESS,
  DELETE_OCURRENCELOCATION_ERROR,
  ADD_OCURRENCELOCATION_PENDING,
  ADD_OCURRENCELOCATION_SUCCESS,
  ADD_OCURRENCELOCATION_ERROR,
  EDIT_OCURRENCELOCATION_PENDING,
  EDIT_OCURRENCELOCATION_SUCCESS,
  EDIT_OCURRENCELOCATION_ERROR
} from './constants';

export const getOcurrenceLocationsPending = (pending) => {
  return {
    type: GET_OCURRENCELOCATION_PENDING,
    payload: pending
  };
};

export const getOcurrenceLocationsSuccess = (list) => {
  return {
    type: GET_OCURRENCELOCATION_SUCCESS,
    payload: list
  };
};

export const getOcurrenceLocationsError = (error) => {
  return {
    type: GET_OCURRENCELOCATION_ERROR,
    payload: error
  };
};

export const deleteOcurrenceLocationPending = (pending) => {
  return {
    type: DELETE_OCURRENCELOCATION_PENDING,
    payload: pending
  };
};

export const deleteOcurrenceLocationSuccess = (ocurrenceLocationID) => {
  return {
    type: DELETE_OCURRENCELOCATION_SUCCESS,
    payload: ocurrenceLocationID
  };
};

export const deleteOcurrenceLocationError = (error) => {
  return {
    type: DELETE_OCURRENCELOCATION_ERROR,
    payload: error
  };
};

export const addOcurrenceLocationPending = (pending) => {
  return {
    type: ADD_OCURRENCELOCATION_PENDING,
    payload: pending
  };
};

export const addOcurrenceLocationSuccess = (ocurrenceLocation) => {
  return {
    type: ADD_OCURRENCELOCATION_SUCCESS,
    payload: ocurrenceLocation
  };
};

export const addOcurrenceLocationError = (error) => {
  return {
    type: ADD_OCURRENCELOCATION_ERROR,
    payload: error
  };
};

export const editOcurrenceLocationPending = (pending) => {
  return {
    type: EDIT_OCURRENCELOCATION_PENDING,
    payload: pending
  };
};

export const editOcurrenceLocationSuccess = (ocurrenceLocation) => {
  return {
    type: EDIT_OCURRENCELOCATION_SUCCESS,
    payload: ocurrenceLocation
  };
};

export const editOcurrenceLocationError = (error) => {
  return {
    type: EDIT_OCURRENCELOCATION_ERROR,
    payload: error
  };
};
