import {
  GET_LOCATION_PENDING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ERROR,
  DELETE_LOCATION_PENDING,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_ERROR,
  ADD_LOCATION_PENDING,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  EDIT_LOCATION_PENDING,
  EDIT_LOCATION_SUCCESS,
  EDIT_LOCATION_ERROR
} from './constants';

export const getLocationsPending = (pending) => {
  return {
    type: GET_LOCATION_PENDING,
    payload: pending
  };
};

export const getLocationsSuccess = (list) => {
  return {
    type: GET_LOCATION_SUCCESS,
    payload: list
  };
};

export const getLocationsError = (error) => {
  return {
    type: GET_LOCATION_ERROR,
    payload: error
  };
};

export const deleteLocationPending = (pending) => {
  return {
    type: DELETE_LOCATION_PENDING,
    payload: pending
  };
};

export const deleteLocationSuccess = (locationID) => {
  return {
    type: DELETE_LOCATION_SUCCESS,
    payload: locationID
  };
};

export const deleteLocationError = (error) => {
  return {
    type: DELETE_LOCATION_ERROR,
    payload: error
  };
};

export const addLocationPending = (pending) => {
  return {
    type: ADD_LOCATION_PENDING,
    payload: pending
  };
};

export const addLocationSuccess = (location) => {
  return {
    type: ADD_LOCATION_SUCCESS,
    payload: location
  };
};

export const addLocationError = (error) => {
  return {
    type: ADD_LOCATION_ERROR,
    payload: error
  };
};

export const editLocationPending = (pending) => {
  return {
    type: EDIT_LOCATION_PENDING,
    payload: pending
  };
};

export const editLocationSuccess = (location) => {
  return {
    type: EDIT_LOCATION_SUCCESS,
    payload: location
  };
};

export const editLocationError = (error) => {
  return {
    type: EDIT_LOCATION_ERROR,
    payload: error
  };
};
