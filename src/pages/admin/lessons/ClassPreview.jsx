"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiBook,
  FiUsers,
  FiClock,
  FiCalendar,
  FiUser,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const ClassPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchClass();
    fetchStudents();
  }, [id]);

  const fetchClass = async () => {
    try {
      setLoading(true);
      const data = await adminService.getClassById(id);

      // Format the class data based on your API response
      // const formattedClass = {
      //   ...data.class,
      //   course: data.course || null,
      //   instructor: data.instructor || null,
      //   students_count: data.students_count || 0,
      // };
      console.log(data, "class data");
      setClassData(data);
    } catch (err) {
      console.error("Error fetching class:", err);
      setError("Failed to load class data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      // Assuming you have an endpoint to get students enrolled in a class
      const data = await adminService.getUsers({ enrolled_in: id });
      console.log(data, "students");
      setStudents(data.users || []);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleDelete = async () => {
    try {
      await adminService.deleteClass(id);
      navigate("/admin/classes", {
        state: { message: "Class deleted successfully" },
      });
    } catch (err) {
      console.error("Error deleting class:", err);
      setError("Failed to delete class. Please try again.");
    }
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    try {
      const [hours, minutes] = time.split(":");
      const hour = parseInt(hours, 10);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${period}`;
    } catch (err) {
      return time;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">Class not found</p>
        <button
          onClick={() => navigate("/admin/classes")}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Back to Classes
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admin/classes")}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft className="mr-1" /> Back to Classes
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => navigate(`/admin/classes/${id}/edit`)}
            className="flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <FiEdit className="mr-1" /> Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            <FiTrash2 className="mr-1" /> Delete
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {classData.class.title || "Unnamed Class"}
                </h1>
                {classData.class.description && (
                  <p className="text-gray-600">
                    Section: {classData.class.description}
                  </p>
                )}
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Active
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <FiBook className="mr-2" /> Course Information
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Course:</span>{" "}
                    {classData.course?.name || "Not assigned"}
                  </p>
                  {classData.class.description && (
                    <p>
                      <span className="font-medium">Description:</span>{" "}
                      {classData.class.description}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <FiUser className="mr-2" /> Instructor
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {classData.instructor?.name || "Not assigned"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {classData.instructor?.email || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <FiCalendar className="mr-2" /> Schedule
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Days:</span>{" "}
                    {classData.days?.join(", ") || "Not scheduled"}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {classData.start_time && classData.end_time
                      ? `${formatTime(classData.start_time)} - ${formatTime(
                          classData.end_time
                        )}`
                      : "N/A"}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <FiUsers className="mr-2" /> Enrollment
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Capacity:</span>{" "}
                    {classData.capacity || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Enrolled:</span>{" "}
                    {classData?.students?.length} students
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Enrolled Students ({students.length})
            </h2>

            {students.length > 0 ? (
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                      {student.name?.charAt(0) || "U"}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {student.name || "Unknown Student"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {student.email || "No email"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No students enrolled in this class
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this class? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPreview;
