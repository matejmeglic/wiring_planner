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
import settings from "../../assets/pageViewSettings.json";

export default function CreateNewWall(props) {
  let data = props.data;
  let setData = props.setData;
  let setMenuLevel = props.setMenuLevel;
  let selectedRoom = props.selectedRoom;
  let setSelectedRoom = props.setSelectedRoom;
  let setSelectedWall = props.setSelectedWall;
  let wallSettings = props.wallSettings;
  let setWallSettings = props.setWallSettings;

  let wallData = [];
  data.data.map((room) =>
    room.room_name === selectedRoom
      ? room.walls.map((wall) => wallData.push(wall))
      : ""
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [loftSelected, setLoftSelected] = useState(
    wallSettings !== "" ? wallSettings.wall.loft : "false"
  );
  const [loftType, setLoftType] = useState(
    wallSettings === ""
      ? "left"
      : wallSettings.wall.loftMeasurements.leftCeilingStarts > 0 &&
        wallSettings.wall.loftMeasurements.leftLoftStartHeight > 0 &&
        wallSettings.wall.loftMeasurements.rightCeilingStarts > 0 &&
        wallSettings.wall.loftMeasurements.rightLoftStartHeight > 0
      ? "both"
      : wallSettings.wall.loftMeasurements.leftCeilingStarts > 0 &&
        wallSettings.wall.loftMeasurements.leftLoftStartHeight > 0
      ? "left"
      : wallSettings.wall.loftMeasurements.rightCeilingStarts > 0 &&
        wallSettings.wall.loftMeasurements.rightLoftStartHeight > 0
      ? "right"
      : "left"
  );

  const changeLoftStatus = (value) => {
    setLoftSelected(value);
  };

  const changeLoftTypeStatus = (value) => {
    setLoftType(value);
  };

  const fetchWallObjectData = () => {
    let wallObject = "";
    if (loftSelected === "true") {
      if (loftType === "left") {
        if (
          document.getElementById("leftLoftStartHeight").value === "" ||
          document.getElementById("leftCeilingStarts").value === ""
        ) {
          setErrorMessage("Please enter loft data.");
          wallObject = "error";
        }
      }
      if (loftType === "right") {
        if (
          document.getElementById("rightLoftStartHeight").value === "" ||
          document.getElementById("rightCeilingStarts").value === ""
        ) {
          setErrorMessage("Please enter loft data.");
          wallObject = "error";
        }
      }
      if (loftType === "both") {
        if (
          document.getElementById("leftLoftStartHeight").value === "" ||
          document.getElementById("leftCeilingStarts").value === "" ||
          document.getElementById("rightLoftStartHeight").value === "" ||
          document.getElementById("rightCeilingStarts").value === "" ||
          document.getElementById("midLoftWidth").value === ""
        ) {
          setErrorMessage("Please enter loft data.");
          wallObject = "error";
        }
      }
    }
    if (document.getElementById("wallHeight").value === "") {
      setErrorMessage("Please enter wall heigth.");
      wallObject = "error";
    }
    if (document.getElementById("wallWidth").value === "") {
      setErrorMessage("Please enter wall width.");
      wallObject = "error";
    }
    if (document.getElementById("wallName").value === "") {
      setErrorMessage("Wall name should not be empty.");
      wallObject = "error";
    }

    if (wallObject === "error") {
      return wallObject;
    } else {
      wallObject = {
        wall_name: document.getElementById("wallName").value,
        wall: {
          width: document.getElementById("wallWidth").value,
          height: document.getElementById("wallHeight").value,
          unitOfMeasure: "m",
          loft: loftSelected,
          loftMeasurements: {},
        },
      };
    }
    if (loftSelected === "true") {
      if (loftType === "left" || loftType === "both") {
        wallObject.wall.loftMeasurements.leftLoftStartHeight =
          document.getElementById("leftLoftStartHeight").value;
        wallObject.wall.loftMeasurements.leftCeilingStarts =
          document.getElementById("leftCeilingStarts").value;
      }
      if (loftType === "right" || loftType === "both") {
        wallObject.wall.loftMeasurements.rightLoftStartHeight =
          document.getElementById("rightLoftStartHeight").value;
        wallObject.wall.loftMeasurements.rightCeilingStarts =
          document.getElementById("rightCeilingStarts").value;
      }
      if (loftType === "both") {
        wallObject.wall.loftMeasurements.midLoftWidth =
          document.getElementById("midLoftWidth").value;
      }
    } else {
      wallObject.wall.loftMeasurements.leftLoftStartHeight = 0;
      wallObject.wall.loftMeasurements.leftCeilingStarts = 0;
      wallObject.wall.loftMeasurements.rightLoftStartHeight = 0;
      wallObject.wall.loftMeasurements.rightCeilingStarts = 0;
      wallObject.wall.loftMeasurements.midLoftWidth = 0;
    }
    if (wallSettings === "") {
      wallObject.windows = [];
      wallObject.wiring = {
        electric: {
          stroke: settings.electricityStroke,
          strokeWidth: settings.electricityStrokeWidth,
          lines: [],
        },
        water: {
          stroke: settings.waterStroke,
          strokeWidth: settings.waterStrokeWidth,
          lines: [],
        },
        plumbing: {
          stroke: settings.plumbingStroke,
          strokeWidth: settings.plumbingStrokeWidth,
          lines: [],
        },
        ethernet: {
          stroke: settings.ethernetStroke,
          strokeWidth: settings.ethernetStrokeWidth,
          lines: [],
        },
      };
    }
    return wallObject;
  };

  const updateData = () => {
    let updatedData = data;

    let wallObject = fetchWallObjectData();

    if (wallObject === "error") {
      return "";
    } else {
      if (wallSettings === "") {
        updatedData.data.map((room) =>
          room.room_name === selectedRoom ? room.walls.push(wallObject) : ""
        );
      } else {
        updatedData.data.map((room, i) =>
          room.room_name === selectedRoom
            ? updatedData.data[i].walls.map((wall, j) =>
                wall.wall_name === wallSettings.wall_name
                  ? updatedData.data[0].walls.splice(j, 1, wallObject)
                  : ""
              )
            : ""
        );
      }
      setData(updatedData);
      localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
      setMenuLevel("walls");
      setSelectedWall("");
      setWallSettings("");
    }
  };

  const returnToWallLevel = () => {
    setMenuLevel("walls");
    setSelectedWall("");
    setWallSettings("");
  };

  const handleKeyDown = (e) => {
    if (e.key === ",") {
      e.preventDefault();
    }
  };

  useEffect(() => {}, [loftSelected]);
  useEffect(() => {}, [loftType]);
  useEffect(() => {}, [errorMessage]);

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
          id="wallName"
          name="wallName"
          label="Direction (Wall name)"
          fullWidth
          variant="standard"
          defaultValue={wallSettings.wall_name}
        />
        <TextField
          id="wallWidth"
          name="wallWidth"
          label="Width (10.5m)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={wallSettings !== "" ? wallSettings.wall.width : ""}
        />
        <TextField
          id="wallHeight"
          name="wallHeight"
          label="Height (2.55m)"
          fullWidth
          variant="standard"
          type="number"
          onKeyDown={handleKeyDown}
          defaultValue={wallSettings !== "" ? wallSettings.wall.height : ""}
        />{" "}
        <br /> <br />
        <Typography variant="body2" color="text.secondary">
          Is there a loft:
        </Typography>
        <FormControl component="fieldset" name="loft-true-false">
          <RadioGroup
            onChange={(e) => changeLoftStatus(e.target.value)}
            value={loftSelected}
            id="loft"
            aria-label="loft"
            defaultValue={loftSelected}
            sx={{ paddingTop: 1 }}
            name="rbgLoft"
          >
            <FormControlLabel value={false} control={<Radio />} label="no" />
            <FormControlLabel value={true} control={<Radio />} label="yes" />
          </RadioGroup>
        </FormControl>
        {loftSelected === "false" ? (
          ""
        ) : (
          <div>
            <Typography variant="body2" color="text.secondary">
              Loft Type:
            </Typography>
            <FormControl component="fieldset" name="loft-type">
              <RadioGroup
                onChange={(e) => changeLoftTypeStatus(e.target.value)}
                value={loftType}
                id="loft"
                aria-label="loft"
                defaultValue={loftType}
                sx={{ paddingTop: 1 }}
                name="rbgLoft"
              >
                <FormControlLabel
                  value={"left"}
                  control={<Radio />}
                  label="Left"
                />
                <FormControlLabel
                  value={"right"}
                  control={<Radio />}
                  label="Right"
                />
                <FormControlLabel
                  value={"both"}
                  control={<Radio />}
                  label="Two Sided"
                />
              </RadioGroup>
            </FormControl>
            {loftType === "left" || loftType === "both" ? (
              <div>
                <TextField
                  id="leftLoftStartHeight"
                  name="leftLoftStartHeight"
                  label="Tilted ceiling starts at (height-left)?"
                  fullWidth
                  variant="standard"
                  type="number"
                  onKeyDown={handleKeyDown}
                  defaultValue={
                    wallSettings !== ""
                      ? wallSettings.wall.loftMeasurements.leftLoftStartHeight
                      : ""
                  }
                />
                <TextField
                  id="leftCeilingStarts"
                  name="leftCeilingStarts"
                  label="Tilt reaches ceiling at (width-left)"
                  fullWidth
                  variant="standard"
                  type="number"
                  onKeyDown={handleKeyDown}
                  defaultValue={
                    wallSettings !== ""
                      ? wallSettings.wall.loftMeasurements.leftCeilingStarts
                      : ""
                  }
                />
              </div>
            ) : (
              ""
            )}
            {loftType === "right" || loftType === "both" ? (
              <div>
                <TextField
                  id="rightLoftStartHeight"
                  name="rightLoftStartHeight"
                  label="Tilted ceiling starts at (height-right)?"
                  fullWidth
                  variant="standard"
                  type="number"
                  onKeyDown={handleKeyDown}
                  defaultValue={
                    wallSettings !== ""
                      ? wallSettings.wall.loftMeasurements.rightLoftStartHeight
                      : ""
                  }
                />
                <TextField
                  id="rightCeilingStarts"
                  name="rightCeilingStarts"
                  label="Tilt reaches ceiling at (width-right)"
                  fullWidth
                  variant="standard"
                  type="number"
                  onKeyDown={handleKeyDown}
                  defaultValue={
                    wallSettings !== ""
                      ? wallSettings.wall.loftMeasurements.rightCeilingStarts
                      : ""
                  }
                />
              </div>
            ) : (
              ""
            )}
            {loftType === "both" ? (
              <TextField
                id="midLoftWidth"
                name="midLoftWidth"
                label="How long is the horizontal ceiling part? (Leave 0 if it doesn't apply)"
                fullWidth
                variant="standard"
                type="number"
                onKeyDown={handleKeyDown}
                defaultValue={
                  wallSettings !== ""
                    ? wallSettings.wall.loftMeasurements.midLoftWidth
                    : ""
                }
              />
            ) : (
              ""
            )}
          </div>
        )}
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
