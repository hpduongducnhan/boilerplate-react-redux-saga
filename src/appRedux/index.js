import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';


export const sagaMiddleware = createSagaMiddleware()

// connected-react-router history
export const history = createBrowserHistory()   


export default function configureStore(preloadedState){
    // use this to enable react-dev tool 
    const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeSetup(
            applyMiddleware(
                sagaMiddleware,                  // saga middleware
                routerMiddleware(history),       // connected-react-router
            )
        )
    )
    console.log('redux-store', 'created')
    sagaMiddleware.run(rootSaga)    // run saga after store created
    return store
}