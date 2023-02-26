import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { red } from "@mui/material/colors";

export default function CreateNewWiring(props) {
  let data = props.data;
  let setData = props.setData;
  let setMenuLevel = props.setMenuLevel;
  let selectedRoom = props.selectedRoom;
  let selectedWall = props.selectedWall;
  let setSelectedRoom = props.setSelectedRoom;
  let setSelectedWall = props.setSelectedWall;
  let wallSettings = props.wallSettings;
  let setWallSettings = props.setWallSettings;
  let selectedWallDetail = props.selectedWallDetail;
  let setSelectedWallDetail = props.setSelectedWallDetail;

  let wallData;
  data.data.map((room) =>
    room.room_name === selectedRoom
      ? room.walls.map((wall) =>
        wall.wall_name === selectedWall ? (wallData = wall) : ""
      )
      : ""
  );

  let specificWiring = wallData.wiring[selectedWallDetail.type].lines[selectedWallDetail.count]

  const [errorMessage, setErrorMessage] = useState("");
  const [horizontalMeasurement, setHorizontalMeasurement] = useState(
    selectedWallDetail.count === "new"
      ? "leftToRight"
      : wallData.wiring[selectedWallDetail.type].lines[selectedWallDetail.count]
        .orientationHorizontal
  );
  const [verticalMeasurement, setVerticalMeasurement] = useState(
    selectedWallDetail.count === "new"
      ? "bottomToTop"
      : wallData.wiring[selectedWallDetail.type].lines[selectedWallDetail.count]
        .orientationVertical
  );

  const [drawHarnessValue, setDrawHarnessValue] = useState(
    selectedWallDetail.count === "new"
      ? false
      : wallData.wiring[selectedWallDetail.type].lines[selectedWallDetail.count]
        .harness.draw
  );

  const [horizontalMeasurementHarness, setHorizontalMeasurementHarness] = useState(
    selectedWallDetail.count === "new"
      ? "leftToRight"
      : wallData.wiring[selectedWallDetail.type].lines[selectedWallDetail.count]
        .harness.harnessArray[0].orientationHorizontal
  );

  const [verticalMeasurementHarness, setVerticalMeasurementHarness] = useState(
    selectedWallDetail.count === "new"
      ? "bottomToTop"
      : wallData.wiring[selectedWallDetail.type].lines[selectedWallDetail.count]
        .harness.harnessArray[0].orientationHorizontal
  );

  const changeDrawHarnessValue = (value) => {
    setDrawHarnessValue(value);
  };

  const changeMeasurementHH = (value) => {
    setHorizontalMeasurementHarness(value);
  };

  const changeMeasurementVH = (value) => {
    setVerticalMeasurementHarness(value);
  };

  console.log(specificWiring)

  const updateData = () => {
    let updatedData = data;

    let newWiringSettings = {}

    newWiringSettings.description = document.getElementById("description").value;
    newWiringSettings.dataPoints = document.getElementById("dataPoints").value.split(',');
    newWiringSettings.orientationHorizontal = horizontalMeasurement
    newWiringSettings.orientationVertical = verticalMeasurement
    newWiringSettings.harness = {
      "draw": drawHarnessValue, "harnessArray": [{
        dataPoints: document.getElementById("harnessDataPoints").value.split(','),
        orientationHorizontal: horizontalMeasurementHarness,
        orientationVertical: verticalMeasurementHarness,
        shape: "rect",
        sizeHorizontal: document.getElementById("harnessWidth").value,
        sizeVertical: document.getElementById("harnessHeight").value,
        fill: document.getElementById("harnessColor").value
      }
      ]
    }


    /*     console.log(newWiringSettings)
        console.log(selectedWall) */

    /*   console.log(updatedData)
      console.log(newWiringSettings) */

    updatedData.data.map((room) =>
      room.room_name === selectedRoom
        ? room.walls.map((wall) =>
          wall.wall_name === selectedWall ?
            selectedWallDetail.count === "new" ?
              wall.wiring[selectedWallDetail.type].lines.push(newWiringSettings)
              : wall.wiring[selectedWallDetail.type].lines[selectedWallDetail.count] = newWiringSettings
            : ""
        )
        : ""
    );

    /*     console.log(updatedData.data[0].walls[0].wiring.electric.lines) */
    setData((prev) => ({ ...prev, data: updatedData.data }));
    localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
    setMenuLevel("wallDetails");
    setSelectedWallDetail("");
  }


  const changeMeasurementH = (value) => {
    setHorizontalMeasurement(value);
  };

  const changeMeasurementV = (value) => {
    setVerticalMeasurement(value);
  };

  const returnToWallLevel = () => {
    setMenuLevel("wallDetails");
    setSelectedWallDetail("");
  };

  const handleKeyDown = (e) => {
    // TODO REGEX
  };

  return (
    <Paper sx={{ width: 300, maxWidth: "100%", p: 3 }}>
      <MenuList>
        <MenuItem key="back">
          {" "}
          <ListItemText onClick={(e) => returnToWallLevel()}>
            <Typography variant="body2" color="text.secondary">
              Back to walls
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        <TextField
          id="dataPoints"
          name="dataPoints"
          label="Points w,h 500,0,1500,1000 in mm"
          fullWidth
          variant="standard"
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          defaultValue={selectedWallDetail.count === "new" ? "500,0,1500,1000" : specificWiring.dataPoints}
        />
        <br /> <br />
        <Typography variant="body2" color="text.secondary">
          Horizontal measurements:
        </Typography>
        <FormControl component="fieldset" name="horizontal-measurements">
          <RadioGroup
            onChange={(e) => changeMeasurementH(e.target.value)}
            value={horizontalMeasurement}
            id="hMeasurements"
            aria-label="horizontal measurements"
            defaultValue={horizontalMeasurement}
            sx={{ paddingTop: 1 }}
            name="hMeasurements"
          >
            <FormControlLabel
              value={"leftToRight"}
              control={<Radio />}
              label="Left to right"
            />
            <FormControlLabel
              value={"rightToLeft"}
              control={<Radio />}
              label="Right to left"
            />
          </RadioGroup>
        </FormControl>
        <br /> <br />
        <Typography variant="body2" color="text.secondary">
          Vertical measurements:
        </Typography>
        <FormControl component="fieldset" name="vertical-measurements">
          <RadioGroup
            onChange={(e) => changeMeasurementV(e.target.value)}
            value={verticalMeasurement}
            id="vMeasurements"
            aria-label="vertical measurements"
            defaultValue={verticalMeasurement}
            sx={{ paddingTop: 1 }}
            name="vMeasurements"
          >
            <FormControlLabel
              value={"bottomToTop"}
              control={<Radio />}
              label="From bottom up"
            />
            <FormControlLabel
              value={"topToBottom"}
              control={<Radio />}
              label="Top to bottom"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="description"
          name="description"
          defaultValue={
            selectedWallDetail.count === "new" ? "" : specificWiring.description
          }
          fullWidth
          variant="standard"
          label="Description"
        />

        <br /> <br />
        <Typography variant="body2" color="text.secondary">
          Harness:
        </Typography>
        <FormControl component="fieldset" name="vertical-measurements">
          <RadioGroup
            onChange={(e) => changeDrawHarnessValue(e.target.value)}
            value={drawHarnessValue}
            id="drawHarnessValue"
            aria-label="Draw harness"
            defaultValue={drawHarnessValue}
            sx={{ paddingTop: 1 }}
            name="drawHarnessValue"
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Yes"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="harnessDataPoints"
          name="harnessDataPoints"
          label="w,h pair 700,400 in mm"
          fullWidth
          variant="standard"
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          defaultValue={selectedWallDetail.count === "new" ? "700,400" : specificWiring.harness.harnessArray[0].dataPoints}
        />
        <br /> <br />
        <Typography variant="body2" color="text.secondary">
          Horizontal Harness measurements:
        </Typography>
        <FormControl component="fieldset" name="horizontal-measurementsh">
          <RadioGroup
            onChange={(e) => changeMeasurementHH(e.target.value)}
            value={horizontalMeasurementHarness}
            id="hMeasurementsh"
            aria-label="horizontal measurementsh"
            defaultValue={horizontalMeasurementHarness}
            sx={{ paddingTop: 1 }}
            name="hMeasurementsh"
          >
            <FormControlLabel
              value={"leftToRight"}
              control={<Radio />}
              label="Left to right"
            />
            <FormControlLabel
              value={"rightToLeft"}
              control={<Radio />}
              label="Right to left"
            />
          </RadioGroup>
        </FormControl>
        <br /> <br />
        <Typography variant="body2" color="text.secondary">
          Vertical Harness measurements:
        </Typography>
        <FormControl component="fieldset" name="vertical-measurementsh">
          <RadioGroup
            onChange={(e) => changeMeasurementVH(e.target.value)}
            value={verticalMeasurementHarness}
            id="vMeasurementsh"
            aria-label="vertical measurementsh"
            defaultValue={verticalMeasurementHarness}
            sx={{ paddingTop: 1 }}
            name="vMeasurementsh"
          >
            <FormControlLabel
              value={"bottomToTop"}
              control={<Radio />}
              label="From bottom up"
            />
            <FormControlLabel
              value={"topToBottom"}
              control={<Radio />}
              label="Top to bottom"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          id="harnessWidth"
          name="harnessWidth"
          label="Width (200mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "200" : specificWiring.harness.harnessArray[0].sizeHorizontal}
        />
        <TextField
          id="harnessHeight"
          name="harnessHeight"
          label="Height (80mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "80" : specificWiring.harness.harnessArray[0].sizeVertical}
        />
        <TextField
          id="harnessColor"
          name="harnessColor"
          label="#FFC433"
          fullWidth
          variant="standard"
          type="text"
          onKeyDown={(e) => handleKeyDown(e)}
          defaultValue={selectedWallDetail.count === "new" ? "#FFC433" : specificWiring.harness.harnessArray[0].fill}
        />

        <br />
        <br />
        <Typography variant="body2" color={red[300]}>
          {errorMessage} <br />
        </Typography>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          color="secondary"
          type="submit"
          onClick={updateData}
        >
          Save changes
        </Button>
      </MenuList>
    </Paper>
  );
}
