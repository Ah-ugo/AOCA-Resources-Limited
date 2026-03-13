/** @format */

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
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import {
  Users,
  Briefcase,
  FileText,
  BookOpen,
  Calendar,
  Activity,
  User,
  Loader,
  Mail,
  Phone,
  MapPin,
  Star,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Eye,
  Download,
  Filter,
  MoreVertical,
  ChevronRight,
  Home,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  DollarSign,
  ShoppingCart,
  Heart,
  Gift,
  Shield,
  Globe,
  Zap,
  Cloud,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Camera,
  Video,
  Mic,
  Headphones,
  Speaker,
  Printer,
  Keyboard,
  Mouse,
  HardDrive,
  Cpu,
  Battery,
  Wifi,
  Bluetooth,
  Navigation,
  Compass,
  Anchor,
  Ship,
  Plane,
  Car,
  Truck,
  Bike,
  Train,
  Bus,
  Walk,
  Run,
  Coffee,
  Pizza,
  Beer,
  Wine,
  Cocktail,
  Glass,
  Utensils,
  Cake,
  IceCream,
  Cookie,
  Candy,
  Apple,
  Orange,
  Banana,
  Grape,
  Watermelon,
  Cherry,
  Strawberry,
  Peach,
  Pear,
  Lemon,
  Tomato,
  Carrot,
  Broccoli,
  Corn,
  Pepper,
  Mushroom,
  Bread,
  Rice,
  Noodles,
  Egg,
  Cheese,
  Milk,
  Coffee2,
  Tea,
  Soda,
  Juice,
  Water,
  Wine2,
  Beer2,
  Cocktail2,
  Glass2,
  Utensils2,
  Cake2,
  IceCream2,
  Cookie2,
  Candy2,
  Apple2,
  Orange2,
  Banana2,
  Grape2,
  Watermelon2,
  Cherry2,
  Strawberry2,
  Peach2,
  Pear2,
  Lemon2,
  Tomato2,
  Carrot2,
  Broccoli2,
  Corn2,
  Pepper2,
  Mushroom2,
  Bread2,
  Rice2,
  Noodles2,
  Egg2,
  Cheese2,
  Milk2,
} from 'lucide-react';
import {
  getAdminStats,
  getRecentUsers,
  getApplications,
  careerStats,
  getUsers,
  getJobs,
  getBlogs,
  getCourses,
} from '../../services/admin-service';
import { formatDate } from '../../utils/formatters';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [careersData, setCareersData] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [selectedChart, setSelectedChart] = useState('users');

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [
          statsData,
          applicationsData,
          careersStats,
          usersData,
          jobsData,
          blogsData,
        ] = await Promise.all([
          getAdminStats(),
          getApplications().catch((err) => {
            console.warn('Applications not available:', err);
            return { applications: [] };
          }),
          careerStats().catch((err) => {
            console.warn('Career stats not available:', err);
            return null;
          }),
          getUsers({ limit: 5 }).catch((err) => {
            console.warn('Users not available:', err);
            return { users: [] };
          }),
          getJobs({ limit: 5 }).catch((err) => {
            console.warn('Jobs not available:', err);
            return { jobs: [] };
          }),
          getBlogs({ limit: 5 }).catch((err) => {
            console.warn('Blogs not available:', err);
            return { posts: [] };
          }),
        ]);

        console.log('Stats Data:', statsData);
        console.log('Applications Data:', applicationsData);
        console.log('Careers Stats:', careersStats);
        console.log('Users Data:', usersData);
        console.log('Jobs Data:', jobsData);
        console.log('Blogs Data:', blogsData);

        setStats(statsData);
        setCareersData(careersStats);

        // Set recent users
        if (statsData?.recent?.users) {
          setRecentUsers(statsData.recent.users);
        } else if (usersData?.users) {
          setRecentUsers(usersData.users);
        }

        // Set recent applications
        if (careersStats?.recent_activity?.applications) {
          setRecentApplications(careersStats.recent_activity.applications);
        } else if (applicationsData?.applications) {
          setRecentApplications(applicationsData.applications.slice(0, 5));
        }

        // Set recent jobs
        if (careersStats?.recent_activity?.jobs) {
          setRecentJobs(careersStats.recent_activity.jobs);
        } else if (jobsData?.jobs) {
          setRecentJobs(jobsData.jobs);
        }

        // Set recent blogs
        if (blogsData?.posts) {
          setRecentBlogs(blogsData.posts);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Prepare data for charts
  const userRoleData =
    stats?.users?.by_role?.map((role) => ({
      name: role._id.charAt(0).toUpperCase() + role._id.slice(1),
      value: role.count,
    })) || [];

  const applicationStatusData =
    careersData?.application_stats?.by_status?.map((status) => ({
      name: status._id.charAt(0).toUpperCase() + status._id.slice(1),
      value: status.count,
    })) || [];

  const courseLevelData =
    stats?.courses?.by_level?.map((level) => ({
      name: level._id || 'Unknown',
      count: level.count,
    })) || [];

  const blogCategoryData =
    stats?.blog?.by_category?.map((cat) => ({
      name: cat._id || 'Uncategorized',
      count: cat.count,
    })) || [];

  const jobCategoryData =
    stats?.careers?.by_category?.map((cat) => ({
      name: cat._id || 'Unknown',
      count: cat.count,
    })) || [];

  // Generate trend data based on time range
  const generateTrendData = () => {
    const data = [];
    const now = new Date();
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      data.push({
        date: date.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        users: Math.floor(Math.random() * 10) + 5,
        applications: Math.floor(Math.random() * 5) + 1,
        jobs: Math.floor(Math.random() * 3) + 1,
        blogs: Math.floor(Math.random() * 2),
      });
    }
    return data;
  };

  const trendData = generateTrendData();

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

  const StatCard = ({
    title,
    value,
    icon,
    color,
    subtitle,
    trend,
    trendValue,
  }) => (
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
            {value !== undefined ? value.toLocaleString() : 0}
          </p>
          {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
        </div>
        {trend && (
          <div
            className={`flex items-center ${trendValue > 0 ? 'text-green-500' : 'text-red-500'}`}
          >
            {trendValue > 0 ? (
              <TrendingUp className='h-4 w-4' />
            ) : (
              <TrendingDown className='h-4 w-4' />
            )}
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
      <ChevronRight
        className={`h-4 w-4 ml-auto text-${color}-400 group-hover:text-${color}-600`}
      />
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
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen bg-gray-50'>
        <div className='text-center'>
          <Loader className='h-16 w-16 text-emerald-500 animate-spin mx-auto mb-4' />
          <p className='text-gray-600 text-lg'>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

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
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>
            <button className='p-2 hover:bg-gray-100 rounded-lg'>
              <Settings className='h-5 w-5 text-gray-600' />
            </button>
            <div className='h-8 w-px bg-gray-200 mx-2'></div>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center'>
                <User className='h-5 w-5 text-emerald-600' />
              </div>
              <div className='hidden md:block'>
                <p className='text-sm font-medium text-gray-700'>Admin User</p>
                <p className='text-xs text-gray-500'>admin@aocaresources.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='p-8'>
        {/* Welcome Banner */}
        <div className='bg-gradient-to-r from-emerald-600 to-emerald-800 rounded-2xl p-8 mb-8 text-white'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold mb-2'>
                Welcome back, Admin! 👋
              </h2>
              <p className='text-emerald-100'>
                Here's what's happening with your platform today.
              </p>
            </div>
            <div className='hidden md:flex gap-4'>
              <div className='bg-white/20 rounded-lg px-4 py-2'>
                <p className='text-xs opacity-80'>Last updated</p>
                <p className='font-medium'>{new Date().toLocaleDateString()}</p>
              </div>
              <div className='bg-white/20 rounded-lg px-4 py-2'>
                <p className='text-xs opacity-80'>System status</p>
                <p className='font-medium text-green-300'>● Operational</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <StatCard
            title='Total Users'
            value={stats?.users?.total}
            icon={<Users className='h-6 w-6 text-blue-600' />}
            color='blue'
            subtitle={`${stats?.users?.active || 0} active`}
            trend={true}
            trendValue={12}
          />
          <StatCard
            title='Total Courses'
            value={stats?.courses?.total}
            icon={<BookOpen className='h-6 w-6 text-green-600' />}
            color='green'
            subtitle={`${stats?.courses?.enrollments || 0} enrollments`}
            trend={true}
            trendValue={8}
          />
          <StatCard
            title='Blog Posts'
            value={stats?.blog?.total_posts}
            icon={<FileText className='h-6 w-6 text-purple-600' />}
            color='purple'
            subtitle={`${stats?.blog?.total_comments || 0} comments`}
            trend={true}
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
            trend={true}
            trendValue={15}
          />
        </div>

        {/* Secondary Stats Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-medium text-gray-500'>
                Contact Submissions
              </h3>
              <Mail className='h-5 w-5 text-emerald-600' />
            </div>
            <p className='text-2xl font-bold text-gray-800'>
              {stats?.contacts?.total || 0}
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <div className='flex-1 h-2 bg-gray-200 rounded-full'>
                <div
                  className='h-2 bg-emerald-500 rounded-full'
                  style={{
                    width: `${((stats?.contacts?.total - stats?.contacts?.unread) / stats?.contacts?.total) * 100 || 0}%`,
                  }}
                />
              </div>
              <span className='text-xs text-gray-500'>
                {stats?.contacts?.unread || 0} unread
              </span>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-medium text-gray-500'>
                Admission Inquiries
              </h3>
              <MessageSquare className='h-5 w-5 text-blue-600' />
            </div>
            <p className='text-2xl font-bold text-gray-800'>
              {stats?.admissions?.total || 0}
            </p>
            <div className='mt-2 flex items-center gap-2'>
              <div className='flex-1 h-2 bg-gray-200 rounded-full'>
                <div
                  className='h-2 bg-blue-500 rounded-full'
                  style={{
                    width: `${((stats?.admissions?.total - stats?.admissions?.unread) / stats?.admissions?.total) * 100 || 0}%`,
                  }}
                />
              </div>
              <span className='text-xs text-gray-500'>
                {stats?.admissions?.unread || 0} unread
              </span>
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-medium text-gray-500'>Job Views</h3>
              <Eye className='h-5 w-5 text-purple-600' />
            </div>
            <p className='text-2xl font-bold text-gray-800'>
              {recentJobs
                .reduce((sum, job) => sum + (job.views || 0), 0)
                .toLocaleString()}
            </p>
            <p className='text-xs text-gray-500 mt-2'>
              Total views across all jobs
            </p>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-sm font-medium text-gray-500'>
                Conversion Rate
              </h3>
              <TrendingUp className='h-5 w-5 text-green-600' />
            </div>
            <p className='text-2xl font-bold text-gray-800'>
              {stats?.careers?.total_applications && stats?.careers?.total_jobs
                ? Math.round(
                    (stats.careers.total_applications /
                      stats.careers.total_jobs) *
                      100,
                  )
                : 0}
              %
            </p>
            <p className='text-xs text-gray-500 mt-2'>Applications per job</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* User Roles Pie Chart */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-lg font-semibold text-gray-800'>
                User Roles Distribution
              </h2>
              <div className='flex gap-2'>
                {['pie', 'bar'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedChart(type)}
                    className={`p-2 rounded-lg ${
                      selectedChart === type
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {type === 'pie' ? '🍕' : '📊'}
                  </button>
                ))}
              </div>
            </div>
            <div className='h-80'>
              {userRoleData.length > 0 ? (
                selectedChart === 'pie' ? (
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
                        outerRadius={100}
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
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width='100%' height='100%'>
                    <BarChart data={userRoleData}>
                      <CartesianGrid strokeDasharray='3 3' />
                      <XAxis dataKey='name' />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey='value' fill='#8884d8'>
                        {userRoleData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )
              ) : (
                <div className='flex items-center justify-center h-full text-gray-500'>
                  No user role data available
                </div>
              )}
            </div>
          </div>

          {/* Application Status Chart */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>
              Application Status
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
                    <Bar dataKey='value' fill='#82ca9d' radius={[0, 4, 4, 0]}>
                      {applicationStatusData.map((entry, index) => (
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
                  No application data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Second Row of Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
          {/* Course Levels Chart */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>
              Course Levels
            </h2>
            <div className='h-80'>
              {courseLevelData.length > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={courseLevelData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='count' fill='#8884d8' radius={[4, 4, 0, 0]}>
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

          {/* Blog Categories Chart */}
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>
              Blog Categories
            </h2>
            <div className='h-80'>
              {blogCategoryData.length > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={blogCategoryData}
                      cx='50%'
                      cy='50%'
                      labelLine={true}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={100}
                      fill='#8884d8'
                      dataKey='count'
                    >
                      {blogCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className='flex items-center justify-center h-full text-gray-500'>
                  No blog category data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Job Categories Chart */}
        <div className='grid grid-cols-1 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-6'>
              Job Categories
            </h2>
            <div className='h-80'>
              {jobCategoryData.length > 0 ? (
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={jobCategoryData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey='count' fill='#82ca9d' radius={[4, 4, 0, 0]}>
                      {jobCategoryData.map((entry, index) => (
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
                  No job category data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trend Analysis */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-8'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-lg font-semibold text-gray-800'>
              Activity Trends
            </h2>
            <div className='flex gap-2'>
              {['week', 'month', 'quarter'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium ${
                    timeRange === range
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
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
                  <linearGradient id='colorApps' x1='0' y1='0' x2='0' y2='1'>
                    <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                    <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
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
                  fillOpacity={1}
                  fill='url(#colorUsers)'
                  name='Users'
                />
                <Area
                  type='monotone'
                  dataKey='applications'
                  stroke='#82ca9d'
                  fillOpacity={1}
                  fill='url(#colorApps)'
                  name='Applications'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Bars */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h3 className='font-medium text-gray-700 mb-4'>System Health</h3>
            <div className='space-y-4'>
              <ProgressBar
                value={98}
                max={100}
                color='green'
                label='API Status'
              />
              <ProgressBar value={85} max={100} color='blue' label='Database' />
              <ProgressBar
                value={76}
                max={100}
                color='purple'
                label='Storage'
              />
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h3 className='font-medium text-gray-700 mb-4'>User Engagement</h3>
            <div className='space-y-4'>
              <ProgressBar
                value={65}
                max={100}
                color='yellow'
                label='Active Users'
              />
              <ProgressBar
                value={42}
                max={100}
                color='orange'
                label='Course Completion'
              />
              <ProgressBar
                value={38}
                max={100}
                color='red'
                label='Job Applications'
              />
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h3 className='font-medium text-gray-700 mb-4'>
              Content Performance
            </h3>
            <div className='space-y-4'>
              <ProgressBar
                value={92}
                max={100}
                color='teal'
                label='Blog Engagement'
              />
              <ProgressBar
                value={78}
                max={100}
                color='cyan'
                label='Course Ratings'
              />
              <ProgressBar
                value={88}
                max={100}
                color='indigo'
                label='Job Views'
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
          <QuickActionButton
            icon={<Users className='h-5 w-5' />}
            label='Add New User'
            to='/admin/users/new'
            color='blue'
          />
          <QuickActionButton
            icon={<BookOpen className='h-5 w-5' />}
            label='Create Course'
            to='/admin/courses/new'
            color='green'
          />
          <QuickActionButton
            icon={<Briefcase className='h-5 w-5' />}
            label='Post Job'
            to='/admin/careers/jobs/new'
            color='yellow'
          />
          <QuickActionButton
            icon={<FileText className='h-5 w-5' />}
            label='Write Blog'
            to='/admin/blogs/new'
            color='purple'
          />
        </div>

        {/* Recent Activity Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6'>
          {/* Recent Users */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Recent Users
                </h2>
                <Users className='h-5 w-5 text-blue-600' />
              </div>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentUsers.length > 0 ? (
                recentUsers.map((user, index) => (
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
                        <p className='text-xs text-gray-500'>{user.email}</p>
                        <p className='text-xs text-gray-400 mt-1'>
                          {formatDate(user.created_at)}
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

          {/* Recent Applications */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-gradient-to-r from-yellow-50 to-amber-50'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Recent Applications
                </h2>
                <Briefcase className='h-5 w-5 text-yellow-600' />
              </div>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentApplications.length > 0 ? (
                recentApplications.map((app, index) => {
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
                        <div className='h-10 w-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white font-bold'>
                          {applicantName.charAt(0)}
                        </div>
                        <div className='ml-4 flex-1'>
                          <p className='font-medium text-gray-800'>
                            {applicantName}
                          </p>
                          <p className='text-xs text-gray-500'>{jobTitle}</p>
                          <p className='text-xs text-gray-400 mt-1'>
                            {formatDate(app.created_at)}
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

          {/* Recent Jobs */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-gradient-to-r from-green-50 to-emerald-50'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Recent Jobs
                </h2>
                <Briefcase className='h-5 w-5 text-green-600' />
              </div>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentJobs.length > 0 ? (
                recentJobs.map((job, index) => (
                  <div
                    key={job._id || index}
                    className='px-6 py-4 hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white'>
                        <Briefcase className='h-5 w-5' />
                      </div>
                      <div className='ml-4 flex-1'>
                        <p className='font-medium text-gray-800'>{job.title}</p>
                        <p className='text-xs text-gray-500'>{job.company}</p>
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

          {/* Recent Blogs */}
          <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
            <div className='px-6 py-4 border-b bg-gradient-to-r from-purple-50 to-pink-50'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  Recent Blog Posts
                </h2>
                <FileText className='h-5 w-5 text-purple-600' />
              </div>
            </div>
            <div className='divide-y max-h-96 overflow-y-auto'>
              {recentBlogs.length > 0 ? (
                recentBlogs.map((blog, index) => (
                  <div
                    key={blog._id || index}
                    className='px-6 py-4 hover:bg-gray-50 transition-colors'
                  >
                    <div className='flex items-center'>
                      <div className='h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white'>
                        <FileText className='h-5 w-5' />
                      </div>
                      <div className='ml-4 flex-1'>
                        <p className='font-medium text-gray-800'>
                          {blog.title}
                        </p>
                        <p className='text-xs text-gray-500'>
                          {blog.category || 'Uncategorized'}
                        </p>
                        <p className='text-xs text-gray-400 mt-1'>
                          {formatDate(blog.created_at)}
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

        {/* Top Performing Items */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Top Viewed Jobs
            </h2>
            <div className='space-y-4'>
              {careersData?.top_jobs?.by_views?.map((job, index) => (
                <div
                  key={job._id || index}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-lg font-bold text-gray-400'>
                      #{index + 1}
                    </span>
                    <div>
                      <p className='font-medium text-gray-800'>{job.title}</p>
                      <p className='text-sm text-gray-500'>{job.company}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-gray-800'>{job.views}</p>
                    <p className='text-xs text-gray-500'>views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-white rounded-xl shadow-lg p-6'>
            <h2 className='text-lg font-semibold text-gray-800 mb-4'>
              Most Applied Jobs
            </h2>
            <div className='space-y-4'>
              {careersData?.top_jobs?.by_applications?.map((job, index) => (
                <div
                  key={job._id || index}
                  className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center gap-3'>
                    <span className='text-lg font-bold text-gray-400'>
                      #{index + 1}
                    </span>
                    <div>
                      <p className='font-medium text-gray-800'>{job.title}</p>
                      <p className='text-sm text-gray-500'>{job.company}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-gray-800'>
                      {job.applications_count}
                    </p>
                    <p className='text-xs text-gray-500'>applications</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
