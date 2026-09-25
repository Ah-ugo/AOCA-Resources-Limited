/** @format */

import React, { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  FileText,
  TrendingUp,
  MessageSquare,
  Video,
  Plus,
  Loader2,
  CalendarClock,
  ArrowUpRight,
  Check,
} from 'lucide-react';
import {
  getInstructorStats,
  getInstructorCoursesList,
  getStoredLiveClasses,
  saveLiveClass,
  getStoredGradingQueue,
  updateGradingQueue,
} from '../../services/instructor-service';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}
      >
        <Icon size={24} />
      </div>
      {subtext && (
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
          {subtext}
        </span>
      )}
    </div>
    <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
    <p className="text-gray-500 text-sm font-medium">{title}</p>
  </div>
);

const gradeStyles = {
  A: 'bg-emerald-100 text-emerald-800',
  B: 'bg-sky-100 text-sky-800',
  C: 'bg-amber-100 text-amber-800',
};

export default function InstructorDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [liveClasses, setLiveClasses] = useState([]);
  const [gradingQueue, setGradingQueue] = useState([]);
  const [classTitle, setClassTitle] = useState('');
  const [classLink, setClassLink] = useState('');
  const [linkError, setLinkError] = useState('');
  const [assignedCourses, setAssignedCourses] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getInstructorStats();
        setStats(data.stats);
        setRecentActivity(data.recent_enrollments || []);
      } catch (error) {
        console.error('Failed to fetch instructor stats', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const data = await getInstructorCoursesList();
        setAssignedCourses(data.courses || []);
      } catch (error) {
        console.error('Failed to fetch instructor courses', error);
      }
    };

    fetchStats();
    fetchCourses();
    setLiveClasses(getStoredLiveClasses());
    setGradingQueue(getStoredGradingQueue());
  }, []);

  const handleSaveClass = (event) => {
    event.preventDefault();

    const normalized = classLink.trim();
    if (!normalized) {
      setLinkError('Paste a live class link before saving.');
      return;
    }

    const validLink = /https?:\/\//i.test(normalized);
    if (!validLink) {
      setLinkError('Please provide a valid URL to the live class.');
      return;
    }

    const next = saveLiveClass({
      title: classTitle.trim() || 'Live Class Session',
      link: normalized,
      createdAt: new Date().toISOString(),
    });

    setLiveClasses(next);
    setClassTitle('');
    setClassLink('');
    setLinkError('');
  };

  const handleGradeSubmission = (entryId, grade) => {
    const nextQueue = updateGradingQueue(entryId, grade);
    setGradingQueue(nextQueue);
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">
            AOCA Instructor Command Center
          </h1>
          <p className="text-gray-500 mt-1">
            Track learner progress, class delivery, and grading activity across
            your AOCA programs.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/instructor/classes"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus size={16} /> Schedule Class
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value={stats?.total_students || 0}
          icon={Users}
          color="bg-blue-500"
          subtext="Active"
        />
        <StatCard
          title="Active Courses"
          value={stats?.total_courses || 0}
          icon={BookOpen}
          color="bg-emerald-500"
        />
        <StatCard
          title="Assignments to Grade"
          value={
            stats?.pending_grading ||
            gradingQueue.filter((item) => !item.grade).length ||
            0
          }
          icon={FileText}
          color="bg-amber-500"
          subtext="Action needed"
        />
        <StatCard
          title="Total Assignments"
          value={stats?.total_assignments || 0}
          icon={TrendingUp}
          color="bg-purple-500"
        />
      </div>

      <div className="mb-8">
        <h3 className="mb-4 font-bold text-lg text-gray-900">Assigned Courses</h3>
        {assignedCourses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
            No courses assigned yet.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {assignedCourses.map((course) => (
              <div
                key={course._id || course.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-lg font-bold text-slate-900">
                  {course.name || course.title || 'Untitled course'}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {course.level || 'General'} •{' '}
                  {course.enrollment_count || 0} active learners
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-gray-900">
              Recent Enrollments
            </h3>
            <Link
              to="/instructor/students"
              className="text-emerald-600 text-sm font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-4">
                    Student
                  </th>
                  <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-4">
                    Course
                  </th>
                  <th className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-4">
                    Date
                  </th>
                  <th className="text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-4">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold">
                            {activity.student_name?.charAt(0) || 'S'}
                          </div>
                          <span className="font-medium text-gray-900 text-sm">
                            {activity.student_name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-600">
                        {activity.course_name}
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {new Date(activity.enrolled_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-8 text-center text-gray-500 text-sm"
                    >
                      No recent enrollments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <CalendarClock size={18} className="text-blue-600" /> Live Classes
            </h3>

            <form onSubmit={handleSaveClass} className="space-y-3 mb-5">
              <input
                value={classTitle}
                onChange={(event) => setClassTitle(event.target.value)}
                placeholder="Class title"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              <input
                value={classLink}
                onChange={(event) => setClassLink(event.target.value)}
                placeholder="Paste Google Meet / Zoom link"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              {linkError && <p className="text-xs text-red-600">{linkError}</p>}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 text-white px-3 py-2 text-sm font-bold hover:bg-blue-700 transition-colors"
              >
                Save Live Link
              </button>
            </form>

            <div className="space-y-3">
              {liveClasses.length > 0 ? (
                liveClasses.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-blue-100 bg-blue-50 p-3"
                  >
                    <p className="text-xs font-bold uppercase text-blue-600">
                      Next session
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:underline"
                    >
                      Open link <ArrowUpRight size={12} />
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">
                  No live links saved yet.
                </p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-amber-600" /> Assignments to
              Grade
            </h3>
            <div className="space-y-3">
              {gradingQueue.filter((item) => !item.grade).length > 0 ? (
                gradingQueue
                  .filter((item) => !item.grade)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-amber-100 bg-amber-50 p-3"
                    >
                      <p className="text-sm font-bold text-gray-900">
                        {item.student}
                      </p>
                      <p className="text-xs text-gray-600">{item.course}</p>
                      <p className="mt-2 text-xs text-gray-500">
                        {item.submission}
                      </p>
                      <div className="mt-3 flex gap-2">
                        {['A', 'B', 'C'].map((grade) => (
                          <button
                            key={grade}
                            onClick={() =>
                              handleGradeSubmission(item.id, grade)
                            }
                            className={`px-2.5 py-1 text-xs font-bold rounded-full ${gradeStyles[grade]}`}
                          >
                            {grade}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))
              ) : (
                <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3 text-sm text-emerald-700">
                  <span className="inline-flex items-center gap-2">
                    <Check size={14} /> Everything is graded.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/instructor/classes"
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Video size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Schedule Class
                  </p>
                  <p className="text-xs text-gray-500">
                    Create a new live session
                  </p>
                </div>
              </Link>
              <Link
                to="/instructor/assessments"
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Create Assignment
                  </p>
                  <p className="text-xs text-gray-500">
                    Set tasks for students
                  </p>
                </div>
              </Link>
              <Link
                to="/instructor/messages"
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">
                    Broadcast Message
                  </p>
                  <p className="text-xs text-gray-500">Send to all students</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
