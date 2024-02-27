import {
  GET_CONSULTOR_PENDING,
  GET_CONSULTOR_SUCCESS,
  GET_CONSULTOR_ERROR,
  POST_CONSULTOR_PENDING,
  POST_CONSULTOR_SUCCESS,
  POST_CONSULTOR_ERROR,
  UPDATE_CONSULTOR_PENDING,
  UPDATE_CONSULTOR_SUCCESS,
  UPDATE_CONSULTOR_ERROR,
  DELETE_CONSULTOR_PENDING,
  DELETE_CONSULTOR_SUCCESS,
  DELETE_CONSULTOR_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const consultorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONSULTOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_CONSULTOR_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_CONSULTOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_CONSULTOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_CONSULTOR_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_CONSULTOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_CONSULTOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_CONSULTOR_SUCCESS: {
      // const consultorUpdated = action.payload;
      const updatedConsultor = state.list.map((consultor) => {
        return consultor._id === action.payload._id
          ? { ...consultor, ...action.payload }
          : consultor;
      });
      return {
        ...state,
        list: [...updatedConsultor]
      };
    }

    case UPDATE_CONSULTOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_CONSULTOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_CONSULTOR_SUCCESS: {
      const newList = state.list.filter((consultor) => {
        return consultor._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_CONSULTOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default consultorReducer;
