import {
  GET_INSPECCIONROBORUEDA_PENDING,
  GET_INSPECCIONROBORUEDA_SUCCESS,
  GET_INSPECCIONROBORUEDA_ERROR,
  DELETE_INSPECCIONROBORUEDA_PENDING,
  DELETE_INSPECCIONROBORUEDA_SUCCESS,
  DELETE_INSPECCIONROBORUEDA_ERROR,
  POST_INSPECCIONROBORUEDA_PENDING,
  POST_INSPECCIONROBORUEDA_SUCCESS,
  POST_INSPECCIONROBORUEDA_ERROR,
  UPDATE_INSPECCIONROBORUEDA_PENDING,
  UPDATE_INSPECCIONROBORUEDA_SUCCESS,
  UPDATE_INSPECCIONROBORUEDA_ERROR
} from './constants';

export const getInspeccionRoboRuedaPending = (pending) => {
  return {
    type: GET_INSPECCIONROBORUEDA_PENDING,
    payload: pending
  };
};

export const getInspeccionRoboRuedaSuccess = (list) => {
  return {
    type: GET_INSPECCIONROBORUEDA_SUCCESS,
    payload: list
  };
};

export const getInspeccionRoboRuedaError = (error) => {
  return {
    type: GET_INSPECCIONROBORUEDA_ERROR,
    payload: error
  };
};

export const deleteInspeccionRoboRuedaPending = (pending) => {
  return {
    type: DELETE_INSPECCIONROBORUEDA_PENDING,
    payload: pending
  };
};

export const deleteInspeccionRoboRuedaSuccess = (inspeccionRoboRuedaID) => {
  return {
    type: DELETE_INSPECCIONROBORUEDA_SUCCESS,
    payload: inspeccionRoboRuedaID
  };
};

export const deleteInspeccionRoboRuedaError = (error) => {
  return {
    type: DELETE_INSPECCIONROBORUEDA_ERROR,
    payload: error
  };
};

export const postInspeccionRoboRuedaPending = (pending) => {
  return {
    type: POST_INSPECCIONROBORUEDA_PENDING,
    payload: pending
  };
};

export const postInspeccionRoboRuedaSuccess = (inspeccionRoboRueda) => {
  return {
    type: POST_INSPECCIONROBORUEDA_SUCCESS,
    payload: inspeccionRoboRueda
  };
};

export const postInspeccionRoboRuedaError = (error) => {
  return {
    type: POST_INSPECCIONROBORUEDA_ERROR,
    payload: error
  };
};

export const updateInspeccionRoboRuedaPending = (pending) => {
  return {
    type: UPDATE_INSPECCIONROBORUEDA_PENDING,
    payload: pending
  };
};

export const updateInspeccionRoboRuedaSuccess = (inspeccionRoboRueda) => {
  return {
    type: UPDATE_INSPECCIONROBORUEDA_SUCCESS,
    payload: inspeccionRoboRueda
  };
};

export const updateInspeccionRoboRuedaError = (error) => {
  return {
    type: UPDATE_INSPECCIONROBORUEDA_ERROR,
    payload: error
  };
};
