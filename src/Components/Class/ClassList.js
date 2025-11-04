// src/Components/ClassList.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ClassList = ({ classes, onCreateClass }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      alert("Please enter a class name");
      return;
    }
    onCreateClass(newClassName, newClassDescription);
    setNewClassName("");
    setNewClassDescription("");
    setShowCreateForm(false);
  };

  return (
    <div>
      {showCreateForm ? (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h3>Create New Class</h3>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Class Name"
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "10px",
              }}
            />
            <textarea
              placeholder="Description (optional)"
              value={newClassDescription}
              onChange={(e) => setNewClassDescription(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                minHeight: "60px",
              }}
            />
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            >
              Create Class
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowCreateForm(true)}
          style={{
            marginBottom: "20px",
            padding: "10px 20px",
            backgroundColor: "#008CBA",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add New Class
        </button>
      )}

      {classes.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {classes.map((classObj) => (
            <div
              key={classObj.id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{classObj.get("Name")}</h3>
              <p>{classObj.get("Description") || "No description available"}</p>
              <p style={{ fontSize: "12px", color: "#666" }}>
                ID: {classObj.id}
              </p>
              <Link
                to={`/students?classId=${classObj.id}`}
                style={{
                  color: "#008CBA",
                  textDecoration: "none",
                }}
              >
                View Students →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No classes available. Click "Add New Class" to create one.</p>
      )}
    </div>
  );
};

export default ClassList;
