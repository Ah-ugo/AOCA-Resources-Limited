/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  getJobDetails,
  applyForJob,
  uploadResume,
} from '../../services/career-service';
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
} from 'react-bootstrap';

// Import navigation components
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const JobDetail = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information - THESE ARE THE REQUIRED FIELDS
    first_name: '',
    last_name: '',
    email: '',
    phone: '',

    // Application Details
    cover_letter: '',
    linkedin_url: '',
    portfolio_url: '',
    referral: '',
    additional_info: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
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
        setError('Failed to load job details. Please try again later.');
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
      if (file.size > 5 * 1024 * 1024) {
        setSubmitError('File size exceeds 5MB limit');
        return;
      }
      setResumeFile(file);
      setSubmitError(null);
    }
  };

  const validateForm = () => {
    if (!formData.first_name?.trim()) {
      setSubmitError('First name is required');
      return false;
    }
    if (!formData.last_name?.trim()) {
      setSubmitError('Last name is required');
      return false;
    }
    if (!formData.email?.trim()) {
      setSubmitError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError('Please enter a valid email address');
      return false;
    }
    if (!formData.phone?.trim()) {
      setSubmitError('Phone number is required');
      return false;
    }
    if (!resumeFile) {
      setSubmitError('Please upload your resume');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);

      // Upload resume
      const uploadResult = await uploadResume(resumeFile);
      const resumeUrl = uploadResult.url;

      // Prepare application data with ALL fields
      const applicationData = {
        // THESE ARE THE REQUIRED FIELDS - MAKE SURE THEY'RE ALL HERE
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        resume_url: resumeUrl,

        // Optional fields
        cover_letter: formData.cover_letter || '',
        linkedin_url: formData.linkedin_url || '',
        portfolio_url: formData.portfolio_url || '',
        referral: formData.referral || '',
        additional_info: formData.additional_info || '',
      };

      console.log('Submitting application with data:', applicationData);

      await applyForJob(jobId, applicationData);

      setSubmitSuccess(true);
      setShowApplicationForm(false);

      // Reset form
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        cover_letter: '',
        linkedin_url: '',
        portfolio_url: '',
        referral: '',
        additional_info: '',
      });
      setResumeFile(null);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Application submission error:', err);
      setSubmitError(
        err.message || 'Failed to submit application. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container className='py-5 text-center' style={{ minHeight: '60vh' }}>
          <Spinner animation='border' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </Spinner>
        </Container>
        <Footer />
      </>
    );
  }

  if (error || !job) {
    return (
      <>
        <Navbar />
        <Container className='py-5' style={{ minHeight: '60vh' }}>
          <Alert variant='danger'>{error || 'Job not found'}</Alert>
          <Link to='/careers/jobs' className='btn btn-link'>
            &larr; Back to Job Listings
          </Link>
        </Container>
        <Footer />
      </>
    );
  }

  const isDeadlinePassed =
    job.application_deadline && new Date(job.application_deadline) < new Date();

  return (
    <>
      <Navbar />
      <Container className='py-5'>
        <div className='mb-4'>
          <Link to='/careers/jobs' className='btn btn-link ps-0'>
            &larr; Back to Job Listings
          </Link>
        </div>

        <Card className='mb-5'>
          <Card.Body>
            <Row className='mb-4'>
              <Col>
                {job.is_featured && (
                  <Badge bg='warning' text='dark' className='mb-2'>
                    Featured
                  </Badge>
                )}
                <h1>{job.title}</h1>
                <h4 className='text-muted'>{job.company}</h4>
              </Col>

              <Col xs='auto' className='text-end'>
                <div className='text-muted mb-2'>
                  Posted {new Date(job.created_at).toLocaleDateString()}
                </div>
                <div className='text-muted'>
                  {job.views} views • {job.applications_count} applications
                </div>
              </Col>
            </Row>

            <div className='mb-4'>
              <Badge bg='light' text='dark' className='me-2 p-2'>
                {job.location.city}, {job.location.country}
                {job.location.remote && ' • Remote'}
                {job.location.hybrid && ' • Hybrid'}
              </Badge>
              <Badge bg='light' text='dark' className='me-2 p-2'>
                {job.employment_type}
              </Badge>
              <Badge bg='light' text='dark' className='me-2 p-2'>
                {job.experience_level}
              </Badge>
              <Badge bg='light' text='dark' className='me-2 p-2'>
                {job.category}
              </Badge>
            </div>

            {(job.salary_min || job.salary_max) && (
              <Card className='bg-light mb-4'>
                <Card.Body>
                  <h5>Salary Range</h5>
                  <h4>
                    {job.salary_min && job.salary_max
                      ? `${job.salary_currency} ${job.salary_min.toLocaleString()} - ${job.salary_max.toLocaleString()}`
                      : job.salary_min
                        ? `From ${job.salary_currency} ${job.salary_min.toLocaleString()}`
                        : `Up to ${job.salary_currency} ${job.salary_max.toLocaleString()}`}
                  </h4>
                </Card.Body>
              </Card>
            )}

            <div className='mb-4'>
              <h4>Job Description</h4>
              <div className='job-description'>
                {job.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className='mb-4'>
              <h4>Requirements</h4>
              <ul>
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div className='mb-4'>
              <h4>Responsibilities</h4>
              <ul>
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
            </div>

            {job.skills.length > 0 && (
              <div className='mb-4'>
                <h4>Skills</h4>
                <div>
                  {job.skills.map((skill, i) => (
                    <Badge key={i} bg='primary' className='me-2 mb-2 p-2'>
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {job.benefits.length > 0 && (
              <div className='mb-4'>
                <h4>Benefits</h4>
                <ul>
                  {job.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            {job.education && (
              <div className='mb-4'>
                <h4>Education</h4>
                <p>{job.education}</p>
              </div>
            )}

            {job.application_deadline && (
              <div className='mb-4'>
                <h4>Application Deadline</h4>
                <p className={isDeadlinePassed ? 'text-danger fw-bold' : ''}>
                  {new Date(job.application_deadline).toLocaleDateString()}
                  {isDeadlinePassed ? ' (Deadline has passed)' : ''}
                </p>
              </div>
            )}

            <div className='mt-5'>
              {submitSuccess ? (
                <Alert variant='success'>
                  <Alert.Heading>
                    Application Submitted Successfully!
                  </Alert.Heading>
                  <p>
                    Your application has been submitted successfully! We'll
                    review your application and get back to you soon.
                  </p>
                  <hr />
                  <div className='d-flex justify-content-end'>
                    <Button
                      variant='outline-success'
                      onClick={() => navigate('/careers/jobs')}
                    >
                      Browse More Jobs
                    </Button>
                  </div>
                </Alert>
              ) : (
                <>
                  {isDeadlinePassed ? (
                    <Alert variant='danger'>
                      The application deadline for this position has passed.
                    </Alert>
                  ) : (
                    <>
                      {!showApplicationForm ? (
                        <div className='d-flex gap-3'>
                          <Button
                            variant='primary'
                            size='lg'
                            onClick={() => {
                              setShowApplicationForm(true);
                              window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: 'smooth',
                              });
                            }}
                          >
                            Apply Now
                          </Button>

                          {job.application_url && (
                            <Button
                              variant='outline-primary'
                              size='lg'
                              href={job.application_url}
                              target='_blank'
                              rel='noopener noreferrer'
                            >
                              Apply on Company Website
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Card>
                          <Card.Body>
                            <h3 className='mb-4'>Apply for this position</h3>

                            {submitError && (
                              <Alert
                                variant='danger'
                                dismissible
                                onClose={() => setSubmitError(null)}
                              >
                                {submitError}
                              </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                              <Row>
                                <Col md={6}>
                                  <Form.Group className='mb-3'>
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control
                                      type='text'
                                      name='first_name'
                                      value={formData.first_name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className='mb-3'>
                                    <Form.Label>Last Name *</Form.Label>
                                    <Form.Control
                                      type='text'
                                      name='last_name'
                                      value={formData.last_name}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Row>
                                <Col md={6}>
                                  <Form.Group className='mb-3'>
                                    <Form.Label>Email *</Form.Label>
                                    <Form.Control
                                      type='email'
                                      name='email'
                                      value={formData.email}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className='mb-3'>
                                    <Form.Label>Phone Number *</Form.Label>
                                    <Form.Control
                                      type='tel'
                                      name='phone'
                                      value={formData.phone}
                                      onChange={handleInputChange}
                                      required
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>

                              <Form.Group className='mb-3'>
                                <Form.Label>Resume/CV *</Form.Label>
                                <Form.Control
                                  type='file'
                                  accept='.pdf,.doc,.docx'
                                  onChange={handleResumeChange}
                                  required
                                />
                                <Form.Text className='text-muted'>
                                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                                </Form.Text>
                              </Form.Group>

                              <Form.Group className='mb-3'>
                                <Form.Label>Cover Letter</Form.Label>
                                <Form.Control
                                  as='textarea'
                                  rows={6}
                                  name='cover_letter'
                                  value={formData.cover_letter}
                                  onChange={handleInputChange}
                                  placeholder="Tell us why you're a good fit for this position..."
                                />
                              </Form.Group>

                              <Form.Group className='mb-3'>
                                <Form.Label>LinkedIn Profile</Form.Label>
                                <Form.Control
                                  type='url'
                                  name='linkedin_url'
                                  value={formData.linkedin_url}
                                  onChange={handleInputChange}
                                  placeholder='https://linkedin.com/in/yourprofile'
                                />
                              </Form.Group>

                              <Form.Group className='mb-3'>
                                <Form.Label>Portfolio/Website</Form.Label>
                                <Form.Control
                                  type='url'
                                  name='portfolio_url'
                                  value={formData.portfolio_url}
                                  onChange={handleInputChange}
                                  placeholder='https://yourportfolio.com'
                                />
                              </Form.Group>

                              <Form.Group className='mb-3'>
                                <Form.Label>
                                  How did you hear about this position?
                                </Form.Label>
                                <Form.Control
                                  type='text'
                                  name='referral'
                                  value={formData.referral}
                                  onChange={handleInputChange}
                                  placeholder='e.g., LinkedIn, Company Website, Friend, etc.'
                                />
                              </Form.Group>

                              <Form.Group className='mb-4'>
                                <Form.Label>Additional Information</Form.Label>
                                <Form.Control
                                  as='textarea'
                                  rows={4}
                                  name='additional_info'
                                  value={formData.additional_info}
                                  onChange={handleInputChange}
                                  placeholder="Any additional information you'd like to share..."
                                />
                              </Form.Group>

                              <div className='d-flex gap-2'>
                                <Button
                                  type='submit'
                                  variant='primary'
                                  disabled={submitting}
                                  size='lg'
                                >
                                  {submitting ? (
                                    <>
                                      <Spinner
                                        as='span'
                                        animation='border'
                                        size='sm'
                                        role='status'
                                        aria-hidden='true'
                                        className='me-2'
                                      />
                                      Submitting...
                                    </>
                                  ) : (
                                    'Submit Application'
                                  )}
                                </Button>
                                <Button
                                  type='button'
                                  variant='outline-secondary'
                                  size='lg'
                                  onClick={() => setShowApplicationForm(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </Form>
                          </Card.Body>
                        </Card>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </Card.Body>
        </Card>

        {job.similar_jobs && job.similar_jobs.length > 0 && (
          <div className='mt-5'>
            <h3 className='mb-4'>Similar Jobs</h3>
            <Row>
              {job.similar_jobs.map((similarJob) => (
                <Col md={4} key={similarJob._id} className='mb-4'>
                  <Card className='h-100'>
                    <Card.Body>
                      <Card.Title>
                        <Link
                          to={`/careers/jobs/${similarJob._id}`}
                          className='text-decoration-none'
                        >
                          {similarJob.title}
                        </Link>
                      </Card.Title>
                      <Card.Subtitle className='mb-2 text-muted'>
                        {similarJob.company}
                      </Card.Subtitle>
                      <div className='mb-3'>
                        <Badge bg='light' text='dark' className='me-2'>
                          {similarJob.location.city},{' '}
                          {similarJob.location.country}
                        </Badge>
                        <Badge bg='light' text='dark'>
                          {similarJob.employment_type}
                        </Badge>
                      </div>
                      <Link
                        to={`/careers/jobs/${similarJob._id}`}
                        className='btn btn-outline-primary btn-sm'
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
      <Footer />
    </>
  );
};

export default JobDetail;
