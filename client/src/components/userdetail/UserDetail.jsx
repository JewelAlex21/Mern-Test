import React, { useEffect, useState } from "react";
import "./userdetail.css";

const UserDetail = ({ accountId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/user/${accountId}`
        );
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [accountId]);

  return (
    <div className="container">
      {user ? (
        <div>
          <h2>User Details</h2>
          <p>Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <p>Date Of Birth: {new Date(user.dob).toLocaleDateString()}</p>{" "}
          <p>Additional Savings/Investments: {user.investments ? user.investments : '-'}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
