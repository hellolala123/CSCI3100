import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`); // Adjust the endpoint as needed
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info', error);
      }
    };

    if (userId) {
      fetchUserInfo();
    }
  }, [userId]);

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div>
      <h1>{userInfo.username}</h1>
      <p>{userInfo.email}</p>
      {/* Display other user info as needed */}
    </div>
  );
};

export default UserInfo;
