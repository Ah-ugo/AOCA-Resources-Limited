"use client";

import { useState, useEffect } from "react";
import { FiEdit, FiTrash2, FiPlus, FiTag } from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await adminService.getBlogCategories();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setSubmitting(true);

      if (editingId) {
        // Update existing category
        // await adminService.updateBlogCategory(editingId, formData)
        alert("Category updated successfully");
      } else {
        // Create new category
        // await adminService.createBlogCategory(formData)
        alert("Category created successfully");
      }

      // Reset form and refresh categories
      resetForm();
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
      alert(
        `Failed to ${
          editingId ? "update" : "create"
        } category. Please try again.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
    });
    setEditingId(category._id);
    setShowForm(true);
  };

  const handleDelete = async (categoryId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category? This action cannot be undone."
      )
    ) {
      try {
        // await adminService.deleteBlogCategory(categoryId)
        setCategories(categories.filter((cat) => cat._id !== categoryId));
        alert("Category deleted successfully");
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Failed to delete category. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Blog Categories</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Category
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Category Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingId ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiTag className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. Travel, Technology, Health"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Brief description of the category (optional)"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Category"
                    : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : categories.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posts Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr
                    key={category._id || category.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <FiTag className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {category.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {category.description || "No description"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.posts_count || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.created_at
                        ? formatDate(category.created_at)
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                        title="Edit Category"
                      >
                        <FiEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(category._id || category.id)
                        }
                        className="text-red-600 hover:text-red-900"
                        title="Delete Category"
                      >
                        <FiTrash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <FiTag className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No categories found</p>
              <p className="text-gray-400">
                Click the "Add New Category" button to create one
              </p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CategoriesList;
