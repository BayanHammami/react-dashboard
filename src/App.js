import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'
import './App.css';
import Home from './pages/Home.js'
import About from './pages/About.js'

import style from './config/style';


import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});


class App extends Component {

  render() {
    return(
      <MuiThemeProvider theme={theme}>

        <Router>
          <div>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>            
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }

}

export default App