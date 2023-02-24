import React from "react";
import { Navigate } from "react-router-dom";
function Protected({ isSignedIn, isOnline, children }) {
  console.log(isOnline);
  if (!isOnline) {
    return <Navigate to="/offline" replace />;
  }
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Protected;
