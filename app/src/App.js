import React, { Component } from 'react';
import 'react-router-dom';
import LoginPage from "./components/LoginPage";
import Home from "./components/Home"
import Navbar from "./components/Navbar"



class App extends Component {


  render() {
      return (
          <>
            <Navbar/>
          <Home/>
          </>
      )
    }
}

export default App;
