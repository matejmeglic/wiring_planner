import React from "react";

import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

import Typography from "@mui/material/Typography";

export default function BuilderMenuRoomDetails(props) {
  let setMenuLevel = props.setMenuLevel;
  let setSelectedWall = props.setSelectedWall;

  const returnToRoomLevel = () => {
    setMenuLevel("walls");
    setSelectedWall("");
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
      </MenuList>
    </Paper>
  );
}
