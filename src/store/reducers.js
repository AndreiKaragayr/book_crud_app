import { combineReducers } from 'redux';
import { AuthorsReducer } from './authors/reducer';
import { BooksReducer } from './books/reducer';

export const rootReducer = combineReducers({
  authors : AuthorsReducer,
  books : BooksReducer,
});