/**
 * Routes + Components to render
 *
 * @author min
 */

import React from 'react';
import { BrowserRouter, Router, Route, Redirect, Switch, Link } from 'react-router-dom';

// app data layer.
// This contains all "reducer" values + root component
import AppDataLayer from '../app-data-layer';

// test components
import Dummy from '../component/dummy.js';

/*
 v4 https://reacttraining.com/react-router/web/api/Route
*/

/**
 * Render function.
 * AppDataLayer has to pass its props to Component.
 *
 * @param  {[ReactComponent]} Component [Component to render with route]
 * @param  {[Array]} args               [Array that contains passed props, route]
 * @return {[type]}                     [description]
 */
const renderComponentWithRoute = (Component, ...args) => {

  const [props, route] = args;

  // redirect to work when / till homepage is ready
  if (route.match.path === '/') {

    // return <Redirect to="/demo/infinite-scroll/" />

  }

  // pass all the props from app data layer + route
  return (
    <AppDataLayer>
      <Component {...route} />
    </AppDataLayer>
  );

}


/**
 * Use each Route to render root.props.children. See root.js
 * Change this as per need
 * @param {[type]} props [description]
 */
const Routes = (props) => (

  <div>

    <Switch>

      <Route exact path='/' render={ renderComponentWithRoute.bind(null, Dummy, props) } />

    </Switch>

  </div>

);

export default Routes;
