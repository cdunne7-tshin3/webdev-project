<<<<<<< HEAD
/* STATEFUL PARENT COMPONENT */
const MainList = ({ lessons }) => {
  lessons = Array.isArray(lessons) ? lessons : [];
  return (
    <div>
      <hr />
      This is the main list stateless child component.
      <div>
        <p> Lesson by ID: </p>
        {/* Check that the lesson object exists */}
        {lessons.length > 0 && (
          <ul>
            {/* Using getter for lesson Object to display name */}
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                {" "}
                {lesson.id} | {lesson.get("name")}{" "}
              </li>
            ))}
          </ul>
        )}
      </div>{" "}
=======
import React from "react";
import { Link } from "react-router-dom";

const MainList = ({ lessons }) => {
  lessons = Array.isArray(lessons) ? lessons : [];

  return (
    <div>
      <hr />
      <h2>All Lessons</h2>
      <div>
        {lessons.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {lessons.map((lesson) => (
              <li
                key={lesson.id}
                style={{
                  margin: "10px 0",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              >
                <Link
                  to={`/lesson/${lesson.id}`}
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  <strong>{lesson.get("name")}</strong> (ID: {lesson.id})
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No lessons available.{" "}
            <Link to="/create">Create your first lesson</Link>
          </p>
        )}
      </div>
>>>>>>> student-b
    </div>
  );
};

export default MainList;
