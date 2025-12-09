// src/Components/Student/StudentList.js
import React, { useState } from "react";
import EditStudentForm from "./EditStudentForm";

const StudentList = ({ students, classes, classId, onCreateStudent, onEditStudent, onDeleteStudent }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [selectedClassId, setSelectedClassId] = useState(classId || "");
  const [editingStudent, setEditingStudent] = useState(null);
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editClassId, setEditClassId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const currentClass = classId ? classes.find((c) => c.id === classId) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newFirstName.trim() || !newLastName.trim()) {
      alert("Please enter first and last name");
      return;
    }
    if (!selectedClassId) {
      alert("Please select a class");
      return;
    }

    onCreateStudent(newFirstName, newLastName, newEmail, selectedClassId);
    setNewFirstName("");
    setNewLastName("");
    setNewEmail("");
    setShowCreateForm(false);
  };

  // Filter students based on search query
  const filteredStudents = students.filter((student) => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    const firstName = student.get("firstName")?.toLowerCase() || "";
    const lastName = student.get("lastName")?.toLowerCase() || "";
    const fullName = `${firstName} ${lastName}`;
    const email = student.get("email")?.toLowerCase() || "";

    return (
      firstName.includes(query) ||
      lastName.includes(query) ||
      fullName.includes(query) ||
      email.includes(query)
    );
  });

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Students
        {currentClass && ` in ${currentClass.get("Name")}`}
      </h1>

      {classId && (
        <div style={{ marginBottom: "20px" }}>
          <a href="/classes" style={{ color: "#008CBA" }}>
            ← Back to all classes
          </a>
        </div>
      )}

      {/* Search Bar */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ position: "relative", flex: 1, maxWidth: "500px" }}>
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 40px 10px 15px",
              fontSize: "16px",
              border: "2px solid #ddd",
              borderRadius: "25px",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#008CBA";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ddd";
            }}
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                fontSize: "18px",
                color: "#999",
                cursor: "pointer",
                padding: "5px",
              }}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
        {searchQuery && (
          <span style={{ color: "#666", fontSize: "14px" }}>
            Found: {filteredStudents.length}
          </span>
        )}
      </div>

      {showCreateForm ? (
        <div
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h3>Add New Student</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gap: "10px", marginBottom: "10px" }}>
              <input
                type="text"
                placeholder="First Name"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                style={{ padding: "8px" }}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                style={{ padding: "8px" }}
                required
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{ padding: "8px" }}
              />
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                style={{ padding: "8px" }}
                required
              >
                <option value="">Select a Class</option>
                <option value="">— No Class —</option>
                {classes.map((classObj) => (
                  <option key={classObj.id} value={classObj.id}>
                    {classObj.get("Name")}
                  </option>
                ))}
              </select>
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
              Add Student
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
          Add New Student
        </button>
      )}

      {students.length > 0 ? (
        filteredStudents.length > 0 ? (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Class</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>More</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {student.get("firstName")} {student.get("lastName")}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {student.get("email") || "N/A"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {student.get("Class") ? student.get("Class").get("Name") : "No class assigned"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd", fontSize: "12px" }}>
                    {student.id}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    <button
                      style={{
                        marginRight: "5px",
                        padding: "10px 10px",
                        backgroundColor: "#008CBA",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setEditingStudent(student);
                        setEditFirstName(student.get("firstName"));
                        setEditLastName(student.get("lastName"));
                        setEditEmail(student.get("email") || "");
                        setEditClassId(student.get("Class")?.id || "");
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{
                        padding: "10px 10px",
                        backgroundColor: "#f44336",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => onDeleteStudent(student.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          >
            <p style={{ fontSize: "18px", color: "#666" }}>
              No students found matching "{searchQuery}"
            </p>
            <button
              onClick={handleClearSearch}
              style={{
                marginTop: "10px",
                padding: "8px 16px",
                backgroundColor: "#008CBA",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Clear Search
            </button>
          </div>
        )
      ) : (
        <p>
          {classId
            ? "No students in this class. Click 'Add New Student' to add one."
            : "No students available. Click 'Add New Student' to create one."}
        </p>
      )}

      <EditStudentForm
        student={editingStudent}
        classes={classes}
        firstName={editFirstName}
        lastName={editLastName}
        email={editEmail}
        classId={editClassId}
        setFirstName={setEditFirstName}
        setLastName={setEditLastName}
        setEmail={setEditEmail}
        setClassId={setEditClassId}
        onSave={() => {
          onEditStudent(
            editingStudent.id,
            editFirstName,
            editLastName,
            editEmail,
            editClassId
          );
          setEditingStudent(null);
        }}
        onCancel={() => setEditingStudent(null)}
      />
    </div>
  );
};

export default StudentList;
