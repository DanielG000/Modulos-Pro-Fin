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
import Course from "./components/course/Course";
import Activity from "./components/activity/Activity";
import MentalMap from "./components/customactivities/mentalmap/MentalMap";
import SerpienteEisenhower from "./components/customactivities/SerpienteEisenhower/SerpienteEisenhower";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/mentalmap" element={<MentalMap />} />
        <Route path="/activity/SerpienteEisenhower" element={<SerpienteEisenhower />} />
      </Routes>
    </Router>
  );
}

export default App;
