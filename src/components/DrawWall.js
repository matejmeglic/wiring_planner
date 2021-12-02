import React, { Component, useState } from "react";
import { Line } from "react-konva";
import CalculateLoftPoints from "./CalculateLoftPoints";

class DrawWall extends React.Component {
  state = {
    settings: this.props.settings,
    wallWidth: this.props.canvasWallWidth,
    wallHeight: this.props.canvasWallHeight,
    loft: this.props.wallObject.loft,
  };

  pointsLoftFalse = [
    0,
    0,
    0,
    this.state.wallHeight,
    this.state.wallWidth,
    this.state.wallHeight,
    this.state.wallWidth,
    0,
    0,
    0,
  ];

  render() {
    return (
      <Line
        x={this.state.settings.canvasOffsetWidth}
        y={this.state.settings.canvasOffsetHeight}
        points={
          this.state.loft === false
            ? this.pointsLoftFalse
            : CalculateLoftPoints(
                this.state.wallWidth,
                this.state.wallHeight,
                this.props.wallObject.loftMeasurements,
                this.props.canvasOneMeter,
                this.props.ratio
              )
        }
        strokeWidth={this.state.settings.wallWidth}
        stroke={this.state.settings.wallColor}
      />
    );
  }
}

export default DrawWall;
