import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import MainModule from "./Main/Main.js";
import MainGood from "./Main/MainGood.js";
import MainHome from "./Main/MainHome.js";
import AuthModule from "./Auth/Auth.js";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js";
import ProtectedRoute from "../Services/ProtectedRoute.js";
import { getCurrentUser } from "./Auth/AuthService";

const Components = () => {
  const [currentUser, setCurrentUser] = useState(null);

  // restore session if exists
  useEffect(() => {
    const existingUser = getCurrentUser();
    if (existingUser) {
      console.log("Found existing session");
      setCurrentUser(existingUser);
    }
  }, []);

  // check if user is logged in
  const isLoggedIn = currentUser !== null;

  return (
    <Router>
      <Routes>
        {/* landing page */}
        <Route path="/" element={<AuthModule />} />

        {/* auth pages - redirect if already logged in */}
        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthRegister setCurrentUser={setCurrentUser} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthLogin setCurrentUser={setCurrentUser} />
            )
          }
        />

        {/* protected pages */}
        <Route
          path="/home"
          element={
            <MainHome
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              element={MainGood}
              flag={isLoggedIn}
              user={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default Components;
