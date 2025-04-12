"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiImage,
  FiTag,
  FiCalendar,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    tags: "",
    featured_image: "",
    status: "draft",
    published_at: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const data = await adminService.getBlogCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Error fetching blog categories:", err);
      }
    };

    fetchCategories();

    // If in edit mode, fetch blog post data
    if (isEditMode) {
      const fetchBlogData = async () => {
        try {
          setLoading(true);
          const blogData = await adminService.getBlogById(id);

          // Format published_at if it exists
          if (blogData.published_at) {
            blogData.published_at = new Date(blogData.published_at)
              .toISOString()
              .split("T")[0];
          }

          // Convert tags array to comma-separated string if needed
          if (Array.isArray(blogData.tags)) {
            blogData.tags = blogData.tags.join(", ");
          }

          setFormData(blogData);
        } catch (err) {
          console.error("Error fetching blog post data:", err);
          setError("Failed to load blog post data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchBlogData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = "Title is required";
    if (!formData.content.trim()) errors.content = "Content is required";
    if (!formData.category) errors.category = "Category is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      // Prepare data - convert tags from comma-separated string to array
      const postData = {
        ...formData,
        tags: formData.tags
          ? formData.tags.split(",").map((tag) => tag.trim())
          : [],
      };

      if (isEditMode) {
        await adminService.updateBlog(id, postData);
        alert("Blog post updated successfully");
      } else {
        await adminService.createBlog(postData);
        alert("Blog post created successfully");
      }

      navigate("/admin/blogs");
    } catch (err) {
      console.error("Error saving blog post:", err);
      setError(
        `Failed to ${isEditMode ? "update" : "create"} blog post. ${
          err.message || "Please try again."
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin/blogs")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog Posts
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>
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

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main Content (2/3 width) */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter blog post title"
                />
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="excerpt"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Excerpt
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Brief summary of the post (optional)"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.content ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Write your blog post content here..."
                ></textarea>
                {formErrors.content && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.content}
                  </p>
                )}
              </div>
            </div>

            {/* Sidebar (1/3 width) */}
            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-4">
                  Post Settings
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="status"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Category *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiTag className="text-gray-400" />
                    </div>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        formErrors.category
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option
                          key={category._id || category.id}
                          value={category.name}
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {formErrors.category && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.category}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="tags"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Tags
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter tags separated by commas"
                  />
                  <p className="text-gray-500 text-xs mt-1">
                    Separate tags with commas (e.g., travel, tips, advice)
                  </p>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="published_at"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Publication Date
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="published_at"
                      name="published_at"
                      value={formData.published_at}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Leave blank to use current date when published
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-4">
                  Featured Image
                </h3>

                <div className="mb-4">
                  <label
                    htmlFor="featured_image"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Image URL
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiImage className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="featured_image"
                      name="featured_image"
                      value={formData.featured_image}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter image URL"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Or Upload Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          try {
                            setSubmitting(true);
                            const result = await adminService.uploadImage(
                              e.target.files[0]
                            );
                            if (result && result.url) {
                              setFormData((prev) => ({
                                ...prev,
                                featured_image: result.url,
                              }));
                            }
                          } catch (err) {
                            console.error("Error uploading image:", err);
                            setError(
                              "Failed to upload image. Please try again."
                            );
                          } finally {
                            setSubmitting(false);
                          }
                        }
                      }}
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      {submitting ? "Uploading..." : "Choose File"}
                    </label>
                    <span className="ml-2 text-sm text-gray-500">
                      {formData.featured_image
                        ? "Image selected"
                        : "No file chosen"}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Supported formats: JPG, PNG, GIF (max 5MB)
                  </p>
                </div>

                {formData.featured_image && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Preview:
                    </p>
                    <img
                      src={formData.featured_image || "/placeholder.svg"}
                      alt="Featured image preview"
                      className="w-full h-40 object-cover rounded-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.svg?height=160&width=320";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => navigate("/admin/blogs")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FiSave className="mr-2" />
              {submitting ? "Saving..." : "Save Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
