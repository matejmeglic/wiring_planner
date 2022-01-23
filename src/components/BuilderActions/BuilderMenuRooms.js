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

export default function BuilderMenuRooms(
  data,
  setData,
  setMenuLevel,
  setSpecificRoom
) {
  const [newRoomClick, setNewRoomClick] = useState(false);
  const [editRoomClick, setEditRoomClick] = useState(false);
  const [editRoomNo, setEditRoomNo] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteDecision, setDeleteDecision] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const createRoomOnClick = () => {
    setNewRoomClick(true);
  };

  const editRoomOnClick = (i) => {
    setEditRoomClick(true);
    setEditRoomNo(i);
  };

  const removeRoom = (deletedRoomName) => {
    setDeleteDecision(deletedRoomName);
    setDeleteDialog(true);
  };

  const editRoom = (editRoomName) => {
    let updatedData = data;
    let newRoom = [];
    let updatedRooms = [];
    let roomAlreadyExists = false;

    updatedData.data.map((room) =>
      room.room_name === document.getElementById("editRoomName").value
        ? (roomAlreadyExists = true)
        : ""
    );

    if (roomAlreadyExists === true) {
      setErrorMessage("Name already exists!");
    } else {
      updatedData.data.map((room) =>
        room.room_name !== editRoomName ? "" : newRoom.push(room)
      );
      newRoom[0].room_name = document.getElementById("editRoomName").value;
      updatedData.data.map((room) =>
        room.room_name !== editRoomName
          ? updatedRooms.push(room)
          : updatedRooms.push(newRoom[0])
      );
      updatedData.data = updatedRooms;

      setData((prev) => ({ ...prev, data: updatedRooms }));
      localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
      setEditRoomClick(false);
      setErrorMessage("");
    }
  };

  const closeEditRoom = () => {
    setEditRoomClick(false);
    setErrorMessage("");
  };

  const updateData = () => {
    let updatedData = data;
    let roomObject = {
      room_name: document.getElementById("RoomName").value,
      walls: [],
    };
    updatedData.data.push(roomObject);
    setData(updatedData);
    localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
    setNewRoomClick(false);
  };

  const goToRoomDetails = (e) => {
    setSpecificRoom(e.target.outerText);
    setMenuLevel("roomDetails");
  };

  return (
    <Paper sx={{ width: 300, maxWidth: "100%" }}>
      <MenuList>
        {data.data.map((room, i) =>
          editRoomClick === false ||
          (editRoomClick === true && editRoomNo !== i) ? (
            <MenuItem key={i}>
              <ListItemText onClick={(e) => goToRoomDetails(e)}>
                <Typography variant="body2" color="text.secondary">
                  {room.room_name}
                </Typography>
              </ListItemText>
              <IconButton
                aria-label="edit"
                size="small"
                onClick={(e) => editRoomOnClick(i)}
              >
                <EditIcon fontSize="small"></EditIcon>
              </IconButton>
              <IconButton
                aria-label="delete"
                size="small"
                onClick={(e) => removeRoom(room.room_name)}
              >
                <DeleteForeverRoundedIcon fontSize="small"></DeleteForeverRoundedIcon>
              </IconButton>
            </MenuItem>
          ) : (
            <div key={i}>
              <MenuItem>
                <TextField
                  required
                  id="editRoomName"
                  name="editRoomName"
                  label={`Rename ${room.room_name}`}
                  variant="standard"
                  autoFocus
                  onKeyDown={(event) =>
                    event.code === "Enter" || event.code === "NumpadEnter"
                      ? editRoom(room.room_name)
                      : event.stopPropagation()
                  }
                />
                <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                  <CheckIcon
                    sx={{ color: green[500] }}
                    onClick={(e) => editRoom(room.room_name)}
                  ></CheckIcon>
                </ListItemIcon>
                <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                  <CloseIcon
                    sx={{ color: grey[500] }}
                    onClick={(e) => closeEditRoom()}
                  ></CloseIcon>
                </ListItemIcon>
              </MenuItem>
              <Typography variant="body2" color={red[300]} sx={{ ml: 2 }}>
                {errorMessage}
              </Typography>
            </div>
          )
        )}
        <Divider />
        {newRoomClick === false ? (
          <MenuItem onClick={createRoomOnClick}>
            <ListItemIcon>
              <Icon sx={{ color: green[500] }}>add_circle</Icon>
            </ListItemIcon>

            <ListItemText>
              {" "}
              <Typography variant="body2" color="text.secondary">
                Add a Room
              </Typography>
            </ListItemText>
          </MenuItem>
        ) : (
          <MenuItem>
            <TextField
              required
              id="RoomName"
              name="roomName"
              label="Room name"
              variant="standard"
              autoFocus
              onKeyDown={(event) =>
                event.code === "Enter" || event.code === "NumpadEnter"
                  ? updateData()
                  : event.stopPropagation()
              }
            />
            <ListItemIcon>
              <CheckIcon
                sx={{ color: green[500] }}
                onClick={updateData}
              ></CheckIcon>
            </ListItemIcon>
          </MenuItem>
        )}
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
