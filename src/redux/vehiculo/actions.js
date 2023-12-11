import {
  GET_VEHICULO_PENDING,
  GET_VEHICULO_SUCCESS,
  GET_VEHICULO_ERROR,
  DELETE_VEHICULO_PENDING,
  DELETE_VEHICULO_SUCCESS,
  DELETE_VEHICULO_ERROR,
  POST_VEHICULO_PENDING,
  POST_VEHICULO_SUCCESS,
  POST_VEHICULO_ERROR,
  UPDATE_VEHICULO_PENDING,
  UPDATE_VEHICULO_SUCCESS,
  UPDATE_VEHICULO_ERROR
} from './constants';

export const getVehiculoPending = (pending) => {
  return {
    type: GET_VEHICULO_PENDING,
    payload: pending
  };
};

export const getVehiculoSuccess = (list) => {
  return {
    type: GET_VEHICULO_SUCCESS,
    payload: list
  };
};

export const getVehiculoError = (error) => {
  return {
    type: GET_VEHICULO_ERROR,
    payload: error
  };
};

export const deleteVehiculoPending = (pending) => {
  return {
    type: DELETE_VEHICULO_PENDING,
    payload: pending
  };
};

export const deleteVehiculoSuccess = (vehiculoID) => {
  return {
    type: DELETE_VEHICULO_SUCCESS,
    payload: vehiculoID
  };
};

export const deleteVehiculoError = (error) => {
  return {
    type: DELETE_VEHICULO_ERROR,
    payload: error
  };
};

export const postVehiculoPending = (pending) => {
  return {
    type: POST_VEHICULO_PENDING,
    payload: pending
  };
};

export const postVehiculoSuccess = (vehiculo) => {
  return {
    type: POST_VEHICULO_SUCCESS,
    payload: vehiculo
  };
};

export const postVehiculoError = (error) => {
  return {
    type: POST_VEHICULO_ERROR,
    payload: error
  };
};

export const updateVehiculoPending = (pending) => {
  return {
    type: UPDATE_VEHICULO_PENDING,
    payload: pending
  };
};

export const updateVehiculoSuccess = (vehiculo) => {
  return {
    type: UPDATE_VEHICULO_SUCCESS,
    payload: vehiculo
  };
};

export const updateVehiculoError = (error) => {
  return {
    type: UPDATE_VEHICULO_ERROR,
    payload: error
  };
};
