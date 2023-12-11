import {
  GET_LUGARROBORUEDA_PENDING,
  GET_LUGARROBORUEDA_SUCCESS,
  GET_LUGARROBORUEDA_ERROR,
  POST_LUGARROBORUEDA_PENDING,
  POST_LUGARROBORUEDA_SUCCESS,
  POST_LUGARROBORUEDA_ERROR,
  UPDATE_LUGARROBORUEDA_PENDING,
  UPDATE_LUGARROBORUEDA_SUCCESS,
  UPDATE_LUGARROBORUEDA_ERROR,
  DELETE_LUGARROBORUEDA_PENDING,
  DELETE_LUGARROBORUEDA_SUCCESS,
  DELETE_LUGARROBORUEDA_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const lugarRoboRuedaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LUGARROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_LUGARROBORUEDA_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_LUGARROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_LUGARROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_LUGARROBORUEDA_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_LUGARROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_LUGARROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_LUGARROBORUEDA_SUCCESS: {
      // const lugarRoboRuedaUpdated = action.payload;
      const updatedLugarRoboRueda = state.list.map((lugarRoboRueda) => {
        return lugarRoboRueda._id === action.payload._id
          ? { ...lugarRoboRueda, ...action.payload }
          : lugarRoboRueda;
      });
      return {
        ...state,
        list: [...updatedLugarRoboRueda]
      };
    }

    case UPDATE_LUGARROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_LUGARROBORUEDA_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_LUGARROBORUEDA_SUCCESS: {
      const newList = state.list.filter((lugarRoboRueda) => {
        return lugarRoboRueda._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_LUGARROBORUEDA_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default lugarRoboRuedaReducer;
