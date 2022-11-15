import React, { useContext, useEffect, useCallback } from "react";
import { AppContext } from "../App";
import Key from "./Key";
// import { Icon } from '@iconify/react';

// {/* <Icon icon="cil:delete" /> */}

const Keyboard = () => {
  const { onSelectLetter, onEnter, onDeleteLetter } = useContext(AppContext);
  
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];


  const handleKeyboard = useCallback((e) => {
    if(e.key === "Enter") {
      onEnter();
    } else if(e.key === "Backspace") {
      onDeleteLetter();
    } else {
      keys1.forEach(key => {
        if(e.key.toUpperCase() === key.toUpperCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach(key => {
        if(e.key.toUpperCase() === key.toUpperCase()) {
          onSelectLetter(key);
        }
      });
      keys3.forEach(key => {
        if(e.key.toUpperCase() === key.toUpperCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);
    
    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard])

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return <div><Key keyVal={key} /></div>;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <div><Key keyVal={key} /></div>;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey/>
        {keys3.map((key) => {
          return <div><Key keyVal={key} /></div>;
        })}
        <Key keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  );
};

export default Keyboard;
