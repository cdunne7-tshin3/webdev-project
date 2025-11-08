import React from "react";
import { Link } from "react-router-dom";

const LoginForm = ({ user, onChange, onSubmit }) => {
  return (
    <div>
        <h1>Login</h1>
      <form onSubmit={onSubmit}>
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
      <p>Don't have an account? <Link to="/register">Register here.</Link></p>
    </div>
  );
};

export default LoginForm;