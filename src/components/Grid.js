class Cell {
  constructor(value, row, col) {
    this.value = value;
    this.row = row;
    this.col = col;
    this.id = `${row}-${col}`;
    this.possibleValues = [];
    this.isFixed = value !== 0;
    this.wrong = false;
  }

  check(value, grid) {
    const { row, col } = this;
    if (value === 0) return true;

    // Check row
    for (let i = 0; i < grid.length; i++) {
      if (i !== col && grid[row][i].value === value) {
        return false;
      }
    }

    // Check column
    for (let i = 0; i < grid.length; i++) {
      if (i !== row && grid[i][col].value === value) {
        return false;
      }
    }

    // Check square
    const squareRow = Math.floor(row / 3) * 3;
    const squareCol = Math.floor(col / 3) * 3;

    for (let i = squareRow; i < squareRow + 3; i++) {
      for (let j = squareCol; j < squareCol + 3; j++) {
        if (i !== row && j !== col && grid[i][j].value === value) {
          return false;
        }
      }
    }

    return true;
  }

  findPossibleValues(grid) {
    this.possibleValues = [];
    for (let i = 1; i < 10; i++) {
      this.check(i, grid) && this.possibleValues.push(i);
    }
    return this.possibleValues;
  }
}

class Grid {
  constructor(
    gridStr = "................................................................................."
  ) {
    const sudokuArr = gridStr.split("");
    const sudokuRows = [];
    for (let i = 0; i < 9; i++) {
      sudokuRows.push(
        sudokuArr
          .slice(i * 9, i * 9 + 9)
          .map((num) => (num === "." ? 0 : parseInt(num)))
          .map((num, index) => new Cell(num, i, index))
      );
    }
    this.grid = sudokuRows;
    this.isSolving = false;
    this.waitInterval = 0;
    this.instantSolve = false;
    this.str = gridStr;
  }

  reset() {
    this.grid.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.isFixed) {
          cell.value = 0;
        }
      });
    });
  }

  checkComplete() {
    return this.grid.every((row) => row.every((cell) => cell.value));
  }

  findEmptyCells() {
    return this.grid
      .map((row) => row.filter((cell) => !cell.value))
      .reduce((a, b) => a.concat(b), []);
  }

  generateStr() {
    return this.grid
      .map((row) => row.map((cell) => cell.value).join(""))
      .join("")
      .replaceAll("0", ".");
  }
}

export { Cell, Grid };
