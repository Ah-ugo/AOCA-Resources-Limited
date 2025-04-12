"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiUsers,
  FiMapPin,
  FiUserPlus,
  FiUserX,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [enrollingUser, setEnrollingUser] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const data = await adminService.getCourseById(id);
        setCourse(data);

        // Fetch enrolled students if the course has students
        if (data.students_count > 0) {
          fetchEnrolledStudents();
        }
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const fetchEnrolledStudents = async () => {
    try {
      setLoadingStudents(true);
      // This endpoint might need to be implemented in your API
      const data = await adminService.getCourseStudents(id);
      setEnrolledStudents(data.students || []);
    } catch (err) {
      console.error("Error fetching enrolled students:", err);
      // Provide mock data if the API endpoint doesn't exist
      setEnrolledStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This action cannot be undone."
      )
    ) {
      try {
        await adminService.deleteCourse(id);
        navigate("/admin/courses");
      } catch (err) {
        console.error("Error deleting course:", err);
        alert("Failed to delete course. Please try again.");
      }
    }
  };

  const openEnrollModal = async () => {
    try {
      // Fetch users who can be enrolled
      const response = await adminService.getUsers({ role: "student" });
      setAvailableUsers(response.users || []);
      setShowEnrollModal(true);
    } catch (err) {
      console.error("Error fetching available users:", err);
      alert("Failed to load available users. Please try again.");
    }
  };

  const handleEnrollUser = async () => {
    if (!selectedUserId) {
      alert("Please select a user to enroll");
      return;
    }

    try {
      setEnrollingUser(true);
      await adminService.enrollUserInCourse(id, selectedUserId);

      // Refresh the enrolled students list
      fetchEnrolledStudents();

      // Close the modal and reset selection
      setShowEnrollModal(false);
      setSelectedUserId("");
      alert("User enrolled successfully");
    } catch (err) {
      console.error("Error enrolling user:", err);
      alert("Failed to enroll user. Please try again.");
    } finally {
      setEnrollingUser(false);
    }
  };

  const handleRemoveUser = async (userId) => {
    if (
      window.confirm(
        "Are you sure you want to remove this user from the course?"
      )
    ) {
      try {
        await adminService.removeUserFromCourse(id, userId);

        // Update the enrolled students list
        setEnrolledStudents(
          enrolledStudents.filter((student) => student._id !== userId)
        );
        alert("User removed from course successfully");
      } catch (err) {
        console.error("Error removing user:", err);
        alert("Failed to remove user. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <button
          onClick={() => navigate("/admin/courses")}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Courses
        </button>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Not Found!</strong>
          <span className="block sm:inline">
            {" "}
            The requested course could not be found.
          </span>
        </div>
        <button
          onClick={() => navigate("/admin/courses")}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/admin/courses")}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-3xl font-bold text-gray-800">{course.title}</h1>
          {course.code && (
            <span className="ml-3 px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded-md">
              {course.code}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/admin/courses/${id}/edit`)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiEdit className="mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiTrash2 className="mr-2" />
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {/* Course Image */}
            {course.image_url && (
              <div className="mb-6">
                <img
                  src={course.image_url || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://via.placeholder.com/800x400?text=Course+Image";
                  }}
                />
              </div>
            )}

            {/* Status Badge */}
            <div className="mb-4">
              <span
                className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  course.status === "active"
                    ? "bg-green-100 text-green-800"
                    : course.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : course.status === "completed"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {course.status || "Draft"}
              </span>
              {course.level && (
                <span className="ml-2 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </span>
              )}
              {course.category && (
                <span className="ml-2 px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                  {course.category}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Description
              </h2>
              <p className="text-gray-700 whitespace-pre-line">
                {course.description}
              </p>
            </div>

            {/* Prerequisites */}
            {course.prerequisites && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Prerequisites
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {course.prerequisites}
                </p>
              </div>
            )}

            {/* Syllabus */}
            {course.syllabus && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Syllabus
                </h2>
                <div className="text-gray-700 whitespace-pre-line">
                  {course.syllabus}
                </div>
              </div>
            )}
          </div>

          {/* Enrolled Students */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Enrolled Students
              </h2>
              <div className="flex items-center">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold mr-2">
                  {course.students_count || 0} / {course.max_students || "∞"}
                </span>
                <button
                  onClick={openEnrollModal}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-md flex items-center text-sm"
                >
                  <FiUserPlus className="mr-1" />
                  Enroll Student
                </button>
              </div>
            </div>

            {loadingStudents ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : enrolledStudents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrolled On
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {enrolledStudents.map((student) => (
                      <tr key={student._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              {student.avatar ? (
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={student.avatar || "/placeholder.svg"}
                                  alt={student.name}
                                />
                              ) : (
                                <span className="text-gray-500 text-sm">
                                  {student.name?.charAt(0) ||
                                    student.email?.charAt(0) ||
                                    "U"}
                                </span>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {student.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {student.enrolled_date
                            ? formatDate(student.enrolled_date)
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{ width: `${student.progress || 0}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {student.progress || 0}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleRemoveUser(student._id)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                            title="Remove from course"
                          >
                            <FiUserX className="h-5 w-5 mr-1" />
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <FiUsers className="h-8 w-8 mb-2" />
                <p>No students enrolled yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Course Details
            </h2>

            {/* Instructor */}
            {course.instructor && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Instructor
                </h3>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    {course.instructor.avatar ? (
                      <img
                        className="h-8 w-8 rounded-full"
                        src={course.instructor.avatar || "/placeholder.svg"}
                        alt={course.instructor.name}
                      />
                    ) : (
                      <span>{course.instructor.name?.charAt(0) || "I"}</span>
                    )}
                  </div>
                  <div className="ml-2 text-sm font-medium text-gray-900">
                    {course.instructor.name ||
                      `${course.instructor.first_name} ${course.instructor.last_name}`}
                  </div>
                </div>
              </div>
            )}

            {/* Price */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Price</h3>
              <div className="flex items-center text-gray-900">
                <FiDollarSign className="mr-1 h-4 w-4 text-gray-500" />
                {course.price ? `${course.price.toFixed(2)}` : "Free"}
              </div>
            </div>

            {/* Duration */}
            {course.duration && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Duration
                </h3>
                <div className="flex items-center text-gray-900">
                  <FiClock className="mr-1 h-4 w-4 text-gray-500" />
                  {course.duration} {course.duration_unit || "weeks"}
                </div>
              </div>
            )}

            {/* Dates */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Dates</h3>
              <div className="flex items-center text-gray-900 mb-1">
                <FiCalendar className="mr-1 h-4 w-4 text-gray-500" />
                Start:{" "}
                {course.start_date
                  ? formatDate(course.start_date)
                  : "Not scheduled"}
              </div>
              {course.end_date && (
                <div className="flex items-center text-gray-900">
                  <FiCalendar className="mr-1 h-4 w-4 text-gray-500 opacity-0" />
                  End: {formatDate(course.end_date)}
                </div>
              )}
            </div>

            {/* Schedule */}
            {course.schedule && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Schedule
                </h3>
                <div className="flex items-start text-gray-900">
                  <FiCalendar className="mr-1 h-4 w-4 text-gray-500 mt-0.5" />
                  <span>{course.schedule}</span>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Location
              </h3>
              <div className="flex items-center text-gray-900">
                <FiMapPin className="mr-1 h-4 w-4 text-gray-500" />
                {course.location === "online"
                  ? "Online"
                  : course.location === "in-person"
                  ? "In-Person"
                  : course.location === "hybrid"
                  ? "Hybrid (Online & In-Person)"
                  : course.location || "Not specified"}
              </div>
            </div>

            {/* Created/Updated */}
            <div className="border-t border-gray-200 pt-4 mt-4 text-xs text-gray-500">
              {course.created_at && (
                <div className="mb-1">
                  Created: {formatDate(course.created_at)}
                </div>
              )}
              {course.updated_at && (
                <div>Last updated: {formatDate(course.updated_at)}</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enroll User Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enroll Student
            </h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="user-select"
              >
                Select Student
              </label>
              <select
                id="user-select"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
              >
                <option value="">Select a student</option>
                {availableUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.first_name} {user.last_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowEnrollModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleEnrollUser}
                disabled={enrollingUser || !selectedUserId}
                className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center ${
                  enrollingUser || !selectedUserId
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {enrollingUser ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></span>
                    Enrolling...
                  </>
                ) : (
                  <>
                    <FiUserPlus className="mr-2" />
                    Enroll
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
