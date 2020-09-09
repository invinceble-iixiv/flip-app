import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import AddDialog from "./AddDialog";
import GenericCard from "./GenericCard";
import firebase from "../firebase";
import "../styles/cardlist.css";

function FlashcardList() {
  const { deck } = useParams();
  const history = useHistory();
  const [flashcardList, setFlashcardList] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("cards")
      .where("deckName", "==", deck)
      .onSnapshot((snapshot) => {
        setFlashcardList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log(snapshot);
      });
    return () => unsubscribe();
  }, []);

  const goStudy = () => {
    history.push({ pathname: `/decks/${deck}/study`, state: flashcardList });
  };
  return (
    <>
      <div className="main-container">
        <div className="card-grid">
          {flashcardList.map((card) => {
            return <GenericCard flashcard={card} key={card.id}></GenericCard>;
          })}
        </div>
        <div className="button-container">
          <Button onClick={() => history.goBack()}>Decks</Button>
          <Button onClick={goStudy}>Study</Button>
          <AddDialog deckName={deck} />
        </div>
      </div>
    </>
  );
}

export default FlashcardList;
