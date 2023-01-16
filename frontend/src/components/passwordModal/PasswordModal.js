import React from "react";
import { TextField, Modal, Typography, Button, Box } from "@mui/material";
import "./PasswordModal.css";

function PasswordModal({
  open,
  handleClose,
  password,
  setPassword,
  checkPassword,
}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="modalTitle">
            {" "}
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Raffle Password
            </Typography>
          </div>
          <div className="modalText">
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              inputProps={{ style: { fontSize: 20 } }}
              InputLabelProps={{
                style: { fontSize: 20 },
              }}
            />
          </div>
          <Button
            onClick={checkPassword}
            sx={{
              fontSize: 20,
            }}
          >
            Submit Password
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default PasswordModal;
