import React, { useState, useContext } from "react";
import { Cell, Grid } from "./Grid";
import gridsData from "./gridsData";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [grids, setGrids] = useState({
    ...gridsData,
    custom: JSON.parse(localStorage.getItem("custom")) || [],
  });
  const [diffuculty, setDiffuculty] = useState("basic");
  const [usedGrids, setUsedGrids] = useState({
    basic: [],
    easy: [],
    medium: [],
    hard: [],
    custom: [],
  });
  const [grid, setGrid] = useState(new Grid(generate(diffuculty)));
  const [isComplete, setIsComplete] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [instantSolve, setInstantSolve] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [moves, setMoves] = useState([]);
  const [activeCell, setActiveCell] = useState(null);
  const [reRender, setReRender] = useState(false);

  function generate(diffuculty) {
    let randomGrid =
      grids[diffuculty][Math.floor(Math.random() * grids[diffuculty].length)];
    if (grids[diffuculty].length === 1) return randomGrid;
    while (usedGrids[diffuculty].includes(randomGrid)) {
      randomGrid =
        grids[diffuculty][Math.floor(Math.random() * grids[diffuculty].length)];
    }
    return randomGrid;
  }

  function undoMove() {
    if (moves.length) {
      let lastMove = moves.pop();
      lastMove.cell.value = lastMove.value;
      setMoves([...moves]);
      setActiveCell(lastMove.cell);
    }
  }

  function handleCreate() {
    if (isCreating) {
      for (let i = 0; i < grid.grid.length; i++) {
        for (let j = 0; j < grid.grid[i].length; j++) {
          let cell = grid.grid[i][j];
          if (!cell.check(cell.value, grid.grid)) {
            alert("Invalid grid");
            return false;
          }
        }
      }
      setIsEditing(false);
      setActiveCell(null);
      grid.grid = grid.grid.map((row) =>
        row.map((cell) => {
          cell.isFixed = cell.value ? true : false;
          return cell;
        })
      );
      grid.str = grid.generateStr();
      setGrids((prev) => ({
        ...prev,
        custom: [...prev.custom, grid.str],
      }));
      localStorage.setItem(
        "custom",
        JSON.stringify([...grids.custom, grid.str])
      );
    } else {
      setGrid(new Grid());
      setIsEditing(true);
    }
    setIsCreating((prev) => !prev);
    return true;
  }

  function handleGenerate(diff = diffuculty) {
    setIsSolving(false);
    setGrid(new Grid(generate(diff)));
    setMoves([]);
    setIsEditing(false);
    setActiveCell(null);
  }

  function handleNumberButtons(e, num) {
    let lastValue = activeCell && activeCell.value;
    if (isEditing && !activeCell.isFixed && num !== activeCell.value) {
      setMoves((prev) => [...prev, { cell: activeCell, value: lastValue }]);
      activeCell.value = num;
    }
  }

  function addUsedGrid() {
    if (usedGrids[diffuculty].length === grids[diffuculty].length - 1) {
      setUsedGrids((prev) => ({ ...prev, [diffuculty]: [] }));
    }
    setUsedGrids((prev) => ({
      ...prev,
      [diffuculty]: [...new Set([...prev[diffuculty], grid.str])],
    }));
  }

  function addClickListener() {
    const handleMouseClick = (e) => {
      let targetClass =
        typeof e.target.className === "object"
          ? "btn-text"
          : e.target.className;
      if (
        targetClass.includes("cell") &&
        !grid.grid[e.target.id[0]][e.target.id[2]].isFixed
      ) {
        setIsEditing(true);
        setActiveCell(grid.grid[e.target.id[0]][e.target.id[2]]);
      } else if (
        !(targetClass.includes("number") || targetClass.includes("btn-text"))
      ) {
        setIsEditing(false);
        setActiveCell(null);
      }
    };
    document.addEventListener("click", handleMouseClick);
    return () => document.removeEventListener("click", handleMouseClick);
  }

  function handleEditing() {
    const handleKeyDown = (e) => {
      let lastValue = activeCell.value;
      if ((e.key === "Backspace" || e.key === "0") && !activeCell.isFixed) {
        setMoves((prev) => [...prev, { cell: activeCell, value: lastValue }]);
        activeCell.value = 0;
      } else if (
        e.key >= 1 &&
        e.key <= 9 &&
        !activeCell.isFixed &&
        parseInt(e.key) !== activeCell.value
      ) {
        setMoves((prev) => [...prev, { cell: activeCell, value: lastValue }]);
        activeCell.value = parseInt(e.key);
      }
    };
    isEditing
      ? document.addEventListener("keydown", handleKeyDown)
      : document.removeEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }

  return (
    <Context.Provider
      value={{
        grids,
        setGrids,
        diffuculty,
        setDiffuculty,
        usedGrids,
        setUsedGrids,
        grid,
        setGrid,
        isComplete,
        setIsComplete,
        isSolving,
        setIsSolving,
        isEditing,
        setIsEditing,
        speed,
        setSpeed,
        instantSolve,
        setInstantSolve,
        isCreating,
        setIsCreating,
        moves,
        setMoves,
        activeCell,
        setActiveCell,
        generate,
        undoMove,
        handleCreate,
        handleGenerate,
        handleNumberButtons,
        addUsedGrid,
        addClickListener,
        handleEditing,
        setReRender,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export { Context, Provider };
