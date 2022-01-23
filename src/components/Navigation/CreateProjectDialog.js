import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function CreateProjectDialog(
  openCreateProjectDialog,
  setOpenCreateProjectDialog,
  project_name
) {
  const handleClose = () => {
    setOpenCreateProjectDialog(false);
  };

  const handleCreateProject = () => {
    const projectName = document.getElementById("ProjectName").value;
    const newProjectObject = {
      project_name: projectName,
      data: [],
    };
    localStorage.setItem("savedData_MM", JSON.stringify(newProjectObject));
    window.location.reload(false);
  };

  return (
    <div>
      <Dialog
        open={openCreateProjectDialog}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Creating a new project?"}</DialogTitle>
        <DialogContent>
          {project_name === "DEMO PROJECT NAME" ? (
            <DialogContentText component={"span"}>
              Currently, platform{" "}
              <Box fontWeight="fontWeightBold" display="inline">
                {project_name}
              </Box>{" "}
              is loaded in your browser's cache. If you proceed with this
              action, any progress and changes applied will be deleted.
            </DialogContentText>
          ) : project_name === undefined ? (
            <DialogContentText component={"span"}>
              It seems that there are no active projects loaded at the moment.
              Go ahead and impress us.
            </DialogContentText>
          ) : (
            <DialogContentText component={"span"}>
              It seems that there is an existing project{" "}
              <Box fontWeight="fontWeightBold" display="inline">
                {project_name}
              </Box>{" "}
              currently loaded in your browser's cache. If you proceed with this
              action,{" "}
              <Box fontWeight="fontWeightBold" display="inline">
                current project will be deleted and you will not be able to
                restore it.
              </Box>{" "}
              We recommend you to Download the existing project first.
            </DialogContentText>
          )}
          <br />
          <br />
          <DialogContentText></DialogContentText>
        </DialogContent>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="left"
          justifyContent="center"
        >
          <Grid item xs={6}>
            {" "}
            <TextField
              required
              id="ProjectName"
              name="projectName"
              label="Project name"
              autoFocus
              style={{
                minHeight: "3vh",
                minWidth: "45vw",
                marginLeft: "24px",
                marginRight: "24px",
                marginBottom: "2vh",
              }}
            />
          </Grid>
        </Grid>

        <DialogActions>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Close
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleCreateProject}
          >
            Create new project
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
