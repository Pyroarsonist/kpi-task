import React, { Component } from 'react';

class Navbar extends Component{

    constructor(props) {
        super(props)
    }

    render(){
        return(
            <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                <a className="navbar-brand" href="#">KPI-Task</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navb" aria-expanded="true">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id="navb" className="navbar-collapse collapse hide">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">History</a>
                        </li>
                    </ul>

                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#"><span className="fa fa-user"></span> Sign Up</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><span className="fa fa-sign-in"></span> Login</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )

    }
}

export default Navbar;