import React, { useEffect, useState } from "react";
import { useMyContext } from "../../context/MyContext";
import "./ViewArea.css";
import Modal from "../Modal/Modal";

const ViewArea = () => {
  const { state, handleState } = useMyContext();

  const handleDelete = (id) => {
    const arr = state.addTask.filter((ele) => ele.id !== id);
    handleState({ addTask: arr, refreshData: true });
  };
  const handleModal = (id) => {
    const arr = state.addTask.filter((ele) => ele.id === id)[0];

    handleState({
      idToDelete: id,
      showModal: !state.showModal,
      type: "Edit Details",
      modalData: arr,
      refreshData: true,
    });
  };
  const handleCheckBox = (id) => {
    handleState({
      selectedCheckBox: state.selectedCheckBox.includes(id)
        ? [...state.selectedCheckBox.filter((item) => item !== id)]
        : [...state.selectedCheckBox, id],
    });
  };
  const handleAllSelect = () => {
    if (state.isAllSelected) {
      handleState({ selectedCheckBox: [], isAllSelected: false });
    } else {
      handleState({
        selectedCheckBox: state.filterData.map((ele) => ele.id),
        isAllSelected: true,
      });
    }
  };
  // useEffect(() => {
  //   const handleTime = () => {
  //     const sysTime = new Date().getTime();
  //     const userTime = state.startTime;
  //     console.log(sysTime, userTime);
  //   };
  //   if (state.setTime) {
  //     handleTime();
  //   }
  //   handleState({ setTime: false });
  // }, [state.setTime]);

  useEffect(() => {
    if (
      state.selectedCheckBox.length === state.filterData.length &&
      state.selectedCheckBox.length
    ) {
      handleState({ isAllSelected: true });
    } else {
      handleState({ isAllSelected: false });
    }
  }, [state.selectedCheckBox, state.filterData]);
  // console.log(state);

  return (
    <div className="tableWrapper">
      <table className="tableMain">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={state.isAllSelected}
                onChange={handleAllSelect}
              />
            </th>
            <th>Sno</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.filterData?.map((ele, index) => (
            <tr
              key={index}
              className={
                ele.status === "NotStartedYet" ||
                ele.status === "Completed" ||
                ele.status === "Progress" ||
                ele.status === "Due"
                  ? `rowStyles-${ele.status}`
                  : "rowStyles"
              }
            >
              <td>
                <input
                  type="checkbox"
                  // checked={ele.isChecked}
                  onChange={() => {
                    // handleState({
                    //   addTask: [
                    //     ...state.addTask.map((ele1) =>
                    //       ele1.id === ele.id
                    //         ? { ...ele1, isChecked: !ele.isChecked }
                    //         : ele1
                    //     ),
                    //   ],
                    // });
                    handleCheckBox(ele.id);
                  }}
                  checked={state.selectedCheckBox.includes(ele.id)}
                  // disabled={state.disabledCheckbox}
                />
              </td>
              <td>{index + 1}</td>
              <td>{ele.title}</td>
              <td>{ele.description}</td>
              <td>{ele.startTime}</td>
              <td>{ele.endTime}</td>
              <td>{ele.status}</td>
              <td>
                <button
                  className="ButtonColourTaskEdit"
                  onClick={() => {
                    handleModal(ele.id);
                  }}
                  disabled={state.disabledCheckbox}
                >
                  Edit
                </button>
                <span> </span>
                <button
                  className="ButtonColourTaskDelete"
                  onClick={() => {
                    handleDelete(ele.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.showModal && <Modal type={state.type} />}
    </div>
  );
};

export default ViewArea;
