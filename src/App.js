import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navigation from "./components/Navigation/Navigation";
import LeftMenu from "./components/Navigation/LeftMenu";

const App = () => {
  let loadData =
    localStorage.getItem("savedData_MM") === null
      ? "nodata"
      : JSON.parse(localStorage.getItem("savedData_MM"));

  const [data, setData] = useState(loadData);
  const [walls, setWalls] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedWall, setSelectedWall] = useState("");

  useEffect(() => {}, [data]);
  useEffect(() => {}, [walls]);

  return (
    <Box
      sx={{
        marginLeft: 5,
        marginTop: 2,
      }}
    >
      <br />
      {Navigation(data)}{" "}
      {LeftMenu(
        data,
        setData,
        setWalls,
        selectedRoom,
        setSelectedRoom,
        selectedWall,
        setSelectedWall
      )}
      {selectedRoom !== "" ? <p>Room: {selectedRoom}</p> : ""}
      {selectedWall !== "" ? <p>Wall: {selectedWall}</p> : ""}
    </Box>
  );
};

export default App;
