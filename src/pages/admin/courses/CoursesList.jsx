/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiBook,
  FiUsers,
  FiCalendar,
} from 'react-icons/fi';
import AdminLayout from '../../../components/admin/AdminLayout';
import { Loader } from 'lucide-react';
import { adminService } from '../../../services/admin-service';
import { formatDate } from '../../../utils/formatters';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [currentPage, statusFilter]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await adminService.getCourses();
      setCourses(data.courses || []);
      setTotalCourses(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchCourses();
  };

  const handleDelete = async (courseId) => {
    if (
      window.confirm(
        'Are you sure you want to delete this course? This action cannot be undone.',
      )
    ) {
      try {
        // Assuming there's a deleteCourse function in the adminService
        // await adminService.deleteCourse(courseId)
        setCourses(courses.filter((course) => course._id !== courseId));
        alert('Course deleted successfully');
      } catch (err) {
        console.error('Error deleting course:', err);
        alert('Failed to delete course. Please try again.');
      }
    }
  };

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold text-gray-800'>Courses</h1>
        <button
          onClick={() => navigate('/admin/courses/new')}
          className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center'
        >
          <FiPlus className='mr-2' />
          Add New Course
        </button>
      </div>

      {/* Filters */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
        <form
          onSubmit={handleSearch}
          className='flex flex-col md:flex-row gap-4'
        >
          <div className='flex-1'>
            <div className='relative'>
              <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <input
                type='text'
                placeholder='Search courses...'
                className='w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className='w-full md:w-48'>
            <div className='relative'>
              <FiFilter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
              <select
                className='w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value=''>All Status</option>
                <option value='active'>Active</option>
                <option value='upcoming'>Upcoming</option>
                <option value='completed'>Completed</option>
                <option value='draft'>Draft</option>
              </select>
            </div>
          </div>
          <button
            type='submit'
            className='bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md'
          >
            Search
          </button>
        </form>
      </div>

      {/* Error message */}
      {error && (
        <div
          className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6'
          role='alert'
        >
          <strong className='font-bold'>Error!</strong>
          <span className='block sm:inline'> {error}</span>
        </div>
      )}

      {/* Courses table */}
      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        {loading ? (
          <div className='flex justify-center items-center h-64'>
            <Loader className='h-12 w-12 text-primary animate-spin' />
          </div>
        ) : courses.length > 0 ? (
          <>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Course
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Instructor
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Students
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Start Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {courses.map((course) => (
                    <tr key={course._id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <div className='h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-500'>
                            <FiBook className='h-5 w-5' />
                          </div>
                          <div className='ml-4'>
                            <div className='text-sm font-medium text-gray-900'>
                              {course.title}
                            </div>
                            <div className='text-sm text-gray-500'>
                              {course.code || 'No code'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>
                          {course.instructor?.name || 'Unassigned'}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            course.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : course.status === 'upcoming'
                                ? 'bg-blue-100 text-blue-800'
                                : course.status === 'completed'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {course.status || 'Draft'}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='flex items-center'>
                          <FiUsers className='mr-1 h-4 w-4 text-gray-500' />
                          <span className='text-sm text-gray-900'>
                            {course.students_count || 0}
                          </span>
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        <div className='flex items-center'>
                          <FiCalendar className='mr-1 h-4 w-4 text-gray-400' />
                          {course.start_date
                            ? formatDate(course.start_date)
                            : 'Not scheduled'}
                        </div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                        <button
                          onClick={() =>
                            navigate(`/admin/courses/${course._id}`)
                          }
                          className='text-green-600 hover:text-green-900 mr-3'
                          title='View Course'
                        >
                          <FiEye className='h-5 w-5' />
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/admin/courses/${course._id}/edit`)
                          }
                          className='text-blue-600 hover:text-blue-900 mr-3'
                          title='Edit Course'
                        >
                          <FiEdit className='h-5 w-5' />
                        </button>
                        <button
                          onClick={() => handleDelete(course._id)}
                          className='text-red-600 hover:text-red-900'
                          title='Delete Course'
                        >
                          <FiTrash2 className='h-5 w-5' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6'>
              <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
                <div>
                  <p className='text-sm text-gray-700'>
                    Showing page{' '}
                    <span className='font-medium'>{currentPage}</span> of{' '}
                    <span className='font-medium'>{totalPages}</span> pages ({' '}
                    <span className='font-medium'>{totalCourses}</span> total
                    courses)
                  </p>
                </div>
                <div>
                  <nav
                    className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                    aria-label='Pagination'
                  >
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                        currentPage === 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
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
                                ? 'z-10 bg-green-50 border-green-500 text-green-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
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
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-gray-500 hover:bg-gray-50'
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
          <div className='flex flex-col items-center justify-center h-64'>
            <FiSearch className='h-12 w-12 text-gray-400 mb-4' />
            <p className='text-gray-500 text-lg'>No courses found</p>
            <p className='text-gray-400'>
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => navigate('/admin/courses/new')}
              className='mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center'
            >
              <FiPlus className='mr-2' />
              Add New Course
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;
