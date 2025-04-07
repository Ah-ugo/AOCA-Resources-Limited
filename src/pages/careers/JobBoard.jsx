import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getJobListings, getJobCategories } from "../../services/careerService";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Spinner,
  Pagination,
} from "react-bootstrap";

const JobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    skip: 0,
    limit: 10,
    category: "",
    location: "",
    remote: null,
    employment_type: "",
    experience_level: "",
    search: "",
    sort_by: "created_at",
    sort_order: -1,
  });
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filterOptions, setFilterOptions] = useState({
    locations: [],
    employment_types: [],
    experience_levels: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [jobsData, categoriesData] = await Promise.all([
          getJobListings(filters),
          getJobCategories(),
        ]);

        setJobs(jobsData.jobs);
        setTotal(jobsData.total);
        setCategories(categoriesData);

        // Set filter options if available
        if (jobsData.filters) {
          setFilterOptions(jobsData.filters);
        }
      } catch (error) {
        console.error("Error loading job board data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      skip: 0, // Reset pagination when filters change
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    handleFilterChange("search", searchValue);
  };

  const handlePageChange = (newSkip) => {
    setFilters((prev) => ({
      ...prev,
      skip: newSkip,
    }));
  };

  const clearFilters = () => {
    setFilters({
      skip: 0,
      limit: 10,
      category: "",
      location: "",
      remote: null,
      employment_type: "",
      experience_level: "",
      search: "",
      sort_by: "created_at",
      sort_order: -1,
    });
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4">Career Opportunities</h1>

      {/* Search Bar */}
      <Form onSubmit={handleSearch} className="mb-4">
        <Row>
          <Col md={10}>
            <Form.Control
              type="text"
              name="search"
              placeholder="Search for jobs..."
              defaultValue={filters.search}
            />
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" className="w-100">
              Search
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        {/* Filters Sidebar */}
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Filters</h5>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name} ({category.job_count})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City or Country"
                  value={filters.location || ""}
                  onChange={(e) =>
                    handleFilterChange("location", e.target.value)
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Remote Work</Form.Label>
                <Form.Select
                  value={
                    filters.remote === null ? "" : filters.remote.toString()
                  }
                  onChange={(e) => {
                    const value = e.target.value;
                    handleFilterChange(
                      "remote",
                      value === "" ? null : value === "true"
                    );
                  }}
                >
                  <option value="">Any</option>
                  <option value="true">Remote Only</option>
                  <option value="false">On-site Only</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Employment Type</Form.Label>
                <Form.Select
                  value={filters.employment_type}
                  onChange={(e) =>
                    handleFilterChange("employment_type", e.target.value)
                  }
                >
                  <option value="">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Experience Level</Form.Label>
                <Form.Select
                  value={filters.experience_level}
                  onChange={(e) =>
                    handleFilterChange("experience_level", e.target.value)
                  }
                >
                  <option value="">All Levels</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={`${filters.sort_by}_${filters.sort_order}`}
                  onChange={(e) => {
                    const [sort_by, sort_order] = e.target.value.split("_");
                    handleFilterChange("sort_by", sort_by);
                    handleFilterChange("sort_order", parseInt(sort_order));
                  }}
                >
                  <option value="created_at_-1">Newest First</option>
                  <option value="created_at_1">Oldest First</option>
                  <option value="views_-1">Most Viewed</option>
                  <option value="applications_count_-1">Most Applied</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="outline-secondary"
                className="w-100"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Job Listings */}
        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>{loading ? "Loading jobs..." : `${total} Jobs Found`}</h2>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : jobs.length === 0 ? (
            <Card className="text-center p-5">
              <Card.Body>
                <h3>No jobs found</h3>
                <p className="text-muted">
                  Try adjusting your filters or search criteria
                </p>
              </Card.Body>
            </Card>
          ) : (
            <>
              {jobs.map((job) => (
                <Card key={job._id} className="mb-3 job-card">
                  <Card.Body>
                    {job.is_featured && (
                      <Badge bg="warning" text="dark" className="mb-2">
                        Featured
                      </Badge>
                    )}
                    <Card.Title>
                      <Link
                        to={`/careers/jobs/${job._id}`}
                        className="text-decoration-none"
                      >
                        {job.title}
                      </Link>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company}
                    </Card.Subtitle>

                    <div className="mb-3">
                      <Badge bg="light" text="dark" className="me-2">
                        {job.location.city}, {job.location.country}
                        {job.location.remote && " • Remote"}
                        {job.location.hybrid && " • Hybrid"}
                      </Badge>
                      <Badge bg="light" text="dark" className="me-2">
                        {job.employment_type}
                      </Badge>
                      <Badge bg="light" text="dark" className="me-2">
                        {job.experience_level}
                      </Badge>
                    </div>

                    <Card.Text className="text-truncate-2">
                      {job.description.substring(0, 150)}...
                    </Card.Text>

                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Posted {new Date(job.created_at).toLocaleDateString()}
                      </small>
                      <Link
                        to={`/careers/jobs/${job._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              ))}

              {/* Pagination */}
              {total > filters.limit && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.Prev
                      onClick={() =>
                        handlePageChange(
                          Math.max(0, filters.skip - filters.limit)
                        )
                      }
                      disabled={filters.skip === 0}
                    />

                    {[...Array(Math.ceil(total / filters.limit)).keys()].map(
                      (num) => (
                        <Pagination.Item
                          key={num}
                          active={
                            num === Math.floor(filters.skip / filters.limit)
                          }
                          onClick={() => handlePageChange(num * filters.limit)}
                        >
                          {num + 1}
                        </Pagination.Item>
                      )
                    )}

                    <Pagination.Next
                      onClick={() =>
                        handlePageChange(filters.skip + filters.limit)
                      }
                      disabled={filters.skip + filters.limit >= total}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default JobBoard;
