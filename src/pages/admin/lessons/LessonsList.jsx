"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiPlus,
  FiArrowLeft,
  FiBook,
  FiClock,
  FiVideo,
  FiFileText,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const LessonsList = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch course details and lessons in parallel
        const [courseData, lessonsData] = await Promise.all([
          adminService.getCourseById(courseId),
          adminService.getLessons(),
        ]);

        setCourse(courseData);
        setLessons(lessonsData.lessons || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load lessons. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  const handleDelete = async (lessonId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this lesson? This action cannot be undone."
      )
    ) {
      try {
        await adminService.deleteLesson(courseId, lessonId);
        setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
        alert("Lesson deleted successfully");
      } catch (err) {
        console.error("Error deleting lesson:", err);
        alert("Failed to delete lesson. Please try again.");
      }
    }
  };

  const getLessonTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "video":
        return <FiVideo className="h-5 w-5 text-blue-500" />;
      case "quiz":
        return <FiFileText className="h-5 w-5 text-purple-500" />;
      case "assignment":
        return <FiFileText className="h-5 w-5 text-orange-500" />;
      default:
        return <FiBook className="h-5 w-5 text-green-500" />;
    }
  };

  const formatDuration = (duration) => {
    if (!duration) return "N/A";

    // If duration is in minutes
    if (typeof duration === "number") {
      const hours = Math.floor(duration / 60);
      const minutes = duration % 60;

      if (hours > 0) {
        return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`;
      } else {
        return `${minutes}m`;
      }
    }

    // If duration is already formatted
    return duration;
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

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/admin/courses/${courseId}`)}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Course Lessons</h1>
            {course && (
              <p className="text-gray-600">
                {course.title} {course.code && `(${course.code})`}
              </p>
            )}
          </div>
        </div>
        <button
          onClick={() => navigate(`/admin/courses/${courseId}/lessons/new`)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          Add New Lesson
        </button>
      </div>

      {/* Lessons List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {lessons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lesson
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lessons.map((lesson) => (
                  <tr key={lesson._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lesson.order || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </div>
                          {lesson.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {lesson.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getLessonTypeIcon(lesson.type)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">
                          {lesson.type || "Content"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1 h-4 w-4 text-gray-400" />
                        {formatDuration(lesson.duration)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          lesson.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {lesson.is_published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(lesson.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/courses/${courseId}/lessons/${lesson._id}`
                          )
                        }
                        className="text-green-600 hover:text-green-900 mr-3"
                        title="View Lesson"
                      >
                        <FiEye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/courses/${courseId}/lessons/${lesson._id}/edit`
                          )
                        }
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit Lesson"
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(lesson._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Lesson"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <FiBook className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">
              No lessons found for this course
            </p>
            <p className="text-gray-400 mb-4">
              Start by adding your first lesson
            </p>
            <button
              onClick={() => navigate(`/admin/courses/${courseId}/lessons/new`)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FiPlus className="mr-2" />
              Add New Lesson
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonsList;
