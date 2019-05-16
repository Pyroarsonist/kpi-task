import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {logout} from "../tools"

class Navbar extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                <a className="navbar-brand" href="#">KPI-Task</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navb" aria-expanded="true">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navb" className="navbar-collapse collapse hide ml-3">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Tasks</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Archive</a>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link" onClick={() => logout()}><span
                                className="fa fa-sign-out mr-1"/>Sign
                                out</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }
}

export default Navbar;