"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Book, Calendar, Edit, Save, X } from "lucide-react";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);

      // Initialize form data
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        phone: "+234 803 123 4567",
        address: "Lagos, Nigeria",
        bio: "I am learning German to pursue my studies in Germany.",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update user in localStorage
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  if (!user)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 text-center border-b">
            <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
            <p className="text-gray-500">{user.course} Student</p>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>+234 803 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-gray-400" />
                <span>{user.course}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>Joined March 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-2">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h2 className="text-lg font-semibold">Profile Information</h2>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center text-sm bg-white text-primary px-3 py-1 rounded-md hover:bg-gray-100"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(false)}
                className="inline-flex items-center text-sm bg-white text-gray-700 px-3 py-1 rounded-md hover:bg-gray-100"
              >
                <X className="h-4 w-4 mr-1" />
                Cancel
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                <p className="mt-1">{formData.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Email Address
                </h3>
                <p className="mt-1">{formData.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h3>
                <p className="mt-1">{formData.phone}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="mt-1">{formData.address}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                <p className="mt-1">{formData.bio}</p>
              </div>
            </div>
          )}
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-lg shadow overflow-hidden lg:col-span-3">
          <div className="p-4 bg-primary text-white">
            <h2 className="text-lg font-semibold">Course Progress</h2>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {user.course} - Overall Progress
                </span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Grammar</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-500 h-1.5 rounded-full"
                    style={{ width: "40%" }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Vocabulary</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium">55%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-green-500 h-1.5 rounded-full"
                    style={{ width: "55%" }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Speaking</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-yellow-500 h-1.5 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Listening</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium">30%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-purple-500 h-1.5 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
