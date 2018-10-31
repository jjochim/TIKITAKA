import { players, boardSize, pointsRange } from "./constants";

const Square = function() {
  this.character = players.valueUnknown;
  this.row = false;
  this.col = false;
};

Object.defineProperties(Square.prototype, {
  type: {
    value: function() {
      if (this.character === players.valueX) return players.x;
      else if (this.character === players.valueO) return players.o;
      else return players.unknown;
    }
  }
});

export function createEmptyArray() {
  let output = Array(boardSize);
  for (let i = 0; i < boardSize; i++) {
    let tab = [];
    for (let j = 0; j < boardSize; j++) {
      tab.push(new Square());
    }
    output[i] = tab;
  }

  return output;
}

export function copyArray(oldArray) {
  let output = createEmptyArray();

  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      Object.assign(output[i][j], oldArray[i][j]);
    }
  }

  return output;
}

export function checkRow(arrayOfSquares, indexRow, indexCol) {
  let player = arrayOfSquares[indexRow][indexCol].character,
    go = true,
    empty = false,
    _indexCol = indexCol - 1,
    correctRow = [];

  while (indexCol < boardSize && go) {
    arrayOfSquares[indexRow][indexCol].character === player
      ? correctRow.push(indexCol)
      : (go = false);
    if (arrayOfSquares[indexRow][indexCol].row === false) empty = true;
    indexCol++;
  }

  go = true;

  while (_indexCol >= 0 && go) {
    arrayOfSquares[indexRow][_indexCol].character === player
      ? correctRow.push(_indexCol)
      : (go = false);
    if (arrayOfSquares[indexRow][_indexCol].row === false) empty = true;
    _indexCol--;
  }

  return correctRow.length % pointsRange === 0 && empty ? correctRow : [];
}

export function checkCol(arrayOfSquares, indexRow, indexCol) {
  let player = arrayOfSquares[indexRow][indexCol].character,
    go = true,
    empty = false,
    _indexRow = indexRow - 1,
    correctCol = [];

  while (indexRow < boardSize && go) {
    arrayOfSquares[indexRow][indexCol].character === player
      ? correctCol.push(indexRow)
      : (go = false);
    if (arrayOfSquares[indexRow][indexCol].col === false) empty = true;
    indexRow++;
  }

  go = true;

  while (_indexRow >= 0 && go) {
    arrayOfSquares[_indexRow][indexCol].character === player
      ? correctCol.push(_indexRow)
      : (go = false);
    if (arrayOfSquares[_indexRow][indexCol].col === false) empty = true;
    _indexRow--;
  }

  return correctCol.length % pointsRange === 0 && empty ? correctCol : [];
}

export function countMoves(correctTab) {
  return correctTab.length / pointsRange;
}

export function setFlag(
  arrayOfSquares,
  correctRow,
  correctCol,
  indexRow,
  indexCol
) {
  correctRow.forEach(value => {
    arrayOfSquares[indexRow][value].row = true;
  });

  correctCol.forEach(value => {
    arrayOfSquares[value][indexCol].col = true;
  });

  return arrayOfSquares;
}
