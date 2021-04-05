import { createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { compose } from 'redux';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer, compose(
  composeWithDevTools(applyMiddleware(thunk))
));