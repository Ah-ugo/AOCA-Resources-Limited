"use client";

import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Book,
  Calendar,
  Edit,
  Save,
  X,
  Loader,
} from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
  getUserCourses,
} from "../../services/dashboard-service";
import { getCurrentUser } from "../../services/auth-service";

function Profile() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Get user from auth service first
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }

        // Then try to get detailed profile from API
        const [profileData, coursesData] = await Promise.all([
          getUserProfile(),
          getUserCourses(),
        ]);

        if (profileData && profileData.user) {
          // Update user with more detailed profile data
          setUser({
            ...currentUser,
            ...profileData.user,
          });

          // Initialize form data
          setFormData({
            name:
              profileData.user.name ||
              `${profileData.user.first_name || ""} ${
                profileData.user.last_name || ""
              }`,
            email: profileData.user.email || "",
            phone: profileData.user.phone || "+234 803 123 4567",
            address: profileData.user.address || "Lagos, Nigeria",
            bio:
              profileData.user.bio ||
              "I am learning German to pursue my studies in Germany.",
          });
        } else {
          // If API fails, use data from localStorage
          setFormData({
            name:
              currentUser.name ||
              `${currentUser.first_name || ""} ${currentUser.last_name || ""}`,
            email: currentUser.email || "",
            phone: "+234 803 123 4567",
            address: "Lagos, Nigeria",
            bio: "I am learning German to pursue my studies in Germany.",
          });
        }

        // Set courses data
        if (coursesData && Array.isArray(coursesData)) {
          setCourses(coursesData);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data. Please try again later.");
        setLoading(false);

        // Use data from localStorage as fallback
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setFormData({
            name:
              currentUser.name ||
              `${currentUser.first_name || ""} ${currentUser.last_name || ""}`,
            email: currentUser.email || "",
            phone: "+234 803 123 4567",
            address: "Lagos, Nigeria",
            bio: "I am learning German to pursue my studies in Germany.",
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Update profile via API
      const updatedProfile = await updateUserProfile(formData);

      // Update local user state
      if (updatedProfile && updatedProfile.user) {
        setUser({
          ...user,
          ...updatedProfile.user,
        });

        // Update user in localStorage
        const currentUser = getCurrentUser();
        const updatedUser = {
          ...currentUser,
          name: formData.name,
          email: formData.email,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } else {
        // Fallback if API doesn't return updated user
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email,
        };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      setIsEditing(false);
      setLoading(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
      setLoading(false);
    }
  };

  // Calculate overall course progress (average of all courses)
  const overallProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + (course.progress || 0), 0) /
            courses.length
        )
      : 35; // Fallback value

  if (loading && !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2">Loading profile...</span>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!user) return <div>Please log in to view your profile</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      {updateSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 text-center border-b">
            <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mt-4 text-xl font-bold">{formData.name}</h2>
            <p className="text-gray-500">
              {courses.length > 0
                ? `${courses[0].name} Student`
                : user.course || user.role || "Student"}
            </p>
          </div>

          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>{formData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>{formData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-gray-400" />
                <span>
                  {courses.length > 0
                    ? courses.map((c) => c.name).join(", ")
                    : user.course || "German A1"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>
                  Joined{" "}
                  {user.joined_date || user.created_at
                    ? new Date(user.created_at).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "March 2025"}
                </span>
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
                    disabled={loading}
                    className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {loading ? (
                      <>
                        <Loader className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
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
                  {courses.length > 0
                    ? `${courses[0].name} - Overall Progress`
                    : "German A1 - Overall Progress"}
                </span>
                <span className="text-sm font-medium">{overallProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${overallProgress}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {courses.length > 0 ? (
                // If we have courses from the API, display them
                courses.map((course, index) => (
                  <div
                    key={course.id || course._id || index}
                    className="border rounded-lg p-4"
                  >
                    <h3 className="font-medium mb-2">{course.name}</h3>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-500">Progress</span>
                      <span className="text-xs font-medium">
                        {course.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${
                          index === 0
                            ? "bg-blue-500"
                            : index === 1
                            ? "bg-green-500"
                            : index === 2
                            ? "bg-yellow-500"
                            : "bg-purple-500"
                        }`}
                        style={{ width: `${course.progress || 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                // Fallback to mock data if no courses from API
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
