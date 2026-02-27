/** @format */

'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  FileText,
  Video,
  Book,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { getUserDashboard } from '../../services/dashboard-service';
import { getCurrentUser } from '../../services/auth-service';

function DashboardHome() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Get user from auth service
        const currentUser = getCurrentUser();
        setUser(currentUser);

        // Fetch dashboard data from API
        const data = await getUserDashboard();
        setDashboardData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md'>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className='mt-2 text-sm underline'
        >
          Try again
        </button>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>No dashboard data available.</p>
      </div>
    );
  }

  const {
    courses = [],
    upcoming_classes = [],
    pending_assignments = [],
    resources = [],
  } = dashboardData;

  // Calculate overall course progress
  const courseProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + (course.progress || 0), 0) /
            courses.length,
        )
      : 0;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h1 className='text-2xl font-bold'>
            Welcome back, {user?.name || user?.first_name || 'Student'}!
          </h1>
          <p className='text-gray-600'>
            {courses.length > 0
              ? `Continue your journey with ${courses[0].name || 'your courses'}`
              : 'Continue your learning journey'}
          </p>
        </div>
        {courses.length > 0 && (
          <div className='bg-white rounded-lg shadow p-4 w-full md:w-auto'>
            <div className='flex items-center gap-3'>
              <div className='w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center'>
                <span className='text-xl font-bold text-emerald-600'>
                  {courseProgress}%
                </span>
              </div>
              <div>
                <p className='font-medium'>Course Progress</p>
                <div className='w-40 h-2 bg-gray-200 rounded-full mt-2'>
                  <div
                    className='h-2 bg-emerald-600 rounded-full'
                    style={{ width: `${courseProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Courses Section */}
      {courses.length > 0 && (
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='p-4 bg-emerald-600 text-white flex justify-between items-center'>
            <h2 className='text-lg font-semibold flex items-center gap-2'>
              <Book className='h-5 w-5' />
              Your Courses
            </h2>
            <Link
              to='/dashboard/courses'
              className='text-sm flex items-center hover:underline'
            >
              View All <ChevronRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {courses.map((course) => (
              <div
                key={course.id || course._id}
                className='border rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <h3 className='font-medium'>{course.name}</h3>
                <p className='text-sm text-gray-600 mt-1'>
                  Level: {course.level || 'Beginner'}
                </p>
                <div className='mt-3'>
                  <div className='flex justify-between mb-1'>
                    <span className='text-xs text-gray-500'>Progress</span>
                    <span className='text-xs font-medium'>
                      {course.progress || 0}%
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-1.5'>
                    <div
                      className='bg-emerald-600 h-1.5 rounded-full'
                      style={{ width: `${course.progress || 0}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Classes */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-4 bg-emerald-600 text-white flex justify-between items-center'>
          <h2 className='text-lg font-semibold flex items-center gap-2'>
            <Video className='h-5 w-5' />
            Upcoming Classes
          </h2>
          <Link
            to='/dashboard/classes'
            className='text-sm flex items-center hover:underline'
          >
            View All <ChevronRight className='h-4 w-4' />
          </Link>
        </div>
        <div className='divide-y'>
          {upcoming_classes.length === 0 ? (
            <div className='p-6 text-center text-gray-500'>
              No upcoming classes scheduled.
            </div>
          ) : (
            upcoming_classes.slice(0, 3).map((classItem) => (
              <div
                key={classItem.id || classItem._id}
                className='p-4 hover:bg-gray-50'
              >
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                  <div>
                    <h3 className='font-medium'>{classItem.title}</h3>
                    <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='h-4 w-4' />
                        <span>{formatDate(classItem.date)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='h-4 w-4' />
                        <span>{formatTime(classItem.date)}</span>
                      </div>
                    </div>
                    <p className='text-sm mt-1'>
                      {classItem.course?.name &&
                        `Course: ${classItem.course.name}`}
                    </p>
                    {classItem.instructor && (
                      <p className='text-sm mt-1'>
                        Instructor:{' '}
                        {classItem.instructor.name || classItem.instructor}
                      </p>
                    )}
                  </div>
                  <a
                    href={classItem.meet_link || classItem.link || '#'}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors inline-flex items-center gap-2'
                  >
                    <Video className='h-4 w-4' />
                    Join Class
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Assignments */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-4 bg-emerald-600 text-white flex justify-between items-center'>
          <h2 className='text-lg font-semibold flex items-center gap-2'>
            <FileText className='h-5 w-5' />
            Assignments
          </h2>
          <Link
            to='/dashboard/assignments'
            className='text-sm flex items-center hover:underline'
          >
            View All <ChevronRight className='h-4 w-4' />
          </Link>
        </div>
        <div className='divide-y'>
          {pending_assignments.length === 0 ? (
            <div className='p-6 text-center text-gray-500'>
              No assignments available.
            </div>
          ) : (
            pending_assignments.slice(0, 3).map((assignment) => {
              const overdue =
                isOverdue(assignment.due_date) &&
                assignment.status !== 'completed';

              return (
                <div
                  key={assignment.id || assignment._id}
                  className='p-4 hover:bg-gray-50'
                >
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-2 flex-wrap'>
                        <h3 className='font-medium'>{assignment.title}</h3>
                        {assignment.status === 'completed' ? (
                          <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'>
                            <CheckCircle className='h-3 w-3 mr-1' />
                            Completed
                          </span>
                        ) : overdue ? (
                          <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800'>
                            <AlertCircle className='h-3 w-3 mr-1' />
                            Overdue
                          </span>
                        ) : (
                          <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800'>
                            <Clock className='h-3 w-3 mr-1' />
                            Pending
                          </span>
                        )}
                      </div>
                      <p className='text-sm text-gray-600 mt-1'>
                        {assignment.description}
                      </p>
                      <div className='flex items-center gap-1 mt-2 text-sm text-gray-600'>
                        <Calendar className='h-4 w-4' />
                        <span>Due: {formatDate(assignment.due_date)}</span>
                      </div>
                    </div>
                    {assignment.status !== 'completed' && (
                      <Link
                        to={`/dashboard/assignments/${assignment.id || assignment._id}`}
                        className='bg-emerald-600 text-white px-3 py-1 rounded text-sm hover:bg-emerald-700 transition-colors'
                      >
                        {overdue ? 'Submit Late' : 'Start'}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Learning Resources */}
      {resources.length > 0 && (
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='p-4 bg-emerald-600 text-white flex justify-between items-center'>
            <h2 className='text-lg font-semibold flex items-center gap-2'>
              <Book className='h-5 w-5' />
              Recent Resources
            </h2>
            <Link
              to='/dashboard/resources'
              className='text-sm flex items-center hover:underline'
            >
              View All <ChevronRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {resources.slice(0, 3).map((resource) => (
              <div
                key={resource.id || resource._id}
                className='border rounded-lg p-4 hover:shadow-md transition-shadow'
              >
                <h3 className='font-medium'>{resource.title}</h3>
                <p className='text-sm text-gray-600 mt-1'>
                  {resource.description}
                </p>
                <Link
                  to={`/dashboard/resources/${resource.id || resource._id}`}
                  className='text-emerald-600 text-sm font-medium mt-2 inline-flex items-center hover:underline'
                >
                  View Resource <ChevronRight className='h-4 w-4 ml-1' />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardHome;
