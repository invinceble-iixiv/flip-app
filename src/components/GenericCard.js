import React from "react";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import "../styles/flashcard.css";
import firebase from "../firebase";

function GenericCard({ flashcard }) {
  const deleteCard = () => {
    firebase.firestore().collection("cards").doc(flashcard.id).delete();
  };

  const editCard = () => {
    // firebase.firestore().collection("cards").doc(flashcard.id).set({...flashcard, });
  };

  return (
    <div>
      <div className="general-card">
        <div className="item-label1">Question:</div>
        <div className="item-content1">{flashcard.question}</div>
        <div className="item-label2">Answer:</div>
        <div className="item-content2">{flashcard.answer}</div>
        <div className="item-footer">
          <Button onClick={editCard}>Edit</Button>
          <IconButton onClick={deleteCard}>
            <DeleteIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default GenericCard;
