import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, flag, user, setCurrentUser }) => {
  return (
    <div>
      {flag ? (
        // if authorized, go to the component
        <Component user={user} setCurrentUser={setCurrentUser} />
      ) : (
        // if not authorized (not logged in) go to auth
        <Navigate to="/login" replace />
      )}
    </div>
  );
};

export default ProtectedRoute;
