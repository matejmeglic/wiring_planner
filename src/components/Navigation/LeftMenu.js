import React, { useState, useEffect } from "react";
import BuilderMenuRooms from "../BuilderActions/BuilderMenuRooms";
import BuilderMenuRoomDetails from "../BuilderActions/BuilderMenuRoomDetails";

const LeftMenu = (data, setData, setWalls) => {
  const [menuLevel, setMenuLevel] = useState("rooms");
  const [specificRoom, setSpecificRoom] = useState("");

  useEffect(() => {}, [menuLevel]);

  if (data === "nodata") {
    return "";
  } else if (menuLevel === "rooms") {
    return (
      <div>
        {BuilderMenuRooms(data, setData, setMenuLevel, setSpecificRoom)}
      </div>
    );
  } else if (menuLevel === "roomDetails") {
    return (
      <div>
        {BuilderMenuRoomDetails(data, setData, setMenuLevel, setSpecificRoom)}
      </div>
    );
  } else {
    return "";
  }
};

export default LeftMenu;
