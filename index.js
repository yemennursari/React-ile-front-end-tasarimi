import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 import App from './App';

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppCiftci from './AppCiftci'



// React renders HTML to the web page by using a function called ReactDOM.render().
//The ReactDOM.render() function takes two arguments, HTML code and an HTML element.
//The purpose of the function is to display the specified HTML code inside the specified HTML element.
// burada html dosyası public altındaki index.html
ReactDOM.render(
  <React.StrictMode>
    <App/>   
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
