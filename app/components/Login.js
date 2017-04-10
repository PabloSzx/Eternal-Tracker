import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import { login } from '../actions/auth';
import { Home } from './Home';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUsernameChange(e) {
    this.setState({
      username: e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    });
  }

  getValidationState() {
    const length = this.state.username.length;
    if (length > 6) return 'success';
    else if (length > 4) return 'warning';
    else if (length > 0) return 'error';
  }

  LoginWithFirebase() {
    this.props.login(this.state.username, this.state.password);
  }

  cleanErrorMessage(string) {
    this.asd = 'asddd';
    let str = string.replace(' or the user does not have a password', '');
    str = str.replace('email address', 'username');
    return str;
  }

  render() {
    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          >
            <ControlLabel className="white">Username</ControlLabel>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="Enter your username"
              onChange={(e) => this.handleUsernameChange(e)}
            />
            <FormControl.Feedback />
            <HelpBlock>If this is your first time, this will work for register too.</HelpBlock>
            <ControlLabel className="white">Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="Enter your Password"
              onChange={(e) => this.handlePasswordChange(e)}
            />
            <FormControl.Feedback />
            <HelpBlock>Make sure you do not forget your password.</HelpBlock>
            <Button
              bsStyle="success"
              style={{ marginLeft: '10px' }}
              // onSubmit={() => this.LoginWithFirebase()}
              onClick={() => this.LoginWithFirebase()}
            >
               Login
             </Button>
          </FormGroup>
        </form>
        {
          this.props.auth
          ?
            <span className="white">{this.props.auth.replace('email address', 'username').replace}</span>
          :
            <div />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.loginError
  };
}

Login.defaultProps = {
  login: React.PropTypes.func,
  auth: React.PropTypes.string
};
Login.propTypes = {
  login: React.PropTypes.func,
  auth: React.PropTypes.string
};


export default connect(mapStateToProps, { login })(Login);
