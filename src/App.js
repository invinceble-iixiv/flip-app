import React, { useState, useEffect } from "react";
import "./App.css";
import FlashcardList from "./components/FlashcardList";
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import firebase from "./firebase";

const flashcards_sample = [
  {
    id: 0,
    question: "question 1",
    answer: "answer 1",
    studied: false,
  },
  {
    id: 1,
    question: "question 2",
    answer: "answer 1",
    studied: false,
  },
  {
    id: 2,
    question: "question 3",
    answer: "answer 1",
    studied: false,
  },
];

function App() {
  const [flashcardList, setFlashcardList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await firebase
        .firestore()
        .collection("cards")
        .where("deckName", "==", "d-test1")
        .get();
      setFlashcardList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
    console.log(flashcardList);
  }, []);

  return (
    <>
      {/* <AppBar>
        <Toolbar>
          <Typography variant="h6">Flip</Typography>
        </Toolbar>
      </AppBar> */}
      <div className="container">
        <FlashcardList flashcards={flashcardList}></FlashcardList>
      </div>
      <BottomNavigation>
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </BottomNavigation>
    </>
  );
}

export default App;
