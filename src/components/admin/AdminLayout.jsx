/** @format */

'use client';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  FileText,
  Home,
  LogOut,
  MessageCircle,
  Settings,
  Users,
  Menu,
  X,
  GraduationCap,
  Mail,
  ChevronDown,
  Bell,
  User,
  Grid,
  Award,
  Calendar,
  Clock,
  TrendingUp,
  Shield,
  HelpCircle,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { authService } from '../../services/auth-service';

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    // Close sidebar on route change on mobile
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className='w-5 h-5' />,
      path: '/admin/dashboard',
      badge: null,
    },
    {
      title: 'Users',
      icon: <Users className='w-5 h-5' />,
      path: '/admin/users',
      badge: null,
    },
    {
      title: 'Blog',
      icon: <FileText className='w-5 h-5' />,
      path: '/admin/blogs',
      badge: null,
    },
    {
      title: 'Courses',
      icon: <BookOpen className='w-5 h-5' />,
      path: '/admin/courses',
      badge: null,
    },
    {
      title: 'Lessons',
      icon: <GraduationCap className='w-5 h-5' />,
      path: '/admin/lessons',
      badge: null,
    },
    {
      title: 'Jobs',
      icon: <Briefcase className='w-5 h-5' />,
      path: '/admin/careers/jobs',
      badge: null,
    },
    {
      title: 'Applications',
      icon: <FileText className='w-5 h-5' />,
      path: '/admin/careers/applications',
      badge: notifications,
    },
    {
      title: 'Messages',
      icon: <MessageCircle className='w-5 h-5' />,
      path: '/admin/messages',
      badge: 5,
    },
    {
      title: 'Settings',
      icon: <Settings className='w-5 h-5' />,
      path: '/admin/settings',
      badge: null,
    },
    {
      title: 'Analytics',
      icon: <TrendingUp className='w-5 h-5' />,
      path: '/admin/analytics',
      badge: null,
    },
    {
      title: 'Reports',
      icon: <FileText className='w-5 h-5' />,
      path: '/admin/reports',
      badge: null,
    },
    {
      title: 'Support',
      icon: <HelpCircle className='w-5 h-5' />,
      path: '/admin/support',
      badge: null,
    },
  ];

  const quickActions = [
    {
      label: 'New User',
      icon: <User className='w-4 h-4' />,
      path: '/admin/users/new',
    },
    {
      label: 'New Course',
      icon: <BookOpen className='w-4 h-4' />,
      path: '/admin/courses/new',
    },
    {
      label: 'New Job',
      icon: <Briefcase className='w-4 h-4' />,
      path: '/admin/careers/jobs/new',
    },
    {
      label: 'New Blog',
      icon: <FileText className='w-4 h-4' />,
      path: '/admin/blogs/new',
    },
  ];

  return (
    <div className={`min-h-screen bg-gray-50 ${isDarkMode ? 'dark' : ''}`}>
      {/* Mobile header */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm'>
        <Link to='/admin/dashboard' className='flex items-center gap-2'>
          <div className='h-8 w-8 bg-emerald-600 rounded-lg flex items-center justify-center'>
            <BarChart3 className='h-5 w-5 text-white' />
          </div>
          <span className='font-bold text-gray-800'>AOCA Admin</span>
        </Link>
        <div className='flex items-center gap-2'>
          <button className='p-2 rounded-lg hover:bg-gray-100 relative'>
            <Bell className='h-5 w-5 text-gray-600' />
            {notifications > 0 && (
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
            )}
          </button>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className='p-2 rounded-lg hover:bg-gray-100'
          >
            {isSidebarOpen ? (
              <X className='h-5 w-5 text-gray-600' />
            ) : (
              <Menu className='h-5 w-5 text-gray-600' />
            )}
          </button>
        </div>
      </div>

      <div className='flex'>
        {/* Sidebar Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className='fixed inset-0 bg-black/50 z-20 lg:hidden'
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Now scrollable */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Sidebar Header - Fixed at top */}
          <div className='h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-700 flex-shrink-0'>
            <Link to='/admin/dashboard' className='flex items-center gap-2'>
              <div className='h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm'>
                <BarChart3 className='h-5 w-5 text-white' />
              </div>
              <span className='text-xl font-bold text-white'>AOCA Admin</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className='lg:hidden p-1 rounded-lg hover:bg-white/20'
            >
              <X className='h-5 w-5 text-white' />
            </button>
          </div>

          {/* Scrollable Content Area */}
          <div className='flex-1 overflow-y-auto'>
            {/* User Profile Section */}
            <div className='p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white'>
              <div className='flex items-center space-x-4'>
                <div className='h-14 w-14 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg flex-shrink-0'>
                  <span className='text-white text-xl font-bold'>
                    {currentUser?.first_name?.charAt(0) || 'A'}
                    {currentUser?.last_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-semibold text-gray-800 truncate'>
                    {currentUser?.first_name} {currentUser?.last_name}
                  </p>
                  <p className='text-sm text-gray-500 truncate'>
                    {currentUser?.email}
                  </p>
                  <div className='flex items-center gap-2 mt-2 flex-wrap'>
                    <span className='px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded-full font-medium'>
                      Admin
                    </span>
                    <span className='px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium'>
                      Super Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className='p-4 border-b border-gray-200'>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3'>
                Quick Actions
              </p>
              <div className='grid grid-cols-2 gap-2'>
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.path}
                    className='flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors group'
                  >
                    <div className='p-1.5 bg-gray-100 rounded-lg group-hover:bg-emerald-100 transition-colors flex-shrink-0'>
                      {action.icon}
                    </div>
                    <span className='text-xs font-medium text-gray-700 truncate'>
                      {action.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className='p-4'>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3'>
                Main Menu
              </p>
              <nav className='space-y-1'>
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                      location.pathname === item.path
                        ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className='flex items-center gap-3 min-w-0'>
                      <span
                        className={`p-1.5 rounded-lg flex-shrink-0 ${
                          location.pathname === item.path
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className='font-medium truncate'>{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className='px-2 py-0.5 bg-red-500 text-white text-xs rounded-full flex-shrink-0 ml-2'>
                        {item.badge}
                      </span>
                    )}
                    {location.pathname === item.path && (
                      <ChevronRight className='w-4 h-4 text-emerald-500 flex-shrink-0' />
                    )}
                  </Link>
                ))}
              </nav>

              {/* System Section */}
              <div className='mt-6 pt-6 border-t border-gray-200'>
                <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3'>
                  System
                </p>
                <nav className='space-y-1'>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100 w-full'
                  >
                    <span className='p-1.5 rounded-lg bg-gray-100 text-gray-500 flex-shrink-0'>
                      {isDarkMode ? (
                        <Sun className='w-5 h-5' />
                      ) : (
                        <Moon className='w-5 h-5' />
                      )}
                    </span>
                    <span className='font-medium'>
                      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>

                  <Link
                    to='/admin/help'
                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-100'
                  >
                    <span className='p-1.5 rounded-lg bg-gray-100 text-gray-500 flex-shrink-0'>
                      <HelpCircle className='w-5 h-5' />
                    </span>
                    <span className='font-medium'>Help & Support</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 w-full'
                  >
                    <span className='p-1.5 rounded-lg bg-red-50 text-red-600 flex-shrink-0'>
                      <LogOut className='w-5 h-5' />
                    </span>
                    <span className='font-medium'>Logout</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Sidebar Footer - Fixed at bottom */}
          <div className='p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0'>
            <div className='flex items-center justify-between text-xs text-gray-500'>
              <span>v1.0.0</span>
              <span>© 2026 AOCA</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className='flex-1 lg:ml-72 min-h-screen flex flex-col'>
          {/* Top Navigation Bar */}
          <header className='bg-white shadow-sm sticky top-0 z-10 border-b border-gray-200 flex-shrink-0'>
            <div className='px-8 py-3 flex items-center justify-between'>
              <div className='flex items-center gap-4 min-w-0'>
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className='lg:hidden p-2 rounded-lg hover:bg-gray-100 flex-shrink-0'
                >
                  <Menu className='h-5 w-5 text-gray-600' />
                </button>
                <h1 className='text-xl font-bold text-gray-800 truncate'>
                  {menuItems.find((item) => item.path === location.pathname)
                    ?.title || 'Admin Panel'}
                </h1>
                <span className='hidden md:block text-sm text-gray-400 flex-shrink-0'>
                  /
                </span>
                <span className='hidden md:block text-sm text-gray-500 truncate'>
                  {new Date().toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>

              <div className='flex items-center gap-3 flex-shrink-0'>
                {/* Quick Search */}
                <div className='hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg'>
                  <Search className='w-4 h-4 text-gray-400 flex-shrink-0' />
                  <input
                    type='text'
                    placeholder='Quick search...'
                    className='bg-transparent border-none outline-none text-sm w-48'
                  />
                  <span className='text-xs text-gray-400'>⌘K</span>
                </div>

                {/* Notifications */}
                <button className='p-2 rounded-lg hover:bg-gray-100 relative flex-shrink-0'>
                  <Bell className='h-5 w-5 text-gray-600' />
                  {notifications > 0 && (
                    <span className='absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full'>
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className='relative flex-shrink-0'>
                  <button
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                    className='flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100'
                  >
                    <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center'>
                      <span className='text-white text-sm font-bold'>
                        {currentUser?.first_name?.charAt(0) || 'A'}
                      </span>
                    </div>
                    <ChevronDown className='h-4 w-4 text-gray-500' />
                  </button>

                  {isProfileMenuOpen && (
                    <>
                      <div
                        className='fixed inset-0 z-40'
                        onClick={() => setIsProfileMenuOpen(false)}
                      />
                      <div className='absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 py-1'>
                        <Link
                          to='/admin/profile'
                          className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          <User className='w-4 h-4' />
                          Profile
                        </Link>
                        <Link
                          to='/admin/settings'
                          className='flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                        >
                          <Settings className='w-4 h-4' />
                          Settings
                        </Link>
                        <hr className='my-1 border-gray-200' />
                        <button
                          onClick={handleLogout}
                          className='flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full'
                        >
                          <LogOut className='w-4 h-4' />
                          Logout
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content - Scrollable */}
          <main className='flex-1 p-8 overflow-y-auto'>{children}</main>
        </div>
      </div>
    </div>
  );
}

// Search icon component
const Search = (props) => (
  <svg
    {...props}
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <circle cx='11' cy='11' r='8' />
    <line x1='21' y1='21' x2='16.65' y2='16.65' />
  </svg>
);

export default AdminLayout;
