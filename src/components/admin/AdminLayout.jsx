"use client";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  Briefcase,
  FileText,
  Home,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { authService } from "../../services/auth-service";

function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <Home className="w-5 h-5" />,
      path: "/admin/dashboard",
    },
    {
      title: "Users",
      icon: <Users className="w-5 h-5" />,
      path: "/admin/users",
    },
    {
      title: "Blog",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/blogs",
    },
    {
      title: "Courses",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/admin/courses",
    },
    {
      title: "Lessons",
      icon: <BookOpen className="w-5 h-5" />,
      path: "/admin/lessons",
    },
    {
      title: "Jobs",
      icon: <Briefcase className="w-5 h-5" />,
      path: "/admin/careers/jobs",
    },
    {
      title: "Applications",
      icon: <FileText className="w-5 h-5" />,
      path: "/admin/careers/applications",
    },
    {
      title: "Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/settings",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <Link to="/admin/dashboard" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold">
                {currentUser?.first_name?.charAt(0) || "A"}
              </span>
            </div>
            <div>
              <p className="font-medium">
                {currentUser?.first_name} {currentUser?.last_name}
              </p>
              <p className="text-sm text-gray-500">{currentUser?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {menuItems.find((item) => item.path === location.pathname)
                ?.title || "Admin Panel"}
            </h1>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
