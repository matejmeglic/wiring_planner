import DefineStage from "../../components/Canvas/DefineStage";
import CreateSideView from "../../components/Canvas/CreateSideView.js";
import DrawWindow from "../../components/Canvas/DrawWindow.js";
import DrawWiring from "../../components/Canvas/DrawWiring";
import DrawHarness from "../../components/Canvas/DrawHarness";
import { Stage, Layer } from "react-konva";
import settings from "../../assets/pageViewSettings.json";

function RenderWall(data) {
  let wallDimensions = DefineStage(
    window.innerWidth,
    window.innerHeight,
    data.wall
  );

  return (
    <div>
      <br />
      <h2 style={{ marginLeft: settings.canvasOffsetWidth }}>
        {data.wall_name}
      </h2>
      <Stage
        width={
          wallDimensions.canvasWallWidth +
          settings.canvasOffsetWidth * settings.canvasOffsetPercentage
        }
        height={
          wallDimensions.canvasWallHeight +
          settings.canvasOffsetHeight * settings.canvasOffsetPercentage
        }
        scaleY={-1}
        y={
          wallDimensions.canvasWallHeight +
          settings.canvasOffsetHeight * settings.canvasOffsetPercentage
        }
      >
        <Layer>
          <CreateSideView
            windowWidth={window.innerWidth}
            windowHeight={window.innerHeight}
            wall={data.wall}
            settings={settings}
            ratio={0.9}
          />
          {data.windows.map((singleWindow, i) => (
            <DrawWindow
              windowWidth={window.innerWidth}
              windowHeight={window.innerHeight}
              wall={data.wall}
              singleWindow={singleWindow}
              i={i}
              settings={settings}
            />
          ))}
          {data.wiring.electric.lines.map((singleLine, i) => (
            <DrawWiring
              windowWidth={window.innerWidth}
              windowHeight={window.innerHeight}
              wall={data.wall}
              strokeWidth={data.wiring.electric.strokeWidth}
              stroke={data.wiring.electric.stroke}
              singleLine={singleLine}
              i={i}
              iKey="el"
              settings={settings}
            />
          ))}
          {data.wiring.electric.lines.map((singleLine) =>
            singleLine.harness.draw === true ? (
              singleLine.harness.harnessArray.map((singleHarness, i) => (
                <DrawHarness
                  windowWidth={window.innerWidth}
                  windowHeight={window.innerHeight}
                  wall={data.wall}
                  singleHarness={singleHarness}
                  i={i}
                  iKey="h"
                  settings={settings}
                />
              ))
            ) : (
              <div></div>
            )
          )}
          {data.wiring.water.lines.map((singleLine, i) => (
            <DrawWiring
              windowWidth={window.innerWidth}
              windowHeight={window.innerHeight}
              wall={data.wall}
              strokeWidth={data.wiring.water.strokeWidth}
              stroke={data.wiring.water.stroke}
              singleLine={singleLine}
              i={i}
              iKey="el"
              settings={settings}
            />
          ))}
          {data.wiring.water.lines.map((singleLine) =>
            singleLine.harness.draw === true ? (
              singleLine.harness.harnessArray.map((singleHarness, i) => (
                <DrawHarness
                  windowWidth={window.innerWidth}
                  windowHeight={window.innerHeight}
                  wall={data.wall}
                  singleHarness={singleHarness}
                  i={i}
                  iKey="h"
                  settings={settings}
                />
              ))
            ) : (
              <div></div>
            )
          )}
          {data.wiring.ethernet.lines.map((singleLine, i) => (
            <DrawWiring
              windowWidth={window.innerWidth}
              windowHeight={window.innerHeight}
              wall={data.wall}
              strokeWidth={data.wiring.ethernet.strokeWidth}
              stroke={data.wiring.ethernet.stroke}
              singleLine={singleLine}
              i={i}
              iKey="el"
              settings={settings}
            />
          ))}
          {data.wiring.ethernet.lines.map((singleLine) =>
            singleLine.harness.draw === true ? (
              singleLine.harness.harnessArray.map((singleHarness, i) => (
                <DrawHarness
                  windowWidth={window.innerWidth}
                  windowHeight={window.innerHeight}
                  wall={data.wall}
                  singleHarness={singleHarness}
                  i={i}
                  iKey="h"
                  settings={settings}
                />
              ))
            ) : (
              <div></div>
            )
          )}
        </Layer>
      </Stage>
    </div>
  );
}

export default RenderWall;
