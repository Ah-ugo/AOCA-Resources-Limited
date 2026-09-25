/** @format */

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
  Video,
  X,
} from 'lucide-react';
import { authService } from '../../services/auth-service';

export default function InstructorLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const menuItems = [
    {
      title: 'Overview',
      icon: <Home className="h-5 w-5" />,
      path: '/instructor/dashboard',
    },
    {
      title: 'Assessments',
      icon: <BookOpen className="h-5 w-5" />,
      path: '/instructor/assessments',
    },

    {
      title: 'Students',
      icon: <Users className="h-5 w-5" />,
      path: '/instructor/students',
    },
    {
      title: 'Live Classes',
      icon: <CalendarDays className="h-5 w-5" />,
      path: '/instructor/classes',
    },
    {
      title: 'Lessons',
      icon: <Video className="h-5 w-5" />,
      path: '/instructor/lessons',
    },
    {
      title: 'Messages',
      icon: <MessageSquare className="h-5 w-5" />,
      path: '/instructor/messages',
    },
    {
      title: 'Resources',
      icon: <Briefcase className="h-5 w-5" />,
      path: '/instructor/resources',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      path: '/instructor/settings',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="lg:hidden fixed inset-x-0 top-0 z-30 border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <Link
            to="/instructor/dashboard"
            className="flex items-center gap-2 font-bold text-slate-900"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span>AOCA Instructor</span>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            {isSidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-20 w-72 border-r border-slate-200 bg-white shadow-sm transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5">
            <Link
              to="/instructor/dashboard"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Instructor</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  AOCA LMS
                </p>
              </div>
            </Link>
          </div>

          <div className="border-b border-slate-200 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <User className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  {currentUser?.first_name || 'Instructor'}{' '}
                  {currentUser?.last_name || ''}
                </p>
                <p className="truncate text-xs text-slate-500">
                  {currentUser?.email || 'mentor@aoca.com'}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {menuItems.map((item) => {
              const active =
                location.pathname === item.path ||
                location.pathname.startsWith(`${item.path}/`);
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.title}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 p-3">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
          </div>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-72">
        <div className="px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{children}</div>
      </main>
    </div>
  );
}
