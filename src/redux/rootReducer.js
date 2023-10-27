import { combineReducers } from 'redux';
import involvedReducer from './involved/reducer';
import locationReducer from './location/reducer';
import vehicleReducer from './vehicle/reducer';
import investigatorReducer from './investigator/reducer';

const rootReducer = combineReducers({
  involved: involvedReducer,
  location: locationReducer,
  vehicle: vehicleReducer,
  investigator: investigatorReducer
});

export default rootReducer;
