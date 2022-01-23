import React from "react";
import { Line } from "react-konva";
import Round from "../Round";
import OrientationTransformDataPoints from "../../components/Canvas/OrientationTransformDataPoints";

class DrawWiring extends React.Component {
  state = {
    settings: this.props.settings,
    points: OrientationTransformDataPoints(
      this.props.singleLine.dataPoints,
      this.props.singleLine.orientationHorizontal,
      this.props.singleLine.orientationVertical,
      Round((this.props.windowWidth * 0.9) / this.props.wall.width),
      Round(this.props.windowWidth * 0.9),
      Round(
        (this.props.wall.height / this.props.wall.width) *
          this.props.windowWidth *
          0.9
      ),
      this.props.settings.canvasOffsetWidth,
      this.props.settings.canvasOffsetHeight
    ),
    strokeWidth: this.props.strokeWidth,
    stroke: this.props.stroke,
    i: this.props.i,
    iKey: this.props.iKey,
  };

  render() {
    return (
      <Line
        x={this.state.settings.canvasOffsetWidth}
        y={this.state.settings.canvasOffsetHeight}
        points={this.state.points.transformedPoints}
        stroke={this.state.stroke}
        strokeWidth={this.state.strokeWidth}
        key={this.state.i + " " + this.state.iKey}
      />
    );
  }
}

export default DrawWiring;
