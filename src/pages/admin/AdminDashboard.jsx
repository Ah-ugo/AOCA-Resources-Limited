/** @format */

// FIX #20: The original file imported ~100 non-existent lucide-react icons
// (food, transport, appliance emojis like Pizza, Beer, Wine, Cocktail, etc.)
// This crashed the entire build. Only real lucide icons are imported here.

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  Briefcase,
  FileText,
  BookOpen,
  Activity,
  User,
  Loader,
  Mail,
  TrendingUp,
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Eye,
  Filter,
  ChevronRight,
  Home,
  Settings,
  Bell,
  Search,
  DollarSign,
  Shield,
  Globe,
  Zap,
  Monitor,
  Video,
  Mic,
  Printer,
  Keyboard,
  HardDrive,
  Wifi,
  Navigation,
  Compass,
  Car,
  Truck,
  Coffee,
  Utensils,
  Apple,
} from 'lucide-react';
import {
  getAdminStats,
  getRecentUsers,
  getApplications,
  careerStats,
  getUsers,
  getJobs,
  getBlogs,
} from '../../services/admin-service';
import { formatDate } from '../../utils/formatters';

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

// ── Sub-components ────────────────────────────────────────────────────────────
const StatCard = ({ title, value, icon, color, subtitle, trendValue }) => (
  <div className='bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100'>
    <div className='flex items-center justify-between mb-4'>
      <h3 className='text-sm font-medium text-gray-500 uppercase tracking-wider'>
        {title}
      </h3>
      <div className={`p-3 rounded-xl bg-${color}-50`}>{icon}</div>
    </div>
    <div className='flex items-end justify-between'>
      <div>
        <p className='text-3xl font-bold text-gray-800'>
          {value !== undefined ? Number(value).toLocaleString() : 0}
        </p>
        {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
      </div>
      {trendValue !== undefined && (
        <div
          className={`flex items-center ${trendValue >= 0 ? 'text-green-500' : 'text-red-500'}`}
        >
          <TrendingUp className='h-4 w-4' />
          <span className='text-sm font-medium ml-1'>
            {Math.abs(trendValue)}%
          </span>
        </div>
      )}
    </div>
  </div>
);

const QuickActionButton = ({ icon, label, to, color }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 p-4 bg-${color}-50 rounded-xl hover:bg-${color}-100 transition-all group`}
  >
    <div className={`p-2 rounded-lg bg-${color}-100 text-${color}-600`}>
      {icon}
    </div>
    <span className='font-medium text-gray-700 group-hover:text-gray-900'>
      {label}
    </span>
    <ChevronRight className={`h-4 w-4 ml-auto text-${color}-400`} />
  </Link>
);

const ProgressBar = ({ value, max, color, label }) => (
  <div className='space-y-1'>
    <div className='flex justify-between text-sm'>
      <span className='text-gray-600'>{label}</span>
      <span className='font-medium'>
        {value} / {max}
      </span>
    </div>
    <div className='w-full bg-gray-200 rounded-full h-2'>
      <div
        className={`bg-${color}-500 rounded-full h-2 transition-all duration-500`}
        style={{ width: `${Math.min(100, Math.round((value / max) * 100))}%` }}
      />
    </div>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [careersData, setCareersData] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [selectedChart, setSelectedChart] = useState('pie');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          statsData,
          applicationsData,
          careersStats,
          usersData,
          jobsData,
          blogsData,
        ] = await Promise.all([
          getAdminStats(),
          getApplications().catch(() => ({ applications: [] })),
          careerStats().catch(() => null),
          getUsers({ limit: 5 }).catch(() => ({ users: [] })),
          getJobs({ limit: 5 }).catch(() => ({ jobs: [] })),
          getBlogs({ limit: 5 }).catch(() => ({ posts: [] })),
        ]);

        setStats(statsData);
        setCareersData(careersStats);
        setRecentUsers(statsData?.recent?.users || usersData?.users || []);
        setRecentApplications(
          careersStats?.recent_activity?.applications ||
            applicationsData?.applications?.slice(0, 5) ||
            [],
        );
        setRecentJobs(
          careersStats?.recent_activity?.jobs || jobsData?.jobs || [],
        );
        setRecentBlogs(blogsData?.posts || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const userRoleData =
    stats?.users?.by_role?.map((r) => ({
      name: r._id ? r._id.charAt(0).toUpperCase() + r._id.slice(1) : 'Unknown',
      value: r.count,
    })) || [];

  const applicationStatusData =
    careersData?.application_stats?.by_status?.map((s) => ({
      name: s._id ? s._id.charAt(0).toUpperCase() + s._id.slice(1) : 'Unknown',
      value: s.count,
    })) || [];

  const courseLevelData =
    stats?.courses?.by_level?.map((l) => ({
      name: l._id || 'Unknown',
      count: l.count,
    })) || [];
  const blogCategoryData =
    stats?.blog?.by_category?.map((c) => ({
      name: c._id || 'Uncategorized',
      count: c.count,
    })) || [];
  const jobCategoryData =
    stats?.careers?.by_category?.map((c) => ({
      name: c._id || 'Unknown',
      count: c.count,
    })) || [];

  const generateTrendData = () => {
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (days - 1 - i));
      return {
        date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        users: Math.floor(Math.random() * 10) + 5,
        applications: Math.floor(Math.random() * 5) + 1,
      };
    });
  };
  const trendData = generateTrendData();

  if (loading)
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <Loader className='h-16 w-16 text-emerald-500 animate-spin mx-auto mb-4' />
          <p className='text-gray-600 text-lg'>Loading dashboard data...</p>
        </div>
      </div>
    );

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 sticky top-0 z-10'>
        <div className='px-8 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <h1 className='text-2xl font-bold text-gray-800'>Dashboard</h1>
            <div className='hidden md:flex items-center gap-2 text-sm text-gray-500'>
              <Home className='h-4 w-4' />
              <span>/</span>
              <span className='text-gray-700'>Admin</span>
              <span>/</span>
              <span className='text-emerald-600 font-medium'>Overview</span>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <button className='p-2 hover:bg-gray-100 rounded-lg relative'>
              <Bell className='h-5 w-5 text-gray-600' />
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full' />
            </button>
            <button className='p-2 hover:bg-gray-100 rounded-lg'>
              <Settings className='h-5 w-5 text-gray-600' />
            </button>
            <div className='h-8 w-px bg-gray-200 mx-2' />
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center'>
                <User className='h-5 w-5 text-emerald-600' />
              </div>
              <div className='hidden md:block'>
                <p className='text-sm font-medium text-gray-700'>Admin</p>
                <p className='text-xs text-gray-500'>admin@aocaresources.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-8'>
        {/* Welcome banner */}
        <div className='bg-emerald-600 rounded-2xl p-8 mb-8 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold mb-2'>Welcome back, Admin!</h2>
              <p className='text-emerald-100'>
                Here is what is happening with your platform today.
              </p>
            </div>
            <div className='hidden md:flex gap-4'>
              <div className='bg-white/20 rounded-lg px-4 py-2'>
                <p className='text-xs opacity-80'>Last updated</p>
                <p className='font-medium'>{new Date().toLocaleDateString()}</p>
              </div>
              <div className='bg-white/20 rounded-lg px-4 py-2'>
                <p className='text-xs opacity-80'>System status</p>
                <p className='font-medium text-green-300'>Operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            title='Total Users'
            value={stats?.users?.total}
            icon={<Users className='h-6 w-6 text-blue-600' />}
            color='blue'
            subtitle={`${stats?.users?.active || 0} active`}
            trendValue={12}
          />
          <StatCard
            title='Total Courses'
            value={stats?.courses?.total}
            icon={<BookOpen className='h-6 w-6 text-green-600' />}
            color='green'
            subtitle={`${stats?.courses?.enrollments || 0} enrollments`}
            trendValue={8}
          />
          <StatCard
            title='Blog Posts'
            value={stats?.blog?.total_posts}
            icon={<FileText className='h-6 w-6 text-purple-600' />}
            color='purple'
            subtitle={`${stats?.blog?.total_comments || 0} comments`}
            trendValue={-3}
          />
          <StatCard
            title='Job Listings'
            value={
              careersData?.job_stats?.total || stats?.careers?.total_jobs || 0
            }
            icon={<Briefcase className='h-6 w-6 text-yellow-600' />}
            color='yellow'
            subtitle={`${careersData?.application_stats?.total || stats?.careers?.total_applications || 0} applications`}
            trendValue={15}
          />
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg font-semibold text-gray-800'>
                User roles distribution
              </h2>
              <div className='flex gap-2'>
                {['pie', 'bar'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedChart(t)}
                    className={`p-2 rounded-lg text-sm ${selectedChart === t ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className='h-80'>
              {userRoleData.length > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                  {selectedChart === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={userRoleData}
                        cx='50%'
                        cy='50%'
                        label={({ name, percent }) =>
                          `${name}: ${Math.round(percent * 100)}%`
                        }
                        outerRadius={100}
                        dataKey='value'
                      >
                        {userRoleData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  ) : (
                    <BarChart data={userRoleData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey='value'>
                        {userRoleData.map((_, i) => (
                          <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className='flex items-center justify-center h-full text-gray-500'>
                  No user role data
                </div>
              )}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>
              Application status
            </h2>
            <div className='h-80'>
              {applicationStatusData.length > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={applicationStatusData}
                    layout='vertical'
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' />
                    <YAxis type='category' dataKey='name' />
                    <Tooltip />
                    <Bar dataKey='value' radius={[0, 4, 4, 0]}>
                      {applicationStatusData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className='flex items-center justify-center h-full text-gray-500'>
                  No application data
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trend */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Activity trends
            </h2>
            <div className='flex gap-2'>
              {['week', 'month', 'quarter'].map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${timeRange === r ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className='h-80'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id='colorUsers' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='users'
                  stroke='#8884d8'
                  fill='url(#colorUsers)'
                  name='Users'
                />
                <Area
                  type='monotone'
                  dataKey='applications'
                  stroke='#82ca9d'
                  fill='url(#colorUsers)'
                  name='Applications'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <QuickActionButton
            icon={<Users className='h-5 w-5' />}
            label='Add new user'
            to='/admin/users/new'
            color='blue'
          />
          <QuickActionButton
            icon={<BookOpen className='h-5 w-5' />}
            label='Create course'
            to='/admin/courses/new'
            color='green'
          />
          <QuickActionButton
            icon={<Briefcase className='h-5 w-5' />}
            label='Post job'
            to='/admin/careers/jobs/new'
            color='yellow'
          />
          <QuickActionButton
            icon={<FileText className='h-5 w-5' />}
            label='Write blog'
            to='/admin/blogs/new'
            color='purple'
          />
        </div>

        {/* Recent activity */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
          {/* Recent users */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-blue-50'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Recent users
              </h2>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentUsers.length > 0 ? (
                recentUsers.map((user, i) => (
                  <div
                    key={user._id || i}
                    className='px-6 py-4 hover:bg-gray-50'
                  >
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm'>
                        {user.first_name?.[0]}
                        {user.last_name?.[0]}
                      </div>
                      <div className='ml-4 flex-1'>
                        <p className='font-medium text-gray-800'>
                          {user.first_name} {user.last_name}
                        </p>
                        <p className='text-xs text-gray-500'>{user.email}</p>
                      </div>
                      <span className='px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800'>
                        {user.role}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className='px-6 py-8 text-center text-gray-500'>
                  No recent registrations
                </div>
              )}
            </div>
          </div>

          {/* Recent applications */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-yellow-50'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Recent applications
              </h2>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentApplications.length > 0 ? (
                recentApplications.map((app, i) => (
                  <div
                    key={app._id || i}
                    className='px-6 py-4 hover:bg-gray-50'
                  >
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold text-sm'>
                        {(app.first_name || app.user?.name || 'U')[0]}
                      </div>
                      <div className='ml-4 flex-1'>
                        <p className='font-medium text-gray-800'>
                          {app.first_name && app.last_name
                            ? `${app.first_name} ${app.last_name}`
                            : app.user?.name || 'Unknown'}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {app.job?.title ||
                            app.job_title ||
                            'Unknown position'}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          app.status === 'hired'
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
                ))
              ) : (
                <div className='px-6 py-8 text-center text-gray-500'>
                  No recent applications
                </div>
              )}
            </div>
          </div>

          {/* Recent jobs */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-green-50'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Recent jobs
              </h2>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentJobs.length > 0 ? (
                recentJobs.map((job, i) => (
                  <div
                    key={job._id || i}
                    className='px-6 py-4 hover:bg-gray-50'
                  >
                    <p className='font-medium text-gray-800 text-sm'>
                      {job.title}
                    </p>
                    <p className='text-xs text-gray-500'>{job.company}</p>
                    <p className='text-xs text-gray-400 mt-1'>
                      {job.views || 0} views
                    </p>
                  </div>
                ))
              ) : (
                <div className='px-6 py-8 text-center text-gray-500'>
                  No recent jobs
                </div>
              )}
            </div>
          </div>

          {/* Recent blogs */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-purple-50'>
              <h2 className='text-lg font-semibold text-gray-800'>
                Recent blog posts
              </h2>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentBlogs.length > 0 ? (
                recentBlogs.map((blog, i) => (
                  <div
                    key={blog._id || i}
                    className='px-6 py-4 hover:bg-gray-50'
                  >
                    <p className='font-medium text-gray-800 text-sm'>
                      {blog.title}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {blog.category || 'Uncategorized'}
                    </p>
                    <p className='text-xs text-gray-400 mt-1'>
                      {formatDate(blog.created_at)}
                    </p>
                  </div>
                ))
              ) : (
                <div className='px-6 py-8 text-center text-gray-500'>
                  No recent posts
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
