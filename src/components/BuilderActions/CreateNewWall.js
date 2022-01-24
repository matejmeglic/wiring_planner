import React, { useState } from "react";
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

  const [loftSelected, setLoftSelected] = useState(
    wallSettings !== "" ? wallSettings.wall.loft : false
  );

  const checkIfValue = (field) => {
    if (field === "" || field === undefined) {
      return 0;
    } else {
      return field;
    }
  };

  const checkIfEmpty = (field) => {
    if (field === "") {
      return "";
    } else {
      return field;
    }
  };

  const updateData = () => {
    let updatedData = data;

    let wallObject = {
      wall_name: document.getElementById("wallName").value,
      wall: {
        width: checkIfValue(document.getElementById("wallWidth").value),
        height: checkIfValue(document.getElementById("wallHeight").value),
        unitOfMeasure: "m",
        loft: loftSelected,
        loftMeasurements: {
          leftLoftStartHeight: checkIfValue(
            document.getElementById("leftLoftStartHeight").value
          ),
          leftCeilingStarts: checkIfValue(
            document.getElementById("leftCeilingStarts").value
          ),
          rightLoftStartHeight: checkIfValue(
            document.getElementById("rightLoftStartHeight").value
          ),
          rightCeilingStarts: checkIfValue(
            document.getElementById("rightCeilingStarts").value
          ),
          midLoftWidth: checkIfValue(
            document.getElementById("midLoftWidth").value
          ),
        },
      },
    };

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
  };

  const returnToWallLevel = () => {
    setMenuLevel("walls");
    setSelectedWall("");
    setWallSettings("");
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

        <TextField
          id="wallName"
          name="wallName"
          label="Direction (Wall name)"
          fullWidth
          variant="standard"
          defaultValue={checkIfEmpty(wallSettings.wall_name)}
        />
        <TextField
          id="wallWidth"
          name="wallWidth"
          label="Width (10.5m)"
          fullWidth
          variant="standard"
          type="number"
          defaultValue={wallSettings !== "" ? wallSettings.wall.width : ""}
        />

        <TextField
          id="wallHeight"
          name="wallHeight"
          label="Height (2.55m)"
          fullWidth
          variant="standard"
          type="number"
          defaultValue={wallSettings !== "" ? wallSettings.wall.height : ""}
        />

        <p>Is there an attic ceiling: </p>

        <FormControl component="fieldset" name="method-of-payment">
          <RadioGroup
            onChange={(e) => setLoftSelected(e.target.value)}
            value={loftSelected}
            id="loft"
            aria-label="loft"
            defaultValue={loftSelected}
            sx={{ paddingTop: 1 }}
            name="rbgLoft"
          >
            <FormControlLabel value={false} control={<Radio />} label="false" />
            <FormControlLabel value={true} control={<Radio />} label="true" />
          </RadioGroup>
        </FormControl>

        <p>From which directions does ceiling tilt: </p>

        <RadioGroup
          id="tilt"
          aria-label="loft"
          defaultValue="leftToRight"
          sx={{ paddingTop: 1 }}
          name="rbgLoft"
        >
          <FormControlLabel
            value="leftToRight"
            control={<Radio />}
            label="Left to Right"
          />
          <FormControlLabel
            value="rightToLeft"
            control={<Radio />}
            label="Right to Left"
          />
          <FormControlLabel value="both" control={<Radio />} label="Both" />
        </RadioGroup>

        <TextField
          id="leftLoftStartHeight"
          name="leftLoftStartHeight"
          label="Tilted ceiling starts at (height-left)?"
          fullWidth
          variant="standard"
          type="number"
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
          defaultValue={
            wallSettings !== ""
              ? wallSettings.wall.loftMeasurements.leftCeilingStarts
              : ""
          }
        />
        <TextField
          id="rightLoftStartHeight"
          name="rightLoftStartHeight"
          label="Tilted ceiling starts at (height-right)?"
          fullWidth
          variant="standard"
          type="number"
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
          defaultValue={
            wallSettings !== ""
              ? wallSettings.wall.loftMeasurements.rightCeilingStarts
              : ""
          }
        />
        <TextField
          id="midLoftWidth"
          name="midLoftWidth"
          label="How long is the horizontal ceiling part? (Leave 0 if it doesn't apply)"
          fullWidth
          variant="standard"
          type="number"
          defaultValue={
            wallSettings !== ""
              ? wallSettings.wall.loftMeasurements.midLoftWidth
              : ""
          }
        />

        <br />
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
