// UserDetail.js
import React, { useEffect, useState } from 'react';

const UserDetail = ({ accountId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${accountId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [accountId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          {/* Add other user details as needed */}
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
