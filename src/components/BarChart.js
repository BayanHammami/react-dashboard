import React from 'react';


import { XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  VerticalBarSeries,
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




export default class BarChart extends React.Component {
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
      <FlexibleWidthXYPlot height={this.props.height}>
      <XAxis />
      <YAxis />
        <VerticalBarSeries
          animation
          data={this.props.allBarData[0]}
          style={{}}
        />
        <VerticalBarSeries
          animation
          data={this.props.allBarData[1]}
          style={{}}
        />
        <VerticalBarSeries
          animation
          data={this.props.allBarData[2]}
          style={{}}
        />
      </FlexibleWidthXYPlot>

    );
  }
}
