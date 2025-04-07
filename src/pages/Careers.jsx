"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getJobListings } from "../services/career-service";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaClock,
  FaChevronRight,
  FaDollarSign,
} from "react-icons/fa";

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    remote: "",
    employment_type: "",
    experience_level: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [filterData, setFilterData] = useState({
    categories: [],
    locations: [],
    employment_types: [],
    experience_levels: [],
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Filter out empty values
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== "")
      );

      const data = await getJobListings(params);
      setJobs(data.jobs || []);

      // Set filter options from API response
      if (data.filters) {
        setFilterData(data.filters);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(
        `Failed to load job listings: ${
          err.message || "Unknown error"
        }. Please try again later.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      location: "",
      remote: "",
      employment_type: "",
      experience_level: "",
    });
    fetchJobs();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Career</h1>
            <p className="text-xl mb-8">
              Discover opportunities that match your skills and aspirations
            </p>

            {/* Search Bar */}
            <form
              onSubmit={handleSearch}
              className="relative max-w-3xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="relative flex-grow">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleInputChange}
                    placeholder="Search for jobs, skills, or companies"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-green-800 hover:bg-green-900 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition duration-300"
                >
                  <FaFilter className="mr-2" />
                  Filters
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Filter Jobs
              </h2>
              <button
                onClick={clearFilters}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                Clear All Filters
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={(e) =>
                    handleSelectChange("category", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Categories</option>
                  {filterData.categories?.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name} ({category.job_count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <select
                  name="location"
                  value={filters.location}
                  onChange={(e) =>
                    handleSelectChange("location", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Locations</option>
                  {filterData.locations?.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location._id} ({location.count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employment Type
                </label>
                <select
                  name="employment_type"
                  value={filters.employment_type}
                  onChange={(e) =>
                    handleSelectChange("employment_type", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Types</option>
                  {filterData.employment_types?.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type._id} ({type.count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  name="experience_level"
                  value={filters.experience_level}
                  onChange={(e) =>
                    handleSelectChange("experience_level", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">All Levels</option>
                  {filterData.experience_levels?.map((level) => (
                    <option key={level._id} value={level._id}>
                      {level._id} ({level.count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Remote
                </label>
                <select
                  name="remote"
                  value={filters.remote}
                  onChange={(e) => handleSelectChange("remote", e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Any</option>
                  <option value="true">Remote Only</option>
                  <option value="false">On-site Only</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSearch}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Results Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            {loading ? "Loading jobs..." : `${jobs.length} Jobs Found`}
          </h2>
          <p className="text-gray-600">
            {loading
              ? "Please wait while we find the best opportunities for you"
              : "Browse through our available positions and find your perfect match"}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Job Listings */}
        {loading ? (
          // Loading skeletons
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 animate-pulse"
              >
                <div className="h-7 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex space-x-4 mb-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-20 bg-gray-200 rounded w-full mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-100 flex flex-col h-full group"
              >
                <div className="p-6 flex flex-col h-full">
                  {job.is_featured && (
                    <div className="mb-3">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Featured
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">
                    {job.title}
                  </h3>
                  <p className="text-lg font-medium text-green-600 mb-3">
                    {job.company}
                  </p>

                  <div className="grid grid-cols-1 gap-2 mb-4 text-gray-600 text-sm">
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-gray-500" />
                      <span>
                        {job.location.city}, {job.location.country}
                        {job.location.remote && " (Remote)"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaBriefcase className="mr-2 text-gray-500" />
                      <span>{job.employment_type}</span>
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-gray-500" />
                      <span>Posted {formatDate(job.created_at)}</span>
                    </div>
                    {job.salary_min && job.salary_max && (
                      <div className="flex items-center">
                        <FaDollarSign className="mr-2 text-gray-500" />
                        <span>
                          {job.salary_currency}{" "}
                          {job.salary_min.toLocaleString()} -{" "}
                          {job.salary_max.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-700 mb-4 line-clamp-3 flex-grow">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/career/${job._id}`}
                    className="mt-auto inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 w-full"
                  >
                    View Details
                    <FaChevronRight className="ml-2 text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <FaSearch className="text-gray-400 text-5xl" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">
              We couldn't find any jobs matching your criteria. Try adjusting
              your filters or search terms.
            </p>
            <button
              onClick={clearFilters}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;
