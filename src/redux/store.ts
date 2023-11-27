import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
const middleware = [];

const sagaMiddleware = createSagaMiddleware();

middleware.push(sagaMiddleware);

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

sagaMiddleware.run(rootSaga);
