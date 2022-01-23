import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Navigation from "./components/Navigation/Navigation";
import RoomDropdown from "./components/Navigation/RoomDropdown";
import CreateProjectForm from "./components/BuilderActions/CreateProjectForm";
import LeftMenu from "./components/Navigation/LeftMenu";

const App = () => {
  let loadData =
    localStorage.getItem("savedData_MM") === null
      ? "nodata"
      : JSON.parse(localStorage.getItem("savedData_MM"));

  const [data, setData] = useState(loadData);
  const [walls, setWalls] = useState("");

  useEffect(() => {}, [data]);
  useEffect(() => {}, [walls]);

  return (
    <Box sx={{ marginLeft: 5, marginTop: 2 }}>
      <br />
      {Navigation(data)}
      {LeftMenu(data, setData, setWalls)}
      {/* {data === "nodata"
        ? ""
        : data.data.length === 0
        ? ""
        : RoomDropdown(data, setWalls)} */}

      {/* {CreateProjectForm(setData)} */}
      {/* {walls} */}
    </Box>
  );
};

export default App;
