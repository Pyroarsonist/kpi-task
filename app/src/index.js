import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import * as serviceWorker from './serviceWorker';
import Navbar from './components/Navbar';
// import Footer from './components/Footer';
import Tasks from './components/Tasks';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import createStore from './createReduxStore';

const store = createStore();

const routing = (
  <Provider store={store}>
    <Router>
      <Navbar />
      <main className="container-fluid h-75">
        <Route
          exact
          path="/"
          render={() =>
            store.getState().userName ? (
              <Redirect to="/tasks" />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/tasks" render={props => <Tasks {...props} />} />
        <Route
          path="/archive"
          render={props => <Tasks {...props} archived />}
        />
        <Route path="/register" component={RegisterPage} />
      </main>
      {/* <Footer/> */}
    </Router>
  </Provider>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
