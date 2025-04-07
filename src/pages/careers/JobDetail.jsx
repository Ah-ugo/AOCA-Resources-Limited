import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getJobDetails,
  applyForJob,
  uploadResume,
} from "../../services/careerService";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext"; // Assuming you have an auth context

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    cover_letter: "",
    phone: "",
    linkedin_url: "",
    portfolio_url: "",
    referral: "",
    additional_info: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const loadJobDetails = async () => {
      try {
        setLoading(true);
        const jobData = await getJobDetails(jobId);
        setJob(jobData);
      } catch (err) {
        setError("Failed to load job details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadJobDetails();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/careers/jobs/${jobId}` } });
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      // First upload the resume
      if (!resumeFile && !resumeUrl) {
        throw new Error("Please upload your resume");
      }

      let finalResumeUrl = resumeUrl;

      if (resumeFile) {
        const uploadResult = await uploadResume(resumeFile);
        finalResumeUrl = uploadResult.url;
      }

      // Then submit the application
      const applicationData = {
        ...formData,
        job_id: jobId,
        resume_url: finalResumeUrl,
      };

      await applyForJob(jobId, applicationData);

      setSubmitSuccess(true);
      setShowApplicationForm(false);

      // Reset form
      setFormData({
        cover_letter: "",
        phone: "",
        linkedin_url: "",
        portfolio_url: "",
        referral: "",
        additional_info: "",
      });
      setResumeFile(null);
      setResumeUrl("");
    } catch (err) {
      setSubmitError(
        err.message || "Failed to submit application. Please try again."
      );
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || "Job not found"}</Alert>
        <Link to="/careers/jobs" className="btn btn-link">
          &larr; Back to Job Listings
        </Link>
      </Container>
    );
  }

  const isDeadlinePassed =
    job.application_deadline && new Date(job.application_deadline) < new Date();

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Link to="/careers/jobs" className="btn btn-link ps-0">
          &larr; Back to Job Listings
        </Link>
      </div>

      <Card className="mb-5">
        <Card.Body>
          <Row className="mb-4">
            <Col>
              {job.is_featured && (
                <Badge bg="warning" text="dark" className="mb-2">
                  Featured
                </Badge>
              )}
              <h1>{job.title}</h1>
              <h4 className="text-muted">{job.company}</h4>
            </Col>

            <Col xs="auto" className="text-end">
              <div className="text-muted mb-2">
                Posted {new Date(job.created_at).toLocaleDateString()}
              </div>
              <div className="text-muted">
                {job.views} views • {job.applications_count} applications
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <Badge bg="light" text="dark" className="me-2 p-2">
              {job.location.city}, {job.location.country}
              {job.location.remote && " • Remote"}
              {job.location.hybrid && " • Hybrid"}
            </Badge>
            <Badge bg="light" text="dark" className="me-2 p-2">
              {job.employment_type}
            </Badge>
            <Badge bg="light" text="dark" className="me-2 p-2">
              {job.experience_level}
            </Badge>
            <Badge bg="light" text="dark" className="me-2 p-2">
              {job.category}
            </Badge>
          </div>

          {(job.salary_min || job.salary_max) && (
            <Card className="bg-light mb-4">
              <Card.Body>
                <h5>Salary Range</h5>
                <h4>
                  {job.salary_min && job.salary_max
                    ? `${
                        job.salary_currency
                      } ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                    : job.salary_min
                    ? `From ${
                        job.salary_currency
                      } ${job.salary_min.toLocaleString()}`
                    : `Up to ${
                        job.salary_currency
                      } ${job.salary_max.toLocaleString()}`}
                </h4>
              </Card.Body>
            </Card>
          )}

          <div className="mb-4">
            <h4>Job Description</h4>
            <div className="job-description">
              {job.description.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4>Requirements</h4>
            <ul>
              {job.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h4>Responsibilities</h4>
            <ul>
              {job.responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>

          {job.skills.length > 0 && (
            <div className="mb-4">
              <h4>Skills</h4>
              <div>
                {job.skills.map((skill, i) => (
                  <Badge key={i} bg="primary" className="me-2 mb-2 p-2">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {job.benefits.length > 0 && (
            <div className="mb-4">
              <h4>Benefits</h4>
              <ul>
                {job.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {job.education && (
            <div className="mb-4">
              <h4>Education</h4>
              <p>{job.education}</p>
            </div>
          )}

          {job.application_deadline && (
            <div className="mb-4">
              <h4>Application Deadline</h4>
              <p className={isDeadlinePassed ? "text-danger fw-bold" : ""}>
                {new Date(job.application_deadline).toLocaleDateString()}
                {isDeadlinePassed ? " (Deadline has passed)" : ""}
              </p>
            </div>
          )}

          <div className="mt-5">
            {submitSuccess ? (
              <Alert variant="success">
                Your application has been submitted successfully! We'll review
                your application and get back to you soon.
              </Alert>
            ) : (
              <>
                {isDeadlinePassed ? (
                  <Alert variant="danger">
                    The application deadline for this position has passed.
                  </Alert>
                ) : (
                  <>
                    {showApplicationForm ? (
                      <Card>
                        <Card.Body>
                          <h3 className="mb-4">Apply for this position</h3>

                          {submitError && (
                            <Alert variant="danger">{submitError}</Alert>
                          )}

                          <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                              <Form.Label>Resume/CV *</Form.Label>
                              <Form.Control
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleResumeChange}
                                required={!resumeUrl}
                              />
                              <Form.Text className="text-muted">
                                Accepted formats: PDF, DOC, DOCX
                              </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Phone Number *</Form.Label>
                              <Form.Control
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Cover Letter</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={6}
                                name="cover_letter"
                                value={formData.cover_letter}
                                onChange={handleInputChange}
                                placeholder="Tell us why you're a good fit for this position..."
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>LinkedIn Profile</Form.Label>
                              <Form.Control
                                type="url"
                                name="linkedin_url"
                                value={formData.linkedin_url}
                                onChange={handleInputChange}
                                placeholder="https://linkedin.com/in/yourprofile"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>Portfolio/Website</Form.Label>
                              <Form.Control
                                type="url"
                                name="portfolio_url"
                                value={formData.portfolio_url}
                                onChange={handleInputChange}
                                placeholder="https://yourportfolio.com"
                              />
                            </Form.Group>

                            <Form.Group className="mb-3">
                              <Form.Label>
                                How did you hear about this position?
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="referral"
                                value={formData.referral}
                                onChange={handleInputChange}
                              />
                            </Form.Group>

                            <Form.Group className="mb-4">
                              <Form.Label>Additional Information</Form.Label>
                              <Form.Control
                                as="textarea"
                                rows={4}
                                name="additional_info"
                                value={formData.additional_info}
                                onChange={handleInputChange}
                                placeholder="Any additional information you'd like to share..."
                              />
                            </Form.Group>

                            <div className="d-flex gap-2">
                              <Button
                                type="submit"
                                variant="primary"
                                disabled={submitting}
                              >
                                {submitting
                                  ? "Submitting..."
                                  : "Submit Application"}
                              </Button>
                              <Button
                                type="button"
                                variant="outline-secondary"
                                onClick={() => setShowApplicationForm(false)}
                              >
                                Cancel
                              </Button>
                            </div>
                          </Form>
                        </Card.Body>
                      </Card>
                    ) : (
                      <div className="d-flex gap-3">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => {
                            if (isAuthenticated) {
                              setShowApplicationForm(true);
                            } else {
                              navigate("/login", {
                                state: { from: `/careers/jobs/${jobId}` },
                              });
                            }
                          }}
                        >
                          Apply Now
                        </Button>

                        {job.application_url && (
                          <Button
                            variant="outline-primary"
                            size="lg"
                            href={job.application_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Apply on Company Website
                          </Button>
                        )}
                      </div>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Card.Body>
      </Card>

      {job.similar_jobs && job.similar_jobs.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Similar Jobs</h3>
          <Row>
            {job.similar_jobs.map((similarJob) => (
              <Col md={4} key={similarJob._id} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>
                      <Link
                        to={`/careers/jobs/${similarJob._id}`}
                        className="text-decoration-none"
                      >
                        {similarJob.title}
                      </Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {similarJob.company}
                    </Card.Subtitle>
                    <div className="mb-3">
                      <Badge bg="light" text="dark" className="me-2">
                        {similarJob.location.city},{" "}
                        {similarJob.location.country}
                      </Badge>
                      <Badge bg="light" text="dark">
                        {similarJob.employment_type}
                      </Badge>
                    </div>
                    <Link
                      to={`/careers/jobs/${similarJob._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default JobDetail;
