import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword";
import Signup from "./pages/Authentication/Signup";
import { ProtectedRoute, AuthProtected } from "./Routes/route";
import { PageRoutes } from "./Routes";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import CustomerCare from "./pages/CustomerCare/CustomerCare";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import { ToastContainer } from "react-toastify";
import Loader from "./component/Loader";
import 'react-toastify/dist/ReactToastify.css';
import TabTitleUpdater from "./component/TabTitleUpdater";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <React.Fragment>
      <BrowserRouter>
        <Loader />
        <TabTitleUpdater />
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />
            <Route
              path="*"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
              }
            />


            {/* Auth Page Protected */}
            <Route exact path="/login" element={<AuthProtected element={Login} />} />
            <Route exact path="/signup" element={<AuthProtected element={Signup} />} />
            <Route exact path="/forgot-password" element={<AuthProtected element={ForgotPassword} />} />
            <Route exact path="/reset-password" element={<AuthProtected element={ResetPassword} />} />

            {/* Terms and Conditions Route */}
            <Route path="/terms-conditions" element={<TermsConditions />} />

            {/* Privacy Policy */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />

            {/* Customer Care Page */}
            <Route path="/customer-care" element={<CustomerCare />} />

            {/* Page Module Protected */}
            {PageRoutes.map((route, id) => (
              <Route
                key={id}
                path={route.path}
                element={
                  <ProtectedRoute name={route.name} element={route.element} />
                }
                exact
              />
            ))}
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
