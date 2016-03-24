import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import auth from '../auth/authReducers';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {
    componentWillMount() {
      console.log('IN THE COMPONENT WILL MOUNT, isAuthenticated IS', isAuthenticated);
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      console.log('IN THE COMPONENT WILL RECEIVE PROPS, isAuthenticated IS', nextProps);
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {
      if (!isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname;
        this.props
          .dispatch(push('/auth'));
      }
    }

    render() {
      return (
        <div>
          { this.props.isAuthenticated === true
            ? <Component { ...this.props } />
            : null
          }
        </div>
      );
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });
  return connect(mapStateToProps)(AuthenticatedComponent);
}


// propTypes = {
  //   isAuthenticated: React.Prototypes.bool,
  // };

