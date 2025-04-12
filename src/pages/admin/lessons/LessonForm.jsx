"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiSave,
  FiX,
  FiArrowLeft,
  FiClock,
  FiLink,
  FiFile,
  FiUpload,
  FiImage,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const LessonForm = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!lessonId;
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [course, setCourse] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    type: "content",
    order: "",
    duration: "",
    is_published: false,
    video_url: "",
    attachment_url: "",
    image_url: "",
    quiz_questions: [],
  });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseData = await adminService.getCourseById(courseId);
        setCourse(courseData);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course information. Please try again.");
      }
    };

    fetchCourse();

    // If in edit mode, fetch the lesson data
    if (isEditMode) {
      const fetchLesson = async () => {
        try {
          setLoading(true);
          const lessonData = await adminService.getLessonById(
            courseId,
            lessonId
          );
          setFormData({
            ...lessonData,
            order: lessonData.order?.toString() || "",
            duration: lessonData.duration?.toString() || "",
          });
        } catch (err) {
          console.error("Error fetching lesson:", err);
          setError("Failed to load lesson data. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      fetchLesson();
    }
  }, [courseId, lessonId, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await adminService.uploadImage(formData);

      setFormData((prev) => ({
        ...prev,
        image_url: response.url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAttachmentUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingAttachment(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await adminService.uploadFile(formData);

      setFormData((prev) => ({
        ...prev,
        attachment_url: response.url,
      }));
    } catch (error) {
      console.error("Error uploading attachment:", error);
      setError("Failed to upload attachment. Please try again.");
    } finally {
      setUploadingAttachment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // Convert string values to appropriate types
      const lessonData = {
        ...formData,
        order: formData.order ? Number.parseInt(formData.order) : undefined,
        duration: formData.duration
          ? Number.parseInt(formData.duration)
          : undefined,
      };

      if (isEditMode) {
        await adminService.updateLesson(courseId, lessonId, lessonData);
      } else {
        await adminService.createLesson(courseId, lessonData);
      }

      navigate(`/admin/courses/${courseId}/lessons`);
    } catch (err) {
      console.error("Error saving lesson:", err);
      setError(
        "Failed to save lesson. Please check your inputs and try again."
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
        <div className="flex items-center">
          <button
            onClick={() => navigate(`/admin/courses/${courseId}/lessons`)}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            <FiArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isEditMode ? "Edit Lesson" : "Add New Lesson"}
            </h1>
            {course && (
              <p className="text-gray-600">
                Course: {course.title} {course.code && `(${course.code})`}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => navigate(`/admin/courses/${courseId}/lessons`)}
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
            {saving ? "Saving..." : "Save Lesson"}
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
                  Lesson Title*
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
                  htmlFor="order"
                >
                  Order
                </label>
                <input
                  id="order"
                  name="order"
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g. 1, 2, 3..."
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={2}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Brief description of this lesson"
            ></textarea>
          </div>

          {/* Lesson Details */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Lesson Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="type"
                >
                  Lesson Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="content">Text Content</option>
                  <option value="video">Video</option>
                  <option value="quiz">Quiz</option>
                  <option value="assignment">Assignment</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="duration"
                >
                  <div className="flex items-center">
                    <FiClock className="mr-1" />
                    Duration (minutes)
                  </div>
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g. 30"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="is_published"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Publish this lesson (visible to students)
                </label>
              </div>
            </div>
          </div>

          {/* Lesson Image */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Lesson Image
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="image_url"
                >
                  <div className="flex items-center">
                    <FiImage className="mr-1" />
                    Image URL
                  </div>
                </label>
                <input
                  id="image_url"
                  name="image_url"
                  type="text"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter image URL or upload below"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Image
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
                    disabled={uploadingImage}
                  >
                    <FiUpload className="mr-2" />
                    {uploadingImage ? "Uploading..." : "Choose Image"}
                  </button>
                </div>
              </div>
            </div>

            {formData.image_url && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Image Preview:
                </p>
                <img
                  src={formData.image_url || "/placeholder.svg"}
                  alt="Lesson image"
                  className="max-w-md h-40 object-cover rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=160&width=320";
                  }}
                />
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Lesson Content
            </h2>

            {/* Text Content */}
            {formData.type === "content" && (
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="content"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={10}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter lesson content here..."
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">
                  You can use markdown formatting for the content.
                </p>
              </div>
            )}

            {/* Video Content */}
            {formData.type === "video" && (
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="video_url"
                >
                  <div className="flex items-center">
                    <FiLink className="mr-1" />
                    Video URL
                  </div>
                </label>
                <input
                  id="video_url"
                  name="video_url"
                  type="url"
                  value={formData.video_url}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="e.g. https://www.youtube.com/watch?v=..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Enter YouTube, Vimeo, or other video platform URL.
                </p>

                {formData.video_url && (
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Video Preview
                    </label>
                    <div className="border rounded-md p-2 bg-gray-50">
                      <p className="text-blue-600 break-all">
                        {formData.video_url}
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={4}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Optional notes or description about the video..."
                  ></textarea>
                </div>
              </div>
            )}

            {/* Quiz Content */}
            {formData.type === "quiz" && (
              <div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Quiz creation is currently simplified. For complex
                        quizzes, please use the full quiz editor.
                      </p>
                    </div>
                  </div>
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="content"
                >
                  Quiz Instructions
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={4}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Instructions for students taking this quiz..."
                ></textarea>

                {/* This would typically be a more complex component with the ability to add questions and answers */}
                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quiz Questions
                  </label>
                  <div className="bg-gray-50 border rounded-md p-4">
                    <p className="text-gray-500 text-center">
                      Quiz builder functionality will be available in the full
                      version.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Assignment Content */}
            {formData.type === "assignment" && (
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="content"
                >
                  Assignment Instructions
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Detailed instructions for the assignment..."
                ></textarea>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="attachment_url"
                  >
                    <div className="flex items-center">
                      <FiFile className="mr-1" />
                      Attachment URL
                    </div>
                  </label>
                  <input
                    id="attachment_url"
                    name="attachment_url"
                    type="text"
                    value={formData.attachment_url}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter attachment URL or upload below"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Upload Attachment
                  </label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      onChange={handleAttachmentUpload}
                      className="hidden"
                      id="attachment-upload"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("attachment-upload").click()
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
                      disabled={uploadingAttachment}
                    >
                      <FiUpload className="mr-2" />
                      {uploadingAttachment ? "Uploading..." : "Choose File"}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    PDF, DOC, DOCX, ZIP up to 10MB
                  </p>

                  {formData.attachment_url && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">
                        Attachment:
                      </p>
                      <a
                        href={formData.attachment_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <FiFile className="mr-1" />
                        {formData.attachment_url.split("/").pop() ||
                          "Attachment"}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/admin/courses/${courseId}/lessons`)}
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
              ? "Update Lesson"
              : "Create Lesson"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LessonForm;
