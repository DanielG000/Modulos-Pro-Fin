import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./components/signin/SignIn";
import SignUp from "./components/signup/SignUp";
import Dashboard from "./components/dashboard/Dashboard";
import Course from "./components/course/Course";
import Activity from "./components/activity/Activity";
import MentalMap from "./components/customactivities/mentalmap/MentalMap";
import Debate from "./components/customactivities/debate/Debate";
import DecitionMaking from "./components/customactivities/decisionMaking/DecisionMaking";
import JigSaw from "./components/customactivities/jigsaw/JigSaw";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses/:id" element={<Course />} />
        <Route path="/activity/:id" element={<Activity />} />
        <Route path="/activity/mentalmap" element={<MentalMap />} />
        <Route path="/activity/debate" element={<Debate />} />
        <Route path="/activity/jigsaw" element={<JigSaw />} />
        <Route path="/activity/decisionmaking" element={<DecitionMaking />} />
      </Routes>
    </Router>
  );
}

export default App;
