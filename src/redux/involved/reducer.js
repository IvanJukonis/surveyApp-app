import {
  GET_INVOLVED_PENDING,
  GET_INVOLVED_SUCCESS,
  GET_INVOLVED_ERROR,
  ADD_INVOLVED_PENDING,
  ADD_INVOLVED_SUCCESS,
  ADD_INVOLVED_ERROR,
  EDIT_INVOLVED_PENDING,
  EDIT_INVOLVED_SUCCESS,
  EDIT_INVOLVED_ERROR,
  DELETE_INVOLVED_PENDING,
  DELETE_INVOLVED_SUCCESS,
  DELETE_INVOLVED_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const involvedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVOLVED_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_INVOLVED_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_INVOLVED_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_INVOLVED_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_INVOLVED_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_INVOLVED_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_INVOLVED_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_INVOLVED_SUCCESS: {
      // const involvedUpdated = action.payload;
      const editedInvolved = state.list.map((involved) => {
        return involved._id === action.payload._id ? { ...involved, ...action.payload } : involved;
      });
      return {
        ...state,
        list: [...editedInvolved]
      };
    }

    case EDIT_INVOLVED_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_INVOLVED_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_INVOLVED_SUCCESS: {
      const newList = state.list.filter((involved) => {
        return involved._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_INVOLVED_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default involvedReducer;
