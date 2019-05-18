import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { setUsername } from '../actions';

class RegisterPage extends Component {
  static propTypes = {
    setUsername: PropTypes.func.isRequired,
    history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { name: '', password: '', error: false };
  }

  static getAlertBlock() {
    return (
      <div className="mt-5 alert alert-danger" role="alert">
        Register failed! Perhaps, name is already used
      </div>
    );
  }

  handleSubmit = async event => {
    event.preventDefault();
    try {
      localStorage.removeItem('kpiTaskUser');
      const data = await fetch('/api/user/register', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(this.state),
      });
      if (data.ok) {
        const userName = await data.text();
        localStorage.setItem('kpiTaskUser', userName); // prosti gospod bog menya za eto
        this.props.setUsername(userName);
        this.props.history.push('/tasks');
      } else {
        this.setState({ error: true });
      }
    } catch (e) {
      console.error(e);
    }
  };

  render() {
    return (
      <div className="row align-items-center h-100 justify-content-center">
        <div className="text-center col-3">
          <form onSubmit={this.handleSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
            <div className="form-group">
              <span className="sr-only">Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                required
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <span className="sr-only">Password</span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Create new account
            </button>
          </form>
          <div className="text-center font-italic text-muted mt-2">
            Have account? <Link to="/login">Sign in</Link>
          </div>
          {this.state.error && RegisterPage.getAlertBlock()}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUsername: name => {
      dispatch(setUsername(name));
    },
  };
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps,
  ),
)(RegisterPage);
