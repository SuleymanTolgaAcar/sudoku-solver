import React, { useState, useEffect } from "react";

import "../styles/Sudoku.css";
import { useGlobalContext } from "./context";

function Sudoku() {
  const {
    isComplete,
    setIsComplete,
    moves,
    isSolving,
    setIsSolving,
    speed,
    instantSolve,
    grid,
    isEditing,
    setIsEditing,
    activeCell,
    setActiveCell,
    addClickListener,
    handleEditing,
    setReRender,
    isCreating,
    handleCreate,
  } = useGlobalContext();

  async function solve(grid) {
    if (!grid.isSolving) return false;
    let emptyCells = await grid.findEmptyCells();
    let currentCell = emptyCells[0];
    setActiveCell(currentCell);

    if (!emptyCells.length) {
      return true;
    }

    for (let i = 1; i < 10; i++) {
      if (!grid.isSolving) return false;
      if (await currentCell.check(i, grid.grid)) {
        currentCell.value = i;
        if (!grid.instantSolve) {
          // setReRender((prev) => !prev);
          await new Promise((resolve) =>
            setTimeout(resolve, grid.waitInterval)
          );
        }
        if (await solve(grid)) {
          return true;
        }
        currentCell.wrong = true;
        currentCell.value = 0;
      }
    }
    return false;
  }

  useEffect(() => {
    if (!isSolving) {
      return handleEditing();
    }
  }, [isEditing, activeCell]);

  useEffect(() => {
    grid.grid.forEach((row) => {
      row.forEach((cell) => {
        if (!cell.isFixed) {
          cell.wrong = !cell.check(cell.value, grid.grid);
        }
      });
    });
  });

  useEffect(() => {
    setReRender((prev) => !prev);
  }, [moves]);

  useEffect(() => {
    grid.isSolving = isSolving;
    if (isSolving) {
      if (isCreating) {
        if (!handleCreate()) {
          setIsSolving(false);
          return;
        }
      }
      setIsEditing(false);
      grid.reset();
      solve(grid).then((isSolved) => {
        if (isSolved) {
          setIsComplete(true);
        } else {
          grid.reset();
        }
        setActiveCell(null);
        grid.grid.forEach((row) => {
          row.forEach((cell) => {
            cell.wrong = false;
          });
        });
        setIsSolving(false);
      });
    }
  }, [isSolving]);

  useEffect(() => {
    grid.waitInterval = 300 - speed * 3;
  }, [speed, grid.str]);

  useEffect(() => {
    grid.instantSolve = instantSolve;
  }, [instantSolve, grid.str]);

  useEffect(() => {
    return addClickListener();
  }, [grid.str, isEditing, activeCell]);

  const cells = grid.grid.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      return (
        <div
          className={`cell ${cell.wrong && "wrong"} ${
            activeCell && cell.id === activeCell.id && "active"
          } ${cell.isFixed && "fixed"}`}
          key={cell.id}
          id={cell.id}
        >
          {cell.value ? cell.value : ""}
        </div>
      );
    })
  );

  return <div className="sudoku">{cells}</div>;
}

export default Sudoku;
