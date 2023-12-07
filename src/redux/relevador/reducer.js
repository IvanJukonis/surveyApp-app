import {
  GET_RELEVADOR_PENDING,
  GET_RELEVADOR_SUCCESS,
  GET_RELEVADOR_ERROR,
  POST_RELEVADOR_PENDING,
  POST_RELEVADOR_SUCCESS,
  POST_RELEVADOR_ERROR,
  UPDATE_RELEVADOR_PENDING,
  UPDATE_RELEVADOR_SUCCESS,
  UPDATE_RELEVADOR_ERROR,
  DELETE_RELEVADOR_PENDING,
  DELETE_RELEVADOR_SUCCESS,
  DELETE_RELEVADOR_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const relevadorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RELEVADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_RELEVADOR_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_RELEVADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_RELEVADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_RELEVADOR_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_RELEVADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_RELEVADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_RELEVADOR_SUCCESS: {
      // const relevadorUpdated = action.payload;
      const updatedRelevador = state.list.map((relevador) => {
        return relevador._id === action.payload._id
          ? { ...relevador, ...action.payload }
          : relevador;
      });
      return {
        ...state,
        list: [...updatedRelevador]
      };
    }

    case UPDATE_RELEVADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_RELEVADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_RELEVADOR_SUCCESS: {
      const newList = state.list.filter((relevador) => {
        return relevador._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_RELEVADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default relevadorReducer;
