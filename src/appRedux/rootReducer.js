import { combineReducers } from 'redux';
import { connectRouter  } from 'connected-react-router';


// use redux-form to inject reducer into the global state
const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    // other reducer here
})

export default createRootReducer
