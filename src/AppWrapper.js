import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import './App.css';
import configureStore, { history } from './appRedux';
import App from './containers/MainApp'
import {LoadingView} from './components';


const {store, persistor} = configureStore()

function AppWrapper() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App/>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

export default AppWrapper;
