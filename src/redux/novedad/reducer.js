import {
  GET_NOVEDAD_PENDING,
  GET_NOVEDAD_SUCCESS,
  GET_NOVEDAD_ERROR,
  POST_NOVEDAD_PENDING,
  POST_NOVEDAD_SUCCESS,
  POST_NOVEDAD_ERROR,
  UPDATE_NOVEDAD_PENDING,
  UPDATE_NOVEDAD_SUCCESS,
  UPDATE_NOVEDAD_ERROR,
  DELETE_NOVEDAD_PENDING,
  DELETE_NOVEDAD_SUCCESS,
  DELETE_NOVEDAD_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const novedadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NOVEDAD_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_NOVEDAD_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_NOVEDAD_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_NOVEDAD_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_NOVEDAD_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_NOVEDAD_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_NOVEDAD_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_NOVEDAD_SUCCESS: {
      // const novedadUpdated = action.payload;
      const updatedNovedad = state.list.map((novedad) => {
        return novedad._id === action.payload._id ? { ...novedad, ...action.payload } : novedad;
      });
      return {
        ...state,
        list: [...updatedNovedad]
      };
    }

    case UPDATE_NOVEDAD_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_NOVEDAD_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_NOVEDAD_SUCCESS: {
      const newList = state.list.filter((novedad) => {
        return novedad._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_NOVEDAD_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default novedadReducer;
