import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import configureStore, { history } from './appRedux';
import App from './containers/App'


const store = configureStore()

function AppWrapper() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <>
          <Switch>
            <Route path="/" component={App}/>
          </Switch>
          </>
      </ConnectedRouter>
    </Provider>
  )
}

export default AppWrapper;
