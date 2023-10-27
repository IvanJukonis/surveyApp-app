import {
  GET_INVESTIGATOR_PENDING,
  GET_INVESTIGATOR_SUCCESS,
  GET_INVESTIGATOR_ERROR,
  DELETE_INVESTIGATOR_PENDING,
  DELETE_INVESTIGATOR_SUCCESS,
  DELETE_INVESTIGATOR_ERROR,
  ADD_INVESTIGATOR_PENDING,
  ADD_INVESTIGATOR_SUCCESS,
  ADD_INVESTIGATOR_ERROR,
  UPDATE_INVESTIGATOR_PENDING,
  UPDATE_INVESTIGATOR_SUCCESS,
  UPDATE_INVESTIGATOR_ERROR
} from './constants';

export const getInvestigatorsPending = (pending) => {
  return {
    type: GET_INVESTIGATOR_PENDING,
    payload: pending
  };
};

export const getInvestigatorsSuccess = (list) => {
  return {
    type: GET_INVESTIGATOR_SUCCESS,
    payload: list
  };
};

export const getInvestigatorsError = (error) => {
  return {
    type: GET_INVESTIGATOR_ERROR,
    payload: error
  };
};

export const deleteInvestigatorPending = (pending) => {
  return {
    type: DELETE_INVESTIGATOR_PENDING,
    payload: pending
  };
};

export const deleteInvestigatorSuccess = (investigatorID) => {
  return {
    type: DELETE_INVESTIGATOR_SUCCESS,
    payload: investigatorID
  };
};

export const deleteInvestigatorError = (error) => {
  return {
    type: DELETE_INVESTIGATOR_ERROR,
    payload: error
  };
};

export const addInvestigatorPending = (pending) => {
  return {
    type: ADD_INVESTIGATOR_PENDING,
    payload: pending
  };
};

export const addInvestigatorSuccess = (investigator) => {
  return {
    type: ADD_INVESTIGATOR_SUCCESS,
    payload: investigator
  };
};

export const addInvestigatorError = (error) => {
  return {
    type: ADD_INVESTIGATOR_ERROR,
    payload: error
  };
};

export const editInvestigatorPending = (pending) => {
  return {
    type: UPDATE_INVESTIGATOR_PENDING,
    payload: pending
  };
};

export const editInvestigatorSuccess = (investigator) => {
  return {
    type: UPDATE_INVESTIGATOR_SUCCESS,
    payload: investigator
  };
};

export const editInvestigatorError = (error) => {
  return {
    type: UPDATE_INVESTIGATOR_ERROR,
    payload: error
  };
};
