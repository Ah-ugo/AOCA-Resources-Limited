import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getUserApplications,
  withdrawApplication,
} from "../services/career-service";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaFileAlt,
  FaTrashAlt,
  FaExclamationCircle,
  FaFilter,
} from "react-icons/fa";

const statusIcons = {
  applied: <FaHourglassHalf className="text-yellow-500" />,
  reviewing: <FaFileAlt className="text-blue-500" />,
  interview: <FaCalendarAlt className="text-purple-500" />,
  accepted: <FaCheckCircle className="text-green-500" />,
  rejected: <FaTimesCircle className="text-red-500" />,
};

const statusColors = {
  applied: "bg-yellow-100 text-yellow-800",
  reviewing: "bg-blue-100 text-blue-800",
  interview: "bg-purple-100 text-purple-800",
  accepted: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawId, setWithdrawId] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter) {
        params.status = statusFilter;
      }

      const data = await getUserApplications(params);
      setApplications(data.applications || []);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load your applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async (applicationId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setIsWithdrawing(true);
      setWithdrawId(applicationId);

      try {
        await withdrawApplication(applicationId);
        // Remove from list
        setApplications(
          applications.filter((app) => app._id !== applicationId)
        );
      } catch (err) {
        console.error("Error withdrawing application:", err);
        alert("Failed to withdraw application. Please try again.");
      } finally {
        setIsWithdrawing(false);
        setWithdrawId(null);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                My Applications
              </h1>
              <p className="text-gray-600">
                Track the status of your job applications
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex items-center bg-white rounded-lg shadow-sm border border-gray-200 p-2">
                <FaFilter className="text-gray-400 ml-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full py-1 pl-2 pr-8 text-gray-700 leading-tight focus:outline-none"
                >
                  <option value="">All Applications</option>
                  <option value="applied">Applied</option>
                  <option value="reviewing">Under Review</option>
                  <option value="interview">Interview</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FaExclamationCircle className="text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <FaSpinner className="animate-spin text-green-600 text-4xl" />
              <span className="ml-2 text-xl font-medium text-gray-700">
                Loading applications...
              </span>
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <Link
                          to={`/applications/${application._id}`}
                          className="block"
                        >
                          <h2 className="text-xl font-bold text-gray-900 hover:text-green-600 transition-colors duration-300">
                            {application.job?.title || "Job Title"}
                          </h2>
                          <p className="text-green-600 font-medium">
                            {application.job?.company || "Company Name"}
                          </p>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600 text-sm">
                          {application.job?.location && (
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="mr-1 text-gray-500" />
                              <span>
                                {application.job.location.city},{" "}
                                {application.job.location.country}
                                {application.job.location.remote && " (Remote)"}
                              </span>
                            </div>
                          )}

                          {application.job?.employment_type && (
                            <div className="flex items-center">
                              <FaBriefcase className="mr-1 text-gray-500" />
                              <span>{application.job.employment_type}</span>
                            </div>
                          )}

                          <div className="flex items-center">
                            <FaCalendarAlt className="mr-1 text-gray-500" />
                            <span>
                              Applied on {formatDate(application.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            statusColors[application.status] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {statusIcons[application.status] || (
                            <FaHourglassHalf className="mr-1" />
                          )}
                          <span className="ml-1 capitalize">
                            {application.status}
                          </span>
                        </span>

                        {application.status === "applied" && (
                          <button
                            onClick={() => handleWithdraw(application._id)}
                            disabled={
                              isWithdrawing && withdrawId === application._id
                            }
                            className="mt-3 inline-flex items-center text-sm text-red-600 hover:text-red-800"
                          >
                            {isWithdrawing && withdrawId === application._id ? (
                              <FaSpinner className="animate-spin mr-1" />
                            ) : (
                              <FaTrashAlt className="mr-1" />
                            )}
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {application.status === "applied" &&
                          "Your application is being processed."}
                        {application.status === "reviewing" &&
                          "Your application is under review."}
                        {application.status === "interview" &&
                          "You have been selected for an interview."}
                        {application.status === "accepted" &&
                          "Congratulations! Your application has been accepted."}
                        {application.status === "rejected" &&
                          "Unfortunately, your application was not selected."}
                      </div>

                      <Link
                        to={`/applications/${application._id}`}
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                      >
                        View Details
                        <svg
                          className="ml-1 w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <FaBriefcase className="text-gray-400 text-5xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No applications found
              </h3>
              <p className="text-gray-600 mb-6">
                You haven't applied to any jobs yet. Browse our job listings to
                find your next opportunity.
              </p>
              <Link
                to="/careers"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
