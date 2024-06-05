import React, { useEffect } from "react";
import "./Search.css";
import { useMyContext } from "../../context/MyContext";
const Search = () => {
  const { state, handleState } = useMyContext();

  useEffect(() => {
    if (state.searchText === "") {
      if (state.notStartedYet) {
        const arr = state.addTask.filter(
          (ele) => ele.status === "NotStartedYet"
        );
        handleState({ filterData: arr });
      } else if (state.completed) {
        const arr = state.addTask.filter((ele) => ele.status === "Completed");
        handleState({ filterData: arr });
      } else if (state.progress) {
        const arr = state.addTask.filter((ele) => ele.status === "Progress");
        handleState({ filterData: arr });
      } else if (state.due) {
        const arr = state.addTask.filter((ele) => ele.status === "Due");
        handleState({ filterData: arr });
      } else if (state.refresh) {
        handleState({ filterData: state.addTask, refresh: false });
      } else {
        handleState({ filterData: state.addTask });
      }
    } else {
      if (state.notStartedYet) {
        const arr = state.addTask.filter(
          (ele) =>
            ele.status === "NotStartedYet" &&
            ele.title.includes(state.searchText)
        );
        handleState({ filterData: arr });
      } else if (state.completed) {
        const arr = state.addTask.filter(
          (ele) =>
            ele.status === "Completed" && ele.title.includes(state.searchText)
        );
        handleState({ filterData: arr });
      } else if (state.progress) {
        const arr = state.addTask.filter(
          (ele) =>
            ele.status === "Progress" && ele.title.includes(state.searchText)
        );
        handleState({ filterData: arr });
      } else if (state.due) {
        const arr = state.addTask.filter(
          (ele) => ele.status === "Due" && ele.title.includes(state.searchText)
        );
        handleState({ filterData: arr });
      } else if (state.refresh) {
        handleState({
          filterData: state.addTask,
          searchText: "",
          refresh: false,
        });
      } else {
        const arr = state.addTask.filter((ele) =>
          ele.title.includes(state.searchText)
        );

        handleState({ filterData: arr });
      }
    }
  }, [
    state.searchText,
    state.notStartedYet,
    state.due,
    state.completed,
    state.progress,
    state.refresh,
    state.addTask,
  ]);

  return (
    <div className="searchWrapper">
      <label className="input">
        <input
          className="input__field"
          type="text"
          value={state.searchText}
          onChange={(e) => {
            handleState({ searchText: e.target.value, refreshData: true });
          }}
        />
        <span className="input__label">Search Todo</span>
      </label>
    </div>
  );
};

export default Search;
