import { Navigate } from "react-router-dom";
import cookie from "js-cookie"

const ProtectPages = ({ children }) => {
  const token = cookie.get("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectPages;