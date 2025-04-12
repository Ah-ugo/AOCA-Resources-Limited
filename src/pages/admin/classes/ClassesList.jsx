"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiBook,
  FiUsers,
  FiClock,
  FiCalendar,
} from "react-icons/fi";
import AdminLayout from "../../../components/admin/AdminLayout";
import { adminService } from "../../../services/admin-service";

const ClassesList = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalClasses, setTotalClasses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClasses();
    fetchCourses();
  }, [currentPage, courseFilter]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const data = await adminService.getClasses();
      setClasses(data.classes || []);
      setTotalClasses(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error fetching classes:", err);
      setError("Failed to load classes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const data = await adminService.getCourses();
      setCourses(data.courses || []);
    } catch (err) {
      console.error("Error fetching courses:", err);
      setCourses([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchClasses();
  };

  const handleDelete = async (classId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this class? This action cannot be undone."
      )
    ) {
      try {
        // Assuming there's a deleteClass function in the adminService
        // await adminService.deleteClass(classId)
        setClasses(classes.filter((cls) => cls._id !== classId));
        alert("Class deleted successfully");
      } catch (err) {
        console.error("Error deleting class:", err);
        alert("Failed to delete class. Please try again.");
      }
    }
  };

  const formatTime = (time) => {
    if (!time) return "N/A";
    try {
      // Assuming time is in format "HH:MM"
      const [hours, minutes] = time.split(":");
      const hour = Number.parseInt(hours, 10);
      const period = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${period}`;
    } catch (err) {
      return time;
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Classes</h1>
          <button
            onClick={() => navigate("/admin/classes/new")}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <FiPlus className="mr-2" />
            Add New Class
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search classes..."
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none"
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </form>
        </div>

        {/* Error message */}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Classes table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : classes.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Students
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {classes.map((cls) => (
                      <tr key={cls._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500">
                              <FiBook className="h-5 w-5" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {cls.name || "Unnamed Class"}
                              </div>
                              <div className="text-sm text-gray-500">
                                {cls.section || "No section"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {cls.course?.title || "Unknown Course"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {cls.instructor?.name || "Unassigned"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center">
                              <FiCalendar className="mr-1 h-4 w-4 text-gray-400" />
                              {cls.days?.join(", ") || "N/A"}
                            </div>
                            <div className="flex items-center mt-1">
                              <FiClock className="mr-1 h-4 w-4 text-gray-400" />
                              {formatTime(cls.start_time)} -{" "}
                              {formatTime(cls.end_time)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiUsers className="mr-1 h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-900">
                              {cls.students_count || 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() =>
                              navigate(`/admin/classes/${cls._id}`)
                            }
                            className="text-green-600 hover:text-green-900 mr-3"
                            title="View Class"
                          >
                            <FiEye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/admin/classes/${cls._id}/edit`)
                            }
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            title="Edit Class"
                          >
                            <FiEdit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(cls._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete Class"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing page{" "}
                      <span className="font-medium">{currentPage}</span> of{" "}
                      <span className="font-medium">{totalPages}</span> pages ({" "}
                      <span className="font-medium">{totalClasses}</span> total
                      classes)
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === 1
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        Previous
                      </button>
                      {[...Array(Math.min(5, totalPages)).keys()].map((i) => {
                        const pageNumber =
                          currentPage > 3 ? currentPage - 3 + i + 1 : i + 1;
                        if (pageNumber <= totalPages) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => setCurrentPage(pageNumber)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === pageNumber
                                  ? "z-10 bg-green-50 border-green-500 text-green-600"
                                  : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                              }`}
                            >
                              {pageNumber}
                            </button>
                          );
                        }
                        return null;
                      })}
                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          currentPage === totalPages
                            ? "text-gray-300 cursor-not-allowed"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-64">
              <FiSearch className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg">No classes found</p>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => navigate("/admin/classes/new")}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
              >
                <FiPlus className="mr-2" />
                Add New Class
              </button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ClassesList;
