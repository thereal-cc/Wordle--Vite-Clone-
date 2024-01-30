import { useState } from 'react';
import words from './words.js';
import Keyboard from './keyboard.jsx';

function create2DArray(rows, cols, parameter) {
  return Array(rows).fill().map(() => Array(cols).fill(parameter));
}

function randomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

export default function App() {
  const rows = 6;
  const cols = 5;
  const initialBoard = create2DArray(rows, cols, " ");
  const initialColors = create2DArray(rows, cols, "bg-gray-300");

  const [board, setBoard] = useState(initialBoard);
  const [cellColors, setCellColors] = useState(initialColors);
  const [targetWord, setTargetWord] = useState(randomWord(words));
  const [status, setStatus] = useState("");
  const [turn, setTurn] = useState(0);
  const [inGame, setInGame] = useState(true);

  // Keyboard Click
  const handleKeyPress = (key) => {
    if (key !== "Reset Game" && inGame) {
      switch (key) {
        case "Enter":
          checkGuess();
          break;
        case "Backspace":
          setStatus("");
          removeLetterFromGuess();
          break;
        default:
          setStatus("");
          addLetterToGuess(key);
          break;
      } 
    } else if (key === "Reset Game" && !inGame) {
      resetGame();
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
      setStatus("Invalid Selection");
      return;
    }

    for (let i = 0; i < cols; i++) {
      const letter = board[turn][i];
      let letterPos = targetWord.indexOf(letter);

      if (letterPos === -1) {
        newColors[turn][i] = "bg-gray-500";
      } else {
        if (letter === targetWord[i]) {
          newColors[turn][i] = "bg-green-500";
          correctLetters += 1;
        } else {
          newColors[turn][i] = "bg-yellow-500";
        }
      }
    }

    // Set Colors of Cells and increase turn
    setCellColors(newColors);
    
    // Increase turns, guess isn't correct
    if (correctLetters !== cols) {
      if (turn === 5) { // Invalid movement
        setStatus("You Lose, The word was: " + targetWord);
        setInGame(false);
        return;
      }
      // Turn is <= 5
      setTurn((turn) => turn + 1);
    } else if (userWord === targetWord) {
      setStatus("You Win!");
      setInGame(false);
    }
  }

  const resetGame = () => {
    setBoard(initialBoard);
    setCellColors(initialColors);
    setTurn(0);
    setTargetWord(randomWord(words));
    setStatus("")
    setInGame(true);
  }

  const renderCell = (letter, row, col) => (
    <div key={`${row}-${col}`} className={`flex w-16 h-16 border border-gray-500 text-2xl text-center items-center justify-center font-bold ${cellColors[row][col]}`}>
      <h1>{letter}</h1>
    </div>
  );

  return (
    <div className="bg-gray-200 h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mt-8">
        <div className="font-bold text-xl mb-4">{status}</div>
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
