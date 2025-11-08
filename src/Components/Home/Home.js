import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to Class Management System</h1>
      <p>Manage your classes and students efficiently with our Parse-powered application</p>

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
            to="/classes"
            style={{
              padding: "15px 30px",
              backgroundColor: "#4CAF50",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            View All Classes
          </Link>
          <Link
            to="/students"
            style={{
              padding: "15px 30px",
              backgroundColor: "#008CBA",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            View All Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
