import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getApplicationDetails } from "../../services/careerService";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext"; // Assuming you have an auth context

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const { isAuthenticated } = useAuth();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setError("You must be logged in to view application details");
      setLoading(false);
      return;
    }

    const loadApplicationDetails = async () => {
      try {
        setLoading(true);
        const data = await getApplicationDetails(applicationId);
        setApplication(data);
      } catch (err) {
        setError("Failed to load application details. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadApplicationDetails();
  }, [applicationId, isAuthenticated]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "applied":
        return <Badge bg="primary">Applied</Badge>;
      case "reviewed":
        return <Badge bg="info">Reviewed</Badge>;
      case "interview":
        return (
          <Badge bg="warning" text="dark">
            Interview
          </Badge>
        );
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      case "hired":
        return <Badge bg="success">Hired</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (error && !isAuthenticated) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/login" className="btn btn-primary">
          Login to View Application
        </Link>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !application) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || "Application not found"}</Alert>
        <Link to="/careers/applications" className="btn btn-link ps-0">
          &larr; Back to My Applications
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="mb-4">
        <Link to="/careers/applications" className="btn btn-link ps-0">
          &larr; Back to My Applications
        </Link>
      </div>

      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-4">
                <div>
                  <h1 className="mb-1">
                    {application.job?.title || "Job no longer available"}
                  </h1>
                  <h4 className="text-muted">
                    {application.job?.company || "N/A"}
                  </h4>
                </div>
                <div>{getStatusBadge(application.status)}</div>
              </div>

              <div className="mb-4">
                <h5>Application Status</h5>
                <div className="d-flex align-items-center mt-2">
                  <div className="application-timeline">
                    <div
                      className={`timeline-step ${
                        application.status === "applied" ? "active" : ""
                      }`}
                    >
                      <div className="timeline-content">
                        <div className="inner-circle"></div>
                        <p>Applied</p>
                      </div>
                    </div>
                    <div
                      className={`timeline-step ${
                        application.status === "reviewed" ? "active" : ""
                      }`}
                    >
                      <div className="timeline-content">
                        <div className="inner-circle"></div>
                        <p>Reviewed</p>
                      </div>
                    </div>
                    <div
                      className={`timeline-step ${
                        application.status === "interview" ? "active" : ""
                      }`}
                    >
                      <div className="timeline-content">
                        <div className="inner-circle"></div>
                        <p>Interview</p>
                      </div>
                    </div>
                    <div
                      className={`timeline-step ${
                        application.status === "hired" ||
                        application.status === "rejected"
                          ? "active"
                          : ""
                      }`}
                    >
                      <div className="timeline-content">
                        <div className="inner-circle"></div>
                        <p>
                          {application.status === "hired"
                            ? "Hired"
                            : application.status === "rejected"
                            ? "Rejected"
                            : "Decision"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {application.interview_date && (
                <Alert variant="info">
                  <h5>Interview Scheduled</h5>
                  <p className="mb-0">
                    Your interview is scheduled for{" "}
                    <strong>
                      {new Date(application.interview_date).toLocaleString()}
                    </strong>
                  </p>
                </Alert>
              )}

              <div className="mb-4">
                <h5>Application Details</h5>
                <Row className="mt-3">
                  <Col md={6}>
                    <p>
                      <strong>Applied On:</strong>{" "}
                      {new Date(application.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Status:</strong>{" "}
                      {application.status.charAt(0).toUpperCase() +
                        application.status.slice(1)}
                    </p>
                    <p>
                      <strong>Resume:</strong>{" "}
                      <a
                        href={application.resume_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Resume
                      </a>
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Phone:</strong> {application.phone}
                    </p>
                    {application.linkedin_url && (
                      <p>
                        <strong>LinkedIn:</strong>{" "}
                        <a
                          href={application.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Profile
                        </a>
                      </p>
                    )}
                    {application.portfolio_url && (
                      <p>
                        <strong>Portfolio:</strong>{" "}
                        <a
                          href={application.portfolio_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Portfolio
                        </a>
                      </p>
                    )}
                  </Col>
                </Row>
              </div>

              {application.cover_letter && (
                <div className="mb-4">
                  <h5>Cover Letter</h5>
                  <Card className="bg-light">
                    <Card.Body>
                      {application.cover_letter
                        .split("\n")
                        .map((paragraph, i) => (
                          <p
                            key={i}
                            className={
                              i ===
                              application.cover_letter.split("\n").length - 1
                                ? "mb-0"
                                : ""
                            }
                          >
                            {paragraph}
                          </p>
                        ))}
                    </Card.Body>
                  </Card>
                </div>
              )}

              {application.additional_info && (
                <div className="mb-4">
                  <h5>Additional Information</h5>
                  <Card className="bg-light">
                    <Card.Body>
                      {application.additional_info
                        .split("\n")
                        .map((paragraph, i) => (
                          <p
                            key={i}
                            className={
                              i ===
                              application.additional_info.split("\n").length - 1
                                ? "mb-0"
                                : ""
                            }
                          >
                            {paragraph}
                          </p>
                        ))}
                    </Card.Body>
                  </Card>
                </div>
              )}

              {application.referral && (
                <div>
                  <h5>Referral Source</h5>
                  <p>{application.referral}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          {application.job && (
            <Card className="mb-4">
              <Card.Body>
                <h5 className="mb-3">Job Details</h5>
                <p>
                  <strong>Location:</strong> {application.job.location?.city},{" "}
                  {application.job.location?.country}
                  {application.job.location?.remote && " (Remote)"}
                </p>
                <p>
                  <strong>Employment Type:</strong>{" "}
                  {application.job.employment_type}
                </p>
                <p>
                  <strong>Experience Level:</strong>{" "}
                  {application.job.experience_level}
                </p>
                <p>
                  <strong>Category:</strong> {application.job.category}
                </p>

                <Link
                  to={`/careers/jobs/${application.job.id}`}
                  className="btn btn-primary w-100 mt-3"
                >
                  View Job Posting
                </Link>
              </Card.Body>
            </Card>
          )}

          {application.status === "applied" && (
            <Card className="border-danger">
              <Card.Body>
                <h5 className="text-danger">Withdraw Application</h5>
                <p>
                  If you wish to withdraw your application, please go back to
                  the applications list.
                </p>
                <Link
                  to="/careers/applications"
                  className="btn btn-outline-danger w-100"
                >
                  Go to Applications
                </Link>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ApplicationDetail;
