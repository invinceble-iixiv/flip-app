import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "../styles/flashcard.css";
import firebase from "../firebase";
import { AuthContext } from "./Auth";

function Deck({ deck }) {
  let history = useHistory();

  const deleteDeck = () => {
    firebase.firestore().collection("decks").doc(deck.id).delete();
  };

  const editDeck = () => {
    history.push("/decks/" + deck.deckName);
  };

  const gotoCardList = (deckName) => {
    history.push("/decks/" + deck.deckName);
  };

  return (
    <div>
      <div className="general-card" onClick={gotoCardList}>
        <div className="item-label2">Deck :</div>
        <div className="item-content2">{deck.deckName}</div>
        <div className="item-footer">
          <Button onClick={editDeck}>Edit</Button>
          <IconButton onClick={deleteDeck}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Deck;
