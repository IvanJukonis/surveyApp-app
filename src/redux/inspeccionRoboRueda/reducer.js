import {
  GET_INSPECCIONROBORUEDA_PENDING,
  GET_INSPECCIONROBORUEDA_SUCCESS,
  GET_INSPECCIONROBORUEDA_ERROR,
  POST_INSPECCIONROBORUEDA_PENDING,
  POST_INSPECCIONROBORUEDA_SUCCESS,
  POST_INSPECCIONROBORUEDA_ERROR,
  UPDATE_INSPECCIONROBORUEDA_PENDING,
  UPDATE_INSPECCIONROBORUEDA_SUCCESS,
  UPDATE_INSPECCIONROBORUEDA_ERROR,
  DELETE_INSPECCIONROBORUEDA_PENDING,
  DELETE_INSPECCIONROBORUEDA_SUCCESS,
  DELETE_INSPECCIONROBORUEDA_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const inspeccionRoboRuedaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INSPECCIONROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_INSPECCIONROBORUEDA_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_INSPECCIONROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_INSPECCIONROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_INSPECCIONROBORUEDA_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_INSPECCIONROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_INSPECCIONROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_INSPECCIONROBORUEDA_SUCCESS: {
      // const inspeccionRoboRuedaUpdated = action.payload;
      const updatedInspeccionRoboRueda = state.list.map((inspeccionRoboRueda) => {
        return inspeccionRoboRueda._id === action.payload._id
          ? { ...inspeccionRoboRueda, ...action.payload }
          : inspeccionRoboRueda;
      });
      return {
        ...state,
        list: [...updatedInspeccionRoboRueda]
      };
    }

    case UPDATE_INSPECCIONROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_INSPECCIONROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_INSPECCIONROBORUEDA_SUCCESS: {
      const newList = state.list.filter((inspeccionRoboRueda) => {
        return inspeccionRoboRueda._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_INSPECCIONROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default inspeccionRoboRuedaReducer;
