"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiUser,
  FiMail,
  FiPhone,
  FiShield,
  FiCalendar,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "student",
    password: "",
    confirm_password: "",
    date_of_birth: "",
    gender: "",
    disabled: false,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      const fetchUserData = async () => {
        try {
          setLoading(true);
          const userData = await adminService.getUserById(id);
          // Format date of birth if it exists
          if (userData.date_of_birth) {
            userData.date_of_birth = new Date(userData.date_of_birth)
              .toISOString()
              .split("T")[0];
          }
          setFormData({
            ...userData,
            password: "",
            confirm_password: "",
          });
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to load user data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.first_name.trim())
      errors.first_name = "First name is required";
    if (!formData.last_name.trim()) errors.last_name = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";

    if (!isEditMode) {
      if (!formData.password) errors.password = "Password is required";
      if (formData.password && formData.password.length < 8)
        errors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirm_password)
        errors.confirm_password = "Passwords do not match";
    } else if (formData.password) {
      if (formData.password.length < 8)
        errors.password = "Password must be at least 8 characters";
      if (formData.password !== formData.confirm_password)
        errors.confirm_password = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      // Create payload (exclude confirm_password)
      const { confirm_password, ...payload } = formData;

      // If password is empty in edit mode, remove it from payload
      if (isEditMode && !payload.password) {
        delete payload.password;
      }

      if (isEditMode) {
        await adminService.updateUser(id, payload);
        alert("User updated successfully");
      } else {
        await adminService.createUser(payload);
        alert("User created successfully");
      }

      navigate("/admin/users");
    } catch (err) {
      console.error("Error saving user:", err);
      setError(
        `Failed to ${isEditMode ? "update" : "create"} user. ${
          err.message || "Please try again."
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/users")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Back to Users List
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit User" : "Create New User"}
        </h1>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Personal Information
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="first_name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  First Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      formErrors.first_name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {formErrors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.first_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="last_name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Last Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      formErrors.last_name
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </div>
                {formErrors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.last_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {formErrors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="date_of_birth"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>
            </div>

            {/* Account Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Account Information
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Role *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiShield className="text-gray-400" />
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  {isEditMode
                    ? "Password (leave blank to keep current)"
                    : "Password *"}
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.password}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="confirm_password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.confirm_password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formErrors.confirm_password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.confirm_password}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="disabled"
                    name="disabled"
                    checked={formData.disabled}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="disabled"
                    className="ml-2 block text-gray-700"
                  >
                    Account Disabled
                  </label>
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  Disabled accounts cannot log in to the system.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/users")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FiSave className="mr-2" />
              {submitting ? "Saving..." : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
