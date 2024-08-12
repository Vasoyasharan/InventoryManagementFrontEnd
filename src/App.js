import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import { ProtectedRoute, AuthProtected } from "./Routes/route";
import { PageRoutes } from "./Routes";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuthenticated = localStorage.getItem("token");
  
  return (
    <React.Fragment>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

            {/* Auth Page Protected */}
            <Route exact path="/login" element={<AuthProtected element={Login} />} />
            <Route exact path="/signup" element={<AuthProtected element={Signup} />} />

            {/* Terms and Conditions Route */}
            <Route path="/terms-conditions" element={<TermsConditions />} />

            {/* Privacy Policy  */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Page Module Protected */}
            {PageRoutes.map((route, id) => (
              <React.Fragment key={id}>
                <Route path={route.path} element={<ProtectedRoute name={route.name} element={route.element} />} exact />
              </React.Fragment>
            ))}
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </React.Fragment>
  );
}

export default App;
