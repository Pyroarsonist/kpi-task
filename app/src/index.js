import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home'


const routing = (
    <Router>
        <div>
            <Route path="/" component={App}/>
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
