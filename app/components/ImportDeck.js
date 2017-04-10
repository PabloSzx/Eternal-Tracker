import React, { Component } from 'react';
import Textarea from 'better-react-textarea-autosize';// import _ from 'lodash';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { addDeck, snapshotFirebase } from '../actions/deck';

const firebase = require('firebase');


class ImportDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      error: false,
      button: 'Import Deck',
      import: false
    };
  }
  componentWillMount() {
    this.props.snapshotFirebase(this.props.user);
  }
  handleChange(event) {
    this.setState({
      description: event.target.value
    });
  }
  saveDeck() {
    this.a = 'asdss';
    const array = this.state.description.split('\n');
    const clean = _.map(array, (value) => {
      const val = value.substring(value.indexOf(' '), value.indexOf('(Set')).trim();
      return val;
    });
    firebase.database().ref(this.props.user).update({
      cleanDeck: clean,
      fullDeck: array
    });
    this.props.addDeck(clean);
    this.setState({
      description: ''
    });
  }

  logState() {
    this.a = 'asd';
  }

  render() {
    return (
      <div>
        {
          this.state.import
          ?
            <Textarea
              className="textArea"
              value={this.state.description}
              onChange={this.handleChange.bind(this)}
              onClick={(e) => this.logState(e)}
            />
          :
            <div />
        }
        {/* <Textarea
          style={{ backgroundColor: 'black', color: 'white' }}
          value={this.state.description}
          onChange={this.handleChange.bind(this)}
          onClick={(e) => this.logState(e)}
        /> */}
        <Button
          className="saveButton"
          bsStyle="primary"
          onClick={() => {
            if (this.state.import) {
              this.saveDeck();
              this.setState({ import: false, button: 'Import Deck' });
            } else {
              this.setState({ import: true, button: 'Save Deck' });
            }
          }
          }
        >
          {this.state.button}
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    deck: state.deck,
    user: state.auth.user
  };
}

ImportDeck.defaultProps = {
  addDeck: React.PropTypes.func,
  snapshotFirebase: React.PropTypes.func,
  user: ''
};
ImportDeck.propTypes = {
  addDeck: React.PropTypes.func,
  snapshotFirebase: React.PropTypes.func,
  user: React.PropTypes.string
};


export default connect(mapStateToProps, { addDeck, snapshotFirebase })(ImportDeck);
