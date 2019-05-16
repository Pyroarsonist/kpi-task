import React, {Component} from 'react';
import {Link} from "react-router-dom";
class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {name: '', password: '', error: false}

    }

    getAlertBlock() {
        return (<div className="mt-5 alert alert-danger" role="alert">
            Login failed!
        </div>)
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        try {
            localStorage.removeItem("kpiTaskUserId")
            const data = await fetch('/api/user/login', {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(this.state)
            })
            if (data.ok) {
                const userId = +(await data.text())
                localStorage.setItem("kpiTaskUserId", userId) // prosti gospod bog menya za eto
                this.props.history.push("/tasks");
            } else {
                this.setState({error: true})
            }
        } catch (e) {
            console.error(e)
        }
    }

    render() {
        return (
            <div className='row align-items-center h-100 justify-content-center'>
                <div className="text-center col-3">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="h3 mb-3 font-weight-normal">Sign up</h1>
                        <div className="form-group">
                            <label className="sr-only">Name</label>
                            <input type="text" className="form-control" placeholder="Name" required
                                   autoFocus value={this.state.name}
                                   onChange={e => this.setState({name: e.target.value})}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" className="form-control" placeholder="Password"
                                   required value={this.state.password}
                                   onChange={e => this.setState({password: e.target.value})}/>
                        </div>
                        <button
                            className="btn btn-lg btn-primary btn-block" type="submit">Log in
                        </button>

                    </form>
                    <div className="text-center font-italic text-muted mt-2">
                        Have no account yet? <Link to="/login">Sign up</Link>
                    </div>
                    {this.state.error && this.getAlertBlock()}
                </div>
            </div>
        )
    }
}

export default RegisterPage;