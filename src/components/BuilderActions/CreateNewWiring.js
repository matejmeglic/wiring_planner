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

  console.log(wallData.wiring.electric);
  console.log(selectedWallDetail);

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

  const updateData = () => {};

  const changeMeasurementH = (value) => {
    setHorizontalMeasurement(value);
  };

  const changeMeasurementV = (value) => {
    verticalMeasurement(value);
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
          defaultValue={"500,0,1500,1000"}
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
          label={
            selectedWallDetail.count === "new"
              ? "Description (optional)"
              : wallData.wiring[selectedWallDetail.type].lines[
                  selectedWallDetail.count
                ].description
          }
          fullWidth
          variant="standard"
          defaultValue={""}
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
