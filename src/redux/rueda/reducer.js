import {
  GET_RUEDA_PENDING,
  GET_RUEDA_SUCCESS,
  GET_RUEDA_ERROR,
  GET_RUEDAS_PENDING,
  GET_RUEDAS_SUCCESS,
  GET_RUEDAS_ERROR,
  POST_RUEDA_PENDING,
  POST_RUEDA_SUCCESS,
  POST_RUEDA_ERROR,
  UPDATE_RUEDA_PENDING,
  UPDATE_RUEDA_SUCCESS,
  UPDATE_RUEDA_ERROR,
  DELETE_RUEDA_PENDING,
  DELETE_RUEDA_SUCCESS,
  DELETE_RUEDA_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  completeList: []
};

const ruedaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_RUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_RUEDA_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_RUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case GET_RUEDAS_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_RUEDAS_SUCCESS: {
      return {
        ...state,
        completeList: action.payload
      };
    }

    case GET_RUEDAS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_RUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_RUEDA_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_RUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_RUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_RUEDA_SUCCESS: {
      // const ruedaUpdated = action.payload;
      const updatedRueda = state.list.map((rueda) => {
        return rueda._id === action.payload._id ? { ...rueda, ...action.payload } : rueda;
      });
      return {
        ...state,
        list: [...updatedRueda]
      };
    }

    case UPDATE_RUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_RUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_RUEDA_SUCCESS: {
      const newList = state.list.filter((rueda) => {
        return rueda._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_RUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default ruedaReducer;
