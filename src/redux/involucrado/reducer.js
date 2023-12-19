import {
  GET_INVOLUCRADO_PENDING,
  GET_INVOLUCRADO_SUCCESS,
  GET_INVOLUCRADO_ERROR,
  POST_INVOLUCRADO_PENDING,
  POST_INVOLUCRADO_SUCCESS,
  POST_INVOLUCRADO_ERROR,
  UPDATE_INVOLUCRADO_PENDING,
  UPDATE_INVOLUCRADO_SUCCESS,
  UPDATE_INVOLUCRADO_ERROR,
  DELETE_INVOLUCRADO_PENDING,
  DELETE_INVOLUCRADO_SUCCESS,
  DELETE_INVOLUCRADO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const involucradoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVOLUCRADO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_INVOLUCRADO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_INVOLUCRADO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_INVOLUCRADO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_INVOLUCRADO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_INVOLUCRADO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_INVOLUCRADO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_INVOLUCRADO_SUCCESS: {
      // const involucradoUpdated = action.payload;
      const updatedInvolucrado = state.list.map((involucrado) => {
        return involucrado._id === action.payload._id
          ? { ...involucrado, ...action.payload }
          : involucrado;
      });
      return {
        ...state,
        list: [...updatedInvolucrado]
      };
    }

    case UPDATE_INVOLUCRADO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_INVOLUCRADO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_INVOLUCRADO_SUCCESS: {
      const newList = state.list.filter((involucrado) => {
        return involucrado._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_INVOLUCRADO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default involucradoReducer;
