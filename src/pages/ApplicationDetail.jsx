import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getApplicationDetails,
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
  ArrowLeft,
  Building2,
  Mail,
  Phone,
  Linkedin,
  Globe,
  User,
  MessageSquare,
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
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="animate-spin text-primary text-4xl" />
            <span className="ml-2 font-body-lg text-on-surface">
              Loading application details...
            </span>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (error || !application) {
    return (
      <PageLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-md mx-auto">
            <AlertCircle className="text-red-500 text-5xl mx-auto mb-4" />
            <h2 className="font-headline-lg text-on-surface font-bold mb-4">Application Not Found</h2>
            <p className="font-body-md text-on-surface-variant mb-8">
              {error || "The application you are looking for does not exist."}
            </p>
            <Link
              to="/applications"
              className="inline-flex items-center px-6 py-3 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-all"
            >
              Back to Applications
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Application Details" subtitle="View and manage your job application">
      <div className="bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link
            to="/applications"
            className="inline-flex items-center text-primary hover:text-primary-container mb-6"
          >
            <ArrowLeft className="mr-2" />
            Back to Applications
          </Link>

          {/* Application Header */}
          <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="font-headline-lg text-on-surface font-bold mb-2">
                  {application.job?.title || "Job Application"}
                </h1>
                <p className="font-headline-md text-primary">
                  {application.job?.company || "Company"}
                </p>
              </div>

              <div className="flex flex-col items-end">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-label-caps font-medium ${
                    statusColors[application.status] ||
                    "bg-surface text-on-surface"
                  }`}
                >
                  {statusIcons[application.status] || (
                    <Hourglass className="mr-2" />
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
                      <Loader2 className="animate-spin mr-1" />
                    ) : (
                      <Trash2 className="mr-1" />
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
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6">
                <h2 className="font-headline-md text-on-surface font-bold mb-6">
                  Application Timeline
                </h2>

                <div className="relative">
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-outline-variant/30"></div>

                  <div className="relative z-10 mb-8">
                    <div className="flex items-center">
                      <div
                        className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          application.status === "applied" ||
                          application.status === "reviewing" ||
                          application.status === "interview" ||
                          application.status === "accepted"
                            ? "bg-primary/10"
                            : "bg-surface"
                        }`}
                      >
                        <FileText
                          className={
                            application.status === "applied" ||
                            application.status === "reviewing" ||
                            application.status === "interview" ||
                            application.status === "accepted"
                              ? "text-primary"
                              : "text-on-surface-variant"
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-headline-sm text-on-surface font-bold">
                          Application Submitted
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                          {formatDate(application.created_at)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="font-body-md text-on-surface-variant">
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
                            ? "bg-primary/10"
                            : "bg-surface"
                        }`}
                      >
                        <FileText
                          className={
                            application.status === "reviewing" ||
                            application.status === "interview" ||
                            application.status === "accepted"
                              ? "text-primary"
                              : "text-on-surface-variant"
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-headline-sm text-on-surface font-bold">
                          Under Review
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                          {application.status === "reviewing" ||
                          application.status === "interview" ||
                          application.status === "accepted"
                            ? formatDate(application.updated_at)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="font-body-md text-on-surface-variant">
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
                            ? "bg-primary/10"
                            : "bg-surface"
                        }`}
                      >
                        <Calendar
                          className={
                            application.status === "interview" ||
                            application.status === "accepted"
                              ? "text-primary"
                              : "text-on-surface-variant"
                          }
                        />
                      </div>
                      <div className="ml-4">
                        <h3 className="font-headline-sm text-on-surface font-bold">
                          Interview
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                          {application.status === "interview" ||
                          application.status === "accepted"
                            ? formatDate(application.updated_at)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="font-body-md text-on-surface-variant">
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
                            : "bg-surface"
                        }`}
                      >
                        {application.status === "accepted" ? (
                          <CheckCircle2 className="text-green-600" />
                        ) : application.status === "rejected" ? (
                          <XCircle className="text-red-600" />
                        ) : (
                          <CheckCircle2 className="text-on-surface-variant" />
                        )}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-headline-sm text-on-surface font-bold">
                          Decision
                        </h3>
                        <p className="text-sm text-on-surface-variant">
                          {application.status === "accepted" ||
                          application.status === "rejected"
                            ? formatDate(application.updated_at)
                            : "Pending"}
                        </p>
                      </div>
                    </div>
                    <div className="ml-10 mt-2">
                      <p className="font-body-md text-on-surface-variant">
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
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6">
                <h2 className="font-headline-md text-on-surface font-bold mb-6">
                  Application Details
                </h2>

                <div className="space-y-6">
                  {application.cover_letter && (
                    <div>
                      <h3 className="font-headline-sm text-on-surface font-bold mb-2">
                        Cover Letter
                      </h3>
                      <div className="bg-surface p-4 rounded-lg border border-outline-variant/30">
                        <p className="font-body-md text-on-surface-variant">{application.cover_letter}</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-headline-sm text-on-surface font-bold mb-2">
                        Resume
                      </h3>
                      {application.resume_url ? (
                        <a
                          href={application.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center bg-primary/5 text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition duration-300"
                        >
                          <FileText className="mr-2" />
                          View Resume
                        </a>
                      ) : (
                        <p className="text-on-surface-variant">No resume attached</p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-headline-sm text-on-surface font-bold mb-2">
                        Contact Information
                      </h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="text-primary" />
                          <span className="font-body-md text-on-surface-variant">
                            {application.phone || "Not provided"}
                          </span>
                        </div>

                        {application.linkedin_url && (
                          <div className="flex items-center gap-2">
                            <Linkedin className="text-primary" />
                            <a
                              href={application.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-container"
                            >
                              LinkedIn Profile
                            </a>
                          </div>
                        )}

                        {application.portfolio_url && (
                          <div className="flex items-center gap-2">
                            <Globe className="text-primary" />
                            <a
                              href={application.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary-container"
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
                      <h3 className="font-headline-sm text-on-surface font-bold mb-2">
                        Additional Information
                      </h3>
                      <div className="bg-surface p-4 rounded-lg border border-outline-variant/30">
                        <p className="font-body-md text-on-surface-variant">{application.additional_info}</p>
                      </div>
                    </div>
                  )}

                  {application.referral && (
                    <div>
                      <h3 className="font-headline-sm text-on-surface font-bold mb-2">
                        Referral
                      </h3>
                      <p className="font-body-md text-on-surface-variant">{application.referral}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback Section */}
              {application.feedback && (
                <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6">
                  <h2 className="font-headline-md text-on-surface font-bold mb-4">
                    Feedback
                  </h2>
                  <div className="bg-surface p-4 rounded-lg border border-outline-variant/30">
                    <div className="flex items-start gap-3">
                      <MessageSquare className="text-primary mt-1" />
                      <div>
                        <p className="font-body-md text-on-surface-variant">{application.feedback}</p>
                        {application.feedback_date && (
                          <p className="text-sm text-on-surface-variant mt-2">
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
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6">
                <h3 className="font-headline-sm text-on-surface font-bold mb-4">
                  Job Details
                </h3>

                {application.job && (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Briefcase className="text-primary mt-1" />
                      <div>
                        <p className="text-sm text-on-surface-variant">Job Type</p>
                        <p className="font-body-md text-on-surface">
                          {application.job.employment_type}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary mt-1" />
                      <div>
                        <p className="text-sm text-on-surface-variant">Location</p>
                        <p className="font-body-md text-on-surface">
                          {application.job.location.city},{" "}
                          {application.job.location.country}
                          {application.job.location.remote && " (Remote)"}
                        </p>
                      </div>
                    </div>

                    {application.job.experience_level && (
                      <div className="flex items-start gap-3">
                        <User className="text-primary mt-1" />
                        <div>
                          <p className="text-sm text-on-surface-variant">Experience Level</p>
                          <p className="font-body-md text-on-surface">
                            {application.job.experience_level}
                          </p>
                        </div>
                      </div>
                    )}

                    <Link
                      to={`/careers/${application.job._id}`}
                      className="block text-center bg-surface-container-lowest border border-primary text-primary hover:bg-primary/5 font-medium py-2 px-4 rounded-lg transition duration-300 mt-4"
                    >
                      View Job Posting
                    </Link>
                  </div>
                )}
              </div>

              {/* Company Info */}
              {application.job && (
                <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6">
                  <h3 className="font-headline-sm text-on-surface font-bold mb-4">
                    About {application.job.company}
                  </h3>
                  <p className="font-body-md text-on-surface-variant mb-4">
                    {application.job.company_description ||
                      `${application.job.company} is a leading organization in the ${application.job.category} industry.`}
                  </p>
                  {application.job.company_website && (
                    <a
                      href={application.job.company_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center bg-surface-container-lowest border border-primary text-primary hover:bg-primary/5 font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                      Visit Company Website
                    </a>
                  )}
                </div>
              )}

              {/* Need Help? */}
              <div className="bg-surface-container-lowest rounded-lg shadow-sm border border-outline-variant/30 p-6">
                <h3 className="font-headline-sm text-on-surface font-bold mb-4">
                  Need Help?
                </h3>
                <p className="font-body-md text-on-surface-variant mb-4">
                  If you have any questions about your application or need to
                  update your information, please contact our recruitment team.
                </p>
                <a
                  href="mailto:careers@example.com"
                  className="inline-flex items-center text-primary hover:text-primary-container"
                >
                  <Mail className="mr-2" />
                  careers@example.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ApplicationDetail;
