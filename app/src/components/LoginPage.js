import React, {Component} from 'react';


class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {name: '', password: ''}

        // console.log(document.cookie)
    }

    render() {
        return (
            <div className="text-center">
                {/*<form className="form-signin">*/}
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="" id="inputEmail" className="form-control" placeholder="Email address" required
                       autoFocus value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                       required value={this.state.password}
                       onChange={e => this.setState({password: e.target.value})}/>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button onClick={async () => {
                    try {
                        await fetch('/api/user/login', {
                            credentials: 'include',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(this.state)
                        })
                    } catch (e) {
                        console.error(e)
                    }
                }}
                        className="btn btn-lg btn-primary btn-block">Sign in
                </button>

                {/*</form>*/}
            </div>
        )
    }
}

export default LoginPage;