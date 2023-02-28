import React, { useState, useEffect } from "react";
import Sudoku from "./Sudoku";
import { useGlobalContext } from "./context";
import { BiUndo } from "react-icons/bi";
import { AiOutlineClear } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { IconContext } from "react-icons";
import { BsLightningChargeFill } from "react-icons/bs";

import "../styles/Hero.css";

function Hero() {
  const {
    grid,
    setIsSolving,
    speed,
    setSpeed,
    instantSolve,
    setInstantSolve,
    setMoves,
    undoMove,
    addUsedGrid,
    handleNumberButtons,
  } = useGlobalContext();

  useEffect(() => {
    addUsedGrid();
  }, [grid.str]);

  return (
    <div className="hero">
      <Sudoku />
      <div className="all-buttons">
        <div className="controls">
          <button className="solve" onClick={() => setIsSolving(true)}>
            <span className="btn-text">Auto Solve</span>
          </button>
          <button className="stop" onClick={() => setIsSolving(false)}>
            <span className="btn-text">Stop</span>
          </button>
        </div>
        <div className="label-container">
          <label htmlFor="speed-slider">Speed:</label>
          <input
            type="range"
            className="speed-slider"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
        <div className="label-container">
          <label htmlFor="instant-solve-container">Instant Solve:</label>
          <div className="instant-solve-container">
            <input
              type="checkbox"
              className="instant-solve"
              checked={instantSolve}
              onChange={() => setInstantSolve((prev) => !prev)}
            />
          </div>
        </div>
        <div className="number-buttons">
          {Array.from(Array(9).keys()).map((index) => (
            <button
              className="number"
              key={index}
              onClick={(e) => handleNumberButtons(e, index + 1)}
            >
              <span className="btn-text">{index + 1}</span>
            </button>
          ))}
          <button className="undo" onClick={undoMove}>
            <span className="btn-text">
              <BiUndo className="btn-icon" />
            </span>
          </button>
          <button
            className="clear number"
            onClick={(e) => handleNumberButtons(e, 0)}
          >
            <span className="btn-text">
              <AiOutlineClear className="btn-icon" />
            </span>
          </button>
          <button
            className="reset"
            onClick={() => {
              setMoves([]);
              grid.reset();
            }}
          >
            <span className="btn-text">
              <GrPowerReset className="btn-icon" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
