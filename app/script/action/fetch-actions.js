// fetch polyfill
import fetch from 'isomorphic-fetch'

export const BEFORE_FETCH = 'fetch:error';
const beforeFecth = () => ({
  type: BEFORE_FETCH,
  isFetching: true,
});

export const FETCH_ERROR = 'fetch:error';
const fetchError = () => ({
  type: FETCH_ERROR,
  isFetching: false,
});

// HEADER
export const RECEIVE_HEADER = 'receive:header';
const receiveHeader = (header) => ({
  type: RECEIVE_HEADER,
  header,
  receivedAt: Date.now(),
});

export const FETCH_HEADER = 'fetch:header';
const fetchHeader = () => {

  return function (dispatch) {

    try{

      fetch('/asset/json/header.json', {method: 'get'})
      .then(response => response.json())
      .then((json) => {

        dispatch(receiveHeader(json));

      });

    }
    catch(e) {

      throw new Error('Error: ' + FETCH_HEADER);

    }

  }

}

// side bar
export const RECEIVE_SIDEBAR = 'receive:sidebar';
const receiveSidebar = (sidebar) => {

  return {

    type: RECEIVE_SIDEBAR,
    sidebar,
    receivedAt: Date.now(),

  }

}

export const FETCH_SIDEBAR = 'fetch:sidebar';
const fetchSidebar = () => {

  // thunk middleware
  return function (dispatch) {

    try {

      return fetch('/asset/json/sidebar.json', {method: 'get'})
      .then(response => response.json())
      .then((json) => {

        dispatch(receiveSidebar(json))

      });

    }
    catch (e) {

      throw new Error('Error: ' + FETCH_SIDEBAR);

    }

  }

}

// PAGES
export const RECEIVE_PAGES = 'receive:pages';
const receivePages = (pages) => ({
  type: RECEIVE_PAGES,
  pages,// json.data.children.map(child => child.data),
  receivedAt: Date.now(),
});

export const FETCH_PAGES = 'fetch:pages';
const fetchPages = () => {

  // thunk middleware
  return function (dispatch) {

    //  First dispatch: the app state is updated to inform
    //  that the API call is starting.

    //  dispatch(beforeFecth());

    //  The function called by the thunk middleware can return a value,
    //  that is passed on as the return value of the dispatch method.

    //  In this case, we return a promise to wait for.
    //  This is not required by thunk middleware, but it is convenient for us.
    try{

      return fetch('/asset/json/page.json', {method: 'get'})
      .then(response => response.json())
      .then((json) => {

        dispatch(receivePages(json))

      });

    }
    catch (e) {

      throw new Error('Error: ' + FETCH_PAGES);

    }

  }

}

// FOOTER
export const RECEIVE_FOOTER = 'receive:footer';
const receiveFooter = (footer) => ({
  type: RECEIVE_FOOTER,
  footer,
  receivedAt: Date.now(),
});

export const FETCH_FOOTER = 'fetch:footer';
const fetchFooter = () => {

  return function(dispatch) {

    try {

      fetch('/asset/json/footer.json', { method: 'get'})
      .then(response => response.json())
      .then((json) => {

        dispatch(receiveFooter(json));

      });

    }
    catch(e) {

      throw new Error('Error, ' + FETCH_FOOTER);

    }

  }

}

export {
  fetchHeader,
  fetchPages,
  fetchSidebar,
  fetchFooter,
};
