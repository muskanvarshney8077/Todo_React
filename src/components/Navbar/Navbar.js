import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Modal from "../Modal/Modal";
import Icon from "../Icon/Icon";
import Search from "../Search/Search";
import { useMyContext } from "../../context/MyContext";

const Navbar = () => {
  const { state, handleState } = useMyContext();
  useEffect(() => {
    const sysTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      minutes = minutes < 10 ? "0" + minutes : minutes;
      const time24 = `${hours}:${minutes}`;
      return time24;
    };

    const arr = state.addTask.filter((ele) =>
      sysTime() < ele.startTime
        ? (ele.status = "NotStartedYet")
        : sysTime() < ele.endTime
        ? (ele.status = "Progress")
        : (ele.status = "Due")
    );
    // console.log(arr);
    handleState({ addTask: arr, refreshData: false });
  }, [state.refreshData]);

  const handleModal = () => {
    handleState({
      showModal: !state.showModal,
      type: "Save Details",
      refreshData: true,
    });
  };
  console.log(state.refreshData);
  return (
    <div>
      <h1 className="NavbarHeading">Todo</h1>
      <div className="wrapper">
        <Search />
        <button
          className="ButtonColour"
          onClick={() => {
            handleModal();
          }}
        >
          Add a Todo Task
        </button>
      </div>
      <Icon />
      {state.showModal && <Modal type={state.type} />}
    </div>
  );
};

export default Navbar;
