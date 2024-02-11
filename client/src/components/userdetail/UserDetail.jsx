import React, { useEffect, useState } from "react";
import "./userdetail.css";
import config from "../../environment/config";
const UserDetail = ({ accountId }) => {
  const [user, setUser] = useState(null);
  const apiURL = config.apiUrl;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${apiURL}/api/user/${accountId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [accountId]);

  return (
    <div className="container-fluid min-vh-100">
      {user ? (
        <div className="row justify-content-center min-vh-100">
          <div className="col-md-4 align-self-center">
            <div className="text-center mb-4">
              <h2>User Details</h2>
              <p>Name: <b>{user.fullName}</b></p>
              <p>Email: <b>{user.email}</b></p>
              <p>Phone Number: <b>{user.phoneNumber}</b> </p>
              <p>Current Address: <b>{user.address ? user.address : "-"}</b> </p>
              <p>How long have you lived at this address?: <b>{ user.howLong ? user.howLong : "-" }</b></p>
              <p>Date Of Birth: <b>{new Date(user.dob).toLocaleDateString()}</b></p>
              <p>About Yourself: <b>{user.tellUs ? user.tellUs : "-"}</b></p>
              <p>Employee Status: <b>{user.employeeStatus}</b></p>
              <p>
                Additional Savings/Investments:
                <b>{user.investments ? user.investments : "-"}</b>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
};

export default UserDetail;
