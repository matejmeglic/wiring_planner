import "./App.css";
import DefineStage from "./components/DefineStage";
import DrawWall from "./components/DrawWall.js";
import DrawWindow from "./components/DrawWindow.js";
import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import mainData from "./assets/data.json";
import settings from "./assets/pageViewSettings.json";

class App extends Component {
  data = mainData.rooms[0];
  wallDimensions = DefineStage(
    window.innerWidth,
    window.innerHeight,
    this.data.wall
  );

  render() {
    console.log(this.data);
    return (
      <Stage
        width={
          this.wallDimensions.canvasWallWidth +
          settings.canvasOffsetWidth * settings.canvasOffsetPercentage
        }
        height={
          this.wallDimensions.canvasWallHeight +
          settings.canvasOffsetHeight * settings.canvasOffsetPercentage
        }
        scaleY={-1}
        y={
          this.wallDimensions.canvasWallHeight +
          settings.canvasOffsetHeight * settings.canvasOffsetPercentage
        }
      >
        <Layer>
          <DrawWall
            windowWidth={window.innerWidth}
            windowHeight={window.innerHeight}
            wall={this.data.wall}
            settings={settings}
          />
          {this.data.windows.map((singleWindow, i) => (
            <DrawWindow
              windowWidth={window.innerWidth}
              windowHeight={window.innerHeight}
              wall={this.data.wall}
              singleWindow={singleWindow}
              i={i}
              settings={settings}
            />
          ))}
        </Layer>
      </Stage>
    );
  }
}

export default App;
