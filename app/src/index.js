import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import {userIsLoggedIn} from './tools'
import * as serviceWorker from './serviceWorker';
import Navbar from './components/Navbar'
import Tasks from './components/Tasks'
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage'


const routing = (
    <Router>
        <Navbar/>
        <div className='container-fluid'>
            <Route exact path="/" render={() => userIsLoggedIn() ? (
                <Redirect to="/tasks"/>
            ) : (
                <Redirect to="/login"/>
            )}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/tasks" render={(props) => <Tasks {...props} archived={false}/>}/>
            <Route path="/archive" render={(props) => <Tasks {...props} archived={true}/>}/>
            <Route path="/register" component={RegisterPage}/>
        </div>
    </Router>
)

ReactDOM.render(
    routing,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
