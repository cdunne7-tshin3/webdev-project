import React from "react";

const EditStudentForm = ({
  student,
  classes,
  firstName,
  lastName,
  email,
  classId,
  setFirstName,
  setLastName,
  setEmail,
  setClassId,
  onSave,
  onCancel,
}) => {
  if (!student) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "8px",
          width: "350px",
        }}
      >
        <h3>Edit Student</h3>

        <div style={{ display: "grid", gap: "10px", marginBottom: "15px" }}>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            style={{ padding: "8px" }}
          />

          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            style={{ padding: "8px" }}
          />

          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "8px" }}
          />

          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="">— No Class —</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.get("Name")}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onSave}
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
          Save
        </button>

        <button
          onClick={onCancel}
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
      </div>
    </div>
  );
};

export default EditStudentForm;
