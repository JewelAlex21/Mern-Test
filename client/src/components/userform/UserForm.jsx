import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserSuccess, fetchUserFailure } from "../../redux/actions";
import UserDetail from "../UserDetail";
import "./userform.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: '', 
    phoneNumber: "",
    dob: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: '', 
    phoneNumber: "",
    dob: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    if (name === 'confirmPassword' && value !== formData.password) {
      setErrors({ ...errors, [name]: 'Passwords do not match' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    const validationErrors = {};
    if (!validateEmail(formData.email)) {
      validationErrors.email = "Please enter a valid email address";
    }

    if (!validatePassword(formData.password)) {
      validationErrors.password =
        "Password must be alphanumeric and contain at least one uppercase letter, one number, and be at least 6 characters long";
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      validationErrors.phoneNumber = "Please enter a valid phone number";
    }

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(validationErrors);

    // If there are validation errors, prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      dispatch(fetchUserSuccess(data));
      setAccountId(data._id);
      setSuccessMessage(
        "Account created successfully. Account ID: " + data._id
      );
      setFormSubmitted(true);
    } catch (error) {
      dispatch(fetchUserFailure(error.message));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  if (formSubmitted) {
    return (
      <div>
        <h2>Success!</h2>
        <p>{successMessage}</p>
        <UserDetail accountId={accountId} />
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Create your account</h1>
      </header>
      <main>
        <p>Set-up your RentlyPass in as little as 2 minutes.</p>
        <form className="form" onSubmit={handleSubmit}>
          <h3>Contact details</h3>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <p className="error-message">{errors.phoneNumber}</p>
            )}
          </div>
          <h3>Set a password</h3>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <p className="error-message">{errors.dob}</p>}
          </div>
          <button type="submit">Create your account</button>
          <p>
            By clicking Create your account, you are agreeing to our Terms &
            Conditions and Privacy Policy
          </p>
        </form>
      </main>
    </div>
  );
};

export default UserForm;
