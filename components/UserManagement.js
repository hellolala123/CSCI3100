import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/admin/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/api/admin/user/${userId}`);
      // Update the user list
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  return (
    <div>
      {users.map(user => (
        <div key={user._id}>
          {user.username}
          <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default UserManagement;
