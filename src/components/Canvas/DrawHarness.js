import React from "react";
import { Rect, Circle } from "react-konva";
import Round from "../Round";
import OrientationTransformDataPoints from "../../components/Canvas/OrientationTransformDataPoints";

class DrawHarness extends React.Component {
  canvasOneMeter = Round(
    (this.props.windowWidth * 0.9) / this.props.wall.width
  );

  transformedPoints = OrientationTransformDataPoints(
    this.props.singleHarness.dataPoints,
    this.props.singleHarness.orientationHorizontal,
    this.props.singleHarness.orientationVertical,
    this.canvasOneMeter,
    Round(this.props.windowWidth * 0.9),
    Round(
      (this.props.wall.height / this.props.wall.width) *
        this.props.windowWidth *
        0.9
    ),
    this.props.settings.canvasOffsetWidth,
    this.props.settings.canvasOffsetHeight
  );

  render() {
    return this.props.singleHarness.shape === "rect" ? (
      <Rect
        x={
          this.props.settings.canvasOffsetWidth +
          this.transformedPoints.transformedPoints[0] -
          (Round(this.props.singleHarness.sizeHorizontal / 1000) *
            this.canvasOneMeter) /
            2
        }
        y={
          this.props.settings.canvasOffsetHeight +
          this.transformedPoints.transformedPoints[1] -
          (Round(this.props.singleHarness.sizeVertical / 1000) *
            this.canvasOneMeter) /
            2
        }
        width={
          Round(this.props.singleHarness.sizeHorizontal / 1000) *
          this.canvasOneMeter
        }
        height={
          Round(this.props.singleHarness.sizeVertical / 1000) *
          this.canvasOneMeter
        }
        fill={this.props.singleHarness.fill}
        shadowColor={"#000"}
        shadowBlur={2}
        key={this.props.iKey + " " + this.props.i}
      />
    ) : (
      <Circle
        x={
          this.props.settings.canvasOffsetWidth +
          this.transformedPoints.transformedPoints[0] -
          (Round(this.props.singleHarness.sizeRadius / 1000) *
            this.canvasOneMeter) /
            4
        }
        y={
          this.props.settings.canvasOffsetHeight +
          this.transformedPoints.transformedPoints[1] -
          (Round(this.props.singleHarness.sizeRadius / 1000) *
            this.canvasOneMeter) /
            4
        }
        radius={
          (Round(this.props.singleHarness.sizeRadius / 1000) *
            this.canvasOneMeter) /
          2
        }
        fill={this.props.singleHarness.fill}
        shadowColor={"#000"}
        shadowBlur={2}
        key={this.props.iKey + " " + this.props.i}
      />
    );
  }
}
export default DrawHarness;
