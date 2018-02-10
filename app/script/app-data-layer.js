/*
  App Data layer
  data container to pass props to children components
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as actions from './action/index';

import RootComponent from './component/root';

// turn state into component props
const mapStateToProps = (state, ownProps) => state;
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

// v4 router + root
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RootComponent));
