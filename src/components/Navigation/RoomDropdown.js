import React, { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RenderWall from "../../components/Canvas/RenderWall";

function RoomDropdown(data, setFunction) {
  const [room, setRoom] = useState("");

  const handleChange = (event) => {
    setRoom(event.target.value);
    setFunction(
      data.data[event.target.value].walls.map((wall) => RenderWall(wall))
    );
  };

  return (
    <div>
      <Box sx={{ width: 200, marginTop: 2, marginBottom: 2, marginLeft: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="room">Select a room</InputLabel>
          <Select
            labelId="room_label"
            id="room_select"
            value={room}
            label="room"
            onChange={handleChange}
          >
            {data.data.map((room, i) => (
              <MenuItem value={i} key={i}>
                {room.room_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

export default RoomDropdown;
