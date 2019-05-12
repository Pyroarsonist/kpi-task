import React, {Component} from 'react';

class RegisterPage extends Component {
    render() {
        return (
            <div className="container col-4">
                <form className="form-signup">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign up</h1>
                    <label htmlFor="inputLogin" className="sr-only">Login</label>
                    <input type="login" id="inputLogin" className="form-control mb-2" placeholder="Login" required
                           autoFocus/>
                    <label htmlFor="inputEmail" className="sr-only">Email address</label>
                    <input type="email" id="inputEmail" className="form-control mb-2" placeholder="Email address"
                           required/>
                    <label htmlFor="inputPassword" className="sr-only">Password</label>
                    <input type="password" id="inputPassword" className="form-control mb-2" placeholder="Password"
                           required/>
                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
                </form>
                <div className="text-center font-italic text-muted mt-2">
                    Already registered? <a href="#">Log in</a>
                </div>
            </div>
        )
    }
}

export default RegisterPage;