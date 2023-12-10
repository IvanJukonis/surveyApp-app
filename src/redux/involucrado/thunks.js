import {
  getInvolucradoPending,
  getInvolucradoSuccess,
  getInvolucradoError,
  deleteInvolucradoPending,
  deleteInvolucradoSuccess,
  deleteInvolucradoError,
  addInvolucradoPending,
  addInvolucradoSuccess,
  addInvolucradoError,
  updateInvolucradoPending,
  updateInvolucradoSuccess,
  updateInvolucradoError
} from './actions';

export const getAllInvolucrado = async (dispatch) => {
  try {
    dispatch(getInvolucradoPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`);
    const data = await reponse.json();
    const involucradosList = data.data;
    dispatch(getInvolucradoPending(false));
    dispatch(getInvolucradoSuccess(involucradosList));
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

export const createInvolucrado = async (dispatch, involucradoData) => {
  try {
    dispatch(addInvolucradoPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(involucradoData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addInvolucradoPending(false));
      throw new Error(data.message);
    }
    dispatch(addInvolucradoSuccess(data.result));
  } catch (error) {
    dispatch(addInvolucradoPending(false));
    dispatch(addInvolucradoError(error.message));
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
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateInvolucradoPending(false));
      throw new Error(data.message);
    }

    dispatch(updateInvolucradoSuccess(data));
  } catch (error) {
    dispatch(updateInvolucradoPending(false));
    dispatch(updateInvolucradoError(error.message));
  }
};
