import {createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import tasksReducer from './tasksReducer';
const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer=combineReducers({
    tasks:tasksReducer, 
});


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store; 