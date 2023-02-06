import React from "react";
import { Line } from "react-konva";
import Box from "@mui/material/Box";
import CalculateLoftPoints from "./CalculateLoftPoints";

class DrawWall extends React.Component {
  state = {
    settings: this.props.settings,
    wallWidth: this.props.canvasWallWidth,
    wallHeight: this.props.canvasWallHeight,
    loft: this.props.wallObject.loft,
  };


  render() {
    return (


      <Line
        x={this.state.settings.canvasOffsetWidth}
        y={this.state.settings.canvasOffsetHeight}
        points={CalculateLoftPoints(
          this.state.wallWidth,
          this.state.wallHeight,
          this.props.wallObject.loftMeasurements,
          this.props.canvasOneMeter
        )
        }
        strokeWidth={this.state.settings.wallWidth}
        stroke={this.state.settings.wallColor}
      />

    );
  }
}

export default DrawWall;
