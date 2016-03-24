import React from 'react';
import DestSearch from './destSearch';
import TripTypeList from './tripTypeList';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router';


const Home = () => (
  <div>
    <DestSearch />
    <TripTypeList />
    <Link to="friend"><RaisedButton label="Create Trip" /></Link>
  </div>
);

export default Home;
