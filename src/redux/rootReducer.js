import { combineReducers } from 'redux';
import involvedReducer from './involucrado/reducer';
import locationReducer from './lugarSiniestro/reducer';
import vehicleReducer from './vehiculo/reducer';
import investigatorReducer from './investigator/reducer';
import siniestroReducer from './siniestro/reducer';
import relevadorReducer from './relevador/reducer';
import controladorReducer from './controlador/reducer';
import novedadReducer from './novedad/reducer';

const rootReducer = combineReducers({
  involved: involvedReducer,
  location: locationReducer,
  vehicle: vehicleReducer,
  siniestro: siniestroReducer,
  investigator: investigatorReducer,
  relevador: relevadorReducer,
  novedad: novedadReducer,
  controlador: controladorReducer
});

export default rootReducer;
