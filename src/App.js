import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import ClassMain from "./Components/ClassMain";
import ClassList from "./Components/ClassList";
import StudentMain from "./Components/StudentMain";
import StudentList from "./Components/StudentList";
import * as Env from "./environments";
import Parse from "parse";

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: "20px", backgroundColor: "#f0f0f0" }}>
          <Link to="/" style={{ margin: "0 15px" }}>
            Home
          </Link>
          <Link to="/classes" style={{ margin: "0 15px" }}>
            Classes
          </Link>
          <Link to="/students" style={{ margin: "0 15px" }}>
            Students
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classes" element={<ClassMain />} />
          <Route path="/students" element={<StudentMain />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
