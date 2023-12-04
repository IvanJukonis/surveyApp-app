import {
  GET_SINIESTRO_PENDING,
  GET_SINIESTRO_SUCCESS,
  GET_SINIESTRO_ERROR,
  POST_SINIESTRO_PENDING,
  POST_SINIESTRO_SUCCESS,
  POST_SINIESTRO_ERROR,
  UPDATE_SINIESTRO_PENDING,
  UPDATE_SINIESTRO_SUCCESS,
  UPDATE_SINIESTRO_ERROR,
  DELETE_SINIESTRO_PENDING,
  DELETE_SINIESTRO_SUCCESS,
  DELETE_SINIESTRO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const siniestroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_SINIESTRO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_SINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_SINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_SINIESTRO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_SINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_SINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_SINIESTRO_SUCCESS: {
      // const siniestroUpdated = action.payload;
      const updatedSiniestro = state.list.map((siniestro) => {
        return siniestro._id === action.payload._id
          ? { ...siniestro, ...action.payload }
          : siniestro;
      });
      return {
        ...state,
        list: [...updatedSiniestro]
      };
    }

    case UPDATE_SINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_SINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_SINIESTRO_SUCCESS: {
      const newList = state.list.filter((siniestro) => {
        return siniestro._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_SINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default siniestroReducer;
