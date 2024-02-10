import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserSuccess, fetchUserFailure } from "../../redux/actions";
import UserDetail from "../userdetail/UserDetail";
import "./userform.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
    dob: "",
    employeeStatus: "",
    investments: "",
    howLong: "",
    tellUs: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    fullName: "",
    dob: "",
    employeeStatus: "",
    investments: "",
    howLong: "",
    tellUs: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [apiError, setApiError] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};
    if (currentStep === 1) {
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
        validationErrors.confirmPassword = "Passwords do not match";
      }
    } else if (currentStep === 2) {
      if (formData.fullName.trim() === "") {
        validationErrors.fullName = "Please enter your full name";
      }
    } else if (currentStep === 3) {
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    if (currentStep === 3) {
      try {
        const response = await fetch("http://localhost:5000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to create account");
        }
        const data = await response.json();
        dispatch(fetchUserSuccess(data));
        setAccountId(data._id);
        setSuccessMessage("Account created successfully.");
        setFormSubmitted(true);
      } catch (error) {
        setApiError(error.message);
        dispatch(fetchUserFailure(error.message));
      }
    } else {
      setCurrentStep(currentStep + 1);
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

  const handleCreateNewAccount = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
      dob: "",
      employeeStatus: "",
      investments: "",
      howLong: "",
      tellUs: "",
    });
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      fullName: "",
      dob: "",
      employeeStatus: "",
      investments: "",
      howLong: "",
      tellUs: "",
    });
    setCurrentStep(1);
    setSuccessMessage("");
    setFormSubmitted(false);
    setAccountId(null);
    setApiError(null);
  };

  if (formSubmitted) {
    return (
      <div>
        <h2>Success!</h2>
        <p className="success-message">{successMessage}</p>
        <button className="new-btn" onClick={handleCreateNewAccount}>
          Create New Account
        </button>
        <UserDetail accountId={accountId} />
      </div>
    );
  }

  return (
    <div className="container">
      <header>{apiError && <p className="error-message">{apiError}</p>}</header>
      <main>
        <form className="form" onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <h1>Create your account</h1>
              <p>Set-up your RentlyPass in as little as 2 minutes.</p>
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
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </div>
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
              <button className="create-btn" type="submit">
                Save and continue
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <h1>Personal Information</h1>
              <p>Please answer questions as accurately as possible</p>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && (
                  <p className="error-message">{errors.fullName}</p>
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
              <div className="form-group">
                <label>How Long have you Lived in this address?</label>
                <input
                  type="text"
                  name="howLong"
                  value={formData.howLong}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Tell us a bit about yourself</label>
                <textarea
                  type="text"
                  name="tellUs"
                  value={formData.tellUs}
                  onChange={handleChange}
                />
              </div>
              <button
                className="back-btn"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
              <button className="create-btn" type="submit">
                Save and continue
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h1>Financial Information</h1>
              <p>All your information is stored securely.</p>
              <div className="form-group">
                <label>Employment Status</label>
                <input
                  type="text"
                  name="employeeStatus"
                  value={formData.employeeStatus}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Additional Savings/Investments</label>
                <input
                  type="text"
                  name="investments"
                  value={formData.investments}
                  onChange={handleChange}
                />
              </div>
              <span>
                All information can be edited once you have created your
                account.
              </span>
              <br />
              <button
                className="back-btn"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                Back
              </button>
              <button className="create-btn" type="submit">
                Create your account
              </button>
            </>
          )}
        </form>
      </main>
    </div>
  );
};

export default UserForm;
