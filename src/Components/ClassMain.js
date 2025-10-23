// src/Components/ClassMain.js
import React, { useState, useEffect } from "react";
import { getAllClasses, createClass } from "../Common/ClassService";
import ClassList from "./ClassList";

const ClassMain = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const results = await getAllClasses();
      setClasses(results || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClass = async (name, description) => {
    try {
      await createClass(name, description);
      fetchClasses(); // refresh list
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Failed to create class");
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Loading classes...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <ClassList
        classes={classes}
        onCreateClass={handleCreateClass}
      />
    </div>
  );
};

export default ClassMain;
