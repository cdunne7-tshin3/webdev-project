import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Learn Management System</h1>
      <p>Manage your lessons efficiently with our Parse-powered application</p>

      <div style={{ marginTop: "40px" }}>
        <h2>Quick Actions:</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          <Link
            to="/lessons"
            style={{
              padding: "15px 30px",
              backgroundColor: "#4CAF50",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            View All Lessons
          </Link>
          <Link
            to="/create"
            style={{
              padding: "15px 30px",
              backgroundColor: "#008CBA",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            Create New Lesson
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h3>Statistics</h3>
        <p>Total Lessons: Loading...</p>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Home;
