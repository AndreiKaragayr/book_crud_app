import { combineReducers } from 'redux';
import { AuthorsReducer } from './authors/reducer';

export const rootReducer = combineReducers({
  authors : AuthorsReducer,
});