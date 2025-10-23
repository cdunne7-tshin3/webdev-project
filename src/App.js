import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Main from "./Components/Main";
import Home from "./Components/Home";
import LessonDetail from "./Components/LessonDetail";
import CreateLesson from "./Components/CreateLesson";
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
          <Link to="/lessons" style={{ margin: "0 15px" }}>
            Lessons
          </Link>
          <Link to="/create" style={{ margin: "0 15px" }}>
            Create Lesson
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Main />} />
          <Route path="/lesson/:id" element={<LessonDetail />} />
          <Route path="/create" element={<CreateLesson />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
