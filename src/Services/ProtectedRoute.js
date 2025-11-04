import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, flag, user, setCurrentUser }) => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <div>
      {flag ? (
        <Component user={user} setCurrentUser={setCurrentUser} />
      ) : (
        <div>
          <p>Unauthorized!</p>
          <button onClick={goBackHandler}>Go Back</button>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
