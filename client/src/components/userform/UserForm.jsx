import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserSuccess, fetchUserFailure } from "../../redux/actions";
import UserDetail from "../userdetail/UserDetail";
import "./userform.css";
import config from "../../environment/config";

const UserForm = () => {
  const apiURL = config.apiUrl;
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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
        const response = await fetch(`${apiURL}/api/user`, {
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
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
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
    <div className="container-fluid min-vh-100">
      <main>
        <div className="row justify-content-center min-vh-100">
          <div className="col-md-4 align-self-center">
            <form className="form" onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <>
                  <div className="text-center mb-4">
                    <h2>Create Your Account</h2>
                    <p>Set-up ypur Rently Pass as in as little 2 minutes</p>
                  </div>
                  <div className="row g-1">
                    <div className="form-heading">
                      <h4>Contact Details</h4>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        id="floatingInput"
                        type="email"
                        name="email"
                        placeholder="abc@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingInput">Email address</label>
                      {errors.email && (
                        <p className="error-message">{errors.email}</p>
                      )}
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        id="floatingMobile"
                        name="phoneNumber"
                        placeholder="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="floatingMobile">Mobile Number</label>
                      {errors.phoneNumber && (
                        <p className="error-message">{errors.phoneNumber}</p>
                      )}
                    </div>
                    <div className="form-heading">
                      <h4>Set a Password</h4>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="floatingPassword">Password</label>
                      {errors.password && (
                        <p className="error-message">{errors.password}</p>
                      )}
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        id="floatingConfirm"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                      />
                      <label htmlFor="floatingConfirm">Confirm Password</label>
                      {errors.confirmPassword && (
                        <p className="error-message">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                    <span className="form-paragraph">
                      We need a password to keep your information safe. But
                      don’t worry, we’ll also send your custom RentlyPass URL
                      via email.
                    </span>
                    <div className="mt-3">
                      <button type="submit" className="btn btn-primary w-100">
                        Create your account
                      </button>
                      <header>
                        {apiError && (
                          <p className="error-message">{apiError}</p>
                        )}
                      </header>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="text-center mb-4">
                    <ul className="form-progress mx-auto">
                      <li className="active">1</li>
                      <li>2</li>
                    </ul>
                    <h2>Personal Information</h2>
                    <p>Please answer questions as accurately as possible</p>
                  </div>
                  <div className="row g-1">
                    <div className="row g-0 mt-3">
                      <div className="col-3 pe-3">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            id="floatingSelect"
                            aria-label="Floating label select example"
                          >
                            <option value="1">Mrs.</option>
                            <option value="2">Ms.</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-9">
                        <div className="form-floating mb-2">
                          <input
                            type="text"
                            className="form-control"
                            id="floatingName"
                            placeholder="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                          />
                          <label htmlFor="floatingName">
                            Full Name as per your passport
                          </label>
                          {errors.fullName && (
                            <p className="error-message">{errors.fullName}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="form-floating mb-2">
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        id="floatingDob"
                        value={formData.dob}
                        onChange={handleChange}
                        placeholder="Date of birth"
                        required
                      />
                      <label htmlFor="floatingDob">Date of birth</label>
                      {errors.dob && (
                        <p className="error-message">{errors.dob}</p>
                      )}
                    </div>
                    <div className="form-floating mb-2">
                      <input
                        type="text"
                        className="form-control"
                        name="howLong"
                        id="floatinghowLong"
                        value={formData.howLong}
                        onChange={handleChange}
                        placeholder="How Long"
                      />
                      <label htmlFor="floatinghowLong">
                        How Long have you Lived in this address?
                      </label>
                    </div>
                    <div className="form-floating mb-2">
                      <textarea
                        type="text"
                        className="form-control"
                        name="tellUs"
                        id="floatingtellUs"
                        value={formData.tellUs}
                        onChange={handleChange}
                        placeholder="tellUs"
                      />
                      <label htmlFor="floatingtellUs">
                        Tell us a bit about yourself
                      </label>
                    </div>
                    {/* <button
                      className="back-btn"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </button> */}
                    <div className="mt-3">
                      <button type="submit" className="btn btn-primary w-100">
                        Save and continue
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="text-center mb-4">
                    <ul className="form-progress mx-auto">
                      <li>1</li>
                      <li className="active">2</li>
                    </ul>
                    <h1>Financial Information</h1>
                    <p>All your information is stored securely.</p>
                  </div>
                  <div className="row g-1">
                    <div className="form-floating mb-2">
                      <select
                        className="form-select"
                        id="floatingStatus"
                        aria-label="Floating label select example"
                        value={formData.employeeStatus}
                        onChange={handleChange}
                        name="employeeStatus"
                        placeholder="status"
                      >
                        <option value="Worker">Worker</option>
                        <option value="Employee">Employee</option>
                        <option value="Self-employed">Self-employed</option>
                      </select>
                      <label htmlFor="floatingStatus">
                        What is your current employment status?
                      </label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        name="investments"
                        id="floatingInvestments"
                        value={formData.investments}
                        onChange={handleChange}
                        placeholder="investments"
                      />
                      <label htmlFor="floatingInvestments">
                        Additional Savings/Investments
                      </label>
                    </div>
                    <span className="form-paragraph">
                      All information can be edited once you have created your
                      account.
                    </span>
                    <br />
                    {/* <button
                      className="back-btn"
                      onClick={() => setCurrentStep(currentStep - 1)}
                    >
                      Back
                    </button> */}
                    <div className="mt-3">
                      <button type="submit" className="btn btn-primary w-100">
                        Save and continue
                      </button>
                    </div>
                    {isLoading && (
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserForm;
