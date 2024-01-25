import {
  GET_EVENTO_PENDING,
  GET_EVENTO_SUCCESS,
  GET_EVENTO_ERROR,
  POST_EVENTO_PENDING,
  POST_EVENTO_SUCCESS,
  POST_EVENTO_ERROR,
  UPDATE_EVENTO_PENDING,
  UPDATE_EVENTO_SUCCESS,
  UPDATE_EVENTO_ERROR,
  DELETE_EVENTO_PENDING,
  DELETE_EVENTO_SUCCESS,
  DELETE_EVENTO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const eventoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_EVENTO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_EVENTO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_EVENTO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_EVENTO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_EVENTO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_EVENTO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_EVENTO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_EVENTO_SUCCESS: {
      // const eventoUpdated = action.payload;
      const updatedEvento = state.list.map((evento) => {
        return evento._id === action.payload._id ? { ...evento, ...action.payload } : evento;
      });
      return {
        ...state,
        list: [...updatedEvento]
      };
    }

    case UPDATE_EVENTO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_EVENTO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_EVENTO_SUCCESS: {
      const newList = state.list.filter((evento) => {
        return evento._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_EVENTO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default eventoReducer;
