// src/Components/Attendance/AttendanceMain.js
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllClasses } from "../../Common/Services/ClassService";
import { getAllStudents } from "../../Common/Services/StudentService";
import AttendanceTracker from "./AttendanceTracker";
import MissedClassesView from "./MissedClassesView";

const AttendanceMain = () => {
  const [searchParams] = useSearchParams();
  const classIdFromUrl = searchParams.get("classId");
  const studentIdFromUrl = searchParams.get("studentId");

  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(classIdFromUrl || "");
  const [selectedStudentId, setSelectedStudentId] = useState(studentIdFromUrl || "");
  const [view, setView] = useState("tracker"); // 'tracker' or 'missed'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [classResults, studentResults] = await Promise.all([
        getAllClasses(),
        getAllStudents(),
      ]);
      setClasses(classResults || []);
      setStudents(studentResults || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getClassName = () => {
    const classObj = classes.find((c) => c.id === selectedClassId);
    return classObj ? classObj.get("Name") : "";
  };

  const getStudentName = () => {
    const student = students.find((s) => s.id === selectedStudentId);
    return student
      ? `${student.get("firstName")} ${student.get("lastName")}`
      : "";
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Attendance Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <a href="/classes" style={{ color: "#008CBA", marginRight: "15px" }}>
          ← Back to Classes
        </a>
        <a href="/students" style={{ color: "#008CBA" }}>
          View Students
        </a>
      </div>

      {/* View Toggle */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          borderBottom: "2px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        <button
          onClick={() => setView("tracker")}
          style={{
            padding: "10px 20px",
            backgroundColor: view === "tracker" ? "#008CBA" : "#f0f0f0",
            color: view === "tracker" ? "white" : "#333",
            border: "none",
            borderRadius: "5px 5px 0 0",
            cursor: "pointer",
            fontWeight: view === "tracker" ? "bold" : "normal",
          }}
        >
          Take Attendance
        </button>
        <button
          onClick={() => setView("missed")}
          style={{
            padding: "10px 20px",
            backgroundColor: view === "missed" ? "#008CBA" : "#f0f0f0",
            color: view === "missed" ? "white" : "#333",
            border: "none",
            borderRadius: "5px 5px 0 0",
            cursor: "pointer",
            fontWeight: view === "missed" ? "bold" : "normal",
          }}
        >
          View Missed Classes
        </button>
      </div>

      {/* Tracker View */}
      {view === "tracker" && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Select Class:
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", minWidth: "200px" }}
            >
              <option value="">-- Choose a class --</option>
              {classes.map((classObj) => (
                <option key={classObj.id} value={classObj.id}>
                  {classObj.get("Name")}
                </option>
              ))}
            </select>
          </div>

          {selectedClassId ? (
            <AttendanceTracker
              classId={selectedClassId}
              className={getClassName()}
            />
          ) : (
            <p style={{ color: "#666", fontStyle: "italic" }}>
              Please select a class to take attendance.
            </p>
          )}
        </div>
      )}

      {/* Missed Classes View */}
      {view === "missed" && (
        <div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ marginRight: "10px", fontWeight: "bold" }}>
              Select Student:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              style={{ padding: "8px", borderRadius: "4px", minWidth: "200px" }}
            >
              <option value="">-- Choose a student --</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.get("firstName")} {student.get("lastName")}
                </option>
              ))}
            </select>
          </div>

          {selectedStudentId ? (
            <MissedClassesView
              studentId={selectedStudentId}
              studentName={getStudentName()}
            />
          ) : (
            <p style={{ color: "#666", fontStyle: "italic" }}>
              Please select a student to view their missed classes.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AttendanceMain;