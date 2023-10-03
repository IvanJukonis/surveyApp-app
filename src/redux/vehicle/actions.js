import {
  GET_VEHICLE_PENDING,
  GET_VEHICLE_SUCCESS,
  GET_VEHICLE_ERROR,
  DELETE_VEHICLE_PENDING,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_ERROR,
  ADD_VEHICLE_PENDING,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_ERROR,
  EDIT_VEHICLE_PENDING,
  EDIT_VEHICLE_SUCCESS,
  EDIT_VEHICLE_ERROR
} from './constants';

export const getVehiclesPending = (pending) => {
  return {
    type: GET_VEHICLE_PENDING,
    payload: pending
  };
};

export const getVehiclesSuccess = (list) => {
  return {
    type: GET_VEHICLE_SUCCESS,
    payload: list
  };
};

export const getVehiclesError = (error) => {
  return {
    type: GET_VEHICLE_ERROR,
    payload: error
  };
};

export const deleteVehiclePending = (pending) => {
  return {
    type: DELETE_VEHICLE_PENDING,
    payload: pending
  };
};

export const deleteVehicleSuccess = (vehicleID) => {
  return {
    type: DELETE_VEHICLE_SUCCESS,
    payload: vehicleID
  };
};

export const deleteVehicleError = (error) => {
  return {
    type: DELETE_VEHICLE_ERROR,
    payload: error
  };
};

export const addVehiclePending = (pending) => {
  return {
    type: ADD_VEHICLE_PENDING,
    payload: pending
  };
};

export const addVehicleSuccess = (vehicle) => {
  return {
    type: ADD_VEHICLE_SUCCESS,
    payload: vehicle
  };
};

export const addVehicleError = (error) => {
  return {
    type: ADD_VEHICLE_ERROR,
    payload: error
  };
};

export const editVehiclePending = (pending) => {
  return {
    type: EDIT_VEHICLE_PENDING,
    payload: pending
  };
};

export const editVehicleSuccess = (vehicle) => {
  return {
    type: EDIT_VEHICLE_SUCCESS,
    payload: vehicle
  };
};

export const editVehicleError = (error) => {
  return {
    type: EDIT_VEHICLE_ERROR,
    payload: error
  };
};
