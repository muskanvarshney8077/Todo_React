import React from "react";
import notStartedYet from "../../assets/pending.png";
import completed from "../../assets/Completed.png";
import due from "../../assets/Due.png";
import started from "../../assets/started.png";
import refresh from "../../assets/refresh.png";
import "./Icon.css";
import { useMyContext } from "../../context/MyContext";
const Icon = () => {
  const { state, handleState } = useMyContext();
  return (
    <div>
      <div className="box">
        <div
          className={state.notStartedYet ? "my-class-notYetStarted" : "clock"}
        >
          <div>
            <img
              src={notStartedYet}
              alt="notStartedYet"
              width={40}
              height={40}
            />
          </div>
          <p
            className="boxText "
            onClick={() => {
              handleState({
                // filterData: state.addTask,
                notStartedYet: !state.notStartedYet,
                completed: false,
                due: false,
                progress: false,
                refresh: false,
                refreshData: true,
              });
            }}
          >
            Not Started Yet
          </p>
        </div>
        <div className={state.completed ? "my-class-completed" : "subBox"}>
          <img src={completed} alt="completed" width={35} height={35} />
          <p
            className="boxText"
            onClick={() => {
              handleState({
                notStartedYet: false,
                completed: !state.completed,
                due: false,
                progress: false,
                refresh: false,
                refreshData: true,
              });
            }}
          >
            Completed
          </p>
        </div>
        <div className={state.progress ? "my-class-progress" : "subBox"}>
          <img src={started} alt="started" width={35} height={35} />
          <p
            className="boxText"
            onClick={() => {
              handleState({
                notStartedYet: false,
                completed: false,
                due: false,
                progress: !state.progress,
                refresh: false,
                refreshData: true,
              });
            }}
          >
            In Progress
          </p>
        </div>
        <div className={state.due ? "my-class-due" : "subBox"}>
          <img src={due} alt="due" width={35} height={35} />
          <p
            className="boxText"
            onClick={() => {
              handleState({
                notStartedYet: false,
                completed: false,
                due: !state.due,
                progress: false,
                refresh: false,
                refreshData: true,
              });
            }}
          >
            Due
          </p>
        </div>
        <div className="subBox">
          <img src={refresh} alt="refresh" width={35} height={35} />
          <p
            className="boxText"
            onClick={() => {
              handleState({
                notStartedYet: false,
                completed: false,
                due: false,
                progress: false,
                refresh: !state.refresh,
                refreshData: true,
              });
            }}
          >
            Refresh
          </p>
        </div>
      </div>
    </div>
  );
};

export default Icon;
