"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Loader,
} from "lucide-react";
import { getAssignments } from "../../services/dashboard-service";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await getAssignments(filter);
        setAssignments(data.assignments || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load assignments. Please try again later.");
        setLoading(false);

        // Fallback data if API fails
        setAssignments([
          {
            id: 1,
            title: "A1 Grammar Exercise - Week 11",
            dueDate: "March 29, 2025",
            status: "pending",
            description:
              "Complete exercises on verb conjugation and sentence structure.",
            type: "quiz",
          },
          {
            id: 2,
            title: "Vocabulary Quiz - Family Members",
            dueDate: "March 27, 2025",
            status: "completed",
            description: "Test your knowledge of German family vocabulary.",
            type: "quiz",
            score: "85%",
          },
          {
            id: 3,
            title: "Writing Assignment - My Daily Routine",
            dueDate: "April 2, 2025",
            status: "pending",
            description:
              "Write a 200-word essay about your daily routine in German.",
            type: "essay",
          },
          {
            id: 4,
            title: "Listening Comprehension - Dialogues",
            dueDate: "March 25, 2025",
            status: "overdue",
            description:
              "Listen to dialogues and answer questions about the content.",
            type: "listening",
          },
          {
            id: 5,
            title: "A1 Mid-Term Assessment",
            dueDate: "April 10, 2025",
            status: "pending",
            description:
              "Comprehensive assessment covering all A1 material from weeks 1-6.",
            type: "exam",
          },
          {
            id: 6,
            title: "Reading Comprehension - Short Stories",
            dueDate: "March 20, 2025",
            status: "completed",
            description:
              "Read short stories and answer comprehension questions.",
            type: "reading",
            score: "92%",
          },
        ]);
      }
    };

    fetchAssignments();
  }, [filter]);

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true;
    return assignment.status === filter;
  });

  const getStatusBadge = (status, score) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed {score && `- ${score}`}
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="h-3 w-3 mr-1" />
            Overdue
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "quiz":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Quiz
          </span>
        );
      case "essay":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Essay
          </span>
        );
      case "listening":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            Listening
          </span>
        );
      case "exam":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            Exam
          </span>
        );
      case "reading":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
            Reading
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Assignments</h1>
        <p className="text-gray-600">
          View and complete your German language course assignments
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Your Assignments</h2>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === "pending"
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === "completed"
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter("overdue")}
              className={`px-3 py-1 text-sm rounded-md ${
                filter === "overdue"
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
            >
              Overdue
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="mt-2 text-gray-500">Loading assignments...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 text-sm underline text-primary"
            >
              Try again
            </button>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">
              No assignments found matching your filter.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 hover:bg-gray-50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-medium">{assignment.title}</h3>
                      {getStatusBadge(assignment.status, assignment.score)}
                      {getTypeBadge(assignment.type)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {assignment.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                  </div>

                  {assignment.status !== "completed" && (
                    <Link
                      to={`/dashboard/assignments/${assignment.id}`}
                      className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors inline-flex items-center gap-1"
                    >
                      {assignment.status === "overdue"
                        ? "Submit Late"
                        : "Start Assignment"}
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;
