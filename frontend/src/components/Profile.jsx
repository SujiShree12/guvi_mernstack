import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css'

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    dob: '',
    mobile: '',
  });
  const navigate = useNavigate();
  // State for input fields
  const [updateData, setUpdateData] = useState({
    age: '',
    gender: '',
    dob: '',
    mobile: '',
  });

  // State for edit mode
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/all');

        // Check if the user ID from the fetched data matches the user ID in localStorage
        const userIdFromLocalStorage = localStorage.getItem('userId');
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]._id === userIdFromLocalStorage) {
            // Update state with the matching user's data
            setUserData({
              name: response.data[i].name,
              email: response.data[i].email,
              age: response.data[i].age,
              gender: response.data[i].gender,
              dob: response.data[i].dob,
              mobile: response.data[i].mobile,
            });
            break;
          }
        }
      } catch (error) {
        console.error('Error fetching profile data:', error.response?.data || error.message);
      }
    };

    fetchProfileData();
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const updateProfile = async () => {
    try {
      const userId = localStorage.getItem('userId');

      // Prepare data for updating the profile
      const updatedData = {
        age: updateData.age || userData.age,
        gender: updateData.gender || userData.gender,
        dob: updateData.dob || userData.dob,
        mobile: updateData.mobile || userData.mobile,
      };

      await axios.put(`http://localhost:5000/api/auth/profile/${userId}`, updatedData);
      setEditMode(false); // Disable edit mode after update
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className='container'>
      <h2>Profile</h2>
      <ul>
        <li>
          <strong>Name:</strong> {userData.name}
        </li>
        <li>
          <strong>Email:</strong> {userData.email}
        </li>
        <li>
          <strong>Age:</strong> {editMode ? (
            <input
              type="text"
              name="age"
              value={updateData.age}
              onChange={handleInputChange}
              placeholder="Update Age"
            />
          ) : (
            userData.age
          )}
        </li>
        <li>
          <strong>Gender:</strong> {editMode ? (
            <input
              type="text"
              name="gender"
              value={updateData.gender}
              onChange={handleInputChange}
              placeholder="Update Gender"
            />
          ) : (
            userData.gender
          )}
        </li>
        <li>
          <strong>DOB:</strong> {editMode ? (
            <input
              type="text"
              name="dob"
              value={updateData.dob}
              onChange={handleInputChange}
              placeholder="Update DOB"
            />
          ) : (
            userData.dob
          )}
        </li>
        <li>
          <strong>Mobile:</strong> {editMode ? (
            <input
              type="text"
              name="mobile"
              value={updateData.mobile}
              onChange={handleInputChange}
              placeholder="Update Mobile"
            />
          ) : (
            userData.mobile
          )}
        </li>
      </ul>

      {editMode ? (
        <button onClick={updateProfile}>Save Changes</button>
      ) : (
        <button onClick={toggleEditMode}>Edit Profile</button>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
