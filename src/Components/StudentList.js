import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getAllStudents,
  getStudentsByClass,
  createStudent,
} from "../Common/StudentService";
import { getAllClasses } from "../Common/ClassService";

const StudentList = () => {
  const [searchParams] = useSearchParams();
  const classId = searchParams.get("classId");

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [selectedClassId, setSelectedClassId] = useState("");

  useEffect(() => {
    fetchData();
  }, [classId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const classResults = await getAllClasses();
      setClasses(classResults || []);

      let studentResults;
      if (classId) {
        studentResults = await getStudentsByClass(classId);
      } else {
        studentResults = await getAllStudents();
      }
      setStudents(studentResults || []);

      if (classId && !selectedClassId) {
        setSelectedClassId(classId);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = (e) => {
    e.preventDefault();

    if (!newFirstName.trim() || !newLastName.trim()) {
      alert("Please enter first and last name");
      return;
    }

    if (!selectedClassId) {
      alert("Please select a class");
      return;
    }

    createStudent(newFirstName, newLastName, newEmail, selectedClassId)
      .then((result) => {
        console.log("Student created:", result);
        setNewFirstName("");
        setNewLastName("");
        setNewEmail("");
        setShowCreateForm(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error creating student:", error);
        alert("Failed to create student");
      });
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading students...</div>;
  }

  const currentClass = classId ? classes.find((c) => c.id === classId) : null;

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        Students
        {currentClass && ` in ${currentClass.get("name")}`}
      </h1>

      {classId && (
        <div style={{ marginBottom: "20px" }}>
          <a href="/students" style={{ color: "#008CBA" }}>
            ← View all students
          </a>
        </div>
      )}

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
          <form onSubmit={handleCreateStudent}>
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
                {classes.map((classObj) => (
                  <option key={classObj.id} value={classObj.id}>
                    {classObj.get("name")}
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
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                Class
              </th>
              <th
                style={{
                  padding: "10px",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {student.get("firstName")} {student.get("lastName")}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {student.get("email") || "N/A"}
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  {student.get("Class")
                    ? student.get("Class").get("name")
                    : "No class assigned"}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ddd",
                    fontSize: "12px",
                  }}
                >
                  {student.id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          {classId
            ? "No students in this class. Click 'Add New Student' to add one."
            : "No students available. Click 'Add New Student' to create one."}
        </p>
      )}
    </div>
  );
};

export default StudentList;
