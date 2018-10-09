import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@babel/polyfill";
ReactDOM.render(<App />, document.getElementById('root'));


// Configure Credentials to use Cognito

serviceWorker.unregister();

