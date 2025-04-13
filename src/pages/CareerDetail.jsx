"use client";

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getJobDetails,
  applyForJob,
  uploadResume,
} from "../services/career-service";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaGraduationCap,
  FaDollarSign,
  FaClock,
  FaUser,
  FaFileAlt,
  FaUpload,
  FaLinkedin,
  FaGlobe,
  FaArrowLeft,
  FaShareAlt,
  FaExclamationCircle,
  FaCheckCircle,
  FaEnvelope,
  FaPhone,
  FaSpinner,
} from "react-icons/fa";

const CareerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const [applicationData, setApplicationData] = useState({
    job_id: id,
    cover_letter: "",
    resume_url: "",
    phone: "",
    linkedin_url: "",
    portfolio_url: "",
    referral: "",
    additional_info: "",
  });

  // Mock user state - replace with your actual auth state
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchJobDetails();
    // Check if user is logged in - replace with your actual auth check
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      // Pre-fill phone if available
      setApplicationData((prev) => ({
        ...prev,
        phone: JSON.parse(loggedInUser).phone || "",
      }));
    }
  }, [id]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const data = await getJobDetails(id);
      setJob(data);
    } catch (err) {
      console.error("Error fetching job details:", err);
      setError(
        `Failed to load job details: ${
          err.message || "Unknown error"
        }. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleResumeChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create a complete application data object for submission
      let submissionData = { ...applicationData };

      // First upload resume if provided
      if (resumeFile) {
        const uploadResult = await uploadResume(resumeFile);
        // Important: Update the submission data directly, don't change state yet
        submissionData = {
          ...submissionData,
          resume_url: uploadResult.url,
        };
      } else if (!applicationData.resume_url) {
        throw new Error("Please upload your resume");
      }

      console.log("Submitting application with data:", submissionData);

      // Then submit application with the updated submission data
      await applyForJob(id, submissionData);

      // After successful submission, update the state
      setApplicationData(submissionData);

      // Show success message
      setApplicationSuccess(true);

      // Scroll to top
      window.scrollTo(0, 0);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(
        err.message || "Failed to submit application. Please try again."
      );
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
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
              Loading job details...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto text-center">
          <FaExclamationCircle className="text-red-500 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <Link
            to="/careers"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (!job) return null;

  if (applicationSuccess) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-600 text-3xl" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for applying to the{" "}
              <span className="font-semibold">{job.title}</span> position at{" "}
              {job.company}. We've received your application and will review it
              shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                What happens next?
              </h2>
              <ol className="text-left space-y-4">
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Application Review
                    </p>
                    <p className="text-gray-600 text-sm">
                      Our team will review your application and resume
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Initial Contact</p>
                    <p className="text-gray-600 text-sm">
                      If your profile matches our requirements, we'll contact
                      you
                    </p>
                  </div>
                </li>
                <li className="flex">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600 font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      Interview Process
                    </p>
                    <p className="text-gray-600 text-sm">
                      Selected candidates will be invited for interviews
                    </p>
                  </div>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/applications"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-300"
              >
                View My Applications
              </Link>
              <Link
                to="/careers"
                className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-3 px-6 rounded-md transition duration-300"
              >
                Browse More Jobs
              </Link>
            </div>
          </div>
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
            to="/careers"
            className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Jobs
          </Link>

          {/* Job Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <FaBuilding className="mr-2 text-green-600" />
                    {job.company}
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-green-600" />
                    {job.location.city}, {job.location.country}
                    {job.location.remote && " (Remote)"}
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-2 text-green-600" />
                    Posted {formatDate(job.created_at)}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {job.is_featured && (
                  <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-4 py-1 rounded-full">
                    Featured
                  </span>
                )}
                <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full">
                  {job.employment_type}
                </span>
              </div>
            </div>

            {/* Quick Apply Button */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <a
                href="#apply-section"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 text-center"
              >
                Apply Now
              </a>
              <button
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-md transition duration-300 text-center flex items-center justify-center"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Job link copied to clipboard!");
                }}
              >
                <FaShareAlt className="mr-2" />
                Share Job
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Job Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Job Description */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                      Description
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {job.description}
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                      Responsibilities
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {job.responsibilities.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                      Requirements
                    </h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {job.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {job.benefits && job.benefits.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-3 text-gray-800">
                        Benefits
                      </h2>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {job.benefits.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-semibold mb-3 text-gray-800">
                      Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div
                id="apply-section"
                className="bg-white rounded-lg shadow-md p-6 scroll-mt-24"
              >
                <h2 className="text-xl font-semibold mb-6 text-gray-800">
                  Apply for this position
                </h2>

                {showLoginPrompt ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                    <FaUser className="text-green-500 text-4xl mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Login Required
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Please login to apply for this position
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/login"
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-6 rounded-md transition duration-300"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-red-50 border-l-4 border-red-500 p-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Resume/CV <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex-grow">
                            <label className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-green-500 focus:outline-none">
                              <span className="flex flex-col items-center space-y-2">
                                {resumeFile ? (
                                  <>
                                    <FaFileAlt className="text-green-500 text-2xl" />
                                    <span className="font-medium text-gray-600">
                                      {resumeFile.name}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      Click to change file
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FaUpload className="text-gray-400 text-2xl" />
                                    <span className="font-medium text-gray-600">
                                      Drop files to upload or click
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      PDF, DOC, DOCX (Max 5MB)
                                    </span>
                                  </>
                                )}
                              </span>
                              <input
                                type="file"
                                name="resume"
                                className="hidden"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                required
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cover Letter
                        </label>
                        <textarea
                          name="cover_letter"
                          rows="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Tell us why you're a good fit for this position"
                          value={applicationData.cover_letter}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>

                      <div>
                        {/**<label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="full_name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="John Doe"
                          value={user?.name || ""}
                          disabled
                          required
                        />**/}
                      </div>

                      <div>
                        {/**<label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100"
                            placeholder="johndoe@example.com"
                            value={user?.email || ""}
                            disabled
                            required
                          />
                        </div>**/}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="+1 (555) 123-4567"
                            value={applicationData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          LinkedIn Profile
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaLinkedin className="text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="linkedin_url"
                            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://linkedin.com/in/yourprofile"
                            value={applicationData.linkedin_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Portfolio/Website
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaGlobe className="text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="portfolio_url"
                            className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="https://yourportfolio.com"
                            value={applicationData.portfolio_url}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Referral (if any)
                        </label>
                        <input
                          type="text"
                          name="referral"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="How did you hear about this position?"
                          value={applicationData.referral}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Information
                        </label>
                        <textarea
                          name="additional_info"
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Any additional information you'd like to share"
                          value={applicationData.additional_info}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-start mb-4">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            required
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="text-gray-700">
                            I agree to the{" "}
                            <a
                              href="/privacy-policy"
                              className="text-green-600 hover:text-green-800"
                            >
                              Privacy Policy
                            </a>{" "}
                            and consent to the processing of my personal data
                          </label>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition duration-300 disabled:opacity-50 flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column - Job Info */}
            <div className="space-y-6">
              {/* Job Details Card */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Job Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <FaBriefcase className="text-green-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Job Type
                      </p>
                      <p className="text-gray-600">{job.employment_type}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <FaUser className="text-green-500 mt-1 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Experience Level
                      </p>
                      <p className="text-gray-600">{job.experience_level}</p>
                    </div>
                  </div>

                  {job.education && (
                    <div className="flex items-start">
                      <FaGraduationCap className="text-green-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Education
                        </p>
                        <p className="text-gray-600">{job.education}</p>
                      </div>
                    </div>
                  )}

                  {(job.salary_min || job.salary_max) && (
                    <div className="flex items-start">
                      <FaDollarSign className="text-green-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Salary
                        </p>
                        <p className="text-gray-600">
                          {job.salary_min && job.salary_max
                            ? `${
                                job.salary_currency
                              } ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                            : job.salary_min
                            ? `From ${
                                job.salary_currency
                              } ${job.salary_min.toLocaleString()}`
                            : job.salary_max
                            ? `Up to ${
                                job.salary_currency
                              } ${job.salary_max.toLocaleString()}`
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                  )}

                  {job.application_deadline && (
                    <div className="flex items-start">
                      <FaClock className="text-green-500 mt-1 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Application Deadline
                        </p>
                        <p className="text-gray-600">
                          {formatDate(job.application_deadline)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Company Info */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  About {job.company}
                </h3>
                <p className="text-gray-600 mb-4">
                  {job.company_description ||
                    `${job.company} is a leading organization in the ${job.category} industry.`}
                </p>
                {job.company_website && (
                  <a
                    href={job.company_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 px-4 rounded-md transition duration-300"
                  >
                    Visit Company Website
                  </a>
                )}
              </div>

              {/* Share Job */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Share This Job
                </h3>
                <div className="flex space-x-2">
                  <button
                    className="flex-1 flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard!");
                    }}
                  >
                    <FaFileAlt className="mr-2" />
                    Copy Link
                  </button>
                  <button
                    className="flex-1 flex justify-center items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition duration-300"
                    onClick={() => {
                      window.open(
                        `mailto:?subject=Job Opportunity: ${job.title}&body=Check out this job opportunity: ${window.location.href}`,
                        "_blank"
                      );
                    }}
                  >
                    <FaShareAlt className="mr-2" />
                    Email
                  </button>
                </div>
              </div>

              {/* Similar Jobs */}
              {job.similar_jobs && job.similar_jobs.length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Similar Jobs
                  </h3>
                  <div className="space-y-3">
                    {job.similar_jobs.map((similarJob) => (
                      <Link
                        key={similarJob._id}
                        to={`/careers/${similarJob._id}`}
                        className="block p-3 border border-gray-200 rounded-md hover:bg-green-50 transition duration-300"
                      >
                        <h4 className="font-medium text-gray-900">
                          {similarJob.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {similarJob.company}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <FaMapMarkerAlt className="mr-1" />
                          <span>
                            {similarJob.location.city},{" "}
                            {similarJob.location.country}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetail;
