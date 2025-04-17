import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Download,
  ChevronLeft,
  Calendar,
  Link as LinkIcon,
  Phone,
  Mail,
  Save,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getApplicationById,
  updateApplication,
} from "../../../services/admin-service";
import { formatDate } from "../../../utils/formatters";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    status: "applied",
    admin_notes: "",
    interview_date: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const data = await getApplicationById(id);
        setApplication(data);
        setFormData({
          status: data.status,
          admin_notes: data.admin_notes || "",
          interview_date: data.interview_date || "",
        });
      } catch (err) {
        setError(err.message || "Failed to fetch application");
        toast.error("Failed to fetch application details");
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      await updateApplication(id, formData);
      const updatedData = await getApplicationById(id);
      setApplication(updatedData);
      setIsEditing(false);
      toast.success("Application updated successfully");
    } catch (err) {
      toast.error("Failed to update application");
      console.error("Error updating application:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadResume = () => {
    window.open(application.resume_url, "_blank");
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800";
      case "reviewing":
        return "bg-yellow-100 text-yellow-800";
      case "interview":
        return "bg-purple-100 text-purple-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading && !application) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-500">{error}</p>
          <Link
            to="/admin/careers/applications"
            className="text-primary mt-4 inline-block hover:underline"
          >
            Back to applications
          </Link>
        </div>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-primary hover:text-primary-dark hover:underline"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Applications
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {application.job.title}
                </h1>
                <p className="text-gray-600">{application.job.company}</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={downloadResume}
                  className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Resume
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Application Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Application ID</p>
                      <p className="text-gray-800 font-mono text-sm">
                        {application._id}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Applied On</p>
                      <p className="text-gray-800">
                        {formatDate(application.created_at)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      {isEditing ? (
                        <select
                          name="status"
                          value={formData.status}
                          onChange={handleInputChange}
                          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md ${
                            formData.status === "applied"
                              ? "bg-blue-100 text-blue-800"
                              : formData.status === "reviewing"
                              ? "bg-yellow-100 text-yellow-800"
                              : formData.status === "interview"
                              ? "bg-purple-100 text-purple-800"
                              : formData.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : formData.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <option value="applied">Applied</option>
                          <option value="reviewing">Reviewing</option>
                          <option value="interview">Interview</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      ) : (
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                            application.status
                          )}`}
                        >
                          {application.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    Candidate Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden bg-gray-200">
                        {application.user?.image ? (
                          <img
                            src={application.user.image}
                            alt={application.user.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-gray-500">
                            <Mail className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          {application.user?.name || "Not available"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {application.user?.email || "Not available"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-gray-800 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        {application.phone || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <p className="text-gray-800">
                        {application.linkedin_url ? (
                          <a
                            href={application.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center"
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            View Profile
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Portfolio</p>
                      <p className="text-gray-800">
                        {application.portfolio_url ? (
                          <a
                            href={application.portfolio_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center"
                          >
                            <LinkIcon className="h-4 w-4 mr-2" />
                            View Portfolio
                          </a>
                        ) : (
                          "Not provided"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Cover Letter
                </h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="whitespace-pre-line text-gray-700">
                    {application.cover_letter}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Additional Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="whitespace-pre-line text-gray-700">
                    {application.additional_info ||
                      "No additional information provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80">
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Job Details
              </h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800">
                    {application.job.location.city},{" "}
                    {application.job.location.state}
                    {application.job.location.remote && " (Remote)"}
                    {application.job.location.hybrid && " (Hybrid)"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Employment Type</p>
                  <p className="text-gray-800 capitalize">
                    {application.job.employment_type.replace("-", " ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Salary Range</p>
                  <p className="text-gray-800">
                    {application.job.salary_currency}{" "}
                    {application.job.salary_min.toLocaleString()} -{" "}
                    {application.job.salary_max.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience Level</p>
                  <p className="text-gray-800 capitalize">
                    {application.job.experience_level}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Deadline</p>
                  <p className="text-gray-800">
                    {formatDate(application.job.application_deadline)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Admin Section
              </h2>
              {isEditing ? (
                <button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="flex items-center justify-center px-3 py-1 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
                >
                  {loading ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
                >
                  Edit
                </button>
              )}
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="interview_date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Interview Date
                  </label>
                  {isEditing ? (
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="datetime-local"
                        id="interview_date"
                        name="interview_date"
                        value={formData.interview_date}
                        onChange={handleInputChange}
                        className="focus:ring-primary focus:border-primary block w-full pl-3 pr-10 py-2 sm:text-sm border-gray-300 rounded-md"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-800">
                      {application.interview_date
                        ? formatDate(application.interview_date)
                        : "Not scheduled"}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="admin_notes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Notes
                  </label>
                  {isEditing ? (
                    <textarea
                      id="admin_notes"
                      name="admin_notes"
                      rows="4"
                      className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      value={formData.admin_notes}
                      onChange={handleInputChange}
                      placeholder="Add internal notes about this candidate..."
                    />
                  ) : (
                    <p className="whitespace-pre-line text-gray-800">
                      {application.admin_notes || "No notes added"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
