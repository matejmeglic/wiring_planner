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

export default function CreateNewWindow(props) {

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

  let specificWiring = wallData.windows[selectedWallDetail.count]

  const [errorMessage, setErrorMessage] = useState("");
  const [horizontalMeasurement, setHorizontalMeasurement] = useState(
    selectedWallDetail.count === "new"
      ? "leftToRight"
      : specificWiring.measurementDirection
  );
  const [hingesValue, setHingesValue] = useState(
    selectedWallDetail.count === "new"
      ? "one"
      : specificWiring.hinges
  );

  const [innerDoorValue, setInnerDoorValue] = useState(
    selectedWallDetail.count === "new"
      ? true
      : specificWiring.innerDoor
  );

  const [doorKnobOrientationValue, setIDoorKnobOrientationValue] = useState(
    selectedWallDetail.count === "new"
      ? "left"
      : specificWiring.doorKnob
  );

  const updateData = () => {
    let updatedData = data;

    let newWiringSettings = {}

    newWiringSettings.description = document.getElementById("description").value;
    newWiringSettings.windowWidth = document.getElementById("windoWidth").value;
    newWiringSettings.windowHeight = document.getElementById("windoHeight").value;
    newWiringSettings.windowShelfStartsOn = document.getElementById("shelfStarts").value;
    newWiringSettings.windowShelfHeight = document.getElementById("shelfHeight").value;
    newWiringSettings.windowDistance = document.getElementById("windowDistance").value;
    newWiringSettings.measurementDirection = horizontalMeasurement
    newWiringSettings.unitOfMeasure = "mm"
    newWiringSettings.hinges = hingesValue
    newWiringSettings.renderShelf = true
    newWiringSettings.innerDoor = innerDoorValue
    newWiringSettings.doorKnob = doorKnobOrientationValue

    updatedData.data.map((room) =>
      room.room_name === selectedRoom
        ? room.walls.map((wall) =>
          wall.wall_name === selectedWall ?
            selectedWallDetail.count === "new" ?
              wall.windows.push(newWiringSettings)
              : wall.windows[selectedWallDetail.count] = newWiringSettings
            : ""
        )
        : ""
    );


    setData((prev) => ({ ...prev, data: updatedData.data }));
    localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
    setMenuLevel("wallDetails");
    setSelectedWallDetail("");

  }


  const changeMeasurementH = (value) => {
    setHorizontalMeasurement(value);
  };

  const changeHingesValue = (value) => {
    setHingesValue(value);
  };

  const changeInnerDoorValue = (value) => {
    setInnerDoorValue(value);
  };

  const changeDoorKnobOrientationValue = (value) => {
    setIDoorKnobOrientationValue(value);
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
          id="description"
          name="description"
          defaultValue={
            selectedWallDetail.count === "new" ? "" : specificWiring.description
          }
          fullWidth
          variant="standard"
          label="Description"
        />
        <TextField
          id="windoWidth"
          name="windowWidth"
          label="Width (1500mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "" : specificWiring.windowWidth}
        />
        <TextField
          id="windoHeight"
          name="windoHeight"
          label="Height (1200mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "" : specificWiring.windowHeight}
        />
        <TextField
          id="shelfStarts"
          name="shelfStarts"
          label="Height where shelf starts (700mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "" : specificWiring.windowShelfStartsOn}
        />
        <TextField
          id="shelfHeight"
          name="shelfHeight"
          label="Shelf Thickness (30mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "" : specificWiring.windowShelfHeight}
        />
        <TextField
          id="windowDistance"
          name="windowDistance"
          label="Distance from the wall (700mm)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={selectedWallDetail.count === "new" ? "" : specificWiring.windowDistance}
        />
        <br /><br />
        <Typography variant="body2" color="text.secondary">
          Distance from wall measured:
        </Typography>
        <FormControl component="fieldset" name="horizontal-measurements">
          <RadioGroup
            onChange={(e) => changeMeasurementH(e.target.value)}
            value={horizontalMeasurement}
            id="hMeasurements"
            aria-label="Where did we measure from?"
            label="Where did we measure from?"
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
        <Typography variant="body2" color="text.secondary">
          Type of hinges:
        </Typography>
        <FormControl component="fieldset" name="horizontal-measurements">
          <RadioGroup
            onChange={(e) => changeHingesValue(e.target.value)}
            value={hingesValue}
            id="hinges"
            aria-label="are there hinges"
            label="Hinges"
            defaultValue={hingesValue}
            sx={{ paddingTop: 1 }}
            name="hinges"
          >
            <FormControlLabel
              value={"one"}
              control={<Radio />}
              label="One"
            />
            <FormControlLabel
              value={"two"}
              control={<Radio />}
              label="Two"
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          Door type:
        </Typography>
        <FormControl component="fieldset" name="horizontal-measurements">
          <RadioGroup
            onChange={(e) => changeInnerDoorValue(e.target.value)}
            value={innerDoorValue}
            id="innerDoor"
            aria-label="innerDoor"
            label="Door type"
            defaultValue={innerDoorValue}
            sx={{ paddingTop: 1 }}
            name="innerDoor"
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Inner"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="Outer"
            />
          </RadioGroup>
        </FormControl>
        <Typography variant="body2" color="text.secondary">
          Door knob orientation:
        </Typography>
        <FormControl component="fieldset" name="horizontal-measurements">
          <RadioGroup
            onChange={(e) => changeDoorKnobOrientationValue(e.target.value)}
            value={doorKnobOrientationValue}
            id="doorKnobOrientation"
            aria-label="doorKnobOrientation"
            label="Door Knob Orientation"
            defaultValue={doorKnobOrientationValue}
            sx={{ paddingTop: 1 }}
            name="doorKnobOrientation"
          >
            <FormControlLabel
              value={"left"}
              control={<Radio />}
              label="left"
            />
            <FormControlLabel
              value={"right"}
              control={<Radio />}
              label="right"
            />
          </RadioGroup>
        </FormControl>


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
