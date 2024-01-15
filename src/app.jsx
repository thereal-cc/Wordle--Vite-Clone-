import { useState, useEffect } from 'react';
import words from './words.js';
import Keyboard from './keyboard.jsx';

function create2DArray(rows, cols, parameter) {
  return Array(rows).fill().map(() => Array(cols).fill(parameter));
}

export default function App() {
  const rows = 6;
  const cols = 5;
  const initialBoard = create2DArray(rows, cols, " ");
  const initialColors = create2DArray(rows, cols, "bg-gray-300");

  const [board, setBoard] = useState(initialBoard);
  const [targetWord, setTargetWord] = useState("");
  const [turn, setTurn] = useState(0);
  const [cellColors, setCellColors] = useState(initialColors);

  // Set random word
  useEffect(() => {
    const wordToGuess = words[Math.floor(Math.random() * words.length)];
    setTargetWord(wordToGuess.toUpperCase());
  }, [targetWord]);

  // Keyboard Click
  const handleKeyPress = (key) => {
    switch (key) {
      case "Enter":
        checkGuess();
        break;
      case "Backspace":
        removeLetterFromGuess();
        break;
      case "Reset Game":
        resetGame();
        break;
      default:
        addLetterToGuess(key);
        break;
    }
  };

  function addLetterToGuess(key) {
    for (let j = 0; j < cols; j++) {
      if (board[turn][j] === " ") {
        const newBoard = [...board];
        newBoard[turn][j] = key;
        setBoard(newBoard);
        return;
      }
    }
  }

  function removeLetterFromGuess() {
    const newBoard = [...board];
    const currentRow = newBoard[turn];

    for (let j = 0; j < cols; j++) {
      if (j > 0 && currentRow[j] === " ") {
        currentRow[j - 1] = " ";
        setBoard(newBoard);
        return;
      } else if (j === cols - 1) {
        currentRow[j] = " ";
        setBoard(newBoard);
        return;
      }
    }
  }

  function checkGuess() {
    // Check that each column has a letter
    let userWord = board[turn][0] + board[turn][1] + board[turn][2] + board[turn][3] + board[turn][4];
    let correctLetters = 0;
    let newColors = [...cellColors];

    if (userWord.includes(" ")) {
      console.log("Invalid Selection");
      return;
    }

    for (let i = 0; i < cols; i++) {
      const letter = board[turn][i];
      let letterPos = targetWord.indexOf(letter);

      if (letterPos === -1) {
        // Letter is not in word
        newColors[turn][i] = "bg-gray-500"; // Reset color to default gray
        console.log("Not In Word");
      } else {
        // Letter is in word
        if (letter === targetWord[i]) {
          // Right Position, set Color to Green
          newColors[turn][i] = "bg-green-500";
          console.log("Right Position");
          correctLetters += 1;
        } else {
          // Different Position, set Color to Yellow
          newColors[turn][i] = "bg-yellow-500";
          console.log("Wrong position");
        }
      }
    }

    if (correctLetters !== cols) {
      // Word is correct
      setCellColors(newColors);
      setTurn((turn) => turn + 1);
      return
    } else {
      setCellColors(newColors);
      return;
    }
  }

  const resetGame = () => {
    setBoard(initialBoard);
    setCellColors(initialColors);
    setTurn(0);
    setTargetWord("");
  }

  const renderCell = (letter, row, col) => (
    <div key={`${row}-${col}`} className={`flex w-16 h-16 border border-gray-500 text-2xl text-center items-center justify-center font-bold ${cellColors[row][col]}`}>
      <h1>{letter}</h1>
    </div>
  );

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mt-8">
        <div className="grid grid-cols-5 gap-2">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => renderCell(cell, rowIndex, colIndex))
          )}
        </div>
      </div>
      <Keyboard onKeyPress={handleKeyPress} />
    </div>
  );
}
