import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "./AuthService";
import RegisterForm from "./RegisterForm";

const AuthRegister = ({ setCurrentUser }) => {
  const navigate = useNavigate();

  // empty user object
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [shouldRegister, setShouldRegister] = useState(false);

  useEffect(() => {
    // skip if not ready
    if (!shouldRegister) return;

    createUser(newUser).then((user) => {
      if (user) {
        setCurrentUser(user);
        alert(`Welcome ${user.get("firstName")}!`);
        navigate("/home");
      }
      setShouldRegister(false);
    });
  }, [shouldRegister, navigate, newUser, setCurrentUser]);

  const updateField = (e) => {
    const field = e.target.name;
    const value = e.target.value;

    setNewUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setShouldRegister(true);
  };

  return (
    <RegisterForm
      user={newUser}
      onChange={updateField}
      onSubmit={handleRegister}
    />
  );
};

export default AuthRegister;