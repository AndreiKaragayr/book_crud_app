import { combineReducers } from 'redux';
import { UsersReducer } from './users/reducer';

export const rootReducer = combineReducers({
  users : UsersReducer,
});