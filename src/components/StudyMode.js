import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Flashcard from "./Flashcard";
import { Button } from "@material-ui/core";
import "../styles/studymode.css";

function StudyMode() {
  const history = useHistory();
  const randomStart = (itemList) => {
    return itemList.sort(() => Math.random() - 0.5)[0];
  };

  const [currList, setCurrList] = useState(history.location.state);
  const [currItem, setCurrItem] = useState(randomStart(currList));
  const [allList, setAllList] = useState(currList);

  const gotoDeck = () => {
    history.goBack();
  };

  const nextItem = () => {
    console.log(currList);
    const newCurrList = currList.filter((list) => list.id !== currItem.id);
    setCurrList(newCurrList);
    if (currList.length > 1) {
      setCurrItem(randomStart(newCurrList));
    }
  };
  const startOver = () => {
    setCurrList(allList);
    setCurrItem(randomStart(currList));
  };

  return (
    <>
      <div className="study-container">
        <div className="flash-container">
          <Flashcard flashcard={currItem} key={currItem.cardId} />
        </div>
        <div className="study-button-container">
          <Button onClick={gotoDeck}>Quit</Button>
          {currList.length > 1 ? (
            <Button onClick={nextItem}>Next</Button>
          ) : (
            <Button onClick={startOver}>Start Over</Button>
          )}
        </div>
      </div>
    </>
  );
}

export default StudyMode;
