import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getById } from "../Common/LearnService";

const LessonDetail = () => {
  const { id } = useParams(); // Get lesson ID from URL
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getById(id)
        .then((result) => {
          setLesson(result);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load lesson: " + err.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading lesson details...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <p>{error}</p>
        <Link to="/lessons">Back to Lessons</Link>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Lesson not found</p>
        <Link to="/lessons">Back to Lessons</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Lesson Details</h1>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <h2>{lesson.get("name")}</h2>
        <p>
          <strong>ID:</strong> {lesson.id}
        </p>
        <p>
          <strong>Created:</strong> {lesson.createdAt?.toLocaleDateString()}
        </p>
        <p>
          <strong>Updated:</strong> {lesson.updatedAt?.toLocaleDateString()}
        </p>

        <div style={{ marginTop: "20px" }}>
          <h3>Lesson Content</h3>
          <p>Content will be displayed here when available...</p>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Link
          to="/lessons"
          style={{
            padding: "10px 20px",
            backgroundColor: "#f0f0f0",
            textDecoration: "none",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        >
          Back to Lessons
        </Link>
        <Link
          to="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "#f0f0f0",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default LessonDetail;
