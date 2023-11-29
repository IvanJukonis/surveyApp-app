import {
  getInvolvedsPending,
  getInvolvedsSuccess,
  getInvolvedsError,
  deleteInvolvedPending,
  deleteInvolvedSuccess,
  deleteInvolvedError,
  addInvolvedPending,
  addInvolvedSuccess,
  addInvolvedError,
  updateInvolvedPending,
  updateInvolvedSuccess,
  updateInvolvedError
} from './actions';

export const getAllInvolveds = async (dispatch) => {
  try {
    dispatch(getInvolvedsPending(true));
    const reponse = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`);
    const data = await reponse.json();
    const involvedsList = data.data;
    dispatch(getInvolvedsPending(false));
    dispatch(getInvolvedsSuccess(involvedsList));
    console.log(data);
  } catch (error) {
    dispatch(getInvolvedsPending(false));
    dispatch(getInvolvedsError(true));
  }
};

export const deleteInvolved = (involvedID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteInvolvedPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/involucrado/${involvedID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteInvolvedPending(false));
        dispatch(deleteInvolvedSuccess(involvedID));
      }
    } catch (error) {
      dispatch(deleteInvolvedError(error));
    }
  };
};

export const createInvolved = async (dispatch, involvedData) => {
  try {
    dispatch(addInvolvedPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(involvedData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addInvolvedPending(false));
      throw new Error(data.message);
    }
    dispatch(addInvolvedSuccess(data.result));
  } catch (error) {
    dispatch(addInvolvedPending(false));
    dispatch(addInvolvedError(error.message));
  }
};

export const updateInvolved = async (dispatch, id, involvedData) => {
  try {
    dispatch(updateInvolvedPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/involucrado/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(involvedData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(updateInvolvedPending(false));
      throw new Error(data.message);
    }

    dispatch(updateInvolvedSuccess(data));
  } catch (error) {
    dispatch(updateInvolvedPending(false));
    dispatch(updateInvolvedError(error.message));
  }
};
