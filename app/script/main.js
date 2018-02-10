/*
  Entry(Main)
 */

// polyfills(babel-polyfill is in webpack config)
import 'es6-promise';
import 'isomorphic-fetch';
import _ from 'lodash';

// custom polyfills
// ...

// inject index style
import 'StyleRoot/style.scss'; // generic styles(not module specific)


import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'

import AppRouter from './router/router'
import browser from 'browser-detect';

// render dom
const { name, versionNumber } = browser();
const browserVer = `${name}-${parseInt(versionNumber, 10)}`.toLowerCase();
document.body.classList.add(browserVer);

const render = Component => {

  ReactDOM.render(
    <AppContainer>
      {Component}
    </AppContainer>,
    document.getElementById('app-root')
  );

}

render(AppRouter);

// Webpack Hot Module Replacement API
if (module.hot) {

  module.hot.accept('./router/router', () => {

    render(AppRouter);

  });

}
