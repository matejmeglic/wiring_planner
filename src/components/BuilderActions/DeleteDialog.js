import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteDialog(
  deleteDialog,
  setDeleteDialog,
  data,
  deletedRoomName,
  setData
) {
  const handleClose = () => {
    setDeleteDialog(false);
  };

  const handleDelete = () => {
    let updatedData = data;
    let updatedRooms = [];
    updatedData.data.map((room) =>
      room.room_name !== deletedRoomName ? updatedRooms.push(room) : ""
    );
    updatedData.data = updatedRooms;

    setData((prev) => ({ ...prev, data: updatedRooms }));
    localStorage.setItem("savedData_MM", JSON.stringify(updatedData));
    setDeleteDialog(false);
  };

  return (
    <Dialog
      open={deleteDialog}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Delete?"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to proceed and delete the object? You can loose
          a lot of progress....
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          Close
        </Button>
        <Button color="error" variant="outlined" onClick={handleDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
