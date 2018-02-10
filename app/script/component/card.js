/**
 * Card
 */

//  style
import 'StyleRoot/component/cards.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

// other dependencies
import ta from 'time-ago';
import Hammer from 'hammerjs';

// static
const CardEl = (props) => {

  const {
    author,
    updated,
    content,
    visibilty,
    tempRemoved,
    onClickHandler,
    mId,
    id,
  } = props;

  const ago = ta.ago(updated);
  const className = `card ${visibilty === 0 ? 'out' : ''} ${tempRemoved ? 'temp-removed' : ''}`;

  return (
    <li className={className} onClick={onClickHandler}>

      <div className="card__inner">
        <figure className="card__img">
          <img src={author.photoUrl}/>
        </figure>

        <div className="card__meta">
          <h4 className="card__title">{author.name}</h4>
          <span className="card__subtitle">{ago}</span>
        </div>

        <p className="card__desc">{content}</p>
      </div>

      <div className="ui-wrapper">
        <a className="card__redo js-redo">
          <i className="material-icons">redo</i>
        </a>
        <a className="card__remove js-remove">
          <i className="material-icons">delete</i>
        </a>
      </div>

    </li>
  );

}

// default state
const getDefaultState = () => ({
  visibilty : 1,
  tempRemoved: false,
  prevIndex: -1,
});

class Card extends Component {

  constructor(args) {

    super(args);

    this.state = getDefaultState();

  }

  render() {

    const props = Object.assign({}, this.props, this.state);

    return <CardEl {...props} onClickHandler={this.onClickHandler.bind(this)}/>

  }

  componentDidMount() {

    this.el = ReactDOM.findDOMNode(this);

    // events
    const h = new Hammer(this.el, {});
    h.get('swipe').set({
      threshold: 10,
    });

    h.on('swiperight swipeleft', this.gestureHandler.bind(this));

    this.reset().resetOverlay();

    return this;

  }

  componentWillReceiveProps(newProps) {

    if (this.el) this.setVisibility(newProps);

  }

  componentDidUpdate(prevProps, prevState) {}

  onClickHandler(e) {

    if (e.target.matches('.js-remove')) {

      if(typeof this.props.removeCard === 'function') {

        e.preventDefault();

        this.props.removeCard.call(null, this);

      }

    }

    if (e.target.matches('.js-redo')) {

      e.preventDefault();

      this.setState({
        tempRemoved: false,
      });

    }

  }

  gestureHandler(e) {

    switch(e.type) {

    case 'panright':

      const distX = parseInt(e.deltaX);
      const percent = distX/this.el.offsetWidth;

      let tx = 0;// [0-85]

      if (isFinite(percent) && percent <= .8) {

        tx = parseInt(percent * 100);

        this.setState({
          tx: tx,
          percent: percent,
        });

      } else {

        e.preventDefault();

      }

      break;

    case 'swiperight':
    case 'swipeleft':

      // remove self -> calling parent funciton
      // direction 4(right) => temp remove
      // direction 2(left) => default
      this.setState({
        tempRemoved: e.direction === 4,
      });

      break;

    case 'panstart':

      this.el.classList.add('pan--ing');

      break;

    case 'panend':

      this.el.classList.remove('pan--ing');

      if (!this.state.tempRemoved) this.reset().resetOverlay();

      break;
    }

  }

  reset() {

    this.setState(getDefaultState());

    return this;

  }

  resetOverlay() {

    this.setState({
      percent: 0,
    });

    return this;

  }

  // update visibiliy(in view)
  // TODO
  setVisibility() {

    // little delay is good
    clearTimeout(this.t);

    this.t = setTimeout(() => {

      const h = window.innerHeight;
      const { top, bottom } = this.el.getBoundingClientRect();
      // this.setState({
      //   visibilty: (top < h && top > 0) ? 1 : 0,
      // });

    }, 150);

  }

}

Card.propTypes = {
  rect: PropTypes.object,
};
Card.defaultProps = {};

export default Card;
