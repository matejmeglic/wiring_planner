import React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import { green, lightBlue, orange, brown, cyan } from "@mui/material/colors";
import BoltIcon from "@mui/icons-material/Bolt";
import WaterIcon from "@mui/icons-material/Water";
import LanguageIcon from "@mui/icons-material/Language";
import BathroomIcon from "@mui/icons-material/Bathroom";
import WindowIcon from "@mui/icons-material/Window";

export default function BuilderMenuRoomDetails(props) {
  let data = props.data;
  let setData = props.setData;
  let setMenuLevel = props.setMenuLevel;
  let selectedRoom = props.selectedRoom;
  let selectedWall = props.selectedWall;
  let setSelectedWall = props.setSelectedWall;
  let setSelectedWallDetail = props.setSelectedWallDetail;

  let wallDetailsData;
  data.data.map((room) =>
    room.room_name === selectedRoom
      ? room.walls.map((wall) =>
        wall.wall_name === selectedWall ? (wallDetailsData = wall) : ""
      )
      : ""
  );

  const removeWiring = (description, i_count, wiringType, e) => {
    let updatedData = data;
    updatedData.data.map((room) => room.room_name !== selectedRoom ? "" :
      room.walls.map((wall) => wall.wall_name !== selectedWall ? "" :
        wall.wiring[wiringType].lines = wall.wiring[wiringType].lines.filter((singleWire, j) => j !== i_count)))
    setData((prev) => ({ ...prev, data: updatedData.data }));
    localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
  };

  const removeWindow = (i_counter, e) => {
    let updatedData = data;

    updatedData.data.map((room) => room.room_name !== selectedRoom ? "" :
      room.walls.map((wall) => wall.wall_name !== selectedWall ? "" :
        wall.windows.splice(i_counter, 1)))

    setData((prev) => ({ ...prev, data: updatedData.data }));
    localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
  };

  const returnToRoomLevel = () => {
    setMenuLevel("walls");
    setSelectedWall("");
  };

  const goToCreateWiring = (e, count, wiring_type) => {
    setSelectedWall(wallDetailsData.wall_name);
    setSelectedWallDetail({ count: count, type: wiring_type });
    setMenuLevel("createWiring");
  };

  const goToCreateWindow = (count, e) => {
    setSelectedWall(wallDetailsData.wall_name);
    setSelectedWallDetail({ count: count });
    setMenuLevel("createWindow");
  };


  return (
    <Paper sx={{ width: 300, maxWidth: "100%" }}>
      <MenuList>
        <MenuItem key="back">
          {" "}
          <ListItemText onClick={(e) => returnToRoomLevel()}>
            <Typography variant="body2" color="text.secondary">
              Back to all walls
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        {wallDetailsData.wiring.electric.lines.map((line, i) => (
          <MenuItem key={i}>
            <ListItemIcon>
              <BoltIcon sx={{ color: orange[500] }}>electricity</BoltIcon>
            </ListItemIcon>
            <ListItemText onClick={(e) => goToCreateWiring(e, i, "electric")}>
              <Typography variant="body2" color="text.secondary">
                {`${line.description === ""
                  ? `Electricity ${i + 1}`
                  : line.description
                  }`}
              </Typography>
            </ListItemText>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => removeWiring(line.description, i, "electric", e)}
            >
              <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={(e) => goToCreateWiring(e, "new", "electric")}>
          <ListItemIcon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
          </ListItemIcon>

          <ListItemText>
            {" "}
            <Typography variant="body2" color="text.secondary">
              Add electricity
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        {wallDetailsData.wiring.ethernet.lines.map((line, i) => (
          <MenuItem key={i}>
            <ListItemIcon>
              <LanguageIcon sx={{ color: cyan[500] }}>ethernet</LanguageIcon>
            </ListItemIcon>
            <ListItemText onClick={(e) => goToCreateWiring(e, i, "ethernet")}>
              <Typography variant="body2" color="text.secondary">
                {`${line.description === ""
                  ? `Ethernet ${i + 1}`
                  : line.description
                  } `}
              </Typography>
            </ListItemText>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => removeWiring(line.description, i, "ethernet", e)}
            >
              <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={(e) => goToCreateWiring(e, "new", "ethernet")}>
          <ListItemIcon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
          </ListItemIcon>

          <ListItemText>
            {" "}
            <Typography variant="body2" color="text.secondary">
              Add ethernet
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        {wallDetailsData.wiring.water.lines.map((line, i) => (
          <MenuItem key={i}>
            <ListItemIcon>
              <WaterIcon sx={{ color: lightBlue[500] }}>water</WaterIcon>
            </ListItemIcon>
            <ListItemText onClick={(e) => goToCreateWiring(e, i, "water")}>
              <Typography variant="body2" color="text.secondary">
                {`${line.description === "" ? `Water ${i + 1}` : line.description
                  } `}
              </Typography>
            </ListItemText>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => removeWiring(line.description, i, "water", e)}
            >
              <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={(e) => goToCreateWiring(e, "new", "water")}>
          <ListItemIcon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
          </ListItemIcon>

          <ListItemText>
            {" "}
            <Typography variant="body2" color="text.secondary">
              Add water
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        {wallDetailsData.wiring.plumbing.lines.map((line, i) => (
          <MenuItem key={i}>
            <ListItemIcon>
              <BathroomIcon sx={{ color: brown[500] }}>plumbing</BathroomIcon>
            </ListItemIcon>
            <ListItemText onClick={(e) => goToCreateWiring(e, i, "plumbing")}>
              <Typography variant="body2" color="text.secondary">
                {`${line.description === ""
                  ? `Plumbing ${i + 1}`
                  : line.description
                  } `}
              </Typography>
            </ListItemText>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => removeWiring(line.description, i, "plumbing", e)}
            >
              <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={(e) => goToCreateWiring(e, "new", "plumbing")}>
          <ListItemIcon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
          </ListItemIcon>

          <ListItemText>
            {" "}
            <Typography variant="body2" color="text.secondary">
              Add plumbing
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        {wallDetailsData.windows.map((window, i) => (
          <MenuItem key={i}>
            <ListItemIcon>
              <WindowIcon sx={{ color: lightBlue[500] }}>add_circle</WindowIcon>
            </ListItemIcon>
            <ListItemText onClick={(e) => goToCreateWindow(i, e)}>
              <Typography variant="body2" color="text.secondary">
                {`${window.description === ""
                  ? `Window ${i + 1}`
                  : window.description
                  } `}
              </Typography>
            </ListItemText>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => removeWindow(i, e)}
            >
              <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={(e) => goToCreateWindow("new", e)}>
          <ListItemIcon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
          </ListItemIcon>

          <ListItemText>
            {" "}
            <Typography variant="body2" color="text.secondary">
              Add a window
            </Typography>
          </ListItemText>
        </MenuItem>
      </MenuList>
    </Paper>
  );
}
