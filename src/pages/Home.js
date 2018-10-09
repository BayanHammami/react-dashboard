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
import BarChart from '../components/BarChart.js';
import ScatterChart from '../components/ScatterChart.js';
import AreaChart from '../components/AreaChart.js';
import ChartHeader from '../components/ChartHeader.js';


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
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Hidden from '@material-ui/core/Hidden';
import Snackbar from '@material-ui/core/Snackbar';

import CloseIcon from '@material-ui/icons/Close';

import { readStore, writeStore } from '../config/localstore.js';
import AWS from 'aws-sdk';
import { collectEvent } from '../config/kinesis.js';


const drawerWidth = 240;
const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  close: {
    padding: theme.spacing.unit / 2,
  },  
});

function randomIntFromInterval(min,max)
  {
      return (Math.random()*(max-min+1)+min);
  }

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSnack: false,
      messageInfo: {},      
    };    
  }
  componentWillMount() {
    this.regenerateAllCharts()    
  };  

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  regenerateAllCharts = () => {
    collectEvent('regenerateAllCharts')
    this.handleClickSnack("'regenerateAllCharts' event sent to Kinesis Stream and S3")
    var allBarData = this.regenerateData(4, 10, 10, 1, 10, false, false, false)
    this.setState({ allBarData: allBarData });

    var allLineData = this.regenerateData(4, 20, 20, 1, 100, true, false, false)
    this.setState({ allLineData: allLineData });

    var allScatterData = this.regenerateData(4, 10, 10, 1, 100, false, true, true)
    this.setState({ allScatterData: allScatterData });

  };  

  regenerateSeries = (n, minValue, maxValue, autoCorrelation, jitter, size) => {
    var data = [];
    var randomInt = randomIntFromInterval(minValue, maxValue);
    for (var i = 0; i < n; i++){
      if(autoCorrelation === true){
        randomInt = randomIntFromInterval(randomInt-5, randomInt+5);
      } else {
        randomInt = randomIntFromInterval(minValue, maxValue);
      };
      if(jitter === true && size === true){
        var dataPoint = {x: i + randomIntFromInterval(-2, 2), y: randomInt, size: randomIntFromInterval(minValue, maxValue)};        
      } else {
        var dataPoint = {x: i, y: randomInt};
      }
      
      data.push(dataPoint);
    }
    return data
  };


  regenerateData = (numSeries, numPointsMin, numPointsMax, minValue, maxValue, autoCorrelation, jitter, size) => {    
    
    var chartData = [];
    var numSeries = numSeries;
    var n = Math.floor(randomIntFromInterval(numPointsMin, numPointsMax)); 

    for (var series = 0; series < numSeries; series++){
      var seriesData = this.regenerateSeries(n, minValue, maxValue, autoCorrelation, jitter, size)
      chartData.push(seriesData)
    }    
    return chartData
  };    
   
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  queue = [];

  handleClickSnack = (message) => {
    console.log('message')
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (this.state.openSnack) {
      // immediately begin dismissing current message
      // to start showing new one
      this.setState({ openSnack: false });
    } else {
      this.processQueueSnack();
    }
  };

  processQueueSnack = () => {
    console.log('processQueue')
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        openSnack: true,
      });
    }
  };

  handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ openSnack: false });
  };

  handleExitedSnack = () => {
    this.processQueueSnack();
  };  

  render() {
    const { classes, theme } = this.props;
    
    const { fullScreen } = this.props;
    const { message, key } = this.state.messageInfo;
    return(
      
      <ResponsiveDrawer>  
        <main className={classes.content}>
          <div className={classes.toolbar}/>
          <Paper elevation={1} square={true} style={{
              width: '100%',               
              marginBottom: theme.spacing.unit * 3,          
          }}> 
        
            <div style={{flexGrow: 1, padding: theme.spacing.unit * 2}}>
              <Grid container spacing={24}>                              
                <Grid item xs>
                <Button variant="contained" color="primary" style={{ width: '100%'}}
                  onClick={this.regenerateAllCharts}
                >
                  Refresh
                </Button> 
                </Grid>                                                
              </Grid>   
            </div>
          </Paper>
          <Grid container spacing={theme.spacing.unit * 3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root} elevation={1} square={true} style={{marginBottom: theme.spacing.unit * 1,}}>
                <ChartHeader chartTitle='Scatter Chart'/>
                <Divider/>
                <ScatterChart allScatterData={this.state.allScatterData} height={180}/>                            
              </Paper>
            </Grid>  
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root} elevation={1} square={true} style={{marginBottom: theme.spacing.unit * 1,}}>
                <ChartHeader chartTitle='Line Chart'/>
                <Divider/>
                <LineChart allLineData={this.state.allLineData} height={180}/>                 
              </Paper> 
            </Grid>                       
          </Grid>  
          <Grid container spacing={theme.spacing.unit * 3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root} elevation={1} square={true}>
                <ChartHeader chartTitle='Bar Chart'/>
                <Divider/>            
                <BarChart allBarData={this.state.allBarData} height={180}/> 
              </Paper>
            </Grid>  
            <Grid item xs={12} sm={6}>
              <Paper className={classes.root} elevation={1} square={true}>
                <ChartHeader chartTitle='Area Chart'/>
                <Divider/>                
                <AreaChart allLineData={this.state.allLineData} height={180}/> 
              </Paper> 
            </Grid>                       
          </Grid>  
          <Snackbar
            key={key}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={this.state.openSnack}
            autoHideDuration={2000}
            onClose={this.handleCloseSnack}
            onExited={this.handleExitedSnack}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{message}</span>}
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleCloseSnack}
              >
              <CloseIcon />
              </IconButton>,
            ]}
          />          
        </main>   
      </ResponsiveDrawer>   
    )
  }

}

export default withStyles(styles, { withTheme: true })(withRouter(Home));