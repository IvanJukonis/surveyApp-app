import {
  GET_VEHICULO_PENDING,
  GET_VEHICULO_SUCCESS,
  GET_VEHICULO_ERROR,
  DELETE_VEHICULO_PENDING,
  DELETE_VEHICULO_SUCCESS,
  DELETE_VEHICULO_ERROR,
  ADD_VEHICULO_PENDING,
  ADD_VEHICULO_SUCCESS,
  ADD_VEHICULO_ERROR,
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

export const addVehiclePending = (pending) => {
  return {
    type: ADD_VEHICULO_PENDING,
    payload: pending
  };
};

export const addVehicleSuccess = (vehiculo) => {
  return {
    type: ADD_VEHICULO_SUCCESS,
    payload: vehiculo
  };
};

export const addVehicleError = (error) => {
  return {
    type: ADD_VEHICULO_ERROR,
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
