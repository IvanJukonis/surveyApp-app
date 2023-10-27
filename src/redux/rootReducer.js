import { combineReducers } from 'redux';
import involvedReducer from './involved/reducer';
import locationReducer from './location/reducer';
import vehicleReducer from './vehicle/reducer';

const rootReducer = combineReducers({
  involved: involvedReducer,
  location: locationReducer,
  vehicle: vehicleReducer
});

export default rootReducer;
