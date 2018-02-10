/**
 * Sidebar
 */

//  style
import 'StyleRoot/component/sidebar.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

// static
const SidebarEl = (props) => {

  const {
    title,
    abstract,
    credit,
    btnHandler,
    active,
  } = props;

  return (
    <aside className="sidebar">
      <div className="sidebar__inner">

        <div className="sidebar__top">
          <h3>{title}</h3>
          <a href="#" className="ui-btn close" data-type="close" onClick={btnHandler}>
            <i className="material-icons">close</i>
          </a>

          <span className="credit">{credit}</span>
        </div>

        <div className="sidebar__bottom">
          <p  dangerouslySetInnerHTML={{__html: abstract}}></p>
        </div>
      </div>

    </aside>
  );

}

class Sidebar extends Component {

  constructor(args) {

    super(args);

    this.state = {};

  }

  render() {

    return <SidebarEl {...this.props} btnHandler={this.btnHandler.bind(this)} />

  }

  shouldComponentUpdate(nextProps, nextState) {

    const shouldUpdate = nextProps.active !== this.props.active;

    return shouldUpdate;

  }

  btnHandler(e) {

    if (e.target.matches('.close') && typeof this.props.toggleSideBar === 'function') {

      e.preventDefault();

      // outer fn
      this.props.toggleSideBar.call(null, false);

    }

  }

}

Sidebar.propTypes = {
  title: PropTypes.string,
  abstract: PropTypes.string,
  credit:PropTypes.string,
  active: PropTypes.bool,
};

Sidebar.defaultProps = {
  title: 'Infinite scroll + react',
  abstract: 'This app demonstartes infinite-scrolling to load cards with fetching data.<br/><br/>You can remove each card by swiping to the left.',
  credit: 'ver 1.0.1',
  active: true,
};

export default Sidebar;
