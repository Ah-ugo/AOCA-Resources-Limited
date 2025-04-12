"use client";

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiEdit,
  FiTrash2,
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiVideo,
  FiFileText,
  FiBook,
  FiLink,
  FiFile,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch course details and lesson in parallel
        const [courseData, lessonData] = await Promise.all([
          adminService.getCourseById(courseId),
          adminService.getLessonById(courseId, lessonId),
        ]);

        setCourse(courseData);
        setLesson(lessonData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load lesson details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, lessonId]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this lesson? This action cannot be undone."
      )
    ) {
      try {
        await adminService.deleteLesson(courseId, lessonId);
        navigate(`/admin/courses/${courseId}/lessons`);
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
          onClick={() => navigate(`/admin/courses/${courseId}/lessons`)}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Lessons
        </button>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Not Found!</strong>
          <span className="block sm:inline">
            {" "}
            The requested lesson could not be found.
          </span>
        </div>
        <button
          onClick={() => navigate(`/admin/courses/${courseId}/lessons`)}
          className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiArrowLeft className="mr-2" />
          Back to Lessons
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/admin/courses/${courseId}/lessons`)}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{lesson.title}</h1>
            {course && (
              <p className="text-gray-600">
                Course: {course.title} {course.code && `(${course.code})`}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() =>
              navigate(`/admin/courses/${courseId}/lessons/${lessonId}/edit`)
            }
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
            {/* Status Badge */}
            <div className="mb-4 flex items-center">
              <span
                className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                  lesson.is_published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {lesson.is_published ? "Published" : "Draft"}
              </span>
              <div className="ml-4 flex items-center">
                {getLessonTypeIcon(lesson.type)}
                <span className="ml-1 text-sm font-medium capitalize">
                  {lesson.type || "Content"}
                </span>
              </div>
              {lesson.order && (
                <span className="ml-4 text-sm text-gray-500">
                  Order: {lesson.order}
                </span>
              )}
            </div>

            {/* Description */}
            {lesson.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Description
                </h2>
                <p className="text-gray-700">{lesson.description}</p>
              </div>
            )}

            {/* Content based on type */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {lesson.type === "video"
                  ? "Video"
                  : lesson.type === "quiz"
                  ? "Quiz"
                  : lesson.type === "assignment"
                  ? "Assignment"
                  : "Content"}
              </h2>

              {/* Text Content */}
              {lesson.type === "content" && lesson.content && (
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line">{lesson.content}</div>
                </div>
              )}

              {/* Video Content */}
              {lesson.type === "video" && (
                <div>
                  {lesson.video_url ? (
                    <div>
                      <div className="border rounded-md p-4 bg-gray-50 mb-4">
                        <div className="flex items-center mb-2">
                          <FiLink className="mr-2 text-blue-500" />
                          <a
                            href={lesson.video_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {lesson.video_url}
                          </a>
                        </div>
                        <p className="text-sm text-gray-500">
                          Video preview not available in this view. Click the
                          link to open the video.
                        </p>
                      </div>

                      {lesson.content && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 mb-2">
                            Additional Notes
                          </h3>
                          <div className="prose max-w-none">
                            <div className="whitespace-pre-line">
                              {lesson.content}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No video URL provided for this lesson.
                    </p>
                  )}
                </div>
              )}

              {/* Quiz Content */}
              {lesson.type === "quiz" && (
                <div>
                  {lesson.content ? (
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Quiz Instructions
                      </h3>
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-line">
                          {lesson.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic mb-4">
                      No quiz instructions provided.
                    </p>
                  )}

                  <div className="border rounded-md p-4 bg-gray-50">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Quiz Questions
                    </h3>
                    {lesson.quiz_questions &&
                    lesson.quiz_questions.length > 0 ? (
                      <div>
                        {/* Quiz questions would be rendered here */}
                        <p>
                          This quiz contains {lesson.quiz_questions.length}{" "}
                          questions.
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">
                        No quiz questions have been added yet.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Assignment Content */}
              {lesson.type === "assignment" && (
                <div>
                  {lesson.content ? (
                    <div className="mb-4">
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Assignment Instructions
                      </h3>
                      <div className="prose max-w-none">
                        <div className="whitespace-pre-line">
                          {lesson.content}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic mb-4">
                      No assignment instructions provided.
                    </p>
                  )}

                  {lesson.attachment_url && (
                    <div className="border rounded-md p-4 bg-gray-50 mb-4">
                      <div className="flex items-center">
                        <FiFile className="mr-2 text-blue-500" />
                        <a
                          href={lesson.attachment_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline break-all"
                        >
                          {lesson.attachment_url.split("/").pop() ||
                            "Assignment File"}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Lesson Details
            </h2>

            {/* Duration */}
            {lesson.duration && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Duration
                </h3>
                <div className="flex items-center text-gray-900">
                  <FiClock className="mr-1 h-4 w-4 text-gray-500" />
                  {formatDuration(lesson.duration)}
                </div>
              </div>
            )}

            {/* Created/Updated */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Created
              </h3>
              <div className="flex items-center text-gray-900">
                <FiCalendar className="mr-1 h-4 w-4 text-gray-500" />
                {formatDate(lesson.created_at)}
              </div>
            </div>

            {lesson.updated_at && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  Last Updated
                </h3>
                <div className="flex items-center text-gray-900">
                  <FiCalendar className="mr-1 h-4 w-4 text-gray-500" />
                  {formatDate(lesson.updated_at)}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() =>
                    navigate(
                      `/admin/courses/${courseId}/lessons/${lessonId}/edit`
                    )
                  }
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <FiEdit className="mr-2 h-4 w-4" />
                  Edit Lesson
                </button>

                {!lesson.is_published ? (
                  <button
                    onClick={() => {
                      // This would typically update the lesson status
                      alert(
                        "This would publish the lesson in a real implementation"
                      );
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    Publish Lesson
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      // This would typically update the lesson status
                      alert(
                        "This would unpublish the lesson in a real implementation"
                      );
                    }}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                  >
                    Unpublish Lesson
                  </button>
                )}

                <button
                  onClick={() => navigate(`/admin/courses/${courseId}`)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  View Course
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
