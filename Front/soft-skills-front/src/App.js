import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
