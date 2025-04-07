import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getApplicationDetails,
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
  FaArrowLeft,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGlobe,
  FaUser,
  FaComments,
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

const ApplicationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  const fetchApplicationDetails = async () => {
    setLoading(true);
    try {
      const data = await getApplicationDetails(id);
      setApplication(data);
    } catch (err) {
      console.error("Error fetching application details:", err);
      setError("Failed to load application details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      setIsWithdrawing(true);

      try {
        await withdrawApplication(id);
        alert("Application withdrawn successfully");
        navigate("/applications");
      } catch (err) {
        console.error("Error withdrawing application:", err);
        alert("Failed to withdraw application. Please try again.");
      } finally {
        setIsWithdrawing(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <FaSpinner className="animate-spin text-green-600 text-4xl" />
            <span className="ml-2 text-xl font-medium text-gray-700">
              Loading application details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <FaExclamationCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Application Not Found</h2>
          <p className="text-gray-600 mb-8">
            {error || "The application you are looking for does not exist."}
          </p>
          <Link
            to="/applications"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Back to Applications
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            to="/applications"
            className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Applications
          </Link>

          {/* Application Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  {application.job?.title || "Job Application"}
                </h1>
                <p className="text-xl font-medium text-green-600">
                  {application.job?.company || "Company"}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    statusColors[application.status] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {statusIcons[application.status] || (
                    <FaHourglassHalf className="mr-2" />
                  )}
                  <span className="ml-1 capitalize">{application.status}</span>
                </span>

                {application.status === "applied" && (
                  <button
                    onClick={handleWithdraw}
                    disabled={isWithdrawing}
                    className="mt-3 inline-flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    {isWithdrawing ? (
                      <FaSpinner className="animate-spin mr-1" />
                    ) : (
                      <FaTrashAlt className="mr-1" />
                    )}
                    Withdraw Application
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Application Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Application Timeline */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Application Timeline
                </h2>

                <div className="relative">
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>

                  <div className="relative z-10 mb-8">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          application.status === "applied" ||
                          application.status === "reviewing" ||
                          application.status === "interview" ||
                          application.status === "accepted"
                            ? "bg-green-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <FaFileAlt
                          className={
                            application.status === "applied" ||
                            application.status === "reviewing" ||
                            application.status === "interview" ||
                            application.status === "accepted"
                              ? "text-green-600"
                              : "text-gray-400"
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Application Submitted
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(application.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="text-gray-600">
                        Your application has been submitted successfully.
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mb-8">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          application.status === "reviewing" ||
                          application.status === "interview" ||
                          application.status === "accepted"
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <FaFileAlt
                          className={
                            application.status === "reviewing" ||
                            application.status === "interview" ||
                            application.status === "accepted"
                              ? "text-blue-600"
                              : "text-gray-400"
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Under Review
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.status === "reviewing" ||
                          application.status === "interview" ||
                          application.status === "accepted"
                            ? formatDate(application.updated_at)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="text-gray-600">
                        {application.status === "reviewing" ||
                        application.status === "interview" ||
                        application.status === "accepted"
                          ? "Your application is being reviewed by the hiring team."
                          : "Waiting for the hiring team to review your application."}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 mb-8">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          application.status === "interview" ||
                          application.status === "accepted"
                            ? "bg-purple-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <FaCalendarAlt
                          className={
                            application.status === "interview" ||
                            application.status === "accepted"
                              ? "text-purple-600"
                              : "text-gray-400"
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Interview
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.status === "interview" ||
                          application.status === "accepted"
                            ? formatDate(application.updated_at)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="text-gray-600">
                        {application.status === "interview"
                          ? "You have been selected for an interview. Check your email for details."
                          : application.status === "accepted"
                          ? "You completed the interview process."
                          : "Waiting for interview selection."}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          application.status === "accepted"
                            ? "bg-green-100"
                            : application.status === "rejected"
                            ? "bg-red-100"
                            : "bg-gray-100"
                        }`}
                      >
                        {application.status === "accepted" ? (
                          <FaCheckCircle className="text-green-600" />
                        ) : application.status === "rejected" ? (
                          <FaTimesCircle className="text-red-600" />
                        ) : (
                          <FaCheckCircle className="text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">
                          Decision
                        </h3>
                        <p className="text-sm text-gray-500">
                          {application.status === "accepted" ||
                          application.status === "rejected"
                            ? formatDate(application.updated_at)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="text-gray-600">
                        {application.status === "accepted"
                          ? "Congratulations! Your application has been accepted."
                          : application.status === "rejected"
                          ? "Unfortunately, your application was not selected for this position."
                          : "Waiting for final decision."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Application Details
                </h2>

                <div className="space-y-6">
                  {application.cover_letter && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Cover Letter
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md text-gray-700">
                        <p>{application.cover_letter}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Resume
                      </h3>
                      {application.resume_url ? (
                        <a
                          href={application.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded-md transition duration-300"
                        >
                          <FaFileAlt className="mr-2" />
                          View Resume
                        </a>
                      ) : (
                        <p className="text-gray-500">No resume attached</p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <FaPhone className="text-gray-500 mr-2" />
                          <span className="text-gray-700">
                            {application.phone || "Not provided"}
                          </span>
                        </div>

                        {application.linkedin_url && (
                          <div className="flex items-center">
                            <FaLinkedin className="text-gray-500 mr-2" />
                            <a
                              href={application.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}

                        {application.portfolio_url && (
                          <div className="flex items-center">
                            <FaGlobe className="text-gray-500 mr-2" />
                            <a
                              href={application.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800"
                            >
                              Portfolio Website
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {application.additional_info && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Additional Information
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md text-gray-700">
                        <p>{application.additional_info}</p>
                      </div>
                    </div>
                  )}

                  {application.referral && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 mb-2">
                        Referral
                      </h3>
                      <p className="text-gray-700">{application.referral}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Section (if any) */}
              {application.feedback && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Feedback
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-start">
                      <FaComments className="text-green-600 mt-1 mr-3" />
                      <div>
                        <p className="text-gray-700">{application.feedback}</p>
                        {application.feedback_date && (
                          <p className="text-sm text-gray-500 mt-2">
                            Received on {formatDate(application.feedback_date)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Job Details
                </h3>

                {application.job && (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FaBriefcase className="text-green-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Job Type
                        </p>
                        <p className="text-gray-600">
                          {application.job.employment_type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-green-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Location
                        </p>
                        <p className="text-gray-600">
                          {application.job.location.city},{" "}
                          {application.job.location.country}
                          {application.job.location.remote && " (Remote)"}
                        </p>
                      </div>
                    </div>

                    {application.job.experience_level && (
                      <div className="flex items-start">
                        <FaUser className="text-green-500 mt-1 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Experience Level
                          </p>
                          <p className="text-gray-600">
                            {application.job.experience_level}
                          </p>
                        </div>
                      </div>
                    )}

                    <Link
                      to={`/careers/${application.job._id}`}
                      className="block text-center bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-md transition duration-300 mt-4"
                    >
                      View Job Posting
                    </Link>
                  </div>
                )}
              </div>

              {/* Company Info */}
              {application.job && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    About {application.job.company}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {application.job.company_description ||
                      `${application.job.company} is a leading organization in the ${application.job.category} industry.`}
                  </p>
                  {application.job.company_website && (
                    <a
                      href={application.job.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-md transition duration-300"
                    >
                      Visit Company Website
                    </a>
                  )}
                </div>
              )}

              {/* Need Help? */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Need Help?
                </h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about your application or need to
                  update your information, please contact our recruitment team.
                </p>
                <a
                  href="mailto:careers@example.com"
                  className="inline-flex items-center text-green-600 hover:text-green-800"
                >
                  <FaEnvelope className="mr-2" />
                  careers@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetail;
