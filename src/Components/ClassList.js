import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllClasses, createClass } from "../Common/ClassService";

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newClassDescription, setNewClassDescription] = useState("");

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = () => {
    setLoading(true);
    getAllClasses()
      .then((results) => {
        setClasses(results || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setLoading(false);
      });
  };

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!newClassName.trim()) {
      alert("Please enter a class name");
      return;
    }

    createClass(newClassName, newClassDescription)
      .then((result) => {
        console.log("Class created:", result);
        setNewClassName("");
        setNewClassDescription("");
        setShowCreateForm(false);
        fetchClasses();
      })
      .catch((error) => {
        console.error("Error creating class:", error);
        alert("Failed to create class");
      });
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading classes...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Classes</h1>

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
          <form onSubmit={handleCreateClass}>
            <div style={{ marginBottom: "10px" }}>
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
            </div>
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
              <h3>{classObj.get("name")}</h3>
              <p>{classObj.get("description") || "No description available"}</p>
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
