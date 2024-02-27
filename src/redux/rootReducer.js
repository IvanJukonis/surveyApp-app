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
import entrevistaRoboRuedaReducer from './entrevistaRoboRueda/reducer';
import entrevistaSiniestroReducer from './entrevistaSiniestro/reducer';
import inspeccionRoboRuedaReducer from './inspeccionRoboRueda/reducer';
import inspeccionSiniestroReducer from './inspeccionSiniestro/reducer';
import administrativoReducer from './administrativo/reducer';
import ruedaReducer from './rueda/reducer';
import eventoReducer from './evento/reducer';
import consultorReducer from './consultor/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  involucrado: involucradoReducer,
  lugarSiniestro: lugarSiniestroReducer,
  lugarRoboRueda: lugarRoboRuedaReducer,
  vehiculo: vehiculoReducer,
  siniestro: siniestroReducer,
  investigator: investigatorReducer,
  relevador: relevadorReducer,
  administrativo: administrativoReducer,
  novedad: novedadReducer,
  controlador: controladorReducer,
  consultor: consultorReducer,
  entrevistaSiniestro: entrevistaSiniestroReducer,
  entrevistaRoboRueda: entrevistaRoboRuedaReducer,
  inspeccionSiniestro: inspeccionSiniestroReducer,
  inspeccionRoboRueda: inspeccionRoboRuedaReducer,
  rueda: ruedaReducer,
  evento: eventoReducer,
  auth: authReducer
});

export default rootReducer;
