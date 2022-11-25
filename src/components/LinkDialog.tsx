import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

export const LinkDialog = ({ link }) => {
  const [open, setOpen] = useState(false);
  const copy = require("clipboard-copy");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <InsertLinkIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your personal link to share the contents of the file with your
            friends!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            value={link}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={copy(link)}>Copy</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
