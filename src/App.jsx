import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Highlight from "./components/Highlight";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Highlight />
    </>
  );
}

export default App;
