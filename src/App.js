import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateAccount from "./pages/CreateAccount";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
