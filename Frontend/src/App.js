import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../src/Components/Login";
import Signup from "./Components/signup";

import Dashboard from "./Components/dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
