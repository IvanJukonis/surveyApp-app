import {
  GET_ENTREVISTAROBORUEDA_PENDING,
  GET_ENTREVISTAROBORUEDA_SUCCESS,
  GET_ENTREVISTAROBORUEDA_ERROR,
  DELETE_ENTREVISTAROBORUEDA_PENDING,
  DELETE_ENTREVISTAROBORUEDA_SUCCESS,
  DELETE_ENTREVISTAROBORUEDA_ERROR,
  POST_ENTREVISTAROBORUEDA_PENDING,
  POST_ENTREVISTAROBORUEDA_SUCCESS,
  POST_ENTREVISTAROBORUEDA_ERROR,
  UPDATE_ENTREVISTAROBORUEDA_PENDING,
  UPDATE_ENTREVISTAROBORUEDA_SUCCESS,
  UPDATE_ENTREVISTAROBORUEDA_ERROR
} from './constants';

export const getEntrevistaRoboRuedaPending = (pending) => {
  return {
    type: GET_ENTREVISTAROBORUEDA_PENDING,
    payload: pending
  };
};

export const getEntrevistaRoboRuedaSuccess = (list) => {
  return {
    type: GET_ENTREVISTAROBORUEDA_SUCCESS,
    payload: list
  };
};

export const getEntrevistaRoboRuedaError = (error) => {
  return {
    type: GET_ENTREVISTAROBORUEDA_ERROR,
    payload: error
  };
};

export const deleteEntrevistaRoboRuedaPending = (pending) => {
  return {
    type: DELETE_ENTREVISTAROBORUEDA_PENDING,
    payload: pending
  };
};

export const deleteEntrevistaRoboRuedaSuccess = (entrevistaRoboRuedaID) => {
  return {
    type: DELETE_ENTREVISTAROBORUEDA_SUCCESS,
    payload: entrevistaRoboRuedaID
  };
};

export const deleteEntrevistaRoboRuedaError = (error) => {
  return {
    type: DELETE_ENTREVISTAROBORUEDA_ERROR,
    payload: error
  };
};

export const postEntrevistaRoboRuedaPending = (pending) => {
  return {
    type: POST_ENTREVISTAROBORUEDA_PENDING,
    payload: pending
  };
};

export const postEntrevistaRoboRuedaSuccess = (entrevistaRoboRueda) => {
  return {
    type: POST_ENTREVISTAROBORUEDA_SUCCESS,
    payload: entrevistaRoboRueda
  };
};

export const postEntrevistaRoboRuedaError = (error) => {
  return {
    type: POST_ENTREVISTAROBORUEDA_ERROR,
    payload: error
  };
};

export const updateEntrevistaRoboRuedaPending = (pending) => {
  return {
    type: UPDATE_ENTREVISTAROBORUEDA_PENDING,
    payload: pending
  };
};

export const updateEntrevistaRoboRuedaSuccess = (entrevistaRoboRueda) => {
  return {
    type: UPDATE_ENTREVISTAROBORUEDA_SUCCESS,
    payload: entrevistaRoboRueda
  };
};

export const updateEntrevistaRoboRuedaError = (error) => {
  return {
    type: UPDATE_ENTREVISTAROBORUEDA_ERROR,
    payload: error
  };
};
