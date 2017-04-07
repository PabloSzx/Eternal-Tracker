import React, { Component } from 'react';
// import { Link } from 'react-router';
import CardList from './CardList';
import ImportDeck from './ImportDeck';
import styles from './Home.css';


export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <ImportDeck />
          {/* <h2>Home</h2> */}
          {/* <Link to="/counter">esto funciona kawaiii</Link> */}
          <CardList />
        </div>
      </div>
    );
  }
}
