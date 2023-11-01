import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import DemoDataDialog from "../../components/Navigation/DemoDataDialog";
import UploadDataDialog from "../../components/Navigation/UploadDialog";
import CreateProjectDialog from "../../components/Navigation/CreateProjectDialog";

function Navigation(data) {
  const [openDemoDataDialog, setOpenDemoDataDialog] = useState(false);
  const [
    openDemoDataDialogConfirmationScreen,
    setOpenDemoDataDialogConfirmationScreen,
  ] = useState(false);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [
    openUploadDialogConfirmationScreen,
    setOpenUploadDialogConfirmationScreen,
  ] = useState(false);
  const [openCreateProjectDialog, setOpenCreateProjectDialog] = useState(false);

  const BlueGreyButton = styled(Button)(({ theme }) => ({
    color: blueGrey[500],
    fontSize: "10px",
    "&:hover": {
      color: blueGrey[700],
    },
  }));

  const handleSaveDemoData = (event) => {
    event.preventDefault();
    setOpenDemoDataDialog(true);
    setOpenDemoDataDialogConfirmationScreen(false);
  };

  const handleDownload = (event) => {
    event.preventDefault();
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${data.project_name}.json`;
    document.body.appendChild(element);
    element.click();
  };

  const handleUpload = (event) => {
    event.preventDefault();
    setOpenUploadDialog(true);
    setOpenUploadDialogConfirmationScreen(false);
  };

  const handleCreateProject = (event) => {
    event.preventDefault();
    setOpenCreateProjectDialog(true);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid justify="space-between" container spacing={0}>
          <Grid item>
            {data === "nodata" || data.project_name === "DEMO PROJECT NAME" ? (
              <Button
                variant="outlined"
                color="secondary"
                type="submit"
                onClick={handleCreateProject}
              >
                Create New Project
              </Button>
            ) : (
              <BlueGreyButton
                variant="text"
                type="submit"
                onClick={handleCreateProject}
              >
                Create New Project
              </BlueGreyButton>
            )}
          </Grid>
          <Grid item>
            <BlueGreyButton
              variant="text"
              type="submit"
              onClick={handleDownload}
            >
              Download
            </BlueGreyButton>
          </Grid>
          <Grid item>
            <BlueGreyButton variant="text" type="submit" onClick={handleUpload}>
              Upload
            </BlueGreyButton>
          </Grid>
          <Grid item>
            <BlueGreyButton
              variant="text"
              type="submit"
              onClick={handleSaveDemoData}
            >
              Load Demo Data
            </BlueGreyButton>
          </Grid>
        </Grid>
        <Grid>
          <BlueGreyButton variant="text" type="submit">
            {data.project_name}
          </BlueGreyButton>
        </Grid>
      </Toolbar>
      {openDemoDataDialog === true
        ? DemoDataDialog(
          openDemoDataDialog,
          setOpenDemoDataDialog,
          openDemoDataDialogConfirmationScreen,
          setOpenDemoDataDialogConfirmationScreen,
          data.project_name
        )
        : ""}
      {openUploadDialog === true
        ? UploadDataDialog(
          openUploadDialog,
          setOpenUploadDialog,
          openUploadDialogConfirmationScreen,
          setOpenUploadDialogConfirmationScreen,
          data.project_name
        )
        : ""}
      {openCreateProjectDialog === true
        ? CreateProjectDialog(
          openCreateProjectDialog,
          setOpenCreateProjectDialog,
          data.project_name
        )
        : ""}
    </AppBar>
  );
}

export default Navigation;
