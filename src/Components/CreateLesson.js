import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLesson } from "../Common/LearnService";

const CreateLesson = () => {
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!lessonName.trim()) {
      setError("Please enter a lesson name");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    createLesson(lessonName)
      .then((result) => {
        setSuccess(true);
        setLessonName("");
        // Redirect to lessons page after 2 seconds
        setTimeout(() => {
          navigate("/lessons");
        }, 2000);
      })
      .catch((err) => {
        setError("Failed to create lesson: " + err.message);
        setIsSubmitting(false);
      });
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Create New Lesson</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="lessonName"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Lesson Name:
          </label>
          <input
            type="text"
            id="lessonName"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            placeholder="Enter lesson name"
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
        )}

        {success && (
          <div style={{ color: "green", marginBottom: "10px" }}>
            Lesson created successfully! Redirecting...
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: "10px 20px",
              backgroundColor: isSubmitting ? "#ccc" : "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: isSubmitting ? "not-allowed" : "pointer",
            }}
          >
            {isSubmitting ? "Creating..." : "Create Lesson"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/lessons")}
            disabled={isSubmitting}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ddd",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#f9f9f9",
          borderRadius: "5px",
        }}
      >
        <h3>Tips for Creating Lessons</h3>
        <ul>
          <li>Choose a descriptive name for your lesson</li>
          <li>Keep lesson names concise but meaningful</li>
          <li>You can edit lesson details after creation</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateLesson;
