import React from "react";
import { SquareComponent } from "./square-component";
import {
  createEmptyArray,
  copyArray,
  checkRow,
  checkCol,
  countMoves,
  setFlag
} from "./helpers";
import { players, boardSize, maxPoints } from "./constants";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: createEmptyArray(),
      xIsNext: true,
      moveCount: 1,
      points: [0, 0],
      returnCount: [3, 3],
      history: [{squares: this.squares, xIsNext: this.xIsNext, moveCount: this.moveCount, points: this.points}]
    };
  }

  handleClick(i, j) {
    const squares = this.state.squares.slice(),
      points = this.state.points.slice();

    let newSquares, newMoveCount, winCol, winRow, newHistory;

    if (squares[i][j].character === players.valueUnknown) {
      newHistory = this.state.history;
      newHistory.push({squares: copyArray(squares), xIsNext: this.state.xIsNext, moveCount: this.state.moveCount, points: this.state.points});

      this.setState({
        history: newHistory
      });

      squares[i][j].character = this.state.xIsNext
        ? players.valueX
        : players.valueO;
      this.state.xIsNext ? points[0]++ : points[1]++;

      winRow = checkRow(squares, i, j);
      winCol = checkCol(squares, i, j);

      newMoveCount = countMoves(winCol) + countMoves(winRow);

      newSquares = setFlag(squares, winRow, winCol, i, j);

      this.setState({
        points: points,
        squares: newSquares
      });

      if (this.state.moveCount === 1 && newMoveCount === 0) {
        this.setState({
          xIsNext: !this.state.xIsNext
        });
      } else {
        this.setState({
          moveCount: this.state.moveCount + newMoveCount - 1
        });
      }
    }
  }

  returnBack() {
    let newHistory = this.state.history,
      length = newHistory.length;

    if(length > 1) {
      let xIsNext = newHistory[newHistory.length -1].xIsNext,
        newReturnCount = this.state.returnCount.slice();

      if(xIsNext && newReturnCount[0] > 0) {
        newReturnCount[0]--;
      } else if(!xIsNext && newReturnCount[1] > 0) {
        newReturnCount[1]--;
      } else {
        return;
      }

      let backTo = newHistory.pop();

      this.setState({
        returnCount: newReturnCount,
        history: newHistory,
        squares: backTo.squares,
        xIsNext: backTo.xIsNext,
        moveCount: backTo.moveCount,
        points: backTo.points
      });
    }
  }

  renderSquare(i, j) {
    return (
      <SquareComponent
        key={(i * boardSize + j).toString()}
        value={this.state.squares[i][j].type()}
        onClick={() => this.handleClick(i, j)}
      />
    );
  }

  createBoard = () => {
    let row = [];

    for (let i = 0; i < boardSize; i++) {
      let col = [];

      for (let j = 0; j < boardSize; j++) {
        col.push(this.renderSquare(i, j));
      }
      row.push(
        <div className="board-row" key={i.toString()}>
          {col}
        </div>
      );
    }
    return row;
  };

  render() {
    let status, points, move;
    if (this.state.points[0] + this.state.points[1] === maxPoints) {
      status = `Winner: ${
        this.state.points[0] > this.state.points[1] ? players.x : players.o
      } ${Math.max(this.state.points[0], this.state.points[1])}/${maxPoints}`;
    } else {
      status = `Player: ${this.state.xIsNext ? players.x : players.o}`;
      points = `You points: ${
        this.state.xIsNext ? this.state.points[0] : this.state.points[1]
      }`;
      move = `Your moves count: ${this.state.moveCount}`;
    }

    return (
      <div>
        <div>{status}</div>
        <div>{move}</div>
        <div className="status">{points}</div>
        <button className="back" onClick={() => this.returnBack()}>
          cofnij
        </button>
        {this.createBoard()}
      </div>
    );
  }
}
