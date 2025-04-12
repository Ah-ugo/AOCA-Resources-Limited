"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEdit,
  FiTrash2,
  FiMail,
  FiPhone,
  FiCalendar,
  FiMapPin,
  FiShield,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const data = await adminService.getUserById(id);
        setUser(data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      try {
        await adminService.deleteUser(id);
        alert("User deleted successfully");
        navigate("/admin/users");
      } catch (err) {
        console.error("Error deleting user:", err);
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          User Not Found
        </h2>
        <p className="text-gray-600 mb-4">
          The user you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Back to Users List
        </button>
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
        <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/admin/users/${id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiEdit className="mr-2" />
            Edit User
          </button>
          <button
            onClick={handleDeleteUser}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiTrash2 className="mr-2" />
            Delete User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Profile Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold mb-4">
              {user.first_name?.charAt(0)}
              {user.last_name?.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.role === "admin"
                  ? "bg-purple-100 text-purple-800"
                  : user.role === "instructor"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {user.role}
            </span>
            <div className="mt-4 w-full">
              <div className="flex items-center py-2 border-b border-gray-200">
                <FiMail className="text-gray-500 mr-2" />
                <span className="text-gray-800">{user.email}</span>
              </div>
              {user.phone && (
                <div className="flex items-center py-2 border-b border-gray-200">
                  <FiPhone className="text-gray-500 mr-2" />
                  <span className="text-gray-800">{user.phone}</span>
                </div>
              )}
              <div className="flex items-center py-2 border-b border-gray-200">
                <FiCalendar className="text-gray-500 mr-2" />
                <span className="text-gray-800">
                  Joined: {formatDate(user.created_at)}
                </span>
              </div>
              <div className="flex items-center py-2 border-b border-gray-200">
                <FiShield className="text-gray-500 mr-2" />
                <span className="text-gray-800">Status: </span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                    user.disabled
                      ? "bg-red-100 text-red-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {user.disabled ? "Inactive" : "Active"}
                </span>
              </div>
              {user.location && (
                <div className="flex items-center py-2 border-b border-gray-200">
                  <FiMapPin className="text-gray-500 mr-2" />
                  <span className="text-gray-800">{user.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Details */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">First Name</p>
                <p className="text-gray-800 font-medium">
                  {user.first_name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Name</p>
                <p className="text-gray-800 font-medium">
                  {user.last_name || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-gray-800 font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Phone</p>
                <p className="text-gray-800 font-medium">
                  {user.phone || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Date of Birth</p>
                <p className="text-gray-800 font-medium">
                  {user.date_of_birth ? formatDate(user.date_of_birth) : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Gender</p>
                <p className="text-gray-800 font-medium">
                  {user.gender || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Account Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Role</p>
                <p className="text-gray-800 font-medium">{user.role}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="text-gray-800 font-medium">
                  {user.disabled ? "Inactive" : "Active"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Created At</p>
                <p className="text-gray-800 font-medium">
                  {formatDate(user.created_at)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Updated</p>
                <p className="text-gray-800 font-medium">
                  {formatDate(user.updated_at)}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Last Login</p>
                <p className="text-gray-800 font-medium">
                  {user.last_login ? formatDate(user.last_login) : "Never"}
                </p>
              </div>
            </div>
          </div>

          {/* User Activity */}
          {user.activity && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {user.activity.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-gray-800 font-medium">
                          {item.action}
                        </p>
                        <p className="text-gray-500 text-sm">{item.details}</p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {formatDate(item.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
