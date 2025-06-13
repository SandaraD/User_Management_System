import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserPage from "./pages/userPage";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
