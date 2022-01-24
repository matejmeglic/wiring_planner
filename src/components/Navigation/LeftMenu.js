import React, { useState, useEffect } from "react";
import BuilderMenuRooms from "../BuilderActions/BuilderMenuRooms";
import BuilderMenuWalls from "../BuilderActions/BuilderMenuWalls";
import BuilderMenuWallDetails from "../BuilderActions/BuilderMenuWallDetails";
import CreateNewWall from "../BuilderActions/CreateNewWall";

const LeftMenu = (
  data,
  setData,
  setWalls,
  selectedRoom,
  setSelectedRoom,
  selectedWall,
  setSelectedWall
) => {
  const [menuLevel, setMenuLevel] = useState("rooms");
  const [wallSettings, setWallSettings] = useState("");

  useEffect(() => {}, [menuLevel]);

  if (data === "nodata") {
    return "";
  } else if (menuLevel === "rooms") {
    return (
      <BuilderMenuRooms
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        setSelectedRoom={setSelectedRoom}
        setSelectedWall={setSelectedWall}
      />
    );
  } else if (menuLevel === "walls") {
    return (
      <BuilderMenuWalls
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedWall={selectedWall}
        setSelectedWall={setSelectedWall}
        wallSettings={wallSettings}
        setWallSettings={setWallSettings}
      />
    );
  } else if (menuLevel === "wallDetails") {
    return (
      <BuilderMenuWallDetails
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedWall={selectedWall}
        setSelectedWall={setSelectedWall}
      />
    );
  } else if (menuLevel === "createWall") {
    return (
      <CreateNewWall
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedWall={selectedWall}
        setSelectedWall={setSelectedWall}
        wallSettings={wallSettings}
        setWallSettings={setWallSettings}
      />
    );
  } else {
    return "";
  }
};

export default LeftMenu;
