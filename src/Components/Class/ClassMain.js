// src/Components/ClassMain.js
import React, { useState, useEffect } from "react";
import { getAllClasses, createClass, removeClass } from "../../Common/Services/ClassService";
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
      const createdClass = await createClass(name, description);
      await fetchClasses(); // refresh list
      return createdClass;
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Failed to create class");
      return null;
    }
  };

  const handleRemoveClass = async (id) => {
    if (!window.confirm("Are you sure you want to remove this class? This cannot be undone.")) return;

    try {
      await removeClass(id);
      setClasses((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error removing class:", error);
      alert("Failed to remove class");
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
        onRemoveClass={handleRemoveClass}
      />
    </div>
  );
};

export default ClassMain;
