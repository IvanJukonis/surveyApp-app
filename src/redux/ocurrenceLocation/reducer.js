import {
  GET_OCURRENCELOCATION_PENDING,
  GET_OCURRENCELOCATION_SUCCESS,
  GET_OCURRENCELOCATION_ERROR,
  ADD_OCURRENCELOCATION_PENDING,
  ADD_OCURRENCELOCATION_SUCCESS,
  ADD_OCURRENCELOCATION_ERROR,
  EDIT_OCURRENCELOCATION_PENDING,
  EDIT_OCURRENCELOCATION_SUCCESS,
  EDIT_OCURRENCELOCATION_ERROR,
  DELETE_OCURRENCELOCATION_PENDING,
  DELETE_OCURRENCELOCATION_SUCCESS,
  DELETE_OCURRENCELOCATION_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const ocurrenceLocationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_OCURRENCELOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_OCURRENCELOCATION_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_OCURRENCELOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_OCURRENCELOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_OCURRENCELOCATION_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_OCURRENCELOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_OCURRENCELOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_OCURRENCELOCATION_SUCCESS: {
      // const ocurrenceLocationUpdated = action.payload;
      const editedOcurrenceLocation = state.list.map((ocurrenceLocation) => {
        return ocurrenceLocation._id === action.payload._id
          ? { ...ocurrenceLocation, ...action.payload }
          : ocurrenceLocation;
      });
      return {
        ...state,
        list: [...editedOcurrenceLocation]
      };
    }

    case EDIT_OCURRENCELOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_OCURRENCELOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_OCURRENCELOCATION_SUCCESS: {
      const newList = state.list.filter((ocurrenceLocation) => {
        return ocurrenceLocation._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_OCURRENCELOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default ocurrenceLocationReducer;
