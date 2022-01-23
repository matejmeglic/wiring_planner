import Round from "../Round";

function DefineStage(windowWidth, windowHeight, wall) {
  let state = {
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    windowWidthRenderRatio: windowWidth * 0.9,
    wall: wall,
  };

  let wallDimensions = {
    canvasWallWidth: Round(state.windowWidthRenderRatio),
    canvasWallHeight: Round(
      (state.wall.height / state.wall.width) * state.windowWidthRenderRatio
    ),
    canvasOneMeter: Round(state.windowWidthRenderRatio / state.wall.width),
  };

  return wallDimensions;
}

export default DefineStage;
