import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {removeUsername} from '../actions'

import {logout} from '../tools'


class Navbar extends Component {


    render() {
        const name = this.props.name
        return (
            <header>
                <nav className="navbar navbar-expand-md bg-dark navbar-dark sticky-top">
                    <Link to="/" className="navbar-brand pr-1 pt-1 pl-1">KPI-Task</Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                            data-target="#navb" aria-expanded="true">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {name && <div id="navb" className="navbar-collapse collapse hide ml-3">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/tasks" className="nav-link">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/archive" className="nav-link">Archive</Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav ml-auto">
                            <li className='nav-item text-white my-auto mr-3'>
                                Hello, {name}!
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={async () => {
                                    this.props.removeUserName()
                                    await logout();
                                }}><span
                                    className="fa fa-sign-out mr-1"></span>Sign out</Link>
                            </li>
                        </ul>
                    </div>}
                </nav>
            </header>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        name: state.userName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeUserName: () => {
            dispatch(removeUsername())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar)