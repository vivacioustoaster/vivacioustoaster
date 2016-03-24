import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { requestLogin, receiveLogin, loginError, requestLogout,
  logout, login, fbLogfin, checkForLogin } from './authActions';
import { Map } from 'immutable';
import cookie from 'react-cookie';


class Auth extends React.Component {
  componentWillMount() {
    this.props.onCheckForLogin(this.props.isAuthenticated);
  }
  componentDidMount() {
    this.props.onCheckForLogin(this.props.isAuthenticated);
  }

  render() {
    return (
      <div>
      we are on auth page!
      <a href="/auth/facebook">Click to Login through Facebook</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckForLogin: bindActionCreators(checkForLogin, dispatch),
});
Auth = connect(mapStateToProps, mapDispatchToProps)(Auth);


Auth.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  onCheckForLogin: React.PropTypes.func,
};


export default Auth;
