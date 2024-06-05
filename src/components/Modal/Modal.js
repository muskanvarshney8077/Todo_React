import React from "react";
import "./Modal.css";
import { useMyContext } from "../../context/MyContext";

const Modal = ({ type }) => {
  const { state, handleState, modalDataFunction } = useMyContext();
  const validate = () => {
    if (
      (state.modalData.title &&
        state.modalData.description &&
        state.modalData.startTime,
      state.modalData.endTime)
    ) {
      if (state.modalData.endTime < state.modalData.startTime) {
        handleState({ checkTime: true });
        return false;
      } else {
        return true;
      }
    } else {
      alert("please fill the required field");
      return false;
    }
  };
  const handleSaveDetails = (e) => {
    e.preventDefault();
    if (validate()) {
      if (type === "Edit Details") {
        const arr = state.addTask.filter((ele) => ele.id !== state.idToDelete);

        const newArr = [...arr, state.modalData];

        handleState({ addTask: newArr, showModal: false, refreshData: true });
        // modalDataFunction();
      } else {
        const newTask = { ...state.modalData, id: crypto.randomUUID() };

        handleState({
          addTask: [...state.addTask, newTask],
          showModal: false,
          refreshData: true,
          checkTime: false,
        });
        // modalDataFunction();
      }
    }
  };

  return (
    <div className="modal">
      <div className={`modal-wrapper ${state.showModal ? "active" : ""}`}>
        <div className="modal-start">
          <div className="modal-input-label">
            <label className="modal-label">Title:</label>
            <input
              type="text"
              className="modal-input"
              value={state.modalData.title}
              onChange={(e) => {
                handleState({
                  modalData: {
                    ...state.modalData,
                    title: e.target.value,
                  },
                });
              }}
              required
            />
          </div>
          <div className="modal-input-label">
            <label className="modal-label">Description:</label>
            <input
              type="text"
              className="modal-input"
              value={state.modalData.description}
              onChange={(e) => {
                handleState({
                  modalData: {
                    ...state.modalData,
                    description: e.target.value,
                  },
                });
              }}
              required
            />
          </div>
          <div className="modal-input-label">
            <label className="modal-label">Start Time:</label>
            <input
              type="time"
              className="modal-input"
              value={state.modalData.startTime}
              onChange={(e) => {
                handleState({
                  modalData: { ...state.modalData, startTime: e.target.value },
                });
              }}
              required
            />
          </div>
          <div className="modal-input-label">
            <label className="modal-label">End Time:</label>
            <div className="endTimeColumn">
              <div className="error">
                {state.checkTime && (
                  <p>End Time can't be less than start Time</p>
                )}
              </div>
              <input
                type="time"
                className="modal-input"
                value={state.modalData.endTime}
                onChange={(e) => {
                  handleState({
                    modalData: { ...state.modalData, endTime: e.target.value },
                  });
                }}
                required
              />
            </div>
          </div>
          <div className="modal-btn-wrapper">
            <button
              className="modal-btn-save"
              onClick={(e) => {
                handleSaveDetails(e);
              }}
            >
              {type}
            </button>

            <button
              className="modal-btn-cancel"
              onClick={() => {
                handleState({ showModal: false, checkTime: false });
                modalDataFunction();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
