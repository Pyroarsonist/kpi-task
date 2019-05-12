import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css'
import LoginPage from './components/LoginPage';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home' // todo: rename


const routing = (
    <Router>
        <div className='container-fluid'>
            <Route exact path="/" render={() => localStorage.getItem("kpiTaskUserId") ? (
                <Redirect to="/tasks"/>
            ) : (
                <Redirect to="/login"/>
            )}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/tasks" component={Home}/>
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
