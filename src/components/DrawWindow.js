import React, { Component, useState } from "react";
import { Rect } from "react-konva";
import Round from "./Round";

class DrawWindow extends React.Component {
  state = {
    windowWidth: this.props.windowWidth,
    windowHeight: this.props.windowHeight,
    settings: this.props.settings,
    canvasWallWidth: Round(this.props.windowWidth * 0.9),
    canvasWallHeight: Round(
      (this.props.wall.height / this.props.wall.width) *
        this.props.windowWidth *
        0.9
    ),
    canvasOneMeter: Round(
      (this.props.windowWidth * 0.9) / this.props.wall.width
    ),
    singleWindow: this.props.singleWindow,
    i: this.props.i,
  };

  render() {
    return (
      <div>
        {/* render window-blue */}
        <div>
          <Rect
            x={
              this.state.singleWindow.measurementDirection === "leftToRight"
                ? this.state.settings.canvasOffsetWidth +
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowDistance) /
                    1000
                : this.state.singleWindow.measurementDirection === "rightToLeft"
                ? this.state.settings.canvasOffsetWidth +
                  this.state.canvasWallWidth -
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowWidth) /
                    1000 -
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowDistance) /
                    1000
                : 0
            }
            y={
              this.state.settings.canvasOffsetHeight +
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowShelfStartsOn) /
                1000
            }
            width={
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowWidth) /
              1000
            }
            height={
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowHeight) /
              1000
            }
            fill={this.state.settings.windowColor}
            key={this.state.i + "w"}
          />
          {/* render window frame-hinges */}
          <Rect
            x={
              this.state.singleWindow.measurementDirection === "leftToRight"
                ? this.state.settings.canvasOffsetWidth +
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowDistance) /
                    1000 +
                  this.state.settings.shelfWidth / 2
                : this.state.singleWindow.measurementDirection === "rightToLeft"
                ? this.state.settings.canvasOffsetWidth +
                  this.state.canvasWallWidth -
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowWidth) /
                    1000 -
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowDistance) /
                    1000 +
                  this.state.settings.shelfWidth / 2
                : 0
            }
            y={
              this.state.settings.canvasOffsetHeight +
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowShelfStartsOn) /
                1000 +
              this.state.settings.shelfWidth / 2
            }
            width={
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowWidth) /
                1000 -
              this.state.settings.shelfWidth
            }
            height={
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowHeight) /
                1000 -
              this.state.settings.shelfWidth
            }
            stroke={this.state.settings.windowHingesColor}
            strokeWidth={this.state.settings.shelfWidth}
            shadowColor={"#000"}
            shadowBlur={1}
            key={this.state.i + "wh"}
          />
          {/* plot middle bar if hinges=two */}
          {this.state.singleWindow.hinges === "two" ? (
            <Rect
              x={
                this.state.singleWindow.measurementDirection === "leftToRight"
                  ? this.state.settings.canvasOffsetWidth +
                    (this.state.canvasOneMeter *
                      this.state.singleWindow.windowDistance) /
                      1000 +
                    (this.state.canvasOneMeter *
                      this.state.singleWindow.windowWidth) /
                      1000 /
                      2 -
                    this.state.settings.shelfWidth / 2
                  : this.state.singleWindow.measurementDirection ===
                    "rightToLeft"
                  ? this.state.settings.canvasOffsetWidth +
                    this.state.canvasWallWidth -
                    (this.state.canvasOneMeter *
                      this.state.singleWindow.windowWidth) /
                      1000 /
                      2 -
                    (this.state.canvasOneMeter *
                      this.state.singleWindow.windowDistance) /
                      1000 -
                    this.state.settings.shelfWidth / 2
                  : 0
              }
              y={
                this.state.settings.canvasOffsetHeight +
                (this.state.canvasOneMeter *
                  this.state.singleWindow.windowShelfStartsOn) /
                  1000 +
                this.state.settings.shelfWidth / 2
              }
              width={this.state.settings.shelfWidth}
              height={
                (this.state.canvasOneMeter *
                  this.state.singleWindow.windowHeight) /
                  1000 -
                this.state.settings.shelfWidth
              }
              fill={this.state.settings.windowHingesColor}
              key={this.state.i + "wh"}
            />
          ) : (
            <div></div>
          )}
        </div>
        {/* render window shelves */}
        {this.state.singleWindow.renderShelf === true ? (
          <Rect
            x={
              this.state.singleWindow.measurementDirection === "leftToRight"
                ? this.state.settings.canvasOffsetWidth +
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowDistance) /
                    1000
                : this.state.singleWindow.measurementDirection === "rightToLeft"
                ? this.state.settings.canvasOffsetWidth +
                  this.state.canvasWallWidth -
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowWidth) /
                    1000 -
                  (this.state.canvasOneMeter *
                    this.state.singleWindow.windowDistance) /
                    1000
                : 0
            }
            y={
              this.state.settings.canvasOffsetHeight +
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowShelfStartsOn) /
                1000
            }
            width={
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowWidth) /
              1000
            }
            height={
              (this.state.canvasOneMeter *
                this.state.singleWindow.windowShelfHeight) /
              1000
            }
            fill={this.state.settings.shelfColor}
            shadowBlur={0}
            key={this.state.i + "s"}
          />
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default DrawWindow;
