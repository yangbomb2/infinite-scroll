/**
 * Cards
 */

//  style
import 'StyleRoot/component/cards.scss';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import velocity from 'velocity-animate';
import VelocityUI from 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup } from 'velocity-react';

// component
import Card from './card';

// iterator
const createCard = (card, removeCard) => {

  return (
    <Card {...card}
      key={`card-${card.mId}`}
      removeCard={removeCard}/>
  );

}

// static
const CardsEl = (props) => {

  const cards = props.cards.map(card => createCard.apply(null, [card, props.removeCard]));

  return (
    <ul className="cards">

      {/* each percent in/out */}
      <VelocityTransitionGroup
        className="t-wrapper"
        runOnMount={true}
        enter={{animation: 'transition.slideRightIn', duration: 500, stagger: 100}}
        leave={{animation: 'transition.slideRightOut', duration: 500}}>

        { cards }

      </VelocityTransitionGroup>
    </ul>
  );

}

// default state
const getDefaultState = () => ({
  cards: [],
});

class Cards extends Component {

  constructor(args) {

    super(args);

    this.state = getDefaultState();

  }

  render() {

    const { cards } = this.state;
    const { rect, removeCard } = this.props;

    const props = {
      cards,
      rect,
      removeCard,
    };

    return <CardsEl {...props}/>;

  }

  componentWillReceiveProps(newProps) {

    if (this.state.cards !== newProps.cards) {

      this.setState({
        cards: newProps.cards,
      });

    }

  }

}

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
};

Cards.defaultProps = {
  cards: [],
};

export default Cards;
