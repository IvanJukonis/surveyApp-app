import {
  GET_INSPECCIONSINIESTRO_PENDING,
  GET_INSPECCIONSINIESTRO_SUCCESS,
  GET_INSPECCIONSINIESTRO_ERROR,
  POST_INSPECCIONSINIESTRO_PENDING,
  POST_INSPECCIONSINIESTRO_SUCCESS,
  POST_INSPECCIONSINIESTRO_ERROR,
  UPDATE_INSPECCIONSINIESTRO_PENDING,
  UPDATE_INSPECCIONSINIESTRO_SUCCESS,
  UPDATE_INSPECCIONSINIESTRO_ERROR,
  DELETE_INSPECCIONSINIESTRO_PENDING,
  DELETE_INSPECCIONSINIESTRO_SUCCESS,
  DELETE_INSPECCIONSINIESTRO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const inspeccionSiniestroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INSPECCIONSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_INSPECCIONSINIESTRO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_INSPECCIONSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_INSPECCIONSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_INSPECCIONSINIESTRO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_INSPECCIONSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_INSPECCIONSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_INSPECCIONSINIESTRO_SUCCESS: {
      // const inspeccionSiniestroUpdated = action.payload;
      const updatedInspeccionSiniestro = state.list.map((inspeccionSiniestro) => {
        return inspeccionSiniestro._id === action.payload._id
          ? { ...inspeccionSiniestro, ...action.payload }
          : inspeccionSiniestro;
      });
      return {
        ...state,
        list: [...updatedInspeccionSiniestro]
      };
    }

    case UPDATE_INSPECCIONSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_INSPECCIONSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_INSPECCIONSINIESTRO_SUCCESS: {
      const newList = state.list.filter((inspeccionSiniestro) => {
        return inspeccionSiniestro._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_INSPECCIONSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default inspeccionSiniestroReducer;
