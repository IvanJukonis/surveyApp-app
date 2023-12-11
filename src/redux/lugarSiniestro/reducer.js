import {
  GET_LUGARSINIESTRO_PENDING,
  GET_LUGARSINIESTRO_SUCCESS,
  GET_LUGARSINIESTRO_ERROR,
  POST_LUGARSINIESTRO_PENDING,
  POST_LUGARSINIESTRO_SUCCESS,
  POST_LUGARSINIESTRO_ERROR,
  UPDATE_LUGARSINIESTRO_PENDING,
  UPDATE_LUGARSINIESTRO_SUCCESS,
  UPDATE_LUGARSINIESTRO_ERROR,
  DELETE_LUGARSINIESTRO_PENDING,
  DELETE_LUGARSINIESTRO_SUCCESS,
  DELETE_LUGARSINIESTRO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const lugarSiniestroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LUGARSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_LUGARSINIESTRO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_LUGARSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_LUGARSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_LUGARSINIESTRO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_LUGARSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_LUGARSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_LUGARSINIESTRO_SUCCESS: {
      // const lugarSiniestroUpdated = action.payload;
      const updatedLugarSiniestro = state.list.map((lugarSiniestro) => {
        return lugarSiniestro._id === action.payload._id
          ? { ...lugarSiniestro, ...action.payload }
          : lugarSiniestro;
      });
      return {
        ...state,
        list: [...updatedLugarSiniestro]
      };
    }

    case UPDATE_LUGARSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_LUGARSINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_LUGARSINIESTRO_SUCCESS: {
      const newList = state.list.filter((lugarSiniestro) => {
        return lugarSiniestro._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_LUGARSINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default lugarSiniestroReducer;
