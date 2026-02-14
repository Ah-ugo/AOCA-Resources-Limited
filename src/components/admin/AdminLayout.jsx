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
} from 'lucide-react';
import { useState } from 'react';
import { authService } from '../../services/auth-service';

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <Home className='w-5 h-5' />,
      path: '/admin/dashboard',
    },
    {
      title: 'Users',
      icon: <Users className='w-5 h-5' />,
      path: '/admin/users',
    },
    {
      title: 'Blog',
      icon: <FileText className='w-5 h-5' />,
      path: '/admin/blogs',
    },
    {
      title: 'Courses',
      icon: <BookOpen className='w-5 h-5' />,
      path: '/admin/courses',
    },
    {
      title: 'Lessons',
      icon: <BookOpen className='w-5 h-5' />,
      path: '/admin/lessons',
    },
    {
      title: 'Jobs',
      icon: <Briefcase className='w-5 h-5' />,
      path: '/admin/careers/jobs',
    },
    {
      title: 'Applications',
      icon: <FileText className='w-5 h-5' />,
      path: '/admin/careers/applications',
    },
    {
      title: 'Messages',
      icon: <MessageCircle className='w-5 h-5' />,
      path: '/admin/messages',
    },
    {
      title: 'Settings',
      icon: <Settings className='w-5 h-5' />,
      path: '/admin/settings',
    },
  ];

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gray-100'>
      {/* Mobile header */}
      <div className='lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b px-4 py-2 flex items-center justify-between'>
        <Link to='/admin/dashboard' className='flex items-center gap-2'>
          <BarChart3 className='h-6 w-6 text-primary' />
          <span className='font-bold'>Admin Panel</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className='p-2 rounded-md hover:bg-gray-100'
        >
          {isSidebarOpen ? (
            <X className='h-6 w-6' />
          ) : (
            <Menu className='h-6 w-6' />
          )}
        </button>
      </div>

      <div className='flex'>
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-md transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className='p-4 border-b'>
            <Link to='/admin/dashboard' className='flex items-center space-x-2'>
              <BarChart3 className='h-6 w-6 text-primary' />
              <span className='text-xl font-bold'>Admin Panel</span>
            </Link>
          </div>

          <div className='p-4'>
            <div className='flex items-center space-x-3 mb-6'>
              <div className='h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center'>
                <span className='text-primary font-bold'>
                  {currentUser?.first_name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className='font-medium'>
                  {currentUser?.first_name} {currentUser?.last_name}
                </p>
                <p className='text-sm text-gray-500'>{currentUser?.email}</p>
              </div>
            </div>

            <nav className='space-y-1'>
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  handleLogout();
                  setIsSidebarOpen(false);
                }}
                className='flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left'
              >
                <LogOut className='w-5 h-5' />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <div className='flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen'>
          <header className='hidden lg:block bg-white shadow-sm sticky top-0 z-10'>
            <div className='px-6 py-4'>
              <h1 className='text-2xl font-bold text-gray-800'>
                {menuItems.find((item) => item.path === location.pathname)
                  ?.title || 'Admin Panel'}
              </h1>
            </div>
          </header>

          <main className='p-6'>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
