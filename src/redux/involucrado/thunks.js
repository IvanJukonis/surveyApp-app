import {
  getInvolucradoPending,
  getInvolucradoSuccess,
  getInvolucradoError,
  deleteInvolucradoPending,
  deleteInvolucradoSuccess,
  deleteInvolucradoError,
  postInvolucradoPending,
  postInvolucradoSuccess,
  postInvolucradoError,
  updateInvolucradoPending,
  updateInvolucradoSuccess,
  updateInvolucradoError
} from './actions';

export const getAllInvolucrado = async (dispatch, sinId) => {
  try {
    console.log(sinId, 'fetch');
    dispatch(getInvolucradoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`);
    const data = await response.json();
    const involucradosList = data.data;
    const involucradosSiniestroList = involucradosList.filter(
      (involucrado) => involucrado.siniestro[0] === sinId
    );
    console.log(involucradosList, 'fetch');
    console.log(involucradosSiniestroList, 'fetch');
    dispatch(getInvolucradoPending(false));
    dispatch(getInvolucradoSuccess(involucradosSiniestroList));
  } catch (error) {
    dispatch(getInvolucradoPending(false));
    dispatch(getInvolucradoError(true));
  }
};

export const getInvolucrado = async (dispatch) => {
  try {
    dispatch(getInvolucradoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`);
    const data = await response.json();
    const involucradosListAll = data.data;
    dispatch(getInvolucradoPending(false));
    dispatch(getInvolucradoSuccess(involucradosListAll));
  } catch (error) {
    dispatch(getInvolucradoPending(false));
    dispatch(getInvolucradoError(true));
  }
};

export const deleteInvolucrado = (involucradoID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteInvolucradoPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/involucrado/${involucradoID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteInvolucradoPending(false));
        dispatch(deleteInvolucradoSuccess(involucradoID));
      }
    } catch (error) {
      dispatch(deleteInvolucradoError(error));
    }
  };
};

export const postInvolucrado = async (dispatch, involucradoData) => {
  try {
    dispatch(postInvolucradoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(involucradoData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postInvolucradoPending(false));
      return dispatch(postInvolucradoSuccess(newData.data));
    } else {
      dispatch(postInvolucradoPending(false));
      return dispatch(postInvolucradoError(true));
    }
  } catch (error) {
    dispatch(postInvolucradoPending(false));
    return dispatch(postInvolucradoError(true));
  }
};

export const updateInvolucrado = async (dispatch, id, involucradoData) => {
  try {
    dispatch(updateInvolucradoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(involucradoData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateInvolucradoPending(false));
      return dispatch(updateInvolucradoSuccess(newData.data));
    } else {
      dispatch(updateInvolucradoPending(false));
      return dispatch(updateInvolucradoError(true));
    }
  } catch (error) {
    dispatch(updateInvolucradoPending(false));
    return dispatch(updateInvolucradoError(error.message));
  }
};
