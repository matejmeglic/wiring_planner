import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Navigation from "./components/Navigation/Navigation";
import LeftMenu from "./components/Navigation/LeftMenu";
import RenderWall from "./components/Canvas/RenderWall"
import Grid from "@mui/material/Grid"
import { useScreenshot } from "use-screenshot-hook";
import { saveAs } from 'file-saver'
import NewDate from "./components/newDate"

const App = () => {
  let loadData =
    localStorage.getItem("savedData_MM") === null
      ? "nodata"
      : JSON.parse(localStorage.getItem("savedData_MM"));

  const [data, setData] = useState(loadData);
  const [walls, setWalls] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedWall, setSelectedWall] = useState("");
  const [selectedWallDetail, setSelectedWallDetail] = useState("");
  const [menuLevel, setMenuLevel] = useState("rooms");

  const scrnArea = useRef("screenshot-area");
  const { image, takeScreenshot, clear } = useScreenshot({ ref: scrnArea });

  const downloadImage = () => {
    takeScreenshot()
    setTimeout(() => {
      selectedRoom === "" ? setSelectedRoom("") :
        selectedWall === "" ?
          saveAs(document.getElementById("takenPic").src, `${NewDate()}_${selectedRoom}.png`)
          :
          saveAs(document.getElementById("takenPic").src, `${NewDate()}_${selectedRoom}_${selectedWall}.png`)
    }, 3000);
    //window.URL.createObjectURL(new Blob(image, { type: "image/png" }))
    //takenPic
    // Put your image url here.
  }

  useEffect(() => { }, [data]);
  useEffect(() => { }, [walls]);

  return (
    <Box
      sx={{
        marginLeft: 5,
        marginTop: 2,
      }}
    >

      <br />
      {Navigation(data)}{" "}
      <Grid container>
        <Grid item xs={2} >
          {LeftMenu(
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
          )}
          <br />
          <button className="screenshot-button" onClick={() => downloadImage()}>screenshot</button>
          {/* <button className="screenshot-button" onClick={() => clear()}>X</button> */}
        </Grid>


        {image && (
          <div className="imageContainer">
            <img id="takenPic" width={800} src={image} />
          </div>
        )}

        <Grid ref={scrnArea} item xs={10} >
          {data.data.map((room, i) => room !== selectedRoom && selectedRoom !== "" ?
            selectedWall === "" ?
              room.walls.map((wall, j) => RenderWall(data.data[i].walls[j]))
              : room.walls.map((wall, j) => wall.wall_name === selectedWall ? RenderWall(data.data[i].walls[j]) : "")
            : "")}

        </Grid>
      </Grid>








      {selectedRoom !== "" ? <p>Room: {selectedRoom}</p> : ""}
      {selectedWall !== "" ? <p>Wall: {selectedWall}</p> : ""}
    </Box >

  );
};

export default App;
