import {
  getEntrevistaSiniestroPending,
  getEntrevistaSiniestroSuccess,
  getEntrevistaSiniestroError,
  deleteEntrevistaSiniestroPending,
  deleteEntrevistaSiniestroSuccess,
  deleteEntrevistaSiniestroError,
  postEntrevistaSiniestroPending,
  postEntrevistaSiniestroSuccess,
  postEntrevistaSiniestroError,
  updateEntrevistaSiniestroPending,
  updateEntrevistaSiniestroSuccess,
  updateEntrevistaSiniestroError
} from './actions';

export const getAllEntrevistaSiniestro = async (dispatch) => {
  try {
    dispatch(getEntrevistaSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro`);
    const data = await response.json();

    const EntrevistaSiniestrosListAll = data.data;
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroSuccess(EntrevistaSiniestrosListAll));
  } catch (error) {
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroError(true));
  }
};

export const getByIdEntrevistaSiniestro = async (dispatch, id) => {
  try {
    dispatch(getEntrevistaSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro/${id}`);
    const data = await response.json();
    const entrevistaSiniestroById = data.data;
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroSuccess(entrevistaSiniestroById));
  } catch (error) {
    console.error(error);
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroError(true));
  }
};

export const getSinEntrevistaSiniestro = async (dispatch, sinId) => {
  try {
    dispatch(getEntrevistaSiniestroPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro`);
    const data = await response.json();

    const EntrevistaSiniestrosListAll = data.data;
    const sinEntrevistaSiniestros = EntrevistaSiniestrosListAll.filter(
      (entrevista) => entrevista.siniestro[0] === sinId
    );
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroSuccess(sinEntrevistaSiniestros));
  } catch (error) {
    dispatch(getEntrevistaSiniestroPending(false));
    dispatch(getEntrevistaSiniestroError(true));
  }
};

export const deleteEntrevistaSiniestro = (entrevistaSiniestroID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteEntrevistaSiniestroPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro/${entrevistaSiniestroID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteEntrevistaSiniestroPending(false));
        dispatch(deleteEntrevistaSiniestroSuccess(entrevistaSiniestroID));
      }
    } catch (error) {
      dispatch(deleteEntrevistaSiniestroError(error));
    }
  };
};

export const postEntrevistaSiniestro = async (
  dispatch,
  entrevistaSiniestroData,
  involucradoIdList,
  vehiculoIdList,
  siniestroId,
  entrevistadoId
) => {
  try {
    dispatch(postEntrevistaSiniestroPending(true));
    const requestBody = {
      ...entrevistaSiniestroData,
      involucrado: involucradoIdList,
      vehiculo: vehiculoIdList,
      siniestro: siniestroId || siniestroId.id,
      entrevistado: entrevistadoId
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postEntrevistaSiniestroPending(false));
      return dispatch(postEntrevistaSiniestroSuccess(newData.data));
    } else {
      dispatch(postEntrevistaSiniestroPending(false));
      return dispatch(postEntrevistaSiniestroError(true));
    }
  } catch (error) {
    dispatch(postEntrevistaSiniestroPending(false));
    return dispatch(postEntrevistaSiniestroError(true));
  }
};

export const updateEntrevistaSiniestro = async (
  dispatch,
  id,
  entrevistaSiniestroData,
  involucradoIdList,
  vehiculoIdList,
  siniestroId,
  entrevistadoId
) => {
  try {
    dispatch(updateEntrevistaSiniestroPending(true));
    const requestBody = {
      ...entrevistaSiniestroData,
      _id: id,
      involucrado: involucradoIdList,
      vehiculo: vehiculoIdList,
      siniestro: siniestroId,
      entrevistado: entrevistadoId
    };
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/entrevistaSiniestro/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateEntrevistaSiniestroPending(false));
      return dispatch(updateEntrevistaSiniestroSuccess(newData.data));
    } else {
      dispatch(updateEntrevistaSiniestroPending(false));
      return dispatch(updateEntrevistaSiniestroError(true));
    }
  } catch (error) {
    dispatch(updateEntrevistaSiniestroPending(false));
    return dispatch(updateEntrevistaSiniestroError(error.message));
  }
};
