import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

import style from '../config/style';
import ResponsiveDrawer from '../components/ResponsiveDrawer.js';
import LineChart from '../components/LineChart.js';


import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';



const drawerWidth = 240;
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

function randomIntFromInterval(min,max)
  {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };    
  }
  componentWillMount() {
    this.regenerateData()
  }  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  regenerateData = () => {
    
    var n = randomIntFromInterval(20, 200);
    var lineData = [];
    var randomInt = 5
    for (var i = 0; i < n; i++){
      randomInt = randomIntFromInterval(randomInt-1, randomInt+1);
      var dataPoint = {x: i, y: randomInt}
      
      lineData.push(dataPoint);
    }

    this.setState({ lineData: lineData });

  };  


  render() {
    const { classes, theme } = this.props;
    return(
      
      <ResponsiveDrawer>  
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Paper className={classes.root} elevation={1} square={true} style={{
              width: '100%',               
              marginBottom: theme.spacing.unit * 3,
          }}> 
            <div style={{flexGrow: 1, padding: theme.spacing.unit * 2}}>
              <Grid container spacing={24}>
                <Grid item xs>        
                <TextField
                  id="standard-uncontrolled"
                  label="Suburb"
                  defaultValue="Riverwood"
                  style={{width: '100%', minWidth: 200,}}
                  
                />    
                </Grid>
                <Grid item xs>        
                <FormControl style={{width: '100%', minWidth: 200}}>
                  <InputLabel htmlFor="age-simple">Property Type</InputLabel>
                  <Select
                    value={10}
                    onChange={this.handleChange}
                    inputProps={{
                      name: 'age',
                      id: 'age-simple',
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>House</MenuItem>
                    <MenuItem value={20}>Apartment</MenuItem>
                    <MenuItem value={30}>Duplex</MenuItem>
                  </Select>
                </FormControl> 
                </Grid>
                <Grid item xs>
                <Button variant="contained" color="primary" style={{ width: '100%'}}
                  onClick={this.regenerateData}
                >
                  Click
                </Button> 
                </Grid>                                                
              </Grid>   
            </div>
          </Paper>
          <Grid container spacing={theme.spacing.unit * 3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root} elevation={1} square={true} style={{}}>
                <Typography variant="subheading" component="h6" style={{ padding: theme.spacing.unit * 2}}>
                  Number of listings
                </Typography>
                <Divider/>            
                <LineChart lineData={this.state.lineData} height={500}/>            
              </Paper> 
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root} elevation={1} square={true} style={{marginBottom: theme.spacing.unit * 3,}}>
                <Typography variant="subheading" component="h6" style={{ padding: theme.spacing.unit * 2}}>
                  Number of listings
                </Typography>
                <Divider/>            
                <LineChart lineData={this.state.lineData} height={500}/>             
              </Paper> 
            </Grid>                       
          </Grid>                   
        </main>   
      </ResponsiveDrawer>   
    )
  }

}
export default withStyles(styles, { withTheme: true })(withRouter(About));