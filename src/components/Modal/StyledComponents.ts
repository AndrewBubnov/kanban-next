import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    minWidth: "50%",
  },
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  padding: "8px 20px 8px 8px",
}));

export const StyledButton = styled(Button)(() => ({
  textTransform: "none",
  color: "rgba(0, 0, 0, 0.87)",
  "&:focus": {
    outline: "none",
  },
}));
