/**
 * Reducers
 */

import { combineReducers } from 'redux';
import { routerReducer} from 'react-router-redux';

/* create reducer here and load right actions */

import {
  EVENT_SCROLL,
  EVENT_RESIZE,
  EVENT_BP_CHANGE,
  EVENT_TOGGLE_SIDEBAR,
} from '../action/event-actions';

// sidebar state
function isSideBarActive(state = false, action) {

  if (action.type === EVENT_TOGGLE_SIDEBAR) {

    return action.show;

  }

  return state;

}

function scrollVal(state = 0, action) {

  if (action.type === EVENT_SCROLL) {

    return action.scrollVal;

  }

  return state;

}

function windowSize(state = {w: 0, h: 0}, action) {

  if (action.type === EVENT_RESIZE) {

    return action.windowSize;

  }

  return state;

}


// combine reduders
export default {
  isSideBarActive,
  scrollVal,
  windowSize,
  routing: routerReducer,
};
