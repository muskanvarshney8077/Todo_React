import React from "react";
import "./Footer.css";
import { useMyContext } from "../../context/MyContext";
const Footer = () => {
  const { state, handleState } = useMyContext();
  const handleCheckedDelete = () => {
    const arr = state.addTask.filter(
      (ele) => !state.selectedCheckBox.includes(ele.id)
    );
    handleState({
      addTask: arr,
      selectedCheckBox: [],
      isAllSelected: false,
      refreshData: true,
    });
  };
  const handleCheckedCompleted = () => {
    handleState({
      addTask: [
        ...state.addTask.map((ele) =>
          state.selectedCheckBox.includes(ele.id)
            ? { ...ele, status: "Completed" }
            : ele
        ),
      ],
      isAllSelected: false,
      selectedCheckBox: [],
      disabledCheckbox: true,
      refreshData: true,
    });
  };
  return (
    <div className="footer-wrapper">
      <button
        className={
          state.selectedCheckBox.length ? "btn-delete" : "btn-delete-inactive"
        }
        onClick={handleCheckedDelete}
      >
        Delete selected
      </button>
      <button
        className={
          state.selectedCheckBox.length
            ? "btn-complete"
            : "btn-complete-inactive"
        }
        onClick={handleCheckedCompleted}
      >
        Complete selected
      </button>
    </div>
  );
};

export default Footer;
