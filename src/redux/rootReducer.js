import { combineReducers } from 'redux';
import involvedReducer from './involved/reducer';

const rootReducer = combineReducers({
  involved: involvedReducer
});

export default rootReducer;
