import { combineReducers } from 'redux';
import involvedReducer from './involved/reducer';
import locationReducer from './location/reducer';
import vehicleReducer from './vehicle/reducer';
import investigatorReducer from './investigator/reducer';
import siniestroReducer from './siniestro/reducer';
import relevadorReducer from './relevador/reducer';
import controladorReducer from './controlador/reducer';

const rootReducer = combineReducers({
  involved: involvedReducer,
  location: locationReducer,
  vehicle: vehicleReducer,
  siniestro: siniestroReducer,
  investigator: investigatorReducer,
  relevador: relevadorReducer,
  controlador: controladorReducer
});

export default rootReducer;
