// src/Components/Attendance/AttendanceTracker.js
import React, { useState, useEffect } from "react";
import {
  getAttendanceByClassAndDate,
  createAttendance,
  updateAttendanceStatus,
  bulkCreateAttendance,
} from "../../Common/Services/AttendanceService";
import { getStudentsByClass } from "../../Common/Services/StudentService";

const AttendanceTracker = ({ classId, className }) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMap, setStatusMap] = useState({});

  useEffect(() => {
    if (classId) {
      loadStudents();
    }
  }, [classId]);

  useEffect(() => {
    if (classId && selectedDate) {
      loadAttendance();
    }
  }, [classId, selectedDate]);

  const loadStudents = async () => {
    try {
      const results = await getStudentsByClass(classId);
      setStudents(results || []);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  };

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const records = await getAttendanceByClassAndDate(classId, selectedDate);
      setAttendanceRecords(records || []);

      // Build status map from existing records
      const map = {};
      records.forEach((record) => {
        const studentId = record.get("Student").id;
        map[studentId] = record.get("status");
      });
      setStatusMap(map);
    } catch (error) {
      console.error("Error loading attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, status) => {
    setStatusMap((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveAttendance = async () => {
    setLoading(true);
    try {
      // Check if attendance already exists for this date
      if (attendanceRecords.length > 0) {
        // Update existing records
        const promises = attendanceRecords.map((record) => {
          const studentId = record.get("Student").id;
          const newStatus = statusMap[studentId] || "present";
          if (record.get("status") !== newStatus) {
            return updateAttendanceStatus(record.id, newStatus);
          }
          return Promise.resolve();
        });
        await Promise.all(promises);
      } else {
        // Create new attendance records
        await bulkCreateAttendance(classId, selectedDate, statusMap);
      }

      alert("Attendance saved successfully!");
      loadAttendance();
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance");
    } finally {
      setLoading(false);
    }
  };

  const getStudentStatus = (studentId) => {
    return statusMap[studentId] || "present";
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h2>Attendance Tracker - {className}</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px" }}>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : students.length === 0 ? (
        <p>No students in this class.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>
                  Student Name
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Present</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Absent</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Excused</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const status = getStudentStatus(student.id);
                return (
                  <tr key={student.id}>
                    <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {student.get("firstName")} {student.get("lastName")}
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={status === "present"}
                        onChange={() => handleStatusChange(student.id, "present")}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={status === "absent"}
                        onChange={() => handleStatusChange(student.id, "absent")}
                      />
                    </td>
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                      <input
                        type="radio"
                        name={`attendance-${student.id}`}
                        checked={status === "excused"}
                        onChange={() => handleStatusChange(student.id, "excused")}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={handleSaveAttendance}
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Saving..." : "Save Attendance"}
          </button>
        </>
      )}
    </div>
  );
};

export default AttendanceTracker;