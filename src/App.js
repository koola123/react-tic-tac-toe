import Board from './Board';
import Square from './Square';
import {useState, useEffect} from 'react';

const fieldSquare = () => (new Array(9).fill(null));

const lines = [
  [0,1,2],  [3,4,5],  [6,7,8],  [0,3,6],
  [1,4,7],  [2,5,8],  [0,4,8],  [2,4,6]
];


function App() {
  const [squares, setSquares] = useState(fieldSquare);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const computerMove = squares.filter(square => square !== null).length % 2 === 1;
    const linesThatAre = (a,b,c) => {
      return lines.filter(squareIndexes => {
        const squareValues = squareIndexes.map(index => squares[index]);
        return JSON.stringify([a,b,c].sort()) === JSON.stringify(squareValues.sort());
      });
    };

    const emptyIndexes = squares
    .map((square, index) => square === null ? index : null)
    .filter(val => val !== null);

    const playerHasWon = linesThatAre ('x', 'x', 'x').length > 0;
    const computerHasWon = linesThatAre('o', 'o', 'o').length > 0;
      if (playerHasWon) {
        setWinner('x');
        alert('Player wins!');
      }
      if (computerHasWon) {
        setWinner('o');
        alert('Computer wins!')
      }
    const putComputerAt = index => {
      let newSquares = squares;
      newSquares[index] = 'o';
      setSquares([...newSquares]);
    };
    if (computerMove) {

      const linesToWin = linesThatAre('o', 'o', null);
        if (linesToWin.length > 0) {
        const winIndex = linesToWin[0].filter(index => squares[index] === null)[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre('x', 'x', null);
        if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(index => squares[index] === null)[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinueSmarter = linesThatAre('o', null, null);
        if (linesToContinueSmarter.length > 0) {
          putComputerAt(linesToContinueSmarter[0].filter(index => squares[index] === null)[0]);
          return;
        }

      const randomIndex = emptyIndexes[Math.ceil(Math.random()*emptyIndexes.length)];
        putComputerAt(randomIndex);
      }
    }, [squares]);

  function handleSquareClick(index) {
    const playerMove = squares.filter(square => square !== null).length % 2 === 0;
    if (playerMove) {
      let newSquares = squares;
      newSquares[index] = 'x';
      setSquares([...newSquares])
    }
  }

  return (
    <>
      <h1 className='title'>Let's play - Tic, Tac, Toe</h1>
      <div className='main'>
        <Board>
          {squares.map((square, index) =>
            <Square
            x = {square === 'x'? 1 : 0}
            o = {square === 'o' ? 1 : 0}
            onClick={() => handleSquareClick(index)}/>)}
        </Board>
        {!!winner && winner === 'x' && (
          <div className="result green">
            You WON!
          </div>
        )}
        {!!winner && winner === '0' && (
          <div className="result red">
            You LOST!
          </div>
        )}
      </div>
    </>
  );
}

export default App;
