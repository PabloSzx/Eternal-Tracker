import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
// import { Link } from 'react-router';
import Firebase from 'firebase';
import CardList from './CardList';
import ImportDeck from './ImportDeck';
import styles from './Home.css';
import { setAuthState, logout, clearLoginError } from '../actions/auth';
import Login from './Login';


class Home extends Component {
  componentWillMount() {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.setAuthState(true);
      } else {
        this.props.setAuthState(false);
      }
    });
  }
  render() {
    this.props.clearLoginError();
    return (
      <div>
        <div className={styles.container} data-tid="container">
          {
            this.props.auth
            ?
              <div>
                <ImportDeck />

                <CardList />

                <Button
                  bsStyle="danger"
                  onClick={() => this.props.logout()}
                  className="logoutButton"
                >
                  Logout
                </Button>
              </div>
            :
              <Login />
          }
          {/* <h2>Home</h2> */}
          {/* <Link to="/counter">esto funciona kawaiii</Link> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated
  };
}

Home.defaultProps = {
  setAuthState: React.PropTypes.func,
  clearLoginError: React.PropTypes.func,
  logout: React.PropTypes.func,
  auth: React.PropTypes.bool
};
Home.propTypes = {
  setAuthState: React.PropTypes.func,
  clearLoginError: React.PropTypes.func,
  logout: React.PropTypes.func,
  auth: React.PropTypes.bool
};


export default connect(mapStateToProps, { setAuthState, logout, clearLoginError })(Home);
