import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getUserApplications,
  withdrawApplication,
} from "../services/career-service";
import {
  Briefcase,
  MapPin,
  Calendar,
  Loader2,
  CheckCircle2,
  XCircle,
  Hourglass,
  FileText,
  Trash2,
  AlertCircle,
  Filter,
} from "lucide-react";
import PageLayout from "../components/PageLayout";

const statusIcons = {
  applied: <Hourglass className="text-yellow-600" />,
  reviewing: <FileText className="text-primary" />,
  interview: <Calendar className="text-purple-600" />,
  accepted: <CheckCircle2 className="text-green-600" />,
  rejected: <XCircle className="text-red-500" />,
};

const statusColors = {
  applied: "bg-yellow-100 text-yellow-800",
  reviewing: "bg-primary/10 text-primary",
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
    <PageLayout title="My Applications" subtitle="Track the status of your job applications">
      <div className="bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="font-headline-lg text-on-surface font-bold mb-2">
                My Applications
              </h1>
              <p className="font-body-md text-on-surface-variant">
                Track the status of your job applications
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex items-center bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-2">
                <Filter className="text-on-surface-variant ml-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full py-1 pl-2 pr-8 text-on-surface leading-tight focus:outline-none"
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
                  <AlertCircle className="text-red-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-primary text-4xl" />
              <span className="ml-2 font-body-lg text-on-surface">
                Loading applications...
              </span>
            </div>
          ) : applications.length > 0 ? (
            <div className="space-y-6">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden border border-outline-variant/30"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <Link
                          to={`/applications/${application._id}`}
                          className="block"
                        >
                          <h2 className="font-headline-md text-on-surface font-bold hover:text-primary transition-colors duration-300">
                            {application.job?.title || "Job Title"}
                          </h2>
                          <p className="text-primary font-medium">
                            {application.job?.company || "Company Name"}
                          </p>
                        </Link>

                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-on-surface-variant">
                          {application.job?.location && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>
                                {application.job.location.city},{" "}
                                {application.job.location.country}
                                {application.job.location.remote && " (Remote)"}
                              </span>
                            </div>
                          )}

                          {application.job?.employment_type && (
                            <div className="flex items-center gap-2">
                              <Briefcase className="h-4 w-4 text-primary" />
                              <span>{application.job.employment_type}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>
                              Applied on {formatDate(application.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-label-caps font-medium ${
                            statusColors[application.status] ||
                            "bg-surface text-on-surface"
                          }`}
                        >
                          {statusIcons[application.status] || (
                            <Hourglass className="mr-1" />
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
                              <Loader2 className="animate-spin mr-1" />
                            ) : (
                              <Trash2 className="mr-1" />
                            )}
                            Withdraw
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-outline-variant/30 flex justify-between items-center">
                      <div className="text-sm text-on-surface-variant">
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
                        className="inline-flex items-center text-primary hover:text-primary-container font-medium text-sm"
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
            <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-8 text-center">
              <div className="flex justify-center mb-4">
                <Briefcase className="text-on-surface-variant text-5xl" />
              </div>
              <h3 className="font-headline-md text-on-surface font-semibold mb-2">
                No applications found
              </h3>
              <p className="font-body-md text-on-surface-variant mb-6">
                You haven't applied to any jobs yet. Browse our job listings to
                find your next opportunity.
              </p>
              <Link
                to="/careers"
                className="inline-flex items-center px-6 py-3 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default MyApplications;
