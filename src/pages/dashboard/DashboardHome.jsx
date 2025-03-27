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
} from "lucide-react";

function DashboardHome() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (!user) return <div>Please log in to view your dashboard</div>;

  // Mock data for dashboard
  const upcomingClasses = [
    {
      id: 1,
      title: "German A1 - Lesson 12: Verb Conjugation",
      date: "March 28, 2025",
      time: "10:00 AM - 11:30 AM",
      meetLink: "https://meet.google.com/abc-defg-hij",
      instructor: "Frau Schmidt",
    },
    {
      id: 2,
      title: "German A1 - Lesson 13: Daily Routines",
      date: "March 30, 2025",
      time: "10:00 AM - 11:30 AM",
      meetLink: "https://meet.google.com/klm-nopq-rst",
      instructor: "Herr Müller",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "A1 Grammar Exercise - Week 11",
      dueDate: "March 29, 2025",
      status: "pending",
      description:
        "Complete exercises on verb conjugation and sentence structure.",
    },
    {
      id: 2,
      title: "Vocabulary Quiz - Family Members",
      dueDate: "March 27, 2025",
      status: "completed",
      description: "Test your knowledge of German family vocabulary.",
    },
    {
      id: 3,
      title: "Writing Assignment - My Daily Routine",
      dueDate: "April 2, 2025",
      status: "pending",
      description: "Write a 200-word essay about your daily routine in German.",
    },
  ];

  const courseProgress = 35; // percentage

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">
            Continue your journey with {user.course}
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
          {upcomingClasses.map((classItem) => (
            <div key={classItem.id} className="p-4 hover:bg-gray-50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">{classItem.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{classItem.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{classItem.time}</span>
                    </div>
                  </div>
                  <p className="text-sm mt-1">
                    Instructor: {classItem.instructor}
                  </p>
                </div>
                <a
                  href={classItem.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  Join Class
                </a>
              </div>
            </div>
          ))}
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
          {assignments.map((assignment) => (
            <div key={assignment.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{assignment.title}</h3>
                    {assignment.status === "completed" ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
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
                  <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {assignment.dueDate}</span>
                  </div>
                </div>
                {assignment.status !== "completed" && (
                  <Link
                    to={`/dashboard/assignments/${assignment.id}`}
                    className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary/90 transition-colors"
                  >
                    Start
                  </Link>
                )}
              </div>
            </div>
          ))}
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
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium">A1 Grammar Guide</h3>
            <p className="text-sm text-gray-600 mt-1">
              Comprehensive guide to German A1 grammar rules and examples.
            </p>
            <Link
              to="/dashboard/resources/grammar"
              className="text-primary text-sm font-medium mt-2 inline-flex items-center hover:underline"
            >
              View Resource <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium">Vocabulary Flashcards</h3>
            <p className="text-sm text-gray-600 mt-1">
              Interactive flashcards to help you memorize essential German
              vocabulary.
            </p>
            <Link
              to="/dashboard/resources/vocabulary"
              className="text-primary text-sm font-medium mt-2 inline-flex items-center hover:underline"
            >
              View Resource <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <h3 className="font-medium">Pronunciation Guide</h3>
            <p className="text-sm text-gray-600 mt-1">
              Audio examples and tips for proper German pronunciation.
            </p>
            <Link
              to="/dashboard/resources/pronunciation"
              className="text-primary text-sm font-medium mt-2 inline-flex items-center hover:underline"
            >
              View Resource <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
