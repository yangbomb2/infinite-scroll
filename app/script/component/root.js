/**
 * Root component
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import style from 'StyleRoot/component/root.scss';

import { NavLink } from 'react-router-dom'

// default state
const defaultState = () => ({
  isLoading: false,
  loadCount: 0,
  messages: [],
  removalStack: [],
});

// components
import Header from './header';
import Sidebar from './sidebar';
import Cards from './cards';

// dependencies
import { eventActions } from '../action';
import _ from 'lodash';

class Root extends Component {

  constructor(args) {

    super(args);

    this.state = defaultState();

  }

  render() {

    const {
      children,
      location,
      isSideBarActive,
      scrollVal,
      windowSize,
      onScroll,
    } = this.props;

    const {
      removalStack,
      messages,
      isLoading,
    } = this.state;

    const className = `root ${isSideBarActive ? 'sidebar-open' : 'sidebar-close'} ${isLoading ? 'loading' : ''}`;

    // not using for now //
    // const pageChildren = React.cloneElement(children,  {
    //   ...this.props,
    //   key: location.pathname,
    // });

    return (

      <div className={className} onScroll={_.throttle(this.scrollHandler.bind(this), 50)}>

        { /* header */}
        <Header
          scrollVal={scrollVal}
          isSideBarActive={isSideBarActive}
          removalStack={removalStack}
          toggleSideBar={this.toggleSideBar.bind(this)}
          undoRemoval={this.undoRemoval.bind(this)}/>

        {/* cards*/}
        <Cards
          cards={messages}
          removeCard={this.removeCard.bind(this)} />

        { /* side bar*/}
        <Sidebar
          active={isSideBarActive}
          toggleSideBar={this.toggleSideBar.bind(this)}/>

      </div>
    );

  }

  componentDidMount() {

    this.el = ReactDOM.findDOMNode(this);

    window.addEventListener('resize', _.debounce(this.resize.bind(this), 200), false);

    // after the initial load, show side bar in the beginning
    this.loadMore(() => {

      setTimeout(() => {

        this.context.store.dispatch(eventActions.toggleSideBar(true));

      }, 1000);

    });

  }

  componentDidUpdate(prevProps, prevState) {

    // when scroll top value changes
    if (prevProps.scrollVal !== this.props.scrollVal) {

      // check load more
      this.loadMore();

    }

  }

  toggleSideBar(show) {

    this.context.store.dispatch(eventActions.toggleSideBar(show));

  }

  removeCard(card) {

    const { messages, removalStack } = this.state;

    const copy = messages.slice(0);
    const index = copy.findIndex(c => c.mId === card.props.mId);

    const removed = Object.assign({}, card.props, { prevIndex : index });

    copy.splice(index, 1);
    removalStack.push(removed);

    this.setState({
      messages: copy,
      removalStack: removalStack,
    }, () => {

      // check load more
      this.loadMore();

    });

  }

  undoRemoval() {

    const { removalStack, messages } = this.state;

    const newStack = removalStack.slice(0);
    const last = newStack.pop();
    const insertIndex = last.prevIndex || 0;

    messages.splice(insertIndex, 0, last);

    this.setState({
      messages: messages,
      removalStack: newStack,
    });

  }

  loadMore(cb) {

    const isLoadmore = this.checkLoadMore();

    if(!isLoadmore) return;

    this.setState({
      isLoading: true,
    });

    const url = `${this.props.api}/messages`;

    return this.fetchData(url, this.prevProps ?  this.prevProps.pageToken : null)
      .then(data => {

        // mutate data
        data.messages.forEach((m,i) => {

          if (m.author.photoUrl.indexOf('http') === -1) m.author.photoUrl = `${this.props.api}/${m.author.photoUrl}`;
          m.mId = this.state.messages.length + this.state.removalStack.length + i;

        });

        // little delay call
        clearTimeout(this.dataFetchDelay);
        this.dataFetchDelay = setTimeout(() => {

          this.setState({
            messages: this.state.messages.concat(data.messages),
            isLoading: false,
            loadCount: this.state.loadCount + 1,
          }, () => {

            if (typeof cb === 'function') {

              cb();

            }

          });

        }, 500);

        return this;

      });

  }

  // condition for load more
  checkLoadMore() {

    const totalCardHeight = this.el.querySelector('.cards').offsetTop + this.el.querySelector('.cards').offsetHeight;
    const isScrollHitTheBottom = this.el.scrollTop === totalCardHeight - window.innerHeight;
    const needMoreCard = this.state.messages.length < 2;

    return isScrollHitTheBottom || needMoreCard;

  }

  // promise fetch
  fetchData(url, pageToken) {

    // append query string(pageToken) to url
    if (pageToken) url += `?pageToken=${pageToken}`;

    return fetch(url, {
      method: 'GET',
      cache: 'no-cache',
    })
      .then(res => res.json(res))
      .then(json => json);

  }

  // global resize value
  resize(e) {

    this.scrollHandler();

    this.context.store.dispatch(eventActions.resize({
      w: window.innerWidth,
      h: window.innerHeight,
    }));

  }

  // global scroll value
  scrollHandler(e) {

    this.context.store.dispatch(eventActions.scroll(this.el.scrollTop));

  }

}

Root.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object,
}

Root.propTypes = {
  api: PropTypes.string.isRequired,
  scrollVal: PropTypes.number.isRequired,
  windowSize: PropTypes.object.isRequired,
};

Root.defaultProps = {
  api: 'http://message-list.appspot.com',
  scrollVal:0,
  windowSize: {
    w: window.innerWidth,
    h: window.innerHeight,
  },
};

export default Root;
