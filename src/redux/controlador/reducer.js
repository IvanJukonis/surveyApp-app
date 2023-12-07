import {
  GET_CONTROLADOR_PENDING,
  GET_CONTROLADOR_SUCCESS,
  GET_CONTROLADOR_ERROR,
  POST_CONTROLADOR_PENDING,
  POST_CONTROLADOR_SUCCESS,
  POST_CONTROLADOR_ERROR,
  UPDATE_CONTROLADOR_PENDING,
  UPDATE_CONTROLADOR_SUCCESS,
  UPDATE_CONTROLADOR_ERROR,
  DELETE_CONTROLADOR_PENDING,
  DELETE_CONTROLADOR_SUCCESS,
  DELETE_CONTROLADOR_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const controladorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONTROLADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_CONTROLADOR_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_CONTROLADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_CONTROLADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_CONTROLADOR_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_CONTROLADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_CONTROLADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_CONTROLADOR_SUCCESS: {
      // const controladorUpdated = action.payload;
      const updatedControlador = state.list.map((controlador) => {
        return controlador._id === action.payload._id
          ? { ...controlador, ...action.payload }
          : controlador;
      });
      return {
        ...state,
        list: [...updatedControlador]
      };
    }

    case UPDATE_CONTROLADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_CONTROLADOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_CONTROLADOR_SUCCESS: {
      const newList = state.list.filter((controlador) => {
        return controlador._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_CONTROLADOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default controladorReducer;
