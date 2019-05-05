import React, {Component} from 'react';
import 'react-router-dom';
import LoginPage from './components/LoginPage';

class App extends Component {


    async componentDidMount() {
        // try {
        //     const data = await fetch('/api/tasks/', {
        //         mode: 'no-cors',
        //         credentials: 'include',
        //     })
        //         .then(x => x.json())
        //     console.log(data)
        // } catch (e) {
        //     console.error(e)
        // }
    }

    render() {
        return (
            <div className="container col-4">
                <LoginPage/>
            </div>
        )
    }
}

export default App;
