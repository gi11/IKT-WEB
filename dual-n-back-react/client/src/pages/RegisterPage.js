import React, { useState } from "react";
import {
  Fade,
  Typography,
  TextField,
  CircularProgress,
  Button
} from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { useAuthDispatch } from "../context/AuthContext";
import axios from "axios";

const registerPageStyles = {
  width: `400px`,
};

function RegisterPage(props) {
  var [isLoading, setIsLoading] = useState(false);
  var [usernameValue, setusernameValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [errors, setErrors] = useState({});

  var authDispatch = useAuthDispatch();

  const [dialogOpen, setDialogOpen] = React.useState(false);
  function SuccessDialog(props) {
    return (
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{"Success"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Account registration was successful. You can now log in with the
            entered credentials.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              setDialogOpen(false);
              props.history.push("/login");
            }}
            color="primary"
            autoFocus
          >
            Go to Login page
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function validate(username, password) {
    let errors = {};
    if (!username) {
      errors.username = "Username is a required field";
    } else if (username.length < 5) {
      errors.username = "Username must be more than 5 characters";
    }
    if (!password) {
      errors.password = "Password is a required field";
    } else if (password.length < 5) {
      errors.password = "Password must be more than 5 characters";
    }
    if (Object.keys(errors).length == 0) {
      return null
    }
    return errors;
  }

  function registerUser(username, password) {
    setIsLoading(true);
    var validationErrors = validate(username, password);
    if (validationErrors) {
      console.log("Validation errors");
      setErrors(validationErrors);
      setIsLoading(false);
    } else {
      console.log("No validation errors");
      const data = {
        username: username,
        password: password
      };
      const url = "/api/auth/register";
      axios
        .post(url, data)
        .then(res => {
          console.log("Response");
          console.log(res);
          setErrors({});
          setIsLoading(false);
          authDispatch({ type: "REGISTER_SUCCESS" });
          setDialogOpen(true)
        })
        .catch(err => {
          console.log("Error response");
          console.log(err.response);
          setErrors({ response: err.response.data.message });
          setIsLoading(false);
          authDispatch({ type: "REGISTER_FAILURE" });
        });
    }
  }

  return (
    <div style={registerPageStyles}>
      <h1>Register</h1>
      <Fade in={errors.response}>
        <Typography color="secondary">{errors.response}</Typography>
      </Fade>

      <TextField
        id="username"
        value={usernameValue}
        onChange={e => setusernameValue(e.target.value)}
        margin="normal"
        placeholder="Username"
        fullWidth
      />
      <Fade in={errors.username}>
        <Typography color="secondary">{errors.username}</Typography>
      </Fade>

      <TextField
        value={passwordValue}
        onChange={e => setPasswordValue(e.target.value)}
        margin="normal"
        placeholder="Password"
        type="password"
        fullWidth
      />
      <Fade in={errors.password}>
        <Typography color="secondary">{errors.password}</Typography>
      </Fade>
      <>
        {isLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            disabled={usernameValue.length === 0 && passwordValue.length === 0}
            onClick={() => registerUser(usernameValue, passwordValue)}
            variant="contained"
            color="primary"
            size="large"
          >
            Sign Up
          </Button>
        )}
      </>
      <SuccessDialog history={props.history} />
    </div>
  );
}

export default withRouter(RegisterPage);
