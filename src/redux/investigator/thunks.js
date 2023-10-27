import {
  getInvestigatorsPending,
  getInvestigatorsSuccess,
  getInvestigatorsError,
  deleteInvestigatorPending,
  deleteInvestigatorSuccess,
  deleteInvestigatorError,
  addInvestigatorPending,
  addInvestigatorSuccess,
  addInvestigatorError,
  editInvestigatorPending,
  editInvestigatorSuccess,
  editInvestigatorError
} from './actions';

export const getAllInvestigators = async (dispatch) => {
  try {
    dispatch(getInvestigatorsPending(true));

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investigator`);
    const data = await response.json();

    dispatch(getInvestigatorsSuccess(data.data));
  } catch (error) {
    dispatch(getInvestigatorsError(true));
  } finally {
    dispatch(getInvestigatorsPending(false));
  }
};

export const investigatorDelete = (investigatorID) => {
  return async (dispatch) => {
    dispatch(deleteInvestigatorPending(true));

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/investigator/${investigatorID}`,
        {
          method: 'DELETE'
        }
      );

      if (response.ok) {
        dispatch(deleteInvestigatorSuccess(investigatorID));
      } else {
        throw new Error('Failed to delete investigator');
      }
    } catch (error) {
      dispatch(deleteInvestigatorError(error.message));
    } finally {
      dispatch(deleteInvestigatorPending(false));
    }
  };
};

export const createInvestigator = async (dispatch, investigatorData) => {
  try {
    dispatch(addInvestigatorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investigator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(investigatorData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(addInvestigatorPending(false));
      throw new Error(data.message);
    }
    dispatch(addInvestigatorSuccess(data.result));
  } catch (error) {
    dispatch(addInvestigatorPending(false));
    dispatch(addInvestigatorError(error.message));
  }
};

export const updateInvestigator = async (dispatch, id, investigatorData) => {
  try {
    dispatch(editInvestigatorPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/investigator/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(investigatorData)
    });
    const data = await response.json();
    if (!response.ok) {
      dispatch(editInvestigatorPending(false));
      throw new Error(data.message);
    }

    dispatch(editInvestigatorSuccess(data));
  } catch (error) {
    dispatch(editInvestigatorPending(false));
    dispatch(editInvestigatorError(error.message));
  }
};
