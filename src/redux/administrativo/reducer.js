import {
  GET_ADMINISTRATIVO_PENDING,
  GET_ADMINISTRATIVO_SUCCESS,
  GET_ADMINISTRATIVO_ERROR,
  POST_ADMINISTRATIVO_PENDING,
  POST_ADMINISTRATIVO_SUCCESS,
  POST_ADMINISTRATIVO_ERROR,
  UPDATE_ADMINISTRATIVO_PENDING,
  UPDATE_ADMINISTRATIVO_SUCCESS,
  UPDATE_ADMINISTRATIVO_ERROR,
  DELETE_ADMINISTRATIVO_PENDING,
  DELETE_ADMINISTRATIVO_SUCCESS,
  DELETE_ADMINISTRATIVO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const administrativoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_ADMINISTRATIVO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_ADMINISTRATIVO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_ADMINISTRATIVO_SUCCESS: {
      // const administrativoUpdated = action.payload;
      const updatedAdministrativo = state.list.map((administrativo) => {
        return administrativo._id === action.payload._id
          ? { ...administrativo, ...action.payload }
          : administrativo;
      });
      return {
        ...state,
        list: [...updatedAdministrativo]
      };
    }

    case UPDATE_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_ADMINISTRATIVO_SUCCESS: {
      const newList = state.list.filter((administrativo) => {
        return administrativo._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default administrativoReducer;
