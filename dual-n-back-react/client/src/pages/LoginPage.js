import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import {
  Fade,
  Typography,
  TextField,
  CircularProgress,
  Button
} from "@material-ui/core";

import { useAuthDispatch } from "../context/AuthContext";

const loginPageStyles = {
  width: `400px`,
};

function LoginPage(props) {
  var [isLoading, setIsLoading] = useState(false);
  var [usernameValue, setusernameValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [errors, setErrors] = useState({});

  var authDispatch = useAuthDispatch();

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

  function loginUser(username, password) {
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
      const url = "/api/auth/login";
      axios
        .post(url, data)
        .then(res => {
          console.log("Saving received token");
          localStorage.setItem("dualnback_id_token", res.data.token);
          setErrors({});
          setIsLoading(false);
          authDispatch({ type: "LOGIN_SUCCESS" });
          props.history.push("/profile");
        })
        .catch(err => {
          console.log("Login Failed");
          setErrors({ response: err.response.data.message });
          setIsLoading(false);
          authDispatch({ type: "LOGIN_FAILURE" });
        });
    }
  }

  return (
    <div style={loginPageStyles}>
      <h1>Login</h1>
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
          <CircularProgress size={26} className="loginLoader" />
        ) : (
          <Button
            disabled={usernameValue.length === 0 && passwordValue.length === 0}
            onClick={() => loginUser(usernameValue, passwordValue)}
            variant="contained"
            color="primary"
            size="large"
          >
            Login
          </Button>
        )}
        <Button component={Link} to={"/register"} color="primary" size="large">
          Register
        </Button>
      </>
    </div>
  );
}

export default withRouter(LoginPage);
