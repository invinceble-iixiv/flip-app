import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Deck from "./Deck";
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
import firebase from "../firebase";
import { AuthContext } from "./Auth";
import "../styles/cardlist.css";

function DeckList() {
  const history = useHistory();
  const currentUser = useContext(AuthContext).currentUser;
  const [decks, setDecks] = useState([]);
  const [state, setState] = useState(false);
  const [deckName, setDeckName] = useState("");

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("decks")
      .where("user", "==", currentUser.displayName)
      .onSnapshot((snapshot) => {
        setDecks(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    return () => unsubscribe();
  }, [currentUser]);

  const addNewDeck = async () => {
    if (deckName) {
      const newFromDB = await firebase.firestore().collection("decks").add({
        deckName: deckName,
        user: currentUser.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(newFromDB);
    }
    toggleDialog();
    history.push("/" + deckName);
    setDeckName("");
  };
  const toggleDialog = () => {
    setState(!state);
  };

  return (
    <>
      <div className="main-container">
        <div className="card-grid">
          {decks.map((deck) => {
            return <Deck deck={deck} key={deck.id}></Deck>;
          })}
        </div>
        <div className="button-container">
          <IconButton onClick={toggleDialog}>
            <Icon color="primary" fontSize="large">
              add_circle
            </Icon>
          </IconButton>
          <Dialog
            open={state}
            onClose={toggleDialog}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Add a Card</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                id="deckName"
                label="Deck Name"
                type="text"
                fullWidth
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={addNewDeck} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
}

export default DeckList;
