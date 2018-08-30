import React from "react";
import { SquareComponent } from "./square-component";
import {
  createEmptyArray,
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
      points: [0, 0]
    };
  }

  handleClick(i, j) {
    const squares = this.state.squares.slice(),
      points = this.state.points.slice();

    let newSquares, newMoveCount, winCol, winRow;

    if (squares[i][j].character === players.valueUnknown) {
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
        {this.createBoard()}
      </div>
    );
  }
}
