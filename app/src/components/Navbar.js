import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {userIsLoggedIn,logout} from '../tools'

class Navbar extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                <Link to="/" className="navbar-brand">KPI-Task</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navb" aria-expanded="true">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {userIsLoggedIn() && <div id="navb" className="navbar-collapse collapse hide ml-3">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/tasks" className="nav-link">Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/archive" className="nav-link">Archive</Link>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link" onClick={() => logout()}><span className="fa fa-sign-out mr-1"></span>Sign out</Link>
                        </li>
                    </ul>
                </div>}
            </nav>
        )

    }
}

export default Navbar;