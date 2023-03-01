import { useGlobalContext } from "./context";
import { Cell, Grid } from "./Grid";
import "../styles/Navbar.css";
import { AiFillCaretDown } from "react-icons/ai";

function Navbar() {
  const {
    handleCreate,
    handleGenerate,
    isCreating,
    diffuculty,
    setDiffuculty,
    grids,
  } = useGlobalContext();

  return (
    <div className="navbar-container">
      <nav>
        <button className="create" onClick={handleCreate}>
          <span className="btn-text">{!isCreating ? "Create" : "Save"}</span>
        </button>
        <div className="diffuculty-container">
          <select
            name="diffuculty"
            className="select-diffuculty"
            value={diffuculty}
            onChange={(e) => {
              setDiffuculty(e.target.value);
              handleGenerate(e.target.value);
            }}
          >
            <option value="basic">Basic</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="custom">Custom ({grids.custom.length})</option>
          </select>
          <AiFillCaretDown className="dropdown-icon" />
        </div>
        <button className="generate" onClick={() => handleGenerate()}>
          <span className="btn-text">Generate</span>
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
