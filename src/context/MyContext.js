import { createContext, useContext, useReducer } from "react";
const MyContext = createContext();

const DataProvider = ({ children }) => {
  const modalDataObject = {
    title: "",
    description: "",
    startTime: "",
    endTime: "",
    status: "NotStartedYet",
    isChecked: false,
  };

  const initialState = {
    notStartedYet: false,
    progress: false,
    completed: false,
    due: false,
    refresh: false,
    addTask: [],
    filterData: [],
    showModal: false,
    searchText: "",
    isDisabled_delete: false,
    isDisabled_complete: false,
    modalData: modalDataObject,
    selectedCheckBox: [],
    type: "",
    idTodelete: "",
    isAllSelected: false,
    disabledCheckbox: false,
    checkTime: false,
    refreshData: false,
  };
  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleState = (obj) => {
    dispatch(obj);
  };
  const modalDataFunction = () => {
    dispatch({ modalData: modalDataObject });
  };
  const contextValue = {
    state,
    handleState,
    modalDataFunction,
  };
  return (
    <div>
      <div>
        <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
      </div>
    </div>
  );
};
const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a DataProvider");
  }
  return context;
};
// export const MyContext = createContext("");
export { DataProvider, useMyContext };
