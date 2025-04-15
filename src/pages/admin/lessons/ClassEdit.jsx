"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiSave,
  FiX,
  FiClock,
  FiCalendar,
  FiBook,
  FiUsers,
  FiLink,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const ClassEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    course_id: "",
    title: "",
    description: "",
    date: new Date().toISOString().slice(0, 16),
    duration: 60,
    meet_link: "",
    instructor_id: "",
    recording_link: "",
    materials: [],
  });
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchClass();
    fetchCourses();
    fetchInstructors();
  }, [id]);

  const fetchClass = async () => {
    try {
      setFetching(true);
      const data = await adminService.getClassById(id);

      // Format the date for datetime-local input
      const classDate = data.class.date
        ? new Date(data.class.date).toISOString().slice(0, 16)
        : new Date().toISOString().slice(0, 16);

      setFormData({
        course_id: data.class.course_id || "",
        title: data.class.title || "",
        description: data.class.description || "",
        date: classDate,
        duration: data.class.duration || 60,
        meet_link: data.class.meet_link || "",
        instructor_id: data.class.instructor_id || "",
        recording_link: data.class.recording_link || "",
        materials: data.class.materials || [],
      });
    } catch (err) {
      console.error("Error fetching class:", err);
      setError("Failed to load class data. Please try again later.");
    } finally {
      setFetching(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await adminService.getCourses();
      setCourses(data.courses || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Failed to load courses. Please try again later.");
    }
  };

  const fetchInstructors = async () => {
    try {
      const data = await adminService.getUsers({ role: "admin" });
      setInstructors(data.users || []);
    } catch (err) {
      console.error("Error fetching instructors:", err);
      setError("Failed to load instructors. Please try again later.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMaterialChange = (index, key, value) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [key]: value,
    };
    setFormData({
      ...formData,
      materials: updatedMaterials,
    });
  };

  const addMaterial = () => {
    setFormData({
      ...formData,
      materials: [...formData.materials, {}],
    });
  };

  const removeMaterial = (index) => {
    const updatedMaterials = [...formData.materials];
    updatedMaterials.splice(index, 1);
    setFormData({
      ...formData,
      materials: updatedMaterials,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Prepare data for API
      const payload = {
        ...formData,
        duration: parseInt(formData.duration) || 0,
        date: new Date(formData.date).toISOString(),
      };

      await adminService.updateClass(id, payload);
      setSuccess(true);
      setTimeout(() => {
        navigate(`/admin/classes/${id}`);
      }, 1500);
    } catch (err) {
      console.error("Error updating class:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update class. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Edit Class</h1>
        <button
          onClick={() => navigate(`/admin/classes/${id}`)}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <FiX className="mr-1" /> Cancel
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Class updated successfully! Redirecting...
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                <FiBook className="inline mr-2" />
                Class Information
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course*
                </label>
                <select
                  name="course_id"
                  value={formData.course_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Schedule & Links */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                <FiCalendar className="inline mr-2" />
                Schedule & Links
              </h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date & Time*
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)*
                </label>
                <input
                  type="number"
                  name="duration"
                  min="1"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiLink className="inline mr-1" />
                  Meeting Link
                </label>
                <input
                  type="url"
                  name="meet_link"
                  value={formData.meet_link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://meet.google.com/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <FiLink className="inline mr-1" />
                  Recording Link
                </label>
                <input
                  type="url"
                  name="recording_link"
                  value={formData.recording_link}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://youtube.com/..."
                />
              </div>
            </div>
          </div>

          {/* Instructor Selection */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2 mb-4">
              <FiUsers className="inline mr-2" />
              Instructor
            </h2>
            <select
              name="instructor_id"
              value={formData.instructor_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select an instructor (optional)</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name} ({instructor.email})
                </option>
              ))}
            </select>
          </div>

          {/* Materials Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Class Materials
              </h2>
              <button
                type="button"
                onClick={addMaterial}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
              >
                Add Material
              </button>
            </div>

            {formData.materials.length === 0 ? (
              <p className="text-gray-500">No materials added</p>
            ) : (
              <div className="space-y-4">
                {formData.materials.map((material, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={material.title || ""}
                          onChange={(e) =>
                            handleMaterialChange(index, "title", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Material title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <input
                          type="text"
                          value={material.type || ""}
                          onChange={(e) =>
                            handleMaterialChange(index, "type", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="PDF, Video, etc."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          URL
                        </label>
                        <input
                          type="url"
                          value={material.url || ""}
                          onChange={(e) =>
                            handleMaterialChange(index, "url", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="https://example.com/material"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeMaterial(index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove Material
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => navigate(`/admin/classes/${id}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClassEdit;
