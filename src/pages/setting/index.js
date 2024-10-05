import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import './SettingsPage.css'; // External CSS

const SettingsPage = () => {
  const [username, setUsername] = useState('currentUsername');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing/hiding delete modal
  const navigate = useNavigate(); // Initialize navigate hook

  // Validations
  const validateUsername = () => {
    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long.");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return false;
    }
    return true;
  };

  const handleUpdateUsername = () => {
    if (validateUsername()) {
      toast.success(`Username updated to: ${username}`);
      // Add API call or logic to actually update username
    }
  };

  const handleChangePassword = () => {
    if (validatePassword()) {
      toast.success("Password updated successfully!");
      // Add API call or logic to actually update password
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true); // Show delete confirmation modal
  };

  const confirmDeleteAccount = () => {
    // Simulate account deletion API call
    toast.success("Account deleted successfully!");

    // Clear user session or token (assuming localStorage)
    localStorage.removeItem('authToken'); // Clear authentication token or session

    setTimeout(() => {
      navigate('/signup'); // Redirect to signup page after 2 seconds
    }, 2000);
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Account Settings</h1>

      {/* Password Section */}
      <div className="settings-section">
        <label>Change Password</label>
        <input
          type="password"
          className="settings-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          className="settings-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
        <button className="settings-button" onClick={handleChangePassword}>
          Update Password
        </button>
      </div>

      {/* Delete Account Section */}
      <div className="settings-section delete-section">
        <label>Delete Account</label>
        <button className="delete-account-button" onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Are you sure?</h2>
            <p>Do you really want to delete your account? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="modal-button confirm-button" onClick={confirmDeleteAccount}>
                Yes, Delete
              </button>
              <button className="modal-button cancel-button" onClick={() => setShowDeleteModal(false)}>
                No, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
};

export default SettingsPage;
