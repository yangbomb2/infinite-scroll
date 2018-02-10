/*
  React Router + Store

  @author min

 */
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

// data layer
import store, { history } from '../store/store';

// routes
import Routes from './routes';

// connected router doesn't suppor basename. set in history
// https://github.com/ReactTraining/react-router/issues/4801

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux
const AppRouter = (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes/>
    </ConnectedRouter>
  </Provider>
);

/*
 */
export default AppRouter;
