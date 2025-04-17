"use client";

import { useEffect, useState } from "react";
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
} from "recharts";
import { Users, BookOpen, FileText, BriefcaseIcon } from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminService } from "../../services/admin-service";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [application, setApplications] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setIsLoading(true);
        const data = await adminService.getAdminStats();
        const getAllApplications = await adminService.careerStats();
        setApplications(getAllApplications);
        setStats(data);
      } catch (err) {
        setError("Failed to load dashboard statistics");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Prepare data for charts
  const userRoleData =
    stats?.user_stats?.by_role?.map((role) => ({
      name: role._id || "Unknown",
      value: role.count,
    })) || [];

  const courseLevelData =
    stats?.course_stats?.by_level?.map((level) => ({
      name: level._id || "Unknown",
      count: level.count,
    })) || [];

  const blogCategoryData =
    stats?.blog_stats?.by_category?.map((category) => ({
      name: category._id || "Uncategorized",
      count: category.count,
    })) || [];

  const applicationStatusData =
    stats?.application_stats?.by_status?.map((status) => ({
      name: status._id || "Unknown",
      count: status.count,
    })) || [];

  // Colors for pie chart
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Users className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Users</p>
              <p className="text-2xl font-semibold">
                {stats?.user_stats?.total || 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-green-600 text-sm">
              <span className="font-medium">
                {stats?.user_stats?.active || 0}
              </span>{" "}
              active users
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Courses</p>
              <p className="text-2xl font-semibold">
                {stats?.course_stats?.total || 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-green-600 text-sm">
              <span className="font-medium">
                {stats?.course_stats?.enrollments || 0}
              </span>{" "}
              enrollments
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FileText className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Blog Posts</p>
              <p className="text-2xl font-semibold">
                {stats?.blog_stats?.total_posts || 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-purple-600 text-sm">
              <span className="font-medium">
                {stats?.blog_stats?.total_comments || 0}
              </span>{" "}
              comments
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <BriefcaseIcon className="h-8 w-8" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Job Listings</p>
              <p className="text-2xl font-semibold">
                {application?.job_stats?.total || 0}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-yellow-600 text-sm">
              <span className="font-medium">
                {application?.application_stats?.total || 0}
              </span>{" "}
              applications
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            User Roles Distribution
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoleData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
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
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Blog Categories</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={blogCategoryData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Posts" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent User Registrations</h2>
          </div>
          <div className="divide-y">
            {stats?.recent_activity?.users?.slice(0, 5).map((user, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Users className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {(!stats?.recent_activity?.users ||
              stats.recent_activity.users.length === 0) && (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent user registrations
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Job Applications</h2>
          </div>
          <div className="divide-y">
            {application?.recent_activity?.applications
              ?.slice(0, 5)
              .map((application, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                      <BriefcaseIcon className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">
                        {application.user?.name || "Unknown User"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Applied for: {application.job?.title || "Unknown Job"}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          application.status === "applied"
                            ? "bg-blue-100 text-blue-800"
                            : application.status === "reviewed"
                            ? "bg-yellow-100 text-yellow-800"
                            : application.status === "interview"
                            ? "bg-purple-100 text-purple-800"
                            : application.status === "hired"
                            ? "bg-green-100 text-green-800"
                            : application.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {application.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            {(!application?.recent_activity?.applications ||
              application.recent_activity.applications.length === 0) && (
              <div className="px-6 py-4 text-center text-gray-500">
                No recent job applications
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
