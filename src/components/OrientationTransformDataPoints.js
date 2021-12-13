import Round from "./Round";

function OrientationTransformDataPoints(
  dataPoints,
  orientationHorizontal,
  orientationVertical,
  canvasOneMeter,
  canvasWallWidth,
  canvasWallHeight,
  canvasOffsetWidth,
  canvasOffsetHeight
) {
  let transformedPoints = [];

  if (
    orientationHorizontal === "leftToRight" &&
    orientationVertical === "bottomToTop"
  ) {
    transformedPoints = dataPoints.map(
      (point) => Round(point / 1000) * canvasOneMeter
    );
  } else if (
    orientationHorizontal === "rightToLeft" &&
    orientationVertical === "bottomToTop"
  ) {
    transformedPoints = dataPoints.map((point, i) =>
      i % 2
        ? Round(point / 1000) * canvasOneMeter
        : Round(
            canvasWallWidth -
              canvasOffsetWidth -
              (point / 1000) * canvasOneMeter
          )
    );
  } else if (
    orientationHorizontal === "leftToRight" &&
    orientationVertical === "topToBottom"
  ) {
    transformedPoints = dataPoints.map((point, i) =>
      i % 2
        ? Round(canvasWallHeight - (point / 1000) * canvasOneMeter)
        : Round(point / 1000) * canvasOneMeter
    );
  } else if (
    orientationHorizontal === "rightToLeft" &&
    orientationVertical === "topToBottom"
  ) {
    transformedPoints = dataPoints.map((point, i) =>
      i % 2
        ? Round(canvasWallHeight - (point / 1000) * canvasOneMeter)
        : Round(canvasWallWidth - (point / 1000) * canvasOneMeter)
    );
  }

  return { transformedPoints: transformedPoints, originalPoints: dataPoints };
}

export default OrientationTransformDataPoints;
