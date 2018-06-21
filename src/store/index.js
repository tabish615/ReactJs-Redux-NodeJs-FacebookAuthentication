import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducer/authreducer';
import logger from 'redux-logger';

function configureStore(){
    return createStore(authReducer, {}, applyMiddleware(thunk, logger));
}

const store = configureStore();
export default store;
