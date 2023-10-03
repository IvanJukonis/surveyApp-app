import {
  GET_VEHICLE_PENDING,
  GET_VEHICLE_SUCCESS,
  GET_VEHICLE_ERROR,
  ADD_VEHICLE_PENDING,
  ADD_VEHICLE_SUCCESS,
  ADD_VEHICLE_ERROR,
  EDIT_VEHICLE_PENDING,
  EDIT_VEHICLE_SUCCESS,
  EDIT_VEHICLE_ERROR,
  DELETE_VEHICLE_PENDING,
  DELETE_VEHICLE_SUCCESS,
  DELETE_VEHICLE_ERROR
} from './constants';

const INITIAL_STATE = {
  list: []
};

const vehicleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_VEHICLE_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case GET_VEHICLE_SUCCESS: {
      return {
        ...state,
        list: action.payload
      };
    }

    case GET_VEHICLE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case ADD_VEHICLE_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case ADD_VEHICLE_SUCCESS: {
      return {
        ...state,
        list: [...state.list, action.payload]
      };
    }

    case ADD_VEHICLE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case EDIT_VEHICLE_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case EDIT_VEHICLE_SUCCESS: {
      // const vehicleUpdated = action.payload;
      const editedVehicle = state.list.map((vehicle) => {
        return vehicle._id === action.payload._id ? { ...vehicle, ...action.payload } : vehicle;
      });
      return {
        ...state,
        list: [...editedVehicle]
      };
    }

    case EDIT_VEHICLE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    case DELETE_VEHICLE_PENDING: {
      return {
        ...state,
        pending: action.payload
      };
    }

    case DELETE_VEHICLE_SUCCESS: {
      const newList = state.list.filter((vehicle) => {
        return vehicle._id !== action.payload;
      });
      return {
        list: [...newList]
      };
    }

    case DELETE_VEHICLE_ERROR: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default vehicleReducer;
