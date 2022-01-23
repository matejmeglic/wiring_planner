import React from "react";
import { Text, Line } from "react-konva";
import Round from "../Round";
import DrawWall from "../../components/Canvas/DrawWall";

class CreateSideView extends React.Component {
  state = {
    windowWidth: this.props.windowWidth,
    windowHeight: this.props.windowHeight,
    wallUnitOfMeasure: this.props.wall.unitOfMeasure,
    settings: this.props.settings,
    canvasWallWidth: Round(this.props.windowWidth * this.props.ratio),
    canvasWallHeight: Round(
      (this.props.wall.height / this.props.wall.width) *
        this.props.windowWidth *
        this.props.ratio
    ),
    canvasOneMeter: Round(
      (this.props.windowWidth * this.props.ratio) / this.props.wall.width
    ),
    canvasWallWidthArray: [
      ...Array(Math.floor(this.props.wall.width + 1)).keys(),
    ],
    canvasWallHeightArray: [
      ...Array(Math.floor(this.props.wall.height + 1)).keys(),
    ],
  };

  render() {
    return (
      <div>
        {/* render wall */}
        <DrawWall
          settings={this.state.settings}
          canvasWallWidth={this.state.canvasWallWidth}
          canvasWallHeight={this.state.canvasWallHeight}
          canvasOneMeter={this.state.canvasOneMeter}
          ratio={this.props.ratio}
          wallObject={this.props.wall}
        />
        {/* render width ruler */}
        {this.state.canvasWallWidthArray.map((element, i) => (
          <div>
            <Line
              x={this.state.settings.canvasOffsetWidth}
              y={this.state.settings.canvasOffsetHeight}
              points={[
                this.state.canvasOneMeter * element,
                0,
                this.state.canvasOneMeter * element,
                -this.state.settings.horizontalRulerOffset,
              ]}
              stroke={this.state.settings.rulerAndTextColor}
              strokeWidth={this.state.settings.rulerWidth}
              key={i + "m-wr"}
            />
            <Text
              fontSize={this.state.settings.rulerTextSize}
              text={i + " " + this.state.wallUnitOfMeasure}
              key={i + "m-wrt"}
              fill={this.state.settings.rulerAndTextColor}
              wrap="char"
              x={
                this.state.settings.canvasOffsetWidth +
                this.state.canvasOneMeter * element -
                this.state.settings.rulerTextSize
              }
              y={this.state.settings.horizontalRulerTextOffset}
              scaleY={-1}
            />
          </div>
        ))}
        {this.state.canvasWallWidthArray.map((element, i) => (
          <Line
            x={this.state.settings.canvasOffsetWidth}
            y={this.state.settings.canvasOffsetHeight}
            points={[
              this.state.canvasOneMeter * (element + 0.5),
              0,
              this.state.canvasOneMeter * (element + 0.5),
              -this.state.settings.horizontalRulerOffset / 2,
            ]}
            stroke={this.state.settings.rulerAndTextColor}
            strokeWidth={this.state.settings.rulerWidth}
            key={i + "m-wrh"}
          />
        ))}
        {/* render height ruler */}
        {this.state.canvasWallHeightArray.map((element, i) => (
          <div>
            <Line
              x={this.state.settings.canvasOffsetWidth}
              y={this.state.settings.canvasOffsetHeight}
              points={[
                0,
                this.state.canvasOneMeter * element,
                -this.state.settings.verticalRulerOffset,
                this.state.canvasOneMeter * element,
              ]}
              stroke={this.state.settings.rulerAndTextColor}
              strokeWidth={this.state.settings.rulerWidth}
              key={i + "vr"}
            />
            <Text
              fontSize={this.state.settings.rulerTextSize}
              text={i + " " + this.state.wallUnitOfMeasure}
              key={i + "vrt"}
              fill={this.state.settings.rulerAndTextColor}
              wrap="char"
              x={this.state.settings.verticalRulerTextOffset}
              y={
                this.state.settings.canvasOffsetHeight +
                this.state.canvasOneMeter * element +
                this.state.settings.rulerTextSize / 2
              }
              scaleY={-1}
            />
          </div>
        ))}
        {this.state.canvasWallHeightArray.map((element, i) => (
          <Line
            x={this.state.settings.canvasOffsetWidth}
            y={this.state.settings.canvasOffsetHeight}
            points={[
              0,
              this.state.canvasOneMeter * (element + 0.5),
              -this.state.settings.verticalRulerOffset / 2,
              this.state.canvasOneMeter * (element + 0.5),
            ]}
            stroke={this.state.settings.rulerAndTextColor}
            strokeWidth={this.state.settings.rulerWidth}
            key={i + "vrh"}
          />
        ))}
      </div>
    );
  }
}

export default CreateSideView;
