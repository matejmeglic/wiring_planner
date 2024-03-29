import React, { useState, useEffect } from "react";
import BuilderMenuRooms from "../BuilderActions/BuilderMenuRooms";
import BuilderMenuWalls from "../BuilderActions/BuilderMenuWalls";
import BuilderMenuWallDetails from "../BuilderActions/BuilderMenuWallDetails";
import CreateNewWall from "../BuilderActions/CreateNewWall";
import CreateNewWiring from "../BuilderActions/CreateNewWiring";
import CreateNewHarness from "../BuilderActions/CreateNewHarness";
import CreateNewWindow from "../BuilderActions/CreateNewWindow";

const LeftMenu = (
  menuLevel,
  setMenuLevel,
  data,
  setData,
  setWalls,
  selectedRoom,
  setSelectedRoom,
  selectedWall,
  setSelectedWall,
  selectedWallDetail,
  setSelectedWallDetail
) => {

  const [wallSettings, setWallSettings] = useState("");

  useEffect(() => { }, [menuLevel]);

  if (data === "nodata") {
    return "";
  } else if (menuLevel === "rooms") {
    return (
      <BuilderMenuRooms
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
        selectedWallDetail={selectedWallDetail}
        setSelectedWallDetail={setSelectedWallDetail}
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
  } else if (menuLevel === "createWiring") {
    return (
      <CreateNewWiring
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedWall={selectedWall}
        setSelectedWall={setSelectedWall}
        wallSettings={wallSettings}
        setWallSettings={setWallSettings}
        selectedWallDetail={selectedWallDetail}
        setSelectedWallDetail={setSelectedWallDetail}
      />
    );
  } else if (menuLevel === "createWindow") {
    return (
      <CreateNewWindow
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedWall={selectedWall}
        setSelectedWall={setSelectedWall}
        wallSettings={wallSettings}
        setWallSettings={setWallSettings}
        selectedWallDetail={selectedWallDetail}
        setSelectedWallDetail={setSelectedWallDetail}
      />
    );
  } else if (menuLevel === "createHarness") {
    return (
      <CreateNewHarness
        data={data}
        setData={setData}
        setMenuLevel={setMenuLevel}
        selectedRoom={selectedRoom}
        setSelectedRoom={setSelectedRoom}
        selectedWall={selectedWall}
        setSelectedWall={setSelectedWall}
        wallSettings={wallSettings}
        setWallSettings={setWallSettings}
        selectedWallDetail={selectedWallDetail}
        setSelectedWallDetail={setSelectedWallDetail}
      />
    );
  } else {
    return "";
  }
};

export default LeftMenu;
