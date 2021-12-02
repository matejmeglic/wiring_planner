import Round from "./Round";

function CalculateLoftPoints(
  wallWidth,
  wallHeight,
  loftMeasurements,
  oneMeter,
  ratio
) {
  let state = {
    wallWidth: wallWidth,
    wallHeight: wallHeight,
    loftLeft: false,
    loftRight: false,
  };

  let points = [];

  if (loftMeasurements.leftLoftStartHeight > 0) {
    state.loftLeft = true;
  }

  if (loftMeasurements.rightLoftStartHeight > 0) {
    state.loftRight = true;
  }

  if (
    state.loftLeft === true &&
    state.loftRight === true &&
    loftMeasurements.midLoftWidth > 0
  ) {
    points = [
      0,
      0,
      0,
      loftMeasurements.leftLoftStartHeight * oneMeter,
      loftMeasurements.leftCeilingStarts * oneMeter,
      state.wallHeight,
      (loftMeasurements.leftCeilingStarts + loftMeasurements.midLoftWidth) *
        oneMeter,
      state.wallHeight,
      state.wallWidth,
      loftMeasurements.rightLoftStartHeight * oneMeter,
      state.wallWidth,
      0,
      0,
      0,
    ];
  } else if (state.loftLeft === true && state.loftRight === true) {
    points = [
      0,
      0,
      0,
      loftMeasurements.leftLoftStartHeight * oneMeter,
      loftMeasurements.leftCeilingStarts * oneMeter,
      state.wallHeight,
      state.wallWidth,
      loftMeasurements.rightLoftStartHeight * oneMeter,
      state.wallWidth,
      0,
      0,
      0,
    ];
  } else if (state.loftLeft === true) {
    points = [
      0,
      0,
      0,
      loftMeasurements.leftLoftStartHeight * oneMeter,
      loftMeasurements.leftCeilingStarts * oneMeter,
      state.wallHeight,
      state.wallWidth,
      state.wallHeight,
      state.wallWidth,
      0,
      0,
      0,
    ];
  } else if (state.loftRight === true) {
    points = [
      0,
      0,
      0,
      state.wallHeight,
      state.wallWidth - loftMeasurements.rightCeilingStarts * oneMeter,
      state.wallHeight,
      state.wallWidth,
      loftMeasurements.rightLoftStartHeight * oneMeter,
      state.wallWidth,
      0,
      0,
      0,
    ];
  }

  return points;
}

export default CalculateLoftPoints;
