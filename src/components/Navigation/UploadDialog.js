import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function UploadDataDialog(
  openUploadDialog,
  setOpenUploadDialog,
  openUploadDialogConfirmationScreen,
  setOpenUploadDialogConfirmationScreen,
  project_name
) {
  let uploadedObject = "";

  const handleClose = () => {
    setOpenUploadDialog(false);
    if (openUploadDialogConfirmationScreen === true) {
      window.location.reload(false);
    }
  };

  const handleUpload = () => {
    uploadedObject = JSON.parse(document.getElementById("UploadedJSON").value);
    localStorage.setItem("savedData_MM", JSON.stringify(uploadedObject));
    setOpenUploadDialogConfirmationScreen(true);
  };

  return (
    <div>
      {openUploadDialogConfirmationScreen === false ? (
        <Dialog
          open={openUploadDialog}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>
            {"Do you want to replace your existing project?"}
          </DialogTitle>
          <DialogContent>
            {project_name === undefined ? (
              <DialogContentText component={"span"}>
                It seems that there are no active projects loaded at the moment.
                Go ahead and import your project.
              </DialogContentText>
            ) : project_name === "DEMO PROJECT NAME" ? (
              <DialogContentText component={"span"}>
                Currently, project{" "}
                <Box fontWeight="fontWeightBold" display="inline">
                  {project_name}
                </Box>{" "}
                is loaded in your browser's cache. If you proceed with this
                action, any progress and changes applied will be deleted.
              </DialogContentText>
            ) : (
              <DialogContentText component={"span"}>
                It seems that there is an existing project{" "}
                <Box fontWeight="fontWeightBold" display="inline">
                  {project_name}
                </Box>{" "}
                currently loaded in your browser's cache. If you proceed with
                this action,{" "}
                <Box fontWeight="fontWeightBold" display="inline">
                  current project will be deleted and you will not be able to
                  restore it.
                </Box>{" "}
                We recommend you to Download the existing project first.
              </DialogContentText>
            )}
            <br />
            <br />
            <DialogContentText>
              Please paste JSON structure from a previously saved file to upload
              the project.
            </DialogContentText>
          </DialogContent>

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="left"
            justifyContent="center"
          >
            <Grid item xs={6}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={8}
                maxRows={8}
                style={{
                  minHeight: "3vh",
                  minWidth: "45vw",
                  marginLeft: "24px",
                  marginBottom: "2vh",
                }}
                id="UploadedJSON"
              />
            </Grid>
          </Grid>

          <DialogActions>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              Close
            </Button>
            <Button color="error" variant="outlined" onClick={handleUpload}>
              Upload your legacy project
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openUploadDialogConfirmationScreen}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Your data was uploaded!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Data from your legacy project was successfully uploaded to browser
              cache!
            </DialogContentText>
            <br />
            <DialogContentText>
              If you delete cookies or local storage, all your changes will be
              lost!
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
