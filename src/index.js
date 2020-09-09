import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./index.css";
import StudyMode from "./components/StudyMode";
import Login from "./components/Login";
import Signup from "./components/Signup";
import DeckList from "./components/DeckList";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./components/Auth";
import FlashcardList from "./components/FlashcardList";
import PrivateRoute from "./components/PrivateRoute";

ReactDOM.render(
  <AuthProvider>
    <Router>
      <PrivateRoute exact path="/decks" component={DeckList} />
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/decks/:deck" component={FlashcardList}></Route>
      <Route path="/decks/:deck/study" component={StudyMode}></Route>
      <Redirect from="/" to="/login"></Redirect>
    </Router>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
