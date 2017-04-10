import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
// import Firebase from 'firebase';
import { setTotalCards, setCounting, snapshotFirebase } from '../actions/deck';
import Cards from '../utils/orderedCards.json';
import styles from './Home.css';
// const recursive = require('recursive-readdir');
/* eslint-disable */
// var fs = require('fs');
// const counting = {};
// var imageDiff = require('image-diff');

class CardList extends Component {
  componentWillMount() {
  //   screencapture(function (err, imagePath) {
  // // then you have imagePath as png.
  // //
  // // When an user exits screencapture without taking a screenshot,
  // // imagePath == null
  //     console.log(imagePath);
  //   });
    // screencapture('app/utils/pene.png', (err, imagePath) => {
    //   console.log(imagePath);
    // });
    // imageDiff.getFullResult({
    //   actualImage: 'full.png',
    //   expectedImage: 'torch.png',
    //   diffImage: 'diff.png',
    // }, function (err, result) {
    //   // result = {total: 46340.2, difference: 0.707107}
    //   console.log(err);
    //   console.log(result);
    // });
    /* eslint-disable arrow-body-style */
    let number;
    return _.map(Cards, (value) => {
      return _.map(value, (v) => {
        return _.map(v, (nombre) => {
          if ((_.find(this.props.deck, (n) => (nombre.replace('.png', '') === n)))) {
            _.map(this.props.fullDeck, (val) => {
              const cleanName = val.substring(val.indexOf(' '), val.indexOf('(Set')).trim();
              if (cleanName === nombre.replace('.png', '')) {
                if (!this.props.counting[cleanName] && this.props.counting[cleanName] !== 0) {
                  number = parseInt(val.substring(0, val.indexOf(' ')), 10);
                  this.props.setCounting(cleanName, number);
                }
              }
            });
          }
        }
      );
      });
    });
    /* eslint-enable arrow-body-style */
  }

  cardDrawn(name, bool) {
    if (bool) {
      this.props.setCounting(name, this.props.counting[name] - 1);

      this.props.setTotalCards(this.props.totalCards - 1);
    } else {
      this.props.setCounting(name, this.props.counting[name] + 1);

      this.props.setTotalCards(this.props.totalCards + 1);
    }
  }

  renderProbability(name) {
    if (this.props.totalCards !== 0) {
      const nCards = this.props.counting[name];
      let probabilidad;
      probabilidad = ((nCards / this.props.totalCards) * 100).toString().substring(0, 3);
      if (probabilidad.length > 2) {
        if ((probabilidad.charAt(probabilidad.length - 1) === '.')) {
          probabilidad = probabilidad.substring(0, probabilidad.length - 1);
        } else if ((probabilidad.charAt(probabilidad.length - 1) === '0')) {
          probabilidad = probabilidad.substring(0, probabilidad.length - 2);
        }
      }
      probabilidad = probabilidad.concat('%');

      return (
        // <div className={styles.probabilidad}>
        <div>
          {probabilidad}
        </div>
      );
    }
  }

  renderList() {
    this.bar = 'aspeeesssss19828312ssps';
    let color;
    let type;
    const uniqueCards = [];
    return _.map(Cards, (value, key) => {
      type = key;
      return _.map(value, (v, k) => {
        color = k;
        return _.map(v, (nombre) => {
          if ((_.find(this.props.deck, (n) => (nombre.replace('.png', '') === n))) && !(_.find(uniqueCards, (m) => nombre.replace('.png', '') === m))) {
            uniqueCards[uniqueCards.length] = nombre.replace('.png', '');
            return (
              <li className={styles.li}>
                {/* eslint-disable jsx-a11y/no-static-element-interactions */}
                {
                  (this.props.counting[nombre.replace('.png', '')] > 0)
                  ?
                    <div>
                      {/* <img
                        className={styles.number}
                        src={`./utils/numbers/${this.props.counting[nombre.replace('.png', '')]}.png`}
                        alt={this.props.counting[nombre.replace('.png', '')]}
                      /> */}
                      <div>
                        <img
                          className={styles.card}
                          src={`http://www.numotgaming.com/cards/images/cards/${nombre.replace(' ','%20')}`}
                          // src={`./utils/cards/${color}/${type}/${nombre}`}
                          alt={nombre.replace('.png', '')}
                          onClick={() => this.cardDrawn(nombre.replace('.png', ''), true)}
                        />
                        <div
                          onClick={() => this.cardDrawn(nombre.replace('.png', ''), false)}
                        >
                        <span className={styles.text}>
                          {`${this.props.counting[nombre.replace('.png', '')]} ${nombre.replace('.png', '')}`}
                        </span>
                      </div>
                      {/* <img
                        className={styles.card}
                        src={`./utils/cards/${color}/${type}/${nombre}`}
                        alt={nombre.replace('.png', '')}
                        onClick={() => this.cardDrawn(nombre.replace('.png', ''))}
                      /> */}
                      {/* <div className={styles.card}>
                        {nombre.replace('.png', '')}
                      </div> */}
                      <div className={styles.probabilidad}>
                        {this.renderProbability(nombre.replace('.png', ''))}
                      </div>
                    </div>
                  </div>
                  :
                    <div />
                }
                {/* eslint-enable jsx-a11y/no-static-element-interactions */}
              </li>
            );
          }
        }
      );
      });
    });
  }

  renderTotal() {
    return (
      <div>
        {
          (this.props.totalCards.toString() !== '0')
          ?
          this.props.totalCards
          :
          ''
        }
      </div>
    );
  }
  render() {
    return (
      <div className={styles.list}>
        <ul>
          {this.renderList()}
          <div className={styles.total}>
            {this.renderTotal()}
          </div>
        </ul>
        {
          this.props.totalCards > 0
          ?
          <Button
            bsStyle="warning"
            // className="resetButton"
            style={{
              position: 'absolute',
              right: '-45vw',
              bottom: '1vh',
              padding: '2px',
              fontSize: '0.6em'
            }}
            onClick={()=>{
              this.props.snapshotFirebase(this.props.user);
            }}>
            Reset Deck Counting
          </Button>
          :
          <div />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deck: state.deck.deck,
    fullDeck: state.deck.fullDeck,
    totalCards: state.deck.totalCards,
    counting: state.deck.counting,
    user: state.auth.user
  };
}

CardList.defaultProps = {
  deck: [],
  fullDeck: [],
  totalCards: 0,
  setTotalCards: React.PropTypes.func,
  setCounting: React.PropTypes.func,
  counting: [],
  user: ''
};
CardList.propTypes = {
  counting: React.PropTypes.shape({
    carta: React.PropTypes.string,
    n: React.PropTypes.number
  }),
  user: React.PropTypes.string,
  deck: React.PropTypes.arrayOf(React.PropTypes.string),
  fullDeck: React.PropTypes.arrayOf(React.PropTypes.string),
  totalCards: React.PropTypes.number,
  setTotalCards: React.PropTypes.func,
  setCounting: React.PropTypes.func,
};


export default connect(mapStateToProps, { setTotalCards, setCounting, snapshotFirebase })(CardList);
