import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

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

  const handleChangePassword = () => {
    if (validatePassword()) {
      toast.success("Password updated successfully!");
      // Add API call or logic to actually update password
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    // Simulate account deletion API call
    toast.success("Account deleted successfully!");

    localStorage.removeItem('authToken'); // Clear authentication token or session

    setTimeout(() => {
      navigate('/signup');
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

        {/* Warning Section */}
        <div className="delete-warning">
          <p>What happens when you delete your account:</p>
          <ul>
            <li>All your Products and Bills will be deleted.</li>
            <li>All associated data will be deleted.</li>
            <li>None of the above can be reversed.</li>
          </ul>
        </div>

        <button className="delete-account-button" onClick={handleDeleteAccount}>
          Delete My Account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal delete-account-modal">
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
