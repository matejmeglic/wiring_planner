import "./App.css";
import React from "react";
import data from "./assets/data.json";
import RenderWall from "./components/RenderWall";

class App extends React.Component {
  render() {
    return data.rooms.map((wall) => RenderWall(wall));
  }
}

export default App;
