import React from 'react';


import { XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  LineSeries,
  AreaSeries,
  Hint
} from 'react-vis';

import {
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from 'react-vis';

import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';




export default class AreaChart extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    
    return (
      <FlexibleWidthXYPlot height={this.props.height} margin={{left: 50, right: 50, top: 50, bottom: 50}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis />

        <AreaSeries   
          animation        
          data={this.props.allLineData[0]}
          opacity={0.3}
        />   
        <AreaSeries   
          animation        
          data={this.props.allLineData[1]}
          opacity={0.3}
        />   
        <AreaSeries   
          animation        
          data={this.props.allLineData[2]}
          opacity={0.3}
        />
      </FlexibleWidthXYPlot>
    );
  }
}
