import React from 'react';


import { XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LineSeries,
  Hint
} from 'react-vis';

import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from 'react-vis';

import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';




export default class ScatterChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
    this._rememberValue = this._rememberValue.bind(this);
    this._forgetValue = this._forgetValue.bind(this);
  }

  _forgetValue(value) {
    this.setState({
      value: null
    });
  }

  _rememberValue(value) {
    this.setState({value});
  }

  render() {
    const {value} = this.state;  
    return (

      <FlexibleWidthXYPlot height={this.props.height} margin={{left: 50, right: 50, top: 50, bottom: 50}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
 
        <MarkSeries
          animation
          data={this.props.allScatterData[0]}
          opacity={0.2}
        />        
        <MarkSeries
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          opacity={0}
          data={this.props.allScatterData[0]}
        />
        <MarkSeries
          animation
          data={this.props.allScatterData[1]}
          opacity={0.2}
        />        
        <MarkSeries
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          opacity={0}
          data={this.props.allScatterData[1]}
        />    
        <MarkSeries
          animation
          data={this.props.allScatterData[2]}
          opacity={0.2}
        />        
        <MarkSeries
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          opacity={0}
          data={this.props.allScatterData[2]}
        />      
        <MarkSeries
          animation
          data={this.props.allScatterData[3]}
          opacity={0.2}
        />        
        <MarkSeries
          onValueMouseOver={this._rememberValue}
          onValueMouseOut={this._forgetValue}
          opacity={0}
          data={this.props.allScatterData[3]}
        />        




        {value ? <Hint value={value} /> : null}
      </FlexibleWidthXYPlot>
    );
  }
}
