import React, { useState, useContext } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
} from "@material-ui/core";
import firebase from "../firebase";
import { AuthContext } from "./Auth";

function AddDialog({ deckName }) {
  const currentUser = useContext(AuthContext).currentUser;
  const [state, setState] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const toggleDialog = () => {
    setState(!state);
  };

  const addNewCard = async () => {
    console.log(question);
    console.log(answer);
    if (question && answer) {
      const newFromDB = await firebase.firestore().collection("cards").add({
        question: question,
        answer: answer,
        user: currentUser.displayName,
        deckName: deckName,
        famLvl: 1,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log(newFromDB);
    }
    setQuestion("");
    setAnswer("");
    toggleDialog();
  };

  return (
    <div>
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
            id="question"
            label="Question"
            type="text"
            fullWidth
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <TextField
            id="answer"
            label="Answer"
            type="text"
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={addNewCard} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddDialog;
