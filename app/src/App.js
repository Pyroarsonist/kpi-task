import React, { Component } from 'react';
import 'react-router-dom';
import LoginPage from "./components/LoginPage";
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import RegisterPage from "./components/RegisterPage";
import Archive from "./components/Archive";
import Tasks from "./components/Tasks";



class App extends Component {


  render() {
      return (
          <div>
              <LoginPage/>
          </div>
      )
    }
}

export default App;
