import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({ user, onChange, onSubmit }) => {
  return (
    <div>
        <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>First Name</label>
          <br />
          <input
            type="text"
            value={user.firstName}
            onChange={onChange}
            name="firstName"
            placeholder="first name"
            required
          />
        </div>
        <div>
          <label>Last Name</label>
          <br />
          <input
            type="text"
            value={user.lastName}
            onChange={onChange}
            name="lastName"
            placeholder="last name"
            required
          />
        </div>{" "}
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            value={user.email}
            onChange={onChange}
            name="email"
            placeholder="email"
            required
          />
        </div>{" "}
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="password"
            min="0"
            required
          />
        </div>
        <div>
          <button type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
      <p>Already have an account? <Link to="/login">Login.</Link></p>
    </div>
  );
};

export default RegisterForm;