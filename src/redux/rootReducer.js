import { combineReducers } from 'redux';
import involvedReducer from './involved/reducer';
import ocurrenceLocationReducer from './ocurrenceLocation/reducer';
import vehicleReducer from './vehicle/reducer';

const rootReducer = combineReducers({
  involved: involvedReducer,
  ocurrenceLocation: ocurrenceLocationReducer,
  vehicle: vehicleReducer
});

export default rootReducer;
