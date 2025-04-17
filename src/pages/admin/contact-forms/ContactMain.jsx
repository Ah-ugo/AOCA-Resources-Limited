"use client";

import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
import {
  Mail,
  Search,
  ChevronLeft,
  ChevronRight,
  Eye,
  Trash2,
  MailOpen,
  MailCheck,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { format } from "date-fns";
import apiClient from "../../../services/api-client";

export default function AdminContactSubmissions() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 20,
    total: 0,
    hasMore: false,
  });
  const [filters, setFilters] = useState({
    readStatus: null,
    sortBy: "created_at",
    sortOrder: -1,
  });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  //   const router = useRouter();
  const baseURL = "https://aoca-resources-backend.onrender.com";

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiClient.get("/admin/contact-submissions/list/", {
        params: {
          skip: pagination.skip,
          limit: pagination.limit,
          sort_by: filters.sortBy,
          sort_order: filters.sortOrder,
          ...(filters.readStatus !== null && {
            read_status: filters.readStatus,
          }),
        },
      });
      setSubmissions(response.data.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.pagination.total,
        hasMore: response.data.pagination.has_more,
      }));
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch submissions"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [pagination.skip, filters]);

  const handleViewSubmission = async (submissionId) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/contact-submissions/${submissionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch submission");
      }

      const data = await response.json();
      setSelectedSubmission(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkRead = async (submissionId) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/contact-submissions/${submissionId}/read`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark as read");
      }

      fetchSubmissions();
      if (selectedSubmission?._id === submissionId) {
        setSelectedSubmission((prev) => ({ ...prev, is_read: true }));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkUnread = async (submissionId) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/contact-submissions/${submissionId}/unread`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark as unread");
      }

      fetchSubmissions();
      if (selectedSubmission?._id === submissionId) {
        setSelectedSubmission((prev) => ({ ...prev, is_read: false }));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteSubmission = async (submissionId) => {
    try {
      const response = await fetch(
        `${baseURL}/admin/contact-submissions/${submissionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete submission");
      }

      fetchSubmissions();
      if (selectedSubmission?._id === submissionId) {
        setSelectedSubmission(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && pagination.skip > 0) {
      setPagination((prev) => ({
        ...prev,
        skip: Math.max(0, prev.skip - prev.limit),
      }));
    } else if (direction === "next" && pagination.hasMore) {
      setPagination((prev) => ({
        ...prev,
        skip: prev.skip + prev.limit,
      }));
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPagination((prev) => ({ ...prev, skip: 0 }));
  };

  const toggleSortOrder = () => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: prev.sortOrder === 1 ? -1 : 1,
    }));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Read Status
              </label>
              <select
                value={filters.readStatus ?? ""}
                onChange={(e) =>
                  handleFilterChange(
                    "readStatus",
                    e.target.value === "" ? null : e.target.value === "true"
                  )
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sort By</label>
              <div className="flex gap-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="created_at">Date</option>
                  <option value="first_name">First Name</option>
                  <option value="last_name">Last Name</option>
                </select>
                <button
                  onClick={toggleSortOrder}
                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  {filters.sortOrder === -1 ? (
                    <ChevronDown className="h-5 w-5" />
                  ) : (
                    <ChevronUp className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Items Per Page
              </label>
              <select
                value={pagination.limit}
                onChange={(e) =>
                  setPagination((prev) => ({
                    ...prev,
                    limit: Number(e.target.value),
                    skip: 0,
                  }))
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6 flex-1">
        {/* Submission List */}
        <div
          className={`${
            selectedSubmission ? "md:w-1/2" : "w-full"
          } bg-white rounded-lg shadow-md overflow-hidden`}
        >
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="mt-2">Loading submissions...</p>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="h-12 w-12 text-gray-400 mx-auto" />
              <p className="mt-2 text-gray-600">No submissions found</p>
            </div>
          ) : (
            <div className="divide-y">
              {submissions.map((submission) => (
                <div
                  key={submission._id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !submission.is_read ? "bg-blue-50" : ""
                  } ${
                    selectedSubmission?._id === submission._id
                      ? "bg-primary/10"
                      : ""
                  }`}
                  onClick={() => handleViewSubmission(submission._id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {submission.first_name} {submission.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {submission.email}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(
                          new Date(submission.created_at),
                          "MMM d, yyyy h:mm a"
                        )}
                      </p>
                    </div>
                    {!submission.is_read && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-2 line-clamp-2 text-gray-600">
                    {submission.message}
                  </p>
                </div>
              ))}
            </div>
          )}

          {submissions.length > 0 && (
            <div className="p-4 border-t flex justify-between items-center">
              <button
                onClick={() => handlePageChange("prev")}
                disabled={pagination.skip === 0}
                className={`flex items-center gap-1 px-3 py-1 rounded ${
                  pagination.skip === 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>
              <span className="text-sm text-gray-600">
                Showing {pagination.skip + 1}-
                {Math.min(pagination.skip + pagination.limit, pagination.total)}{" "}
                of {pagination.total}
              </span>
              <button
                onClick={() => handlePageChange("next")}
                disabled={!pagination.hasMore}
                className={`flex items-center gap-1 px-3 py-1 rounded ${
                  !pagination.hasMore
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-primary hover:bg-gray-100"
                }`}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submission Detail */}
        {selectedSubmission && (
          <div className="md:w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-bold">Submission Details</h2>
              <div className="flex gap-2">
                {selectedSubmission.is_read ? (
                  <button
                    onClick={() => handleMarkUnread(selectedSubmission._id)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md"
                    title="Mark as unread"
                  >
                    <MailCheck className="h-5 w-5" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkRead(selectedSubmission._id)}
                    className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-md"
                    title="Mark as read"
                  >
                    <MailOpen className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteSubmission(selectedSubmission._id)}
                  className="p-2 text-gray-600 hover:text-red-500 hover:bg-gray-100 rounded-md"
                  title="Delete submission"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    First Name
                  </h3>
                  <p className="mt-1">{selectedSubmission.first_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Last Name
                  </h3>
                  <p className="mt-1">{selectedSubmission.last_name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1">{selectedSubmission.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1">{selectedSubmission.phone}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Service Interested In
                  </h3>
                  <p className="mt-1 capitalize">
                    {selectedSubmission.service.replace("_", " ")}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Submitted On
                  </h3>
                  <p className="mt-1">
                    {format(
                      new Date(selectedSubmission.created_at),
                      "MMM d, yyyy h:mm a"
                    )}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    {selectedSubmission.is_read ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Unread
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Message</h3>
                <div className="mt-2 p-3 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-line">
                    {selectedSubmission.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
