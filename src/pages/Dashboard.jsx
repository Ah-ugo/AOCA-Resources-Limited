"use client";

import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  Globe,
  Menu,
  X,
  Home,
  Book,
  FileText,
  Video,
  LogOut,
  User,
  Briefcase,
} from "lucide-react";
import {
  isAuthenticated,
  logoutUser,
  getCurrentUser,
} from "../services/auth-service";

// Dashboard components
import DashboardHome from "./dashboard/DashboardHome";
import Assignments from "./dashboard/Assignments";
import Classes from "./dashboard/Classes";
import Resources from "./dashboard/Resources";
import Profile from "./dashboard/Profile";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    // Get user from auth service
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    } else {
      navigate("/login");
    }

    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b px-4 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Globe className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl">AOCA Resources</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-white border-r transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">AOCA Resources</span>
            </Link>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {user.name || user.first_name + " " + user.last_name}
                </p>
                <p className="text-sm text-gray-500">
                  {user.course || user.role}
                </p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === "/dashboard"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/dashboard/assignments"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === "/dashboard/assignments"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FileText className="h-5 w-5" />
              <span>Assignments</span>
            </Link>
            <Link
              to="/dashboard/classes"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === "/dashboard/classes"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Video className="h-5 w-5" />
              <span>Live Classes</span>
            </Link>
            <Link
              to="/dashboard/resources"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === "/dashboard/resources"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Book className="h-5 w-5" />
              <span>Learning Resources</span>
            </Link>
            {/* <Link
              to="/careers"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname.startsWith("/careers")
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <Briefcase className="h-5 w-5" />
              <span>Careers</span>
            </Link> */}
            <Link
              to="/dashboard/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                location.pathname === "/dashboard/profile"
                  ? "bg-primary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className={`lg:ml-64 pt-14 lg:pt-0 min-h-screen`}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
