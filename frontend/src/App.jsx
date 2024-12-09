import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "../UserLogin/UserLogin";
import UserSignup from "../UserLogin/UserSignUp";
import AdminLogin from "../AdminLogin/AdminLogin";
import AdminSignup from "../AdminLogin/AdminSignUp";
import AdminDashboard from "../Components/AdminDashboard"; // Placeholder for admin dashboard
import EquipmentForm from "../Components/EquipmentForm";


function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signup" element={<UserSignup />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/add-equipment" element={<EquipmentForm/>}/>

        {/* Default Route */}
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to the App</h1>
              <p>Select User or Admin Login to proceed.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
