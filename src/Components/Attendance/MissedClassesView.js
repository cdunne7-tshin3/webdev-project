// src/Components/Attendance/MissedClassesView.js
import React, { useState, useEffect } from "react";
import { getMissedClassesByStudent } from "../../Common/Services/AttendanceService";

const MissedClassesView = ({ studentId, studentName }) => {
  const [missedClasses, setMissedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (studentId) {
      loadMissedClasses();
    }
  }, [studentId]);

  const loadMissedClasses = async () => {
    setLoading(true);
    try {
      const records = await getMissedClassesByStudent(studentId);
      setMissedClasses(records || []);
    } catch (error) {
      console.error("Error loading missed classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "absent":
        return "#f44336";
      case "excused":
        return "#FF9800";
      default:
        return "#4CAF50";
    }
  };

  if (loading) {
    return <div>Loading missed classes...</div>;
  }

  return (
    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px", marginTop: "10px" }}>
      <h3>Missed Classes {studentName && `- ${studentName}`}</h3>
      
      {missedClasses.length === 0 ? (
        <p style={{ color: "#4CAF50", fontWeight: "bold" }}>
          Perfect attendance! No missed classes.
        </p>
      ) : (
        <>
          <p style={{ marginBottom: "15px", color: "#666" }}>
            Total missed: {missedClasses.length} class{missedClasses.length !== 1 ? "es" : ""}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>
                  Date
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "left" }}>
                  Class
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {missedClasses.map((record) => (
                <tr key={record.id}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {formatDate(record.get("date"))}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    {record.get("Class") ? record.get("Class").get("Name") : "N/A"}
                  </td>
                  <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                    <span
                      style={{
                        padding: "4px 12px",
                        borderRadius: "12px",
                        backgroundColor: getStatusBadgeColor(record.get("status")),
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {record.get("status")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default MissedClassesView;