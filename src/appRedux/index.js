import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'; 
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';


export const sagaMiddleware = createSagaMiddleware()

// connected-react-router history
export const history = createBrowserHistory()   


// create root reducer
const rootReducer =  createRootReducer(history);


// redux-persit 
// config redux persit
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}
const persistedReducer = persistReducer(persistConfig, rootReducer)



export default function configureStore(preloadedState){
    // use this to enable react-dev tool 
    const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

    const store = createStore(
        persistedReducer,   // persistedReducer
        preloadedState,
        composeSetup(
            applyMiddleware(
                sagaMiddleware,                  // saga middleware
                routerMiddleware(history),       // connected-react-router
            )
        )
    )

    let persistor = persistStore(store)
    console.log('redux-store', 'created')
    sagaMiddleware.run(rootSaga)    // run saga after store created
    return {store, persistor}
}