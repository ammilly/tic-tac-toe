import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className='square' onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function Board(props) {
    const renderSquare = i => (<Square value={props.squares[i]} onClick={() => props.onClick(i)} />);

    return (
        <>
            {/* <div className="status">{status}</div> */}
            <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
            </div>
            <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
            </div>
            <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
            </div>
        </>
    );
}

function Game(props) {
    const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);

    const moves = history.map((step, move) => {
        const desc = move ? `Go to move #${move}` : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const jumpTo = step => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const handleClick = i => {
        const hist = history.slice(0, stepNumber + 1);
        const current = hist[hist.length - 1];
        const arr = current.squares.slice();//Object.assign({}, current.squares);

        if(calculateWinner(arr) || arr[i]) {
            return;
        }

        arr[i] = xIsNext ? 'X' : 'O';
        setHistory(hist.concat([{squares: arr}]));
        setStepNumber(hist.length);
        setXIsNext(!xIsNext);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    let status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

    return (
        <div className='game'>
            <div className='game-board'>
                <Board squares={current.squares} onClick={i => handleClick(i)} />
            </div>
            <div className='game-info'>
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

ReactDom.render(
    <Game />,
    document.getElementById('root')
);
