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

export default function BuilderMenuRoomDetails(
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

  const returnToRoomLevel = () => {
    setMenuLevel("rooms");
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
      </MenuList>
    </Paper>
  );
}
