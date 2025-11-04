import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./AuthService";
import LoginForm from "./LoginForm";

const AuthLogin = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // handle login attempt
  useEffect(() => {
    if (!isSubmitting || !loginData.email) return;

    loginUser(loginData).then((user) => {
      if (user) {
        setCurrentUser(user);
        // quick welcome message
        alert(`Hey ${user.get("firstName")}!`);
        navigate("/home");
      }
      setIsSubmitting(false);
    });
  }, [isSubmitting]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  return (
    <div>
      <LoginForm
        user={loginData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthLogin;
