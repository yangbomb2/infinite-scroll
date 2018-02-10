/**
 * Header
 */

//  style
import 'StyleRoot/component/header.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

// util fn
const createRemovalCard = (card, i, btnHandler, cards) => {

  if (!card) return;

  const style = {
    transform: `translateX(${-5 * i}px) translateY(${5 * i}px)`,
  };

  const className = `removal-card ${i === cards.length - 1 ? 'lastest' : ''}`;
  const text = card.content.substr(0,20).concat('...');

  return (
    <div className={className} key={`removal-card-${i}`} style={style}>

      <span>{text}</span>

      <a href="#" className="ui-btn undo" data-type="undo" onClick={btnHandler}>
        <i className="material-icons">undo</i>
      </a>
    </div>
  );

}

// static
const HeaderEl = (props) => {

  let { btnHandler, mode, showTool, removalStack } = props;

  let className = 'header';

  if (mode === 'sm') className += ' header--sm';

  if (removalStack.length) className += ' header--show-tool';

  // TODO
  // if length is bigger 3, show the latest with "group"
  if (removalStack.length > 3) removalStack = removalStack.slice(removalStack.length - 3);

  return (

    <header className={className}>

      <div className="header__status-bar">

        <div className="icons">

          <a href="#" className="ui-btn" data-type="wifi">
            <i className="material-icons">network_wifi</i>
          </a>

          <a href="#" className="ui-btn" data-type="cell">
            <i className="material-icons">network_cell</i>
          </a>

          <a href="#" className="ui-btn" data-type="battery">
            <i className="material-icons">battery_std</i>
          </a>

          <span className="time"></span>

        </div>

      </div>

      <nav className="header__nav">

        <a href="#" className="ui-btn hamburger" id="hamburger" data-type="hamburger" onClick={btnHandler}>
          <span className="bar"></span>
        </a>

        <h2>Infinite scroll react</h2>

      </nav>

      {
        /* removal && undo */
      }
      <div className="header__nav-tool">

        <CSSTransitionGroup
          transitionName={'removal'}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>

          { removalStack.map((card,i) => createRemovalCard(card,i, btnHandler, removalStack)) }

        </CSSTransitionGroup>
      </div>

    </header>
  )

}

// default state
const getDefaultState = () => ({
  removalStack: [],
  tick: 0,
  mode: 'lg',
});

// functional
class Header extends Component {

  constructor(props) {

    super(props);

    this.state = getDefaultState();

  }

  render(){

    const {
      mode,
      removalStack,
    } = this.state;

    return (
      <HeaderEl
        mode={mode}
        removalStack={removalStack}
        btnHandler={this.btnHandler.bind(this)}/>
    )

  }

  shouldComponentUpdate(nextProps, nextState) {

    const shouldUpdate = nextState.removalStack ||
    nextProps.isSideBarActive !== this.props.isSideBarActive ||
    nextState.mode !== this.state.mode;

    return shouldUpdate;

  }

  componentWillMount() {}

  componentDidMount() {

    this.el = ReactDOM.findDOMNode(this);

    // set currnt time
    this.ticker = setInterval(this.tick.bind(this), 999);

  }

  componentWillUnmount() {

    clearInterval(this.ticker);

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.removalStack !== this.state.removalStack) {

      this.setState({
        removalStack: nextProps.removalStack,
      });

    }

    if(nextProps.scrollVal !== this.props.scrollVal) {

      // mode(size) based on global scroll val
      this.setState({
        mode: nextProps.scrollVal >= 39 ? 'sm' : 'lg',
      });

    }

  }

  btnHandler(e) {

    const {
      isSideBarActive,
      toggleSideBar,
      undoRemoval,
    } = this.props;

    // hamburger
    if (e.target.matches('.hamburger')) {

      e.preventDefault();

      // outer fn
      if (typeof toggleSideBar === 'function') toggleSideBar.call(null, !isSideBarActive);

    } else if (e.target.matches('.undo')) {

      e.preventDefault();

      // outer fn
      if (typeof undoRemoval === 'function') undoRemoval.call(null);

    }

  }

  tick() {

    const tUnit = 12;

    let d = new Date();
    let h  = d.getHours();
    let m  = d.getMinutes();

    // convert hour
    if (h % tUnit !==0) {

      h = h % tUnit;

    } else if (h === 0) {

      h = tUnit;

    }

    // minute
    if (m < 10) m = '0' + m;

    // set current time
    this.el.getElementsByClassName('time')[0].textContent = `${h}:${m}`;

  }

}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
