import {
  GET_ADMINISTRATIVOISTRATIVOS_PENDING,
  GET_ADMINISTRATIVOISTRATIVOS_SUCCESS,
  GET_ADMINISTRATIVOISTRATIVOS_ERROR,
  DELETE_ADMINISTRATIVO_PENDING,
  DELETE_ADMINISTRATIVO_SUCCESS,
  DELETE_ADMINISTRATIVO_ERROR,
  ADD_ADMINISTRATIVO_PENDING,
  ADD_ADMINISTRATIVO_SUCCESS,
  ADD_ADMINISTRATIVO_ERROR,
  EDIT_ADMINISTRATIVO_PENDING,
  EDIT_ADMINISTRATIVO_SUCCESS,
  EDIT_ADMINISTRATIVO_ERROR
} from './constants';

export const getAdministrativosPending = (pending) => {
  return {
    type: GET_ADMINISTRATIVOISTRATIVOS_PENDING,
    payload: pending
  };
};

export const getAdministrativosSuccess = (list) => {
  return {
    type: GET_ADMINISTRATIVOISTRATIVOS_SUCCESS,
    payload: list
  };
};

export const getAdministrativosError = (error) => {
  return {
    type: GET_ADMINISTRATIVOISTRATIVOS_ERROR,
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

export const addAdministrativoPending = (pending) => {
  return {
    type: ADD_ADMINISTRATIVO_PENDING,
    payload: pending
  };
};

export const addAdministrativoSuccess = (administrativo) => {
  return {
    type: ADD_ADMINISTRATIVO_SUCCESS,
    payload: administrativo
  };
};

export const addAdministrativoError = (error) => {
  return {
    type: ADD_ADMINISTRATIVO_ERROR,
    payload: error
  };
};

export const editAdministrativoPending = (pending) => {
  return {
    type: EDIT_ADMINISTRATIVO_PENDING,
    payload: pending
  };
};

export const editAdministrativoSuccess = (administrativo) => {
  return {
    type: EDIT_ADMINISTRATIVO_SUCCESS,
    payload: administrativo
  };
};

export const editAdministrativoError = (error) => {
  return {
    type: EDIT_ADMINISTRATIVO_ERROR,
    payload: error
  };
};
