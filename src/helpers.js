import { players, boardSize, pointsRange } from "./constants";

const Square = function() {
  this.character = players.valueUnknown;
  this.row = false;
  this.rowClassName = "";
  this.col = false;
  this.colClassName = "";
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
    isEmpty = 0,
    _indexCol = indexCol - 1,
    correctRow = [];

  while (indexCol < boardSize && go) {
    let square = arrayOfSquares[indexRow][indexCol];

    if (square.character === player) {
      correctRow.push(indexCol);

      if (square.row === false) isEmpty++;
    } else {
      go = false;
    }

    indexCol++;
  }

  go = true;

  while (_indexCol >= 0 && go) {
    let square = arrayOfSquares[indexRow][_indexCol];

    if (square.character === player) {
      correctRow.push(_indexCol);

      if (square.row === false) isEmpty++;
    } else {
      go = false;
    }

    _indexCol--;
  }

  return correctArray(correctRow, isEmpty);
}

export function checkCol(arrayOfSquares, indexRow, indexCol) {
  let player = arrayOfSquares[indexRow][indexCol].character,
    go = true,
    isEmpty = 0,
    _indexRow = indexRow - 1,
    correctCol = [];

  while (indexRow < boardSize && go) {
    let square = arrayOfSquares[indexRow][indexCol];

    if (square.character === player) {
      correctCol.push(indexRow);

      if (square.col === false) isEmpty++;
    } else {
      go = false;
    }

    indexRow++;
  }

  go = true;

  while (_indexRow >= 0 && go) {
    let square = arrayOfSquares[_indexRow][indexCol];

    if (square.character === player) {
      correctCol.push(_indexRow);

      if (square.col === false) isEmpty++;
    } else {
      go = false;
    }

    _indexRow--;
  }

  return correctArray(correctCol, isEmpty);
}

function correctArray(array, isEmpty) {
  let length = array.length,
    isBusy = length - isEmpty,
    output = [];

  if (length > 2 && length < 6 && isBusy === 0) {
    output = array.slice(0,3);
  } else if (length > 6 && length < 9 && isEmpty > 3) {
    output = array.slice(0,6);
  } else if(length % pointsRange === 0 && isEmpty > 0) {
    output = array;
  }

  return output;
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
  correctRow.sort().forEach((value, index) => {
    arrayOfSquares[indexRow][value].row = true;
    arrayOfSquares[indexRow][value].rowClassName = `row${getClassName(correctRow, index)}`;
  });

  correctCol.sort().forEach((value, index) => {
    arrayOfSquares[value][indexCol].col = true;
    arrayOfSquares[value][indexCol].colClassName = `col${getClassName(correctCol, index)}`;
  });

  return arrayOfSquares;
}

function getClassName(array, index) {
  let className = "";

  if(index === 0) {
    className = "-start";
  } else if (index === array.length - 1) {
    className = "-end";
  } else {
    className = "-middle"
  }

  return className;
}
