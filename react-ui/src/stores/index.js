import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './_reducers';

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);

export default store;

// import stateData from './initialState';
//
// import stores from './reducers';
//
// const logger = store => next => action => {
//     let result;
//     console.groupCollapsed("dispatching", action.type);
//     console.log('prev state', store.getState());
//     console.log('action', action)
//     result = next(action);
//     console.log('next state', store.getState());
//     console.groupEnd();
// };
// const saver = store => next => action => {
//     let result = next(action)
//     localStorage['redux-store'] = JSON.stringify(store.getState())
//     return result
// };
//
// const storeFactory = (initialState=stateData) =>
//     applyMiddleware(logger, saver)(createStore)(
//         combineReducers(stores),
//         (localStorage['redux-store']) ?
//             JSON.parse(localStorage['redux-store']) :
//             initialState
//     );
// export default storeFactory