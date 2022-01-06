import React from 'react';
import { Component } from 'react';

import logo from './logo.svg';

import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CiftciList from "./CiftciList";




class AppCiftci extends Component {
    render() {
      return (
        <div className="AppCiftci">
        <h1>Çiftçiler!</h1>
     
           <Router>
            <Switch>
              {/* <Route path='/' exact={true} component={Home}/> */}
              <Route path='/' exact={true} render={(props) => (<Home{...props} title={"Web Portal Çiftçi "} />)}
              />
              <Route path='/ciftciler' exact={true} component={CiftciList}/>

            </Switch>
          </Router>
   
  
          </div>
      );
    }
  }
  
  export default AppCiftci;