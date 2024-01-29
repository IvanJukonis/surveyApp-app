import {
  getInspeccionRoboRuedaPending,
  getInspeccionRoboRuedaSuccess,
  getInspeccionRoboRuedaError,
  deleteInspeccionRoboRuedaPending,
  deleteInspeccionRoboRuedaSuccess,
  deleteInspeccionRoboRuedaError,
  postInspeccionRoboRuedaPending,
  postInspeccionRoboRuedaSuccess,
  postInspeccionRoboRuedaError,
  updateInspeccionRoboRuedaPending,
  updateInspeccionRoboRuedaSuccess,
  updateInspeccionRoboRuedaError
} from './actions';

export const getAllInspeccionRoboRueda = async (dispatch, sinId) => {
  try {
    dispatch(getInspeccionRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionRoboRueda`);
    const data = await response.json();
    const inspeccionRoboRuedasList = data.data;
    const inspeccionRoboRuedasSiniestroList = inspeccionRoboRuedasList.filter(
      (inspeccionRoboRueda) => inspeccionRoboRueda.siniestro[0] === sinId
    );
    dispatch(getInspeccionRoboRuedaPending(false));
    dispatch(getInspeccionRoboRuedaSuccess(inspeccionRoboRuedasSiniestroList));
  } catch (error) {
    dispatch(getInspeccionRoboRuedaPending(false));
    dispatch(getInspeccionRoboRuedaError(true));
  }
};

export const getInspeccionRoboRueda = async (dispatch) => {
  try {
    dispatch(getInspeccionRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionRoboRueda`);
    const data = await response.json();
    const inspeccionRoboRuedasListAll = data.data;
    dispatch(getInspeccionRoboRuedaPending(false));
    dispatch(getInspeccionRoboRuedaSuccess(inspeccionRoboRuedasListAll));
  } catch (error) {
    dispatch(getInspeccionRoboRuedaPending(false));
    dispatch(getInspeccionRoboRuedaError(true));
  }
};

export const deleteInspeccionRoboRueda = (inspeccionRoboRuedaID) => {
  return async (dispatch) => {
    try {
      dispatch(deleteInspeccionRoboRuedaPending(true));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/inspeccionRoboRueda/${inspeccionRoboRuedaID}`,
        {
          method: 'DELETE'
        }
      );
      if (response.ok) {
        dispatch(deleteInspeccionRoboRuedaPending(false));
        dispatch(deleteInspeccionRoboRuedaSuccess(inspeccionRoboRuedaID));
      }
    } catch (error) {
      dispatch(deleteInspeccionRoboRuedaError(error));
    }
  };
};

export const postInspeccionRoboRueda = async (
  dispatch,
  inspeccionSiniestroData,
  selectedInvolucrados,
  selectedVehiculos,
  ruedas,
  siniestroId
) => {
  try {
    const requestBody = {
      ...inspeccionSiniestroData,
      involucrado: selectedInvolucrados,
      vehiculo: selectedVehiculos,
      ruedas: ruedas,
      siniestro: [siniestroId.id]
    };
    dispatch(postInspeccionRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionRoboRueda`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(postInspeccionRoboRuedaPending(false));
      return dispatch(postInspeccionRoboRuedaSuccess(newData.data));
    } else {
      dispatch(postInspeccionRoboRuedaPending(false));
      return dispatch(postInspeccionRoboRuedaError(true));
    }
  } catch (error) {
    dispatch(postInspeccionRoboRuedaPending(false));
    return dispatch(postInspeccionRoboRuedaError(true));
  }
};

export const updateInspeccionRoboRueda = async (dispatch, id, inspeccionRoboRuedaData) => {
  try {
    dispatch(updateInspeccionRoboRuedaPending(true));
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/inspeccionRoboRueda/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inspeccionRoboRuedaData)
    });
    if (response.ok) {
      const data = await response.json();
      const newData = data;
      dispatch(updateInspeccionRoboRuedaPending(false));
      return dispatch(updateInspeccionRoboRuedaSuccess(newData.data));
    } else {
      dispatch(updateInspeccionRoboRuedaPending(false));
      return dispatch(updateInspeccionRoboRuedaError(true));
    }
  } catch (error) {
    dispatch(updateInspeccionRoboRuedaPending(false));
    return dispatch(updateInspeccionRoboRuedaError(error.message));
  }
};
