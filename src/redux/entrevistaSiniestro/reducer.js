import {
  GET_ENTREVISTASINIESTRO_PENDING,
  GET_ENTREVISTASINIESTRO_SUCCESS,
  GET_ENTREVISTASINIESTRO_ERROR,
  POST_ENTREVISTASINIESTRO_PENDING,
  POST_ENTREVISTASINIESTRO_SUCCESS,
  POST_ENTREVISTASINIESTRO_ERROR,
  UPDATE_ENTREVISTASINIESTRO_PENDING,
  UPDATE_ENTREVISTASINIESTRO_SUCCESS,
  UPDATE_ENTREVISTASINIESTRO_ERROR,
  DELETE_ENTREVISTASINIESTRO_PENDING,
  DELETE_ENTREVISTASINIESTRO_SUCCESS,
  DELETE_ENTREVISTASINIESTRO_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  createdEntrevista: []
};

const entrevistaSiniestroReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ENTREVISTASINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_ENTREVISTASINIESTRO_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        createdEntrevista: action.payload
      };
    }

    case GET_ENTREVISTASINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case POST_ENTREVISTASINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case POST_ENTREVISTASINIESTRO_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case POST_ENTREVISTASINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_ENTREVISTASINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_ENTREVISTASINIESTRO_SUCCESS: {
      const updatedInvolucrado = Object.values(state.list).map((involucrado) => {
        return involucrado._id === action.payload._id
          ? { ...involucrado, ...action.payload }
          : involucrado;
      });

      return {
        ...state,
        list: [...updatedInvolucrado]
      };
    }

    case UPDATE_ENTREVISTASINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_ENTREVISTASINIESTRO_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_ENTREVISTASINIESTRO_SUCCESS: {
      const newList = state.list.filter((entrevistaSiniestro) => {
        return entrevistaSiniestro._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_ENTREVISTASINIESTRO_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default entrevistaSiniestroReducer;
