import {
  GET_INVESTIGATOR_PENDING,
  GET_INVESTIGATOR_SUCCESS,
  GET_INVESTIGATOR_ERROR,
  ADD_INVESTIGATOR_PENDING,
  ADD_INVESTIGATOR_SUCCESS,
  ADD_INVESTIGATOR_ERROR,
  EDIT_INVESTIGATOR_PENDING,
  EDIT_INVESTIGATOR_SUCCESS,
  EDIT_INVESTIGATOR_ERROR,
  DELETE_INVESTIGATOR_PENDING,
  DELETE_INVESTIGATOR_SUCCESS,
  DELETE_INVESTIGATOR_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const investigatorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_INVESTIGATOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_INVESTIGATOR_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_INVESTIGATOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_INVESTIGATOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_INVESTIGATOR_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_INVESTIGATOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_INVESTIGATOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_INVESTIGATOR_SUCCESS: {
      const editedInvestigator = state.list.map((investigator) => {
        return investigator._id === action.payload._id
          ? { ...investigator, ...action.payload }
          : investigator;
      });
      return {
        ...state,
        list: [...editedInvestigator]
      };
    }

    case EDIT_INVESTIGATOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_INVESTIGATOR_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_INVESTIGATOR_SUCCESS: {
      const newList = state.list.filter((investigator) => {
        return investigator._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_INVESTIGATOR_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default investigatorReducer;
