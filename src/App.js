import { useState } from "react";
import "./App.css";
import SnakeBoard from "./components/SnakeBoard";

function App() {
  const [boardInput, setBoardInput] = useState({
    snakeLength: 3,
    boardSize: 6,
  });

  return (
    <main className="app-container">
      <SnakeBoard
        snakeLength={boardInput.snakeLength}
        boardSize={boardInput.boardSize}
      />
    </main>
  );
}

export default App;
