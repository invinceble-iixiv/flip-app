import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import logo from "../styles/flip_192.png";

function AppNavBar() {
  return (
    <div>
      <AppBar>
        <img src={logo} alt="Logo" height="20" width="20"></img>
        <Toolbar>
          <Typography variant="h6">Flip</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppNavBar;
