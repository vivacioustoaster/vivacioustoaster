import React from 'react';
import DestSearch from './destSearch';
import TripTypeList from './tripTypeList';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';
import { routeActions } from 'react-router-redux';
import { connect } from 'react-redux';
import { routeToLogin } from '../auth/authActions';


const Home = () => (
  <div>
    <DestSearch />
    <TripTypeList />
    <Link to="friend"><RaisedButton label="Create Trip" /></Link>
  </div>
);

export default Home;


// componentDidMount () {
//   if(routeToLogin()) {
//     dispatch(routeActions.push('/auth'));
//   };
// }

// const mapStateToProps = state => ({
//   isAuth: state.auth.get('isAuthenticated')
// })

// let Home = ({ isAuth }) => (
//   <div>
//     <DestSearch />
//     <TripTypeList />
//     <Link to="friend"><RaisedButton label="Create Trip" /></Link>
//   </div>
// );

// Home.propType = {
//   isAuth: React.PropType.bool.isRequired,
// }

// Home = connect(mapStateToProps, null)(Home);
// export default Home;
