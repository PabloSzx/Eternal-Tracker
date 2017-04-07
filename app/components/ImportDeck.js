import React, { Component } from 'react';
import Textarea from 'better-react-textarea-autosize';// import _ from 'lodash';
import { connect } from 'react-redux';
import _ from 'lodash';
import { addDeck, snapshotFirebase } from '../actions/deck';

const firebase = require('firebase');


class ImportDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: false,
    };
  }
  componentWillMount() {
    this.props.snapshotFirebase();
  }
  handleChange(event) {
    this.setState({
      description: event.target.value
    });
  }
  saveDeck() {
    this.a = 'asd';
    const array = this.state.description.split('\n');
    const clean = _.map(array, (value) => {
      const val = value.substring(value.indexOf(' '), value.indexOf('(Set')).trim();
      return val;
    });
    firebase.database().ref().update({
      cleanDeck: clean,
      fullDeck: array
    });
    this.props.addDeck(clean);
  }

  logState() {
    this.a = 'asd';
  }

  render() {
    return (
      <div>
        <Textarea
          style={{ backgroundColor: 'black', color: 'white' }}
          value={this.state.description}
          onChange={this.handleChange.bind(this)}
          onClick={(e) => this.logState(e)}
        />
        <button
          onClick={() => this.saveDeck()}
        >
          Guardar Deck!!
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    deck: state.deck
  };
}

ImportDeck.defaultProps = {
  addDeck: React.PropTypes.func,
  snapshotFirebase: React.PropTypes.func
};
ImportDeck.propTypes = {
  addDeck: React.PropTypes.func,
  snapshotFirebase: React.PropTypes.func
};


export default connect(mapStateToProps, { addDeck, snapshotFirebase })(ImportDeck);
