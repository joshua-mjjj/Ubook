import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
}));
export default function Popup(props) {
  const classes = useStyles();
  const {
    title,
    children,
    openPopup,
    setOpenPopup,
    setOpenDeletePopup,
    openDeletePopup,
  } = props;
  return (
    <Dialog
      open={openPopup || openDeletePopup}
      maxWidth="md"
      className={classes.dialogWrapper}
    >
      <DialogTitle>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 20px 0px 20px",
            alignContent: "center",
          }}
        >
          <div>{title}</div>
          <IconButton
            onClick={() => {
              setOpenPopup(false);
              setOpenDeletePopup(false);
            }}
            style={{ cursor: "pointer" }}
          >
            <CloseIcon primary fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
