import React, { Component } from 'react';


class LoginPage extends Component{
    render() {
        return (
            <div className="container col-4">
                <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address" required
                           autoFocus />
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password"
                           required />
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me" /> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                </form>
                <div className="text-center font-italic text-muted mt-2">
                    Have no account yet? <a href="#">Sign up</a>
                </div>
            </div>
        )
    }
}

export default LoginPage;