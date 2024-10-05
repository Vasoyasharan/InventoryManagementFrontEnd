import React, { useState } from 'react';
import './SettingsPage.css'; // Import external CSS

const SettingsPage = () => {
  const [username, setUsername] = useState('currentUsername');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateUsername = () => {
    alert(`Username updated to: ${username}`);
  };

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      alert('Password updated successfully!');
    } else {
      alert('Passwords do not match!');
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      alert('Account deleted successfully!');
    }
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Account Settings</h1>

      {/* Username Section */}
      {/* <div className="settings-section">
        <label>Update Username</label>
        <input
          type="text"
          className="settings-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter new username"
        />
        <button className="settings-button" onClick={handleUpdateUsername}>
          Update Username
        </button>
      </div> */}

      {/* Password Section */}
      <div className="settings-section">
        <label>Change Password</label>
        {/* <input
          type="password"
          className="settings-input"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
        /> */}
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
    </div>
  );
};

export default SettingsPage;
