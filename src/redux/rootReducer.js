import { combineReducers } from 'redux';
import involucradoReducer from './involucrado/reducer';
import lugarSiniestroReducer from './lugarSiniestro/reducer';
import lugarRoboRuedaReducer from './lugarRoboRueda/reducer';
import vehiculoReducer from './vehiculo/reducer';
import investigatorReducer from './investigator/reducer';
import siniestroReducer from './siniestro/reducer';
import relevadorReducer from './relevador/reducer';
import controladorReducer from './controlador/reducer';
import novedadReducer from './novedad/reducer';

const rootReducer = combineReducers({
  involucrado: involucradoReducer,
  lugarSiniestro: lugarSiniestroReducer,
  lugarRoboRueda: lugarRoboRuedaReducer,
  vehiculo: vehiculoReducer,
  siniestro: siniestroReducer,
  investigator: investigatorReducer,
  relevador: relevadorReducer,
  novedad: novedadReducer,
  controlador: controladorReducer
});

export default rootReducer;
