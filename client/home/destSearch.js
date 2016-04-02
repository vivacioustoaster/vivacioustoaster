import React from 'react';
import _ from 'lodash';
import { TextField, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import { changeStartDate, changeEndDate,
changeDestination, addDestination, clearDestination } from './homeActions';
import DatePicker
from '../../node_modules/material-ui/lib/date-picker/date-picker';
import Geosuggest from 'react-geosuggest';

const mapStateToProps = state => ({
  startDate: state.home.getIn(['destination', 'startDate']),
  endDate: state.home.getIn(['destination', 'endDate']),
  location: state.home.getIn(['destination', 'location']),
  destinations: state.home.destinations,
});

const mapDispatchToProps = dispatch => ({
  onChangeDestination: destination => dispatch(changeDestination(destination)),
  onChangeStartDate: newStartDate => dispatch(changeStartDate(newStartDate)),
  onChangeEndDate: newEndDate => dispatch(changeEndDate(newEndDate)),
  onAddDest: () => dispatch(addDestination()),
  onResetDest: () => dispatch(clearDestination()),
});

class DestSearch extends React.Component {
  render() {
    return (
      <div id="destSearch">
        <Geosuggest placeholder="Destination" onBlur={event =>
          event ? this.props.onChangeDestination(event.value) : null
        }
          onSuggestSelect={suggest => this.props.onChangeDestination(suggest.label)}
          ref="destInput"
        />
        <DatePicker hintText="Departure Date" minDate={new Date()}
          maxDate={this.props.endDate ? this.props.endDate : new Date(Date.now() * 60)} // eslint-disable-line
          onChange={(event, newDate) => this.props.onChangeStartDate(newDate)}
          ref="startDatePick"
          className="datePicker"
        />
        <DatePicker hintText="End Date" minDate={this.props.startDate || new Date()}
          onChange={(event, newDate) => this.props.onChangeEndDate(newDate)}
          ref="endDatePick"
          className="datePicker"
          style={{ marginBottom: '10px' }}
        />
        <RaisedButton
          label="Add Destination"
          disabled={
            this.props.startDate && this.props.endDate && this.props.location ? false : true // eslint-disable-line
          }
          style={{
            opacity: this.props.startDate && this.props.endDate && this.props.location ? '1' : '0.4', // eslint-disable-line
          }}
          primary={this.props.startDate && this.props.endDate && this.props.location ? true: false} // eslint-disable-line
          className="addDest"
          onClick={ () => {
            this.props.onAddDest();
            this.props.onResetDest();
            this.refs.destInput.state.userInput = '';
            this.refs.startDatePick.state.date = undefined;
            this.refs.endDatePick.state.date = undefined;
          }}
        />
      </div>
    );
  }
}

DestSearch.propTypes = {
  onChangeDestination: React.PropTypes.func.isRequired,
  onChangeStartDate: React.PropTypes.func.isRequired,
  onChangeEndDate: React.PropTypes.func.isRequired,
  startDate: React.PropTypes.object.isRequired,
  endDate: React.PropTypes.object.isRequired,
  location: React.PropTypes.object.isRequired,
  onAddDest: React.PropTypes.func.isRequired,
  onResetDest: React.PropTypes.func.isRequired,
  destinations: React.PropTypes.object.isRequired,
};

DestSearch = connect(mapStateToProps, mapDispatchToProps)(DestSearch);
export default DestSearch;
