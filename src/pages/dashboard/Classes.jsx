"use client";

import { useState, useEffect } from "react";
import {
  Video,
  Calendar,
  Clock,
  User,
  ExternalLink,
  Loader,
} from "lucide-react";
import { getClasses } from "../../services/dashboard-service";

function Classes() {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [pastClasses, setPastClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const data = await getClasses(activeTab);

        if (activeTab === "upcoming") {
          setUpcomingClasses(data.classes || []);
        } else {
          setPastClasses(data.classes || []);
        }

        setLoading(false);
      } catch (err) {
        console.error(`Error fetching ${activeTab} classes:`, err);
        setError(
          `Failed to load ${activeTab} classes. Please try again later.`
        );
        setLoading(false);

        // Fallback data if API fails
        if (activeTab === "upcoming") {
          setUpcomingClasses([
            {
              id: 1,
              title: "German A1 - Lesson 12: Verb Conjugation",
              date: "March 28, 2025",
              time: "10:00 AM - 11:30 AM",
              meetLink: "https://meet.google.com/abc-defg-hij",
              instructor: "Frau Schmidt",
              description:
                "In this class, we will learn about regular and irregular verb conjugation in the present tense.",
            },
            {
              id: 2,
              title: "German A1 - Lesson 13: Daily Routines",
              date: "March 30, 2025",
              time: "10:00 AM - 11:30 AM",
              meetLink: "https://meet.google.com/klm-nopq-rst",
              instructor: "Herr Müller",
              description:
                "Learn vocabulary and phrases related to daily activities and routines.",
            },
            {
              id: 3,
              title: "German A1 - Lesson 14: Question Words",
              date: "April 1, 2025",
              time: "10:00 AM - 11:30 AM",
              meetLink: "https://meet.google.com/uvw-xyz-123",
              instructor: "Frau Schmidt",
              description:
                "Learn how to form questions in German using question words like wer, was, wo, wann, etc.",
            },
            {
              id: 4,
              title: "German A1 - Lesson 15: Numbers and Time",
              date: "April 4, 2025",
              time: "10:00 AM - 11:30 AM",
              meetLink: "https://meet.google.com/456-789-abc",
              instructor: "Herr Müller",
              description:
                "Practice numbers, telling time, and discussing schedules in German.",
            },
          ]);
        } else {
          setPastClasses([
            {
              id: 101,
              title: "German A1 - Lesson 11: Introduction to Verbs",
              date: "March 25, 2025",
              time: "10:00 AM - 11:30 AM",
              instructor: "Frau Schmidt",
              recordingLink: "https://drive.google.com/file/d/recording1",
              description:
                "Introduction to German verbs and their basic forms.",
            },
            {
              id: 102,
              title: "German A1 - Lesson 10: Articles and Nouns",
              date: "March 23, 2025",
              time: "10:00 AM - 11:30 AM",
              instructor: "Herr Müller",
              recordingLink: "https://drive.google.com/file/d/recording2",
              description:
                "Learn about German articles (der, die, das) and noun genders.",
            },
            {
              id: 103,
              title: "German A1 - Lesson 9: Basic Conversations",
              date: "March 21, 2025",
              time: "10:00 AM - 11:30 AM",
              instructor: "Frau Schmidt",
              recordingLink: "https://drive.google.com/file/d/recording3",
              description:
                "Practice basic conversational phrases and dialogues in German.",
            },
          ]);
        }
      }
    };

    fetchClasses();
  }, [activeTab]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Live Classes</h1>
        <p className="text-gray-600">
          Join interactive German language classes via Google Meet
        </p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "upcoming"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming Classes
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === "past"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Classes
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Loader className="h-8 w-8 text-primary animate-spin mx-auto" />
            <p className="mt-2 text-gray-500">Loading classes...</p>
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
        ) : activeTab === "upcoming" ? (
          <div className="divide-y">
            {upcomingClasses.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No upcoming classes scheduled.
              </div>
            ) : (
              upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{classItem.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {classItem.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{classItem.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Instructor: {classItem.instructor}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={classItem.meet_link}
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
        ) : (
          <div className="divide-y">
            {pastClasses.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No past classes found.
              </div>
            ) : (
              pastClasses.map((classItem) => (
                <div key={classItem.id} className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{classItem.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {classItem.description}
                      </p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{classItem.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{classItem.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>Instructor: {classItem.instructor}</span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={classItem.recordingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors inline-flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Recording
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Class Calendar */}
      <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-primary text-white">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Class Schedule
          </h2>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Your German A1 classes are scheduled for:
          </p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>Monday, Wednesday, Friday: 10:00 AM - 11:30 AM</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              <Video className="h-4 w-4 text-primary" />
              <span>All classes are conducted via Google Meet</span>
            </li>
            <li className="flex items-center gap-2 text-gray-500">
              <User className="h-4 w-4 text-primary" />
              <span>Primary instructors: Frau Schmidt and Herr Müller</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Classes;
