"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiUsers,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [publishedFilter, setPublishedFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, [currentPage, categoryFilter, publishedFilter]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        category: categoryFilter || undefined,
        search: searchTerm || undefined,
        is_published: publishedFilter || undefined,
      };
      const data = await adminService.getJobs(params);
      setJobs(data.jobs || []);
      setTotalJobs(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await adminService.getJobCategories();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Set empty categories array to prevent further errors
      setCategories([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchJobs();
  };

  const handleDelete = async (jobId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this job? This action cannot be undone."
      )
    ) {
      try {
        await adminService.deleteJob(jobId);
        setJobs(jobs.filter((job) => job._id !== jobId));
        alert("Job deleted successfully");
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete job. Please try again.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
        <button
          onClick={() => navigate("/admin/careers/jobs/new")}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <FiPlus className="mr-2" />
          Add New Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs, companies, locations..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
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
          </div>
          <div className="w-full md:w-48">
            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                value={publishedFilter}
                onChange={(e) => setPublishedFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Search
          </button>
        </form>
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

      {/* Jobs table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : jobs.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <tr key={job._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {job.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatDate(job.created_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job.company}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {job.location?.city}, {job.location?.country}
                          {job.location?.remote && (
                            <span className="ml-1 text-green-600">
                              (Remote)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            job.is_published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {job.is_published ? "Published" : "Draft"}
                        </span>
                        {job.is_featured && (
                          <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiUsers className="mr-1 h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-900">
                            {job.applications_count || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => navigate(`/careers/jobs/${job._id}`)}
                          className="text-green-600 hover:text-green-900 mr-3"
                          title="View Job"
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/careers/jobs/${job._id}/edit`)
                          }
                          className="text-blue-600 hover:text-blue-900 mr-3"
                          title="Edit Job"
                        >
                          <FiEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="text-red-600 hover:text-red-900 mr-3"
                          title="Delete Job"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/admin/careers/applications?job_id=${job._id}`
                            )
                          }
                          className="text-purple-600 hover:text-purple-900"
                          title="View Applications"
                        >
                          <FiUsers className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page{" "}
                    <span className="font-medium">{currentPage}</span> of{" "}
                    <span className="font-medium">{totalPages}</span> pages ({" "}
                    <span className="font-medium">{totalJobs}</span> total jobs)
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>
                    {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
                      const pageNumber =
                        currentPage > 3 ? currentPage - 3 + i + 1 : i + 1;
                      if (pageNumber <= totalPages) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNumber
                                ? "z-10 bg-green-50 border-green-500 text-green-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      }
                      return null;
                    })}
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === totalPages
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <FiSearch className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No jobs found</p>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => navigate("/admin/careers/jobs/new")}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <FiPlus className="mr-2" />
              Add New Job
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
