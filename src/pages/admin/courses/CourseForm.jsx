import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiSave,
  FiX,
  FiCalendar,
  FiDollarSign,
  FiClock,
  FiUsers,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [instructors, setInstructors] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    code: "",
    description: "",
    instructor_id: "",
    status: "draft",
    price: "",
    duration: "",
    duration_unit: "weeks",
    max_students: "",
    start_date: "",
    end_date: "",
    schedule: "",
    location: "online",
    prerequisites: "",
    syllabus: "",
    image_url: "",
    category: "",
    level: "beginner",
  });

  useEffect(() => {
    // Fetch instructors (users with instructor role)
    const fetchInstructors = async () => {
      try {
        const response = await adminService.getUsers({ role: "instructor" });
        setInstructors(response.users || []);
      } catch (err) {
        console.error("Error fetching instructors:", err);
        setError("Failed to load instructors. Please try again.");
      }
    };

    fetchInstructors();

    // If in edit mode, fetch the course data
    if (isEditMode) {
      const fetchCourse = async () => {
        try {
          setLoading(true);
          const courseData = await adminService.getCourseById(id);

          // Format dates for form inputs
          const formattedCourse = {
            ...courseData,
            start_date: courseData.start_date
              ? new Date(courseData.start_date).toISOString().split("T")[0]
              : "",
            end_date: courseData.end_date
              ? new Date(courseData.end_date).toISOString().split("T")[0]
              : "",
            price: courseData.price?.toString() || "",
            max_students: courseData.max_students?.toString() || "",
            duration: courseData.duration?.toString() || "",
            instructor_id:
              courseData.instructor?._id || courseData.instructor_id || "",
          };

          setFormData(formattedCourse);
        } catch (err) {
          console.error("Error fetching course:", err);
          setError("Failed to load course data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchCourse();
    }
  }, [id, isEditMode]);

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
      setSaving(true);

      // Convert string values to appropriate types
      const courseData = {
        ...formData,
        price: formData.price ? Number.parseFloat(formData.price) : undefined,
        max_students: formData.max_students
          ? Number.parseInt(formData.max_students)
          : undefined,
        duration: formData.duration
          ? Number.parseInt(formData.duration)
          : undefined,
      };

      if (isEditMode) {
        await adminService.updateCourse(id, courseData);
      } else {
        await adminService.createCourse(courseData);
      }

      navigate("/admin/courses");
    } catch (err) {
      console.error("Error saving course:", err);
      setError(
        "Failed to save course. Please check your inputs and try again."
      );
      window.scrollTo(0, 0);
    } finally {
      setSaving(false);
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit Course" : "Add New Course"}
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate("/admin/courses")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiX className="mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiSave className="mr-2" />
            {saving ? "Saving..." : "Save Course"}
          </button>
        </div>
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

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Course Title*
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="code"
                >
                  Course Code
                </label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  value={formData.code}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description*
            </label>
            <textarea
              id="description"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          {/* Course Details */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Course Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="status"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="draft">Draft</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="category"
                >
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="level"
                >
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all-levels">All Levels</option>
                </select>
              </div>
            </div>
          </div>

          {/* Instructor */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="instructor_id"
            >
              Instructor
            </label>
            <select
              id="instructor_id"
              name="instructor_id"
              value={formData.instructor_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor._id} value={instructor._id}>
                  {instructor.name ||
                    `${instructor.first_name} ${instructor.last_name}`}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              <div className="flex items-center">
                <FiDollarSign className="mr-1" />
                Price
              </div>
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Duration */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="duration"
            >
              <div className="flex items-center">
                <FiClock className="mr-1" />
                Duration
              </div>
            </label>
            <div className="flex">
              <input
                id="duration"
                name="duration"
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleChange}
                className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <select
                id="duration_unit"
                name="duration_unit"
                value={formData.duration_unit}
                onChange={handleChange}
                className="shadow appearance-none border border-l-0 rounded-r py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
            </div>
          </div>

          {/* Max Students */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="max_students"
            >
              <div className="flex items-center">
                <FiUsers className="mr-1" />
                Max Students
              </div>
            </label>
            <input
              id="max_students"
              name="max_students"
              type="number"
              min="1"
              value={formData.max_students}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Dates */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="start_date"
            >
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                Start Date
              </div>
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="end_date"
            >
              <div className="flex items-center">
                <FiCalendar className="mr-1" />
                End Date
              </div>
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Schedule */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="schedule"
            >
              Schedule
            </label>
            <input
              id="schedule"
              name="schedule"
              type="text"
              placeholder="e.g., Mon/Wed/Fri 10:00 AM - 12:00 PM"
              value={formData.schedule}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Location */}
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="online">Online</option>
              <option value="in-person">In-Person</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image_url"
            >
              Course Image URL
            </label>
            <input
              id="image_url"
              name="image_url"
              type="text"
              value={formData.image_url}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Prerequisites */}
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="prerequisites"
            >
              Prerequisites
            </label>
            <textarea
              id="prerequisites"
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              rows={3}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>

          {/* Syllabus */}
          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="syllabus"
            >
              Syllabus
            </label>
            <textarea
              id="syllabus"
              name="syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              rows={6}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
            <p className="text-sm text-gray-500 mt-1">
              You can use markdown formatting for the syllabus content.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin/courses")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            {saving
              ? "Saving..."
              : isEditMode
              ? "Update Course"
              : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;
