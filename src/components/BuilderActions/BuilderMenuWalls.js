import React, { useState } from "react";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import { green, red, grey } from "@mui/material/colors";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteDialog from "./DeleteDialog";

export default function BuilderMenuWalls(props) {
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

  const [editWallClick, setEditWallClick] = useState(false);
  const [editWallNo, setEditWallNo] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteDecision, setDeleteDecision] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editWallOnClick = (i) => {
    setWallSettings(wallData[i]);
    setMenuLevel("createWall");
    setSelectedWall("");
  };

  const removeWall = (deletedWallName) => {
    setDeleteDecision(deletedWallName);
    setDeleteDialog(true);
  };

  const editRoom = (editWallName) => {
    let updatedData = data;
    let newWall = [];
    let updatedWalls = [];
    let wallAlreadyExists = false;

    updatedData.data.map((wall) =>
      wall.wall_name === document.getElementById("editWallName").value
        ? (wallAlreadyExists = true)
        : ""
    );

    if (wallAlreadyExists === true) {
      setErrorMessage("Wall already exists!");
    } else {
      updatedData.data.map((wall) =>
        wall.wall_name !== editWallName ? "" : newWall.push(wall)
      );
      newWall[0].wall_name = document.getElementById("editWallName").value;
      updatedData.data.map((wall) =>
        wall.wall_name !== editWallName
          ? updatedWalls.push(wall)
          : updatedWalls.push(newWall[0])
      );
      updatedData.data = updatedWalls;

      setData((prev) => ({ ...prev, data: updatedWalls }));
      localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
      setEditWallClick(false);
      setErrorMessage("");
    }
  };

  const closeEditWall = () => {
    setEditWallClick(false);
    setErrorMessage("");
  };

  const goToWallDetails = (e) => {
    setSelectedWall(e.target.outerText);
    setMenuLevel("wallDetails");
  };

  const goToCreateWall = (e) => {
    setMenuLevel("createWall");
    setSelectedWall("");
  };

  const returnToRoomLevel = () => {
    setMenuLevel("rooms");
    setSelectedRoom("");
    setSelectedWall("");
  };

  return (
    <Paper sx={{ width: 300, maxWidth: "100%" }}>
      <MenuList>
        <MenuItem key="back">
          {" "}
          <ListItemText onClick={(e) => returnToRoomLevel()}>
            <Typography variant="body2" color="text.secondary">
              Back to all rooms
            </Typography>
          </ListItemText>
        </MenuItem>
        <Divider />
        {wallData.map((wall, i) => (
          <MenuItem key={i}>
            <ListItemText onClick={(e) => goToWallDetails(e)}>
              <Typography variant="body2" color="text.secondary">
                {wall.wall_name}
              </Typography>
            </ListItemText>
            <IconButton
              aria-label="edit"
              size="small"
              onClick={(e) => editWallOnClick(i)}
            >
              <EditIcon fontSize="small"></EditIcon>
            </IconButton>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => removeWall(wall.wall_name)}
            >
              <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
            </IconButton>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={(e) => goToCreateWall()}>
          <ListItemIcon>
            <Icon sx={{ color: green[500] }}>add_circle</Icon>
          </ListItemIcon>

          <ListItemText>
            {" "}
            <Typography variant="body2" color="text.secondary">
              Add a wall
            </Typography>
          </ListItemText>
        </MenuItem>
      </MenuList>
      {deleteDialog === true
        ? DeleteDialog(
            deleteDialog,
            setDeleteDialog,
            data,
            deleteDecision,
            setData
          )
        : ""}
    </Paper>
  );
}
