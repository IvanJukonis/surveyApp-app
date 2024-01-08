import {
  GET_ENTREVISTAROBORUEDA_PENDING,
  GET_ENTREVISTAROBORUEDA_SUCCESS,
  GET_ENTREVISTAROBORUEDA_ERROR,
  POST_ENTREVISTAROBORUEDA_PENDING,
  POST_ENTREVISTAROBORUEDA_SUCCESS,
  POST_ENTREVISTAROBORUEDA_ERROR,
  UPDATE_ENTREVISTAROBORUEDA_PENDING,
  UPDATE_ENTREVISTAROBORUEDA_SUCCESS,
  UPDATE_ENTREVISTAROBORUEDA_ERROR,
  DELETE_ENTREVISTAROBORUEDA_PENDING,
  DELETE_ENTREVISTAROBORUEDA_SUCCESS,
  DELETE_ENTREVISTAROBORUEDA_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const entrevistaRoboRuedaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTREVISTAROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_ENTREVISTAROBORUEDA_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_ENTREVISTAROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_ENTREVISTAROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_ENTREVISTAROBORUEDA_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_ENTREVISTAROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_ENTREVISTAROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_ENTREVISTAROBORUEDA_SUCCESS: {
      // const entrevistaRoboRuedaUpdated = action.payload;
      const updatedEntrevistaRoboRueda = state.list.map((entrevistaRoboRueda) => {
        return entrevistaRoboRueda._id === action.payload._id
          ? { ...entrevistaRoboRueda, ...action.payload }
          : entrevistaRoboRueda;
      });
      return {
        ...state,
        list: [...updatedEntrevistaRoboRueda]
      };
    }

    case UPDATE_ENTREVISTAROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_ENTREVISTAROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_ENTREVISTAROBORUEDA_SUCCESS: {
      const newList = state.list.filter((entrevistaRoboRueda) => {
        return entrevistaRoboRueda._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_ENTREVISTAROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default entrevistaRoboRuedaReducer;
