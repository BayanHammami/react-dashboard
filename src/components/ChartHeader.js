import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
} from 'react-router-dom'

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


const styles = theme => ({
});

class ChartHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };        
    
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {value} = this.state;
    const { classes, theme } = this.props;
    
    const { fullScreen } = this.props;
    

    return (
      <div style={{paddingTop: theme.spacing.unit * 1, paddingBottom: theme.spacing.unit * 1, paddingLeft: theme.spacing.unit * 3}}>                
        <Grid
          container
          spacing={16}
          alignItems="center"
          direction="row"
          justify="space-between"
        >
          <Grid item>
            <span style={{fontFamily: 'roboto'}}>
              {this.props.chartTitle}
            </span>
            <IconButton color="secondary" aria-label="Information" onClick={this.handleClickOpen}>                  
              <Icon>
                info
              </Icon>  
            </IconButton>
          </Grid>
          <Hidden smDown>
            <Grid item style={{marginRight: theme.spacing.unit * 1}}>
              <IconButton color="secondary" aria-label="Download">                  
                <Icon>
                  save_alt
                </Icon>  
              </IconButton> 
            </Grid>
          </Hidden>
        </Grid>                             
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"What is this chart?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              This is some text describing this chart.
            </DialogContentText>
          </DialogContent>
          <DialogActions>            
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Okay
            </Button>
          </DialogActions>
        </Dialog>                  
      </div>                
    );
  }
}

export default withStyles(styles, { withTheme: true })(withRouter(ChartHeader));

