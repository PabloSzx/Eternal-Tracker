import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Cards from '../utils/cards.json';
import styles from './Home.css';

// const firebase = require('firebase');
// const recursive = require('recursive-readdir');

// var fs = require('fs');
// const counting = {};

class CardList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      counting: {
      }
    };
  }

  cardDrawn(name) {
    // console.log(this.state.counting);
    this.setState({
      counting: { ...this.state.counting, [name]: this.state.counting[name] - 1 }
    });
  }

  renderList() {
    this.bar = 'a';
    let color;
    let type;
    let number = 1;
    const uniqueCards = [];
    return _.map(Cards, (value, key) => {
      color = key;
      return _.map(value, (v, k) => {
        type = k;
        return _.map(v, (nombre) => {
          if ((_.find(this.props.deck, (n) => (nombre.replace('.png', '') === n))) && !(_.find(uniqueCards, (m) => nombre.replace('.png', '') === m))) {
            uniqueCards[uniqueCards.length] = nombre.replace('.png', '');
            _.map(this.props.fullDeck, (val) => {
              const cleanName = val.substring(val.indexOf(' '), val.indexOf('(Set')).trim();
              if (cleanName === nombre.replace('.png', '')) {
                if (!this.state.counting[cleanName] && this.state.counting[cleanName] !== 0) {
                  number = parseInt(val.substring(0, val.indexOf(' ')), 10);
                  this.state.counting[cleanName] = number;
                }
              }
            });
            return (
              <li className={styles.li}>
                {/* <img
                  className={styles.number}
                  src={'./utils/1.png'}
                  alt="1"
                /> */}
                {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                {this.state.counting[nombre.replace('.png', '')]}
                <img
                  className={styles.card}
                  src={`./utils/cards/${color}/${type}/${nombre}`}
                  alt={nombre.replace('.png', '')}
                  onClick={() => this.cardDrawn(nombre.replace('.png', ''))}
                />
                {/* eslint-enable jsx-a11y/no-static-element-interactions */}
              </li>
            );
          }
        }
      );
      });
    });
  }
  render() {
    return (
      <div className={styles.list}>
        <ul>
          {this.renderList()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deck: state.deck.deck,
    fullDeck: state.deck.fullDeck
  };
}

CardList.defaultProps = {
  deck: [],
  fullDeck: [],
};
CardList.propTypes = {
  deck: React.PropTypes.arrayOf(React.PropTypes.string),
  fullDeck: React.PropTypes.arrayOf(React.PropTypes.string),
};


export default connect(mapStateToProps, null)(CardList);
