import {
  GET_LUGARROBORUEDA_PENDING,
  GET_LUGARROBORUEDA_SUCCESS,
  GET_LUGARROBORUEDA_ERROR,
  DELETE_LUGARROBORUEDA_PENDING,
  DELETE_LUGARROBORUEDA_SUCCESS,
  DELETE_LUGARROBORUEDA_ERROR,
  POST_LUGARROBORUEDA_PENDING,
  POST_LUGARROBORUEDA_SUCCESS,
  POST_LUGARROBORUEDA_ERROR,
  UPDATE_LUGARROBORUEDA_PENDING,
  UPDATE_LUGARROBORUEDA_SUCCESS,
  UPDATE_LUGARROBORUEDA_ERROR
} from './constants';

export const getLugarRoboRuedaPending = (pending) => {
  return {
    type: GET_LUGARROBORUEDA_PENDING,
    payload: pending
  };
};

export const getLugarRoboRuedaSuccess = (list) => {
  return {
    type: GET_LUGARROBORUEDA_SUCCESS,
    payload: list
  };
};

export const getLugarRoboRuedaError = (error) => {
  return {
    type: GET_LUGARROBORUEDA_ERROR,
    payload: error
  };
};

export const deleteLugarRoboRuedaPending = (pending) => {
  return {
    type: DELETE_LUGARROBORUEDA_PENDING,
    payload: pending
  };
};

export const deleteLugarRoboRuedaSuccess = (lugarRoboRuedaID) => {
  return {
    type: DELETE_LUGARROBORUEDA_SUCCESS,
    payload: lugarRoboRuedaID
  };
};

export const deleteLugarRoboRuedaError = (error) => {
  return {
    type: DELETE_LUGARROBORUEDA_ERROR,
    payload: error
  };
};

export const postLugarRoboRuedaPending = (pending) => {
  return {
    type: POST_LUGARROBORUEDA_PENDING,
    payload: pending
  };
};

export const postLugarRoboRuedaSuccess = (lugarRoboRueda) => {
  return {
    type: POST_LUGARROBORUEDA_SUCCESS,
    payload: lugarRoboRueda
  };
};

export const postLugarRoboRuedaError = (error) => {
  return {
    type: POST_LUGARROBORUEDA_ERROR,
    payload: error
  };
};

export const updateLugarRoboRuedaPending = (pending) => {
  return {
    type: UPDATE_LUGARROBORUEDA_PENDING,
    payload: pending
  };
};

export const updateLugarRoboRuedaSuccess = (lugarRoboRueda) => {
  return {
    type: UPDATE_LUGARROBORUEDA_SUCCESS,
    payload: lugarRoboRueda
  };
};

export const updateLugarRoboRuedaError = (error) => {
  return {
    type: UPDATE_LUGARROBORUEDA_ERROR,
    payload: error
  };
};
