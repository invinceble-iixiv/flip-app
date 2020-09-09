import React from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import firebase from "../firebase";

function Signup({ history }) {
  const handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, username } = e.target.elements;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(
        () => {
          const user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: username.value,
          });
          history.push("/decks");
        },
        (err) => {
          console.log("Error signing up: ", err);
        }
      );
  };
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Paper className="paper">
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={(e) => handleSignup(e)} className="form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              type="text"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              autoComplete="email"
            />
            <TextField
              id="password"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign Up
            </Button>
          </form>
          <h5 className="noAccountHeader">Already have an account?</h5>
          <Link className="signUpLink" to="/login">
            Sign In!
          </Link>
        </Paper>
      </div>
    </Container>
  );
}

export default withRouter(Signup);
