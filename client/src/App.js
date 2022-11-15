import "./App.css";
import React, { useState, createContext } from "react";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import { boardDefault } from "./Words";

export const AppContext = createContext();

const App = ({ keyVal }) => {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({attempt: 0, letterPos: 0});
  const [correctWord, setCorrectWord] = useState("");
  
  const onSelectLetter = (keyVal) => {
    if(currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos + 1})
  }

  const onDeleteLetter = () => {
    if(currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1});
  }

  const onEnter = () => {
    if(currentAttempt.letterPos !== 5) return;
    setCurrentAttempt({attempt: currentAttempt.attempt + 1, letterPos: 0})
  }

  return (
    <div className="app">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt, correctWord, setCorrectWord, onSelectLetter, onEnter, onDeleteLetter }}>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
};

export default App;
