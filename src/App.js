import "./App.css";
import Home from "./components/Home/Home";
import { DataProvider } from "./context/MyContext";

function App() {
  return (
    <DataProvider>
      <Home />
    </DataProvider>
  );
}

export default App;
