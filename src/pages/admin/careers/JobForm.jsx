"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiSave,
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiCalendar,
  FiImage,
  FiUpload,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const JobForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    category: "",
    description: "",
    requirements: "",
    responsibilities: "",
    employment_type: "full_time",
    experience_level: "entry",
    salary_min: "",
    salary_max: "",
    salary_currency: "USD",
    salary_period: "year",
    location: {
      city: "",
      country: "",
      remote: false,
    },
    application_deadline: "",
    is_published: false,
    is_featured: false,
    company_logo: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [uploadingLogo, setUploadingLogo] = useState(false);

  useEffect(() => {
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const data = await adminService.getJobCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Error fetching job categories:", err);
      }
    };

    fetchCategories();

    // If in edit mode, fetch job data
    if (isEditMode) {
      const fetchJobData = async () => {
        try {
          setLoading(true);
          const jobData = await adminService.getJobById(id);

          // Format application_deadline if it exists
          if (jobData.application_deadline) {
            jobData.application_deadline = new Date(
              jobData.application_deadline
            )
              .toISOString()
              .split("T")[0];
          }

          setFormData(jobData);
        } catch (err) {
          console.error("Error fetching job data:", err);
          setError("Failed to load job data. Please try again later.");
        } finally {
          setLoading(false);
        }
      };

      fetchJobData();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      // Handle nested objects (e.g., location.city)
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === "checkbox" ? checked : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    // Clear validation error when field is changed
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingLogo(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await adminService.uploadImage(formData);

      setFormData((prev) => ({
        ...prev,
        company_logo: response.url,
      }));
    } catch (error) {
      console.error("Error uploading logo:", error);
      setError("Failed to upload company logo. Please try again.");
    } finally {
      setUploadingLogo(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = "Job title is required";
    if (!formData.company.trim()) errors.company = "Company name is required";
    if (!formData.category) errors.category = "Category is required";
    if (!formData.description.trim())
      errors.description = "Description is required";

    // Validate salary if provided
    if (
      formData.salary_min &&
      formData.salary_max &&
      Number(formData.salary_min) > Number(formData.salary_max)
    ) {
      errors.salary_min =
        "Minimum salary cannot be greater than maximum salary";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);
      setError(null);

      if (isEditMode) {
        await adminService.updateJob(id, formData);
        alert("Job updated successfully");
      } else {
        await adminService.createJob(formData);
        alert("Job created successfully");
      }

      navigate("/admin/careers/jobs");
    } catch (err) {
      console.error("Error saving job:", err);
      setError(
        `Failed to ${isEditMode ? "update" : "create"} job. ${
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
          onClick={() => navigate("/admin/careers/jobs")}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Back to Jobs List
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {isEditMode ? "Edit Job" : "Create New Job"}
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
          {/* Company Logo Upload Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Company Logo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="company_logo"
                >
                  <div className="flex items-center">
                    <FiImage className="mr-1" />
                    Logo URL
                  </div>
                </label>
                <input
                  id="company_logo"
                  name="company_logo"
                  type="text"
                  value={formData.company_logo}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter logo URL or upload below"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload Logo
                </label>
                <div className="flex items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center"
                    disabled={uploadingLogo}
                  >
                    <FiUpload className="mr-2" />
                    {uploadingLogo ? "Uploading..." : "Choose Logo"}
                  </button>
                </div>
              </div>
            </div>

            {formData.company_logo && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Logo Preview:
                </p>
                <img
                  src={formData.company_logo || "/placeholder.svg"}
                  alt="Company logo"
                  className="max-w-xs h-24 object-contain rounded-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.svg?height=96&width=192";
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Basic Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Information
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Job Title *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiBriefcase className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      formErrors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                {formErrors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.title}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="company"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Company Name *
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.company ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. Acme Corporation"
                />
                {formErrors.company && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.company}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="category"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    formErrors.category ? "border-red-500" : "border-gray-300"
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
                {formErrors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.category}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="employment_type"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Employment Type
                </label>
                <select
                  id="employment_type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="full_time">Full-time</option>
                  <option value="part_time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="temporary">Temporary</option>
                  <option value="internship">Internship</option>
                  <option value="volunteer">Volunteer</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="experience_level"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Experience Level
                </label>
                <select
                  id="experience_level"
                  name="experience_level"
                  value={formData.experience_level}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="executive">Executive Level</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="application_deadline"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Application Deadline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="application_deadline"
                    name="application_deadline"
                    value={formData.application_deadline}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Location and Salary */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Location and Salary
              </h2>

              <div className="mb-4">
                <label
                  htmlFor="location.city"
                  className="block text-gray-700 font-medium mb-2"
                >
                  City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="location.city"
                    name="location.city"
                    value={formData.location.city}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. New York"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="location.country"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="location.country"
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. United States"
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="location.remote"
                    name="location.remote"
                    checked={formData.location.remote}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="location.remote"
                    className="ml-2 block text-gray-700"
                  >
                    Remote Work Available
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="salary_min"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Minimum Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="salary_min"
                      name="salary_min"
                      value={formData.salary_min}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                        formErrors.salary_min
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="e.g. 50000"
                    />
                  </div>
                  {formErrors.salary_min && (
                    <p className="text-red-500 text-sm mt-1">
                      {formErrors.salary_min}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="salary_max"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Maximum Salary
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiDollarSign className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="salary_max"
                      name="salary_max"
                      value={formData.salary_max}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="e.g. 80000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="salary_currency"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Currency
                  </label>
                  <select
                    id="salary_currency"
                    name="salary_currency"
                    value={formData.salary_currency}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="CAD">CAD</option>
                    <option value="AUD">AUD</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="salary_period"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Period
                  </label>
                  <select
                    id="salary_period"
                    name="salary_period"
                    value={formData.salary_period}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="year">Per Year</option>
                    <option value="month">Per Month</option>
                    <option value="week">Per Week</option>
                    <option value="hour">Per Hour</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="is_published"
                    className="ml-2 block text-gray-700"
                  >
                    Publish Job (visible to applicants)
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="is_featured"
                    className="ml-2 block text-gray-700"
                  >
                    Feature this Job (highlighted in listings)
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Job Details
            </h2>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-medium mb-2"
              >
                Job Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  formErrors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Provide a detailed description of the job..."
              ></textarea>
              {formErrors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="responsibilities"
                className="block text-gray-700 font-medium mb-2"
              >
                Responsibilities
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="List the key responsibilities for this role..."
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="requirements"
                className="block text-gray-700 font-medium mb-2"
              >
                Requirements
              </label>
              <textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="List the requirements and qualifications needed..."
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("/admin/careers/jobs")}
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
              {submitting ? "Saving..." : "Save Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
