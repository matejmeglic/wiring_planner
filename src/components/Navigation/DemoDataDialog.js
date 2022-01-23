import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import demoData from "../../assets/data.json";

export default function DemoDataDialog(
  openDemoDataDialog,
  setOpenDemoDataDialog,
  openDemoDataDialogConfirmationScreen,
  setOpenDemoDataDialogConfirmationScreen,
  project_name
) {
  const handleClose = () => {
    setOpenDemoDataDialog(false);
    if (openDemoDataDialogConfirmationScreen === true) {
      window.location.reload(false);
    }
  };

  const handleDelete = () => {
    localStorage.setItem("savedData_MM", JSON.stringify(demoData));
    setOpenDemoDataDialogConfirmationScreen(true);
  };

  console.log(project_name);
  return (
    <div>
      {openDemoDataDialogConfirmationScreen === false ? (
        <Dialog
          open={openDemoDataDialog}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Upload demo content?"}</DialogTitle>
          <DialogContent>
            {project_name === undefined ? (
              <DialogContentText>
                It seems that there are no active projects loaded at the moment.
                Go ahead and import demo content.
              </DialogContentText>
            ) : (
              <DialogContentText component={"span"}>
                It seems that you have a project{" "}
                <Box fontWeight="fontWeightBold" display="inline">
                  {project_name}
                </Box>{" "}
                loaded in your browser's cache. If you proceed with this action,
                all your changes will be lost.
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button color="error" variant="outlined" onClick={handleDelete}>
              Delete existing project and load demo data
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openDemoDataDialogConfirmationScreen}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Demo data was loaded!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your previous data was deleted from your browser cache!
            </DialogContentText>
            <br />
            <DialogContentText>
              Explore demo content and create a new project when ready.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
