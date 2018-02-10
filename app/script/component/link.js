/*
  Link

  @this react component is used for initial jest testing
 */

import React, {Component} from 'react';

const STATUS = {
  NORMAL: 'normal',
  HOVERED: 'hovered',
};

class Link extends Component {

  constructor(arg) {

    super(arg);

    // this.state = Object.assign(this.prop, {
    //   class: STATUS.NORMAL
    // });
    this.state = {class: STATUS.NORMAL};

  }

  render() {

    return (
      <a
        className={this.state.class}
        href={this.props.url || '#'}
        onMouseEnter={this._onMouseEnter.bind(this)}
        onMouseLeave={this._onMouseLeave.bind(this)}>

        { this.props.children }

      </a>

    );

  }

  _onMouseEnter(e) {

    this.setState({class: STATUS.HOVERED});

  }

  _onMouseLeave(e) {

    this.setState({class: STATUS.NORMAL});
    
  }
}

export default Link;
