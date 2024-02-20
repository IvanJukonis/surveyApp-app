import {
  GET_ADMINISTRATIVOISTRATIVOS_PENDING,
  GET_ADMINISTRATIVOISTRATIVOS_SUCCESS,
  GET_ADMINISTRATIVOISTRATIVOS_ERROR,
  ADD_ADMINISTRATIVO_PENDING,
  ADD_ADMINISTRATIVO_SUCCESS,
  ADD_ADMINISTRATIVO_ERROR,
  EDIT_ADMINISTRATIVO_PENDING,
  EDIT_ADMINISTRATIVO_SUCCESS,
  EDIT_ADMINISTRATIVO_ERROR,
  DELETE_ADMINISTRATIVO_PENDING,
  DELETE_ADMINISTRATIVO_SUCCESS,
  DELETE_ADMINISTRATIVO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const administrativoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINISTRATIVOISTRATIVOS_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_ADMINISTRATIVOISTRATIVOS_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_ADMINISTRATIVOISTRATIVOS_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_ADMINISTRATIVO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_ADMINISTRATIVO_SUCCESS: {
      const editedAdministrativos = state.list.map((administrativo) => {
        return administrativo._id === action.payload._id
          ? { ...administrativo, ...action.payload }
          : administrativo;
      });
      return {
        ...state,
        list: [...editedAdministrativos]
      };
    }

    case EDIT_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_ADMINISTRATIVO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_ADMINISTRATIVO_SUCCESS: {
      const newList = state.list.filter((administrativo) => {
        return administrativo._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_ADMINISTRATIVO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default administrativoReducer;
