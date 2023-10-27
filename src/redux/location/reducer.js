import {
  GET_LOCATION_PENDING,
  GET_LOCATION_SUCCESS,
  GET_LOCATION_ERROR,
  ADD_LOCATION_PENDING,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_ERROR,
  UPDATE_LOCATION_PENDING,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_ERROR,
  DELETE_LOCATION_PENDING,
  DELETE_LOCATION_SUCCESS,
  DELETE_LOCATION_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_LOCATION_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_LOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_LOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_LOCATION_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_LOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case UPDATE_LOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case UPDATE_LOCATION_SUCCESS: {
      // const locationUpdated = action.payload;
      const updatedLocation = state.list.map((location) => {
        return location._id === action.payload._id ? { ...location, ...action.payload } : location;
      });
      return {
        ...state,
        list: [...updatedLocation]
      };
    }

    case UPDATE_LOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_LOCATION_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_LOCATION_SUCCESS: {
      const newList = state.list.filter((location) => {
        return location._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_LOCATION_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default locationReducer;
