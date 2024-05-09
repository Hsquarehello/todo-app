import React, { useEffect, useState } from "react";

export default function FilterButton({ filterBy }) {
  let [filterState, setFilterState] = useState("All");

  useEffect(() => {
    filterBy(filterState);
  }, [filterState, filterBy]);

  return (
    <div>
      <button
        className={`button filter-button ${
          filterState == "All" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilterState("All")}>
        All
      </button>
      <button
        className={`button filter-button ${
          filterState == "Active" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilterState("Active")}>
        Active
      </button>
      <button
        className={`button filter-button ${
          filterState == "Completed" ? "filter-button-active" : ""
        }`}
        onClick={() => setFilterState("Completed")}>
        Completed
      </button>
    </div>
  );
}
