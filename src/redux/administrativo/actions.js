import {
  GET_ADMINISTRATIVO_PENDING,
  GET_ADMINISTRATIVO_SUCCESS,
  GET_ADMINISTRATIVO_ERROR,
  DELETE_ADMINISTRATIVO_PENDING,
  DELETE_ADMINISTRATIVO_SUCCESS,
  DELETE_ADMINISTRATIVO_ERROR,
  POST_ADMINISTRATIVO_PENDING,
  POST_ADMINISTRATIVO_SUCCESS,
  POST_ADMINISTRATIVO_ERROR,
  UPDATE_ADMINISTRATIVO_PENDING,
  UPDATE_ADMINISTRATIVO_SUCCESS,
  UPDATE_ADMINISTRATIVO_ERROR
} from './constants';

export const getAdministrativoPending = (pending) => {
  return {
    type: GET_ADMINISTRATIVO_PENDING,
    payload: pending
  };
};

export const getAdministrativoSuccess = (list) => {
  return {
    type: GET_ADMINISTRATIVO_SUCCESS,
    payload: list
  };
};

export const getAdministrativoError = (error) => {
  return {
    type: GET_ADMINISTRATIVO_ERROR,
    payload: error
  };
};

export const deleteAdministrativoPending = (pending) => {
  return {
    type: DELETE_ADMINISTRATIVO_PENDING,
    payload: pending
  };
};

export const deleteAdministrativoSuccess = (administrativoID) => {
  return {
    type: DELETE_ADMINISTRATIVO_SUCCESS,
    payload: administrativoID
  };
};

export const deleteAdministrativoError = (error) => {
  return {
    type: DELETE_ADMINISTRATIVO_ERROR,
    payload: error
  };
};

export const postAdministrativoPending = (pending) => {
  return {
    type: POST_ADMINISTRATIVO_PENDING,
    payload: pending
  };
};

export const postAdministrativoSuccess = (administrativo) => {
  return {
    type: POST_ADMINISTRATIVO_SUCCESS,
    payload: administrativo
  };
};

export const postAdministrativoError = (error) => {
  return {
    type: POST_ADMINISTRATIVO_ERROR,
    payload: error
  };
};

export const updateAdministrativoPending = (pending) => {
  return {
    type: UPDATE_ADMINISTRATIVO_PENDING,
    payload: pending
  };
};

export const updateAdministrativoSuccess = (administrativo) => {
  return {
    type: UPDATE_ADMINISTRATIVO_SUCCESS,
    payload: administrativo
  };
};

export const updateAdministrativoError = (error) => {
  return {
    type: UPDATE_ADMINISTRATIVO_ERROR,
    payload: error
  };
};
