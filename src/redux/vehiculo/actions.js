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

export const deleteVehiclePending = (pending) => {
  return {
    type: DELETE_VEHICULO_PENDING,
    payload: pending
  };
};

export const deleteVehicleSuccess = (vehiculoID) => {
  return {
    type: DELETE_VEHICULO_SUCCESS,
    payload: vehiculoID
  };
};

export const deleteVehicleError = (error) => {
  return {
    type: DELETE_VEHICULO_ERROR,
    payload: error
  };
};

export const postVehiclePending = (pending) => {
  return {
    type: POST_VEHICULO_PENDING,
    payload: pending
  };
};

export const postVehicleSuccess = (vehiculo) => {
  return {
    type: POST_VEHICULO_SUCCESS,
    payload: vehiculo
  };
};

export const postVehicleError = (error) => {
  return {
    type: POST_VEHICULO_ERROR,
    payload: error
  };
};

export const updateVehiclePending = (pending) => {
  return {
    type: UPDATE_VEHICULO_PENDING,
    payload: pending
  };
};

export const updateVehicleSuccess = (vehiculo) => {
  return {
    type: UPDATE_VEHICULO_SUCCESS,
    payload: vehiculo
  };
};

export const updateVehicleError = (error) => {
  return {
    type: UPDATE_VEHICULO_ERROR,
    payload: error
  };
};
