import React from "react";
import { SquareComponent } from "./square-component";
import { ScoreComponent } from "./score-component";
import { WinnerComponent } from "./winner-component";
import SweetAlert from 'sweetalert-react';
import {
  createEmptyArray,
  copyArray,
  checkRow,
  checkCol,
  countMoves,
  setFlag
} from "./helpers";
import { players, boardSize, maxPoints } from "./constants";

const classNames = require('classnames');

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      squares: createEmptyArray(),
      xIsNext: true,
      moveCount: 1,
      points: [0, 0],
      returnCount: [3, 3],
      show: false,
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

    if(length > 1 && !this.isEnd()) {
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
        value={this.state.squares[i][j]}
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
        <div className="game-board_row" key={i.toString()}>
          {col}
        </div>
      );
    }
    return row;
  }

  isEnd = () => {
    return this.state.points[0] + this.state.points[1] === maxPoints;
  }

  restartGame = () => {
    if(this.state.history.length > 1) {
      this.setState(this.initialState);
    }
  }

  render() {
    return (
      <div>
        <div className="game-board_header">
          <ScoreComponent
            value={players.x}
            xIsNext={this.state.xIsNext}
            points={this.state.points}
            returnCount={this.state.returnCount[0]}
            moveCount={this.state.moveCount}
          />
          <ScoreComponent
            value={players.o}
            xIsNext={this.state.xIsNext}
            points={this.state.points}
            returnCount={this.state.returnCount[1]}
            moveCount={this.state.moveCount}
          />
        </div>
          <div className="game-board_action">
            {this.isEnd() ? <WinnerComponent points={this.state.points} /> : this.createBoard()}
          </div>
        <div className="game-board_footer">
          <button className={classNames("back", {"disable": (this.state.xIsNext && this.state.returnCount[0] === 0) || (!this.state.xIsNext && this.state.returnCount[0] === 0)})} onClick={() => this.returnBack()}>
            <span>BACK MOVE</span>
          </button>
          <button className="restart" onClick={() => this.setState({ show: true })}>
            <span>RESTART GAME</span>
            <SweetAlert
              show={this.state.show}
              title="RESTART GAME"
              text="Are you sure?"
              showCancelButton={true}
              onConfirm={() => this.restartGame()}
              onCancel={() => this.setState({ show: false })}
            />
          </button>
        </div>
      </div>
    );
  }
}
