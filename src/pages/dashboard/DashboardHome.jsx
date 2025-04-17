"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  Video,
  Book,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";
import { getUserDashboard } from "../../services/dashboard-service";
import { getCurrentUser } from "../../services/auth-service";

function DashboardHome() {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user from auth service
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const data = await getUserDashboard();
        console.log("Dashboard data:", data);
        setDashboardData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="h-8 w-8 text-primary animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!user) return <div>Please log in to view your dashboard</div>;

  // Extract data from API response or use fallback data
  const courses = dashboardData?.courses || [];
  const upcomingClasses = dashboardData?.upcoming_classes || [];
  const pendingAssignments = dashboardData?.pending_assignments || [];

  // Calculate overall course progress (average of all courses)
  const courseProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, course) => sum + (course.progress || 0), 0) /
            courses.length
        )
      : 0;

  // Get the first course name for display
  const courseName = courses.length > 0 ? courses[0].name : "your courses";

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user.name || `${user.first_name} ${user.last_name}`}!
          </h1>
          <p className="text-gray-600">
            Continue your journey with {courseName}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 w-full md:w-auto">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {courseProgress}%
              </span>
            </div>
            <div>
              <p className="font-medium">Course Progress</p>
              <div className="w-40 h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-primary rounded-full"
                  style={{ width: `${courseProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      {courses.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Book className="h-5 w-5" />
              Your Courses
            </h2>
            <Link
              to="/dashboard/courses"
              className="text-sm flex items-center hover:underline"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-medium">{course.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Level: {course.level}
                </p>
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">
                      {course.progress || 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Classes */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Video className="h-5 w-5" />
            Upcoming Classes
          </h2>
          <Link
            to="/dashboard/classes"
            className="text-sm flex items-center hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y">
          {upcomingClasses.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No upcoming classes scheduled.
            </div>
          ) : (
            upcomingClasses.map((classItem) => (
              <div
                key={classItem.id || classItem._id}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-medium">{classItem.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(classItem.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>
                          {classItem.time ||
                            new Date(classItem.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm mt-1">
                      {classItem.course?.name &&
                        `Course: ${classItem.course.name}`}
                    </p>
                    {classItem.instructor && (
                      <p className="text-sm mt-1">
                        Instructor:{" "}
                        {classItem.instructor.name || classItem.instructor}
                      </p>
                    )}
                  </div>
                  <a
                    href={classItem.meet_link || classItem.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Join Class
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Assignments */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Assignments
          </h2>
          <Link
            to="/dashboard/assignments"
            className="text-sm flex items-center hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="divide-y">
          {pendingAssignments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No assignments available.
            </div>
          ) : (
            pendingAssignments.map((assignment) => (
              <div
                key={assignment.id || assignment._id}
                className="p-4 hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{assignment.title}</h3>
                      {assignment.status === "completed" ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </span>
                      ) : new Date(assignment.due_date) < new Date() ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Overdue
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {assignment.description}
                    </p>
                    {assignment.course && (
                      <p className="text-sm text-gray-600 mt-1">
                        Course: {assignment.course.name}
                      </p>
                    )}
                    <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Due:{" "}
                        {new Date(assignment.due_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {assignment.status !== "completed" && (
                    <Link
                      to={`/dashboard/assignments/${
                        assignment.id || assignment._id
                      }`}
                      className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
                    >
                      Start
                    </Link>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Learning Resources */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-primary text-white flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Book className="h-5 w-5" />
            Learning Resources
          </h2>
          <Link
            to="/dashboard/resources"
            className="text-sm flex items-center hover:underline"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {!dashboardData?.resources || dashboardData.resources.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No resources available.
            </div>
          ) : (
            // If resources are available in the API response, use them
            dashboardData.resources.map((resource) => (
              <div
                key={resource.id || resource._id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <h3 className="font-medium">{resource.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {resource.description}
                </p>
                <Link
                  to={
                    resource.link ||
                    `/dashboard/resources/${resource.id || resource._id}`
                  }
                  className="text-primary text-sm font-medium mt-auto pt-2 inline-flex items-center hover:underline"
                >
                  View Resource <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            ))
          )}

          {/* If no resources in API but we have fallback data */}
          {(!dashboardData?.resources ||
            dashboardData.resources.length === 0) && (
            <>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-medium">A1 Grammar Guide</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Comprehensive guide to German A1 grammar rules and examples.
                </p>
                <Link
                  to="/dashboard/resources/grammar"
                  className="text-primary text-sm font-medium mt-auto pt-2 inline-flex items-center hover:underline"
                >
                  View Resource <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-medium">Vocabulary Flashcards</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Interactive flashcards to help you memorize essential German
                  vocabulary.
                </p>
                <Link
                  to="/dashboard/resources/vocabulary"
                  className="text-primary text-sm font-medium mt-auto pt-2 inline-flex items-center hover:underline"
                >
                  View Resource <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col h-full">
                <h3 className="font-medium">Pronunciation Guide</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Audio examples and tips for proper German pronunciation.
                </p>
                <Link
                  to="/dashboard/resources/pronunciation"
                  className="text-primary text-sm font-medium mt-auto pt-2 inline-flex items-center hover:underline"
                >
                  View Resource <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
