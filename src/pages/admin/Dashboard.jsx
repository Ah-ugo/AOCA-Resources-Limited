/** @format */

'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Users,
  BookOpen,
  FileText,
  BriefcaseIcon,
  Loader,
  AlertCircle,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { adminService } from '../../services/admin-service';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [careersStats, setCareersStats] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);

        // Fetch both stats in parallel
        const [dashboardData, careersData] = await Promise.all([
          adminService.getAdminStats(),
          adminService.careerStats().catch((err) => {
            console.warn('Career stats not available:', err);
            return null;
          }),
        ]);

        console.log('Dashboard Stats:', dashboardData);
        console.log('Careers Stats:', careersData);

        setStats(dashboardData);
        setCareersStats(careersData);
      } catch (err) {
        setError('Failed to load dashboard statistics');
        console.error('Dashboard fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center p-6'>
        <Loader className='h-12 w-12 text-emerald-500 animate-spin' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='p-6'>
        <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-lg'>
          <div className='flex items-center'>
            <AlertCircle className='h-5 w-5 text-red-400 mr-3' />
            <p className='text-sm text-red-700'>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for charts - FIXED data mapping
  const userRoleData =
    stats?.users?.by_role?.map((role) => ({
      name: role._id
        ? role._id.charAt(0).toUpperCase() + role._id.slice(1)
        : 'Unknown',
      value: role.count,
    })) || [];

  const courseLevelData =
    stats?.courses?.by_level?.map((level) => ({
      name: level._id || 'Unknown',
      count: level.count,
    })) || [];

  const blogCategoryData =
    stats?.blog?.by_category?.map((category) => ({
      name: category._id || 'Uncategorized',
      count: category.count,
    })) || [];

  const applicationStatusData =
    careersStats?.application_stats?.by_status?.map((status) => ({
      name: status._id
        ? status._id.charAt(0).toUpperCase() + status._id.slice(1)
        : 'Unknown',
      count: status.count,
    })) || [];

  const jobCategoryData =
    stats?.careers?.by_category?.map((category) => ({
      name: category._id || 'Unknown',
      count: category.count,
    })) || [];

  // Colors for charts
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#8884d8',
    '#82ca9d',
    '#ff6b6b',
    '#4ecdc4',
  ];

  const StatCard = ({ title, value, icon, color, subtitle }) => (
    <div className='bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-gray-500 text-sm font-medium uppercase tracking-wider'>
          {title}
        </h3>
        <div className={`p-3 rounded-full bg-${color}-100`}>{icon}</div>
      </div>
      <p className='text-3xl font-bold text-gray-800'>
        {value !== undefined ? value.toLocaleString() : 0}
      </p>
      {subtitle && <p className='text-sm text-gray-500 mt-2'>{subtitle}</p>}
    </div>
  );

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Admin Dashboard</h1>
        <p className='text-gray-600 mt-1'>
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Overview - FIXED data paths */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          title='Total Users'
          value={stats?.users?.total}
          icon={<Users className='h-6 w-6 text-blue-600' />}
          color='blue'
          subtitle={`${stats?.users?.active || 0} active users`}
        />

        <StatCard
          title='Total Courses'
          value={stats?.courses?.total}
          icon={<BookOpen className='h-6 w-6 text-green-600' />}
          color='green'
          subtitle={`${stats?.courses?.enrollments || 0} enrollments`}
        />

        <StatCard
          title='Blog Posts'
          value={stats?.blog?.total_posts}
          icon={<FileText className='h-6 w-6 text-purple-600' />}
          color='purple'
          subtitle={`${stats?.blog?.total_comments || 0} comments`}
        />

        <StatCard
          title='Job Listings'
          value={
            careersStats?.job_stats?.total || stats?.careers?.total_jobs || 0
          }
          icon={<BriefcaseIcon className='h-6 w-6 text-yellow-600' />}
          color='yellow'
          subtitle={`${careersStats?.application_stats?.total || stats?.careers?.total_applications || 0} applications`}
        />
      </div>

      {/* Secondary Stats Row - NEW */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-gray-500 text-sm font-medium mb-4'>
            Contact Submissions
          </h3>
          <div className='flex items-center justify-between'>
            <p className='text-3xl font-bold text-gray-800'>
              {stats?.contacts?.total || 0}
            </p>
            <div className='text-right'>
              <p className='text-sm text-gray-500'>
                Unread: {stats?.contacts?.unread || 0}
              </p>
              <p className='text-xs text-gray-400'>
                {stats?.contacts?.total
                  ? Math.round(
                      ((stats.contacts.total - stats.contacts.unread) /
                        stats.contacts.total) *
                        100,
                    )
                  : 0}
                % read
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-gray-500 text-sm font-medium mb-4'>
            Admission Inquiries
          </h3>
          <div className='flex items-center justify-between'>
            <p className='text-3xl font-bold text-gray-800'>
              {stats?.admissions?.total || 0}
            </p>
            <div className='text-right'>
              <p className='text-sm text-gray-500'>
                Pending: {stats?.admissions?.unread || 0}
              </p>
              <p className='text-xs text-gray-400'>
                {stats?.admissions?.by_status?.find((s) => s._id === 'pending')
                  ?.count || 0}{' '}
                pending
              </p>
            </div>
          </div>
        </div>

        <div className='bg-white rounded-lg shadow p-6'>
          <h3 className='text-gray-500 text-sm font-medium mb-4'>
            Application Status
          </h3>
          <div className='space-y-2'>
            {applicationStatusData.map((status, index) => (
              <div
                key={index}
                className='flex items-center justify-between text-sm'
              >
                <span className='text-gray-600'>{status.name}:</span>
                <span className='font-medium'>{status.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* User Roles Pie Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            User Roles Distribution
          </h2>
          <div className='h-80'>
            {userRoleData.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx='50%'
                    cy='50%'
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-full text-gray-500'>
                No user role data available
              </div>
            )}
          </div>
        </div>

        {/* Blog Categories Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            Blog Categories
          </h2>
          <div className='h-80'>
            {blogCategoryData.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={blogCategoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='count'
                    name='Posts'
                    fill='#8884d8'
                    radius={[4, 4, 0, 0]}
                  >
                    {blogCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-full text-gray-500'>
                No blog category data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Course Levels Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            Course Levels
          </h2>
          <div className='h-80'>
            {courseLevelData.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart
                  data={courseLevelData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis dataKey='name' />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey='count'
                    name='Courses'
                    fill='#82ca9d'
                    radius={[4, 4, 0, 0]}
                  >
                    {courseLevelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-full text-gray-500'>
                No course level data available
              </div>
            )}
          </div>
        </div>

        {/* Job Categories Chart */}
        <div className='bg-white rounded-lg shadow p-6'>
          <h2 className='text-lg font-semibold mb-4 text-gray-800'>
            Job Categories
          </h2>
          <div className='h-80'>
            {jobCategoryData.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <PieChart>
                  <Pie
                    data={jobCategoryData}
                    cx='50%'
                    cy='50%'
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='count'
                  >
                    {jobCategoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className='flex items-center justify-center h-full text-gray-500'>
                No job category data available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Recent Users */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Recent User Registrations
            </h2>
          </div>
          <div className='divide-y max-h-96 overflow-y-auto'>
            {stats?.recent?.users?.length > 0 ? (
              stats.recent.users.slice(0, 5).map((user, index) => (
                <div
                  key={user._id || index}
                  className='px-6 py-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center'>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold'>
                      {user.first_name?.charAt(0)}
                      {user.last_name?.charAt(0)}
                    </div>
                    <div className='ml-4 flex-1'>
                      <p className='font-medium text-gray-800'>
                        {user.first_name} {user.last_name}
                      </p>
                      <p className='text-sm text-gray-500'>{user.email}</p>
                      <p className='text-xs text-gray-400 mt-1'>
                        {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className='px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800'>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className='px-6 py-8 text-center text-gray-500'>
                No recent user registrations
              </div>
            )}
          </div>
        </div>

        {/* Recent Job Applications */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b bg-gradient-to-r from-yellow-50 to-amber-50'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Recent Job Applications
            </h2>
          </div>
          <div className='divide-y max-h-96 overflow-y-auto'>
            {careersStats?.recent_activity?.applications?.length > 0 ? (
              careersStats.recent_activity.applications
                .slice(0, 5)
                .map((app, index) => {
                  const applicantName =
                    app.first_name && app.last_name
                      ? `${app.first_name} ${app.last_name}`
                      : app.user?.name || 'Unknown User';

                  const jobTitle =
                    app.job?.title || app.job_title || 'Unknown Position';

                  return (
                    <div
                      key={app._id || index}
                      className='px-6 py-4 hover:bg-gray-50 transition-colors'
                    >
                      <div className='flex items-center'>
                        <div className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white'>
                          <BriefcaseIcon className='h-5 w-5' />
                        </div>
                        <div className='ml-4 flex-1'>
                          <p className='font-medium text-gray-800'>
                            {applicantName}
                          </p>
                          <p className='text-sm text-gray-500'>
                            Applied for: {jobTitle}
                          </p>
                          <p className='text-xs text-gray-400 mt-1'>
                            {new Date(app.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            app.status === 'applied'
                              ? 'bg-blue-100 text-blue-800'
                              : app.status === 'reviewing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : app.status === 'interview'
                                  ? 'bg-purple-100 text-purple-800'
                                  : app.status === 'hired'
                                    ? 'bg-green-100 text-green-800'
                                    : app.status === 'rejected'
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>
                  );
                })
            ) : (
              <div className='px-6 py-8 text-center text-gray-500'>
                No recent job applications
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Jobs and Blogs - Optional additional row */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
        {/* Recent Jobs */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b bg-gradient-to-r from-green-50 to-emerald-50'>
            <h2 className='text-lg font-semibold text-gray-800'>Recent Jobs</h2>
          </div>
          <div className='divide-y max-h-80 overflow-y-auto'>
            {careersStats?.recent_activity?.jobs?.length > 0 ? (
              careersStats.recent_activity.jobs
                .slice(0, 5)
                .map((job, index) => (
                  <div
                    key={job._id || index}
                    className='px-6 py-4 hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white'>
                        <BriefcaseIcon className='h-5 w-5' />
                      </div>
                      <div className='ml-4 flex-1'>
                        <p className='font-medium text-gray-800'>{job.title}</p>
                        <p className='text-sm text-gray-500'>{job.company}</p>
                        <div className='flex items-center gap-2 mt-1'>
                          <span className='text-xs text-gray-400'>
                            {job.location?.city || 'Remote'}
                          </span>
                          <span className='text-xs text-gray-400'>•</span>
                          <span className='text-xs text-gray-400'>
                            {job.views || 0} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div className='px-6 py-8 text-center text-gray-500'>
                No recent jobs
              </div>
            )}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className='bg-white rounded-lg shadow overflow-hidden'>
          <div className='px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-pink-50'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Recent Blog Posts
            </h2>
          </div>
          <div className='divide-y max-h-80 overflow-y-auto'>
            {stats?.recent?.posts?.length > 0 ? (
              stats.recent.posts.slice(0, 5).map((post, index) => (
                <div
                  key={post._id || index}
                  className='px-6 py-4 hover:bg-gray-50 transition-colors'
                >
                  <div className='flex items-center'>
                    <div className='h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white'>
                      <FileText className='h-5 w-5' />
                    </div>
                    <div className='ml-4 flex-1'>
                      <p className='font-medium text-gray-800'>{post.title}</p>
                      <p className='text-sm text-gray-500'>
                        {post.category || 'Uncategorized'}
                      </p>
                      <p className='text-xs text-gray-400 mt-1'>
                        {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='px-6 py-8 text-center text-gray-500'>
                No recent blog posts
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
