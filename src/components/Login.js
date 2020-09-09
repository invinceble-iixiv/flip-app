import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "firebase";
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "../styles/login.css";

function Login({ history }) {
  const [state, setState] = useState({
    email: null,
    password: null,
    serverError: false,
  });

  const submitLogin = async (e) => {
    e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    await firebase
      .auth()
      .signInWithEmailAndPassword(state.email, state.password)
      .then(
        () => {
          history.push("/decks");
        },
        (err) => {
          setState({ ...state, serverError: true });
          console.log("Error logging in: ", err.message);
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        {/* <div className="card-container"> */}
        <Paper className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={(e) => submitLogin(e)} className="form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="standard-password-input"
              label="Email Address"
              type="email"
              autoComplete="email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <TextField
              id="standard-password-input"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Log In
            </Button>
          </form>
          {state.serverError ? (
            <Typography className="errorText" component="h5" variant="h6">
              Incorrect Login Information
            </Typography>
          ) : null}
          <h5 className="noAccountHeader">Don't Have An Account?</h5>
          <Link className="signUpLink" to="/signup">
            Sign Up!
          </Link>
        </Paper>
        {/* </div> */}
      </div>
    </Container>
  );
}

export default withRouter(Login);
