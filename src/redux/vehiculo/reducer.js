import {
  GET_VEHICULO_PENDING,
  GET_VEHICULO_SUCCESS,
  GET_VEHICULO_ERROR,
  POST_VEHICULO_PENDING,
  POST_VEHICULO_SUCCESS,
  POST_VEHICULO_ERROR,
  UPDATE_VEHICULO_PENDING,
  UPDATE_VEHICULO_SUCCESS,
  UPDATE_VEHICULO_ERROR,
  DELETE_VEHICULO_PENDING,
  DELETE_VEHICULO_SUCCESS,
  DELETE_VEHICULO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const vehiculoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VEHICULO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_VEHICULO_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_VEHICULO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_VEHICULO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_VEHICULO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_VEHICULO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_VEHICULO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_VEHICULO_SUCCESS: {
      const updatedVehiculo = state.list.map((vehiculo) => {
        return vehiculo._id === action.payload._id ? { ...vehiculo, ...action.payload } : vehiculo;
      });
      return {
        ...state,
        list: [...updatedVehiculo]
      };
    }

    case UPDATE_VEHICULO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_VEHICULO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_VEHICULO_SUCCESS: {
      const newList = state.list.filter((vehiculo) => {
        return vehiculo._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_VEHICULO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default vehiculoReducer;
