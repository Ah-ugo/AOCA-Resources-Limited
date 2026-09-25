/** @format */

import React, { useEffect, useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  Award,
  PlayCircle,
  ChevronRight,
  Loader2,
  Video,
  ClipboardList,
  CheckCircle,
  AlertCircle,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import useCourseStore from '../../stores/useCourseStore';
import { getPublicCourses } from '../../services/dashboard-service';

const STATUS_CONFIG = {
  pending: {
    label: 'Pending Approval',
    icon: <Clock size={14} />,
    cls: 'bg-amber-100 text-amber-700 border-amber-200',
  },
  approved: {
    label: 'Approved',
    icon: <CheckCircle size={14} />,
    cls: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  active: {
    label: 'Active',
    icon: <CheckCircle size={14} />,
    cls: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  },
  rejected: {
    label: 'Not Approved',
    icon: <AlertCircle size={14} />,
    cls: 'bg-red-100 text-red-700 border-red-200',
  },
};

const StudentDashboard = () => {
  const {
    courses,
    enrollments,
    upcomingClasses,
    pendingAssignments,
    isLoading,
    fetchStudentDashboard,
    fetchMyEnrollments,
    requestEnrollment,
  } = useCourseStore();

  const [publicCourses, setPublicCourses] = useState([]);
  const [browsing, setBrowsing] = useState(false);
  const [enrollingId, setEnrollingId] = useState(null);
  const [enrollMsg, setEnrollMsg] = useState({});

  useEffect(() => {
    fetchStudentDashboard();
    fetchMyEnrollments();
  }, [fetchStudentDashboard, fetchMyEnrollments]);

  const loadPublicCourses = async () => {
    setBrowsing(true);
    try {
      const data = await getPublicCourses();
      setPublicCourses(Array.isArray(data) ? data : (data.courses || []));
    } catch (e) {
      console.error('Could not load courses:', e);
    }
  };

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    setEnrollMsg({});
    try {
      await requestEnrollment(courseId);
      setEnrollMsg({ [courseId]: { type: 'success', text: 'Request sent! Awaiting admin approval.' } });
    } catch (e) {
      setEnrollMsg({ [courseId]: { type: 'error', text: e.message || 'Failed to submit request.' } });
    } finally {
      setEnrollingId(null);
    }
  };

  // Active courses = enrollments with status "active"
  const activeCourses = courses?.length > 0 ? courses : [];
  // Pending/approved enrollments (not yet active)
  const pendingEnrollments = enrollments.filter((e) => ['pending', 'approved', 'rejected'].includes(e.status));

  // Know which courses the student already enrolled in
  const enrolledCourseIds = new Set(enrollments.map((e) => e.course_id));

  if (isLoading)
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <header className="rounded-3xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 px-6 py-7 text-white shadow-lg shadow-emerald-100">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-100">
              Student portal
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">Learning Center</h1>
            <p className="mt-2 text-sm text-emerald-50/90">
              Track your progress, join live sessions, and manage your enrollments.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:flex sm:items-center">
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100">Active</p>
              <p className="mt-1 text-2xl font-bold">{activeCourses.length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100">Pending</p>
              <p className="mt-1 text-2xl font-bold">{pendingEnrollments.filter(e=>e.status==='pending').length}</p>
            </div>
            <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-100">Live</p>
              <p className="mt-1 text-2xl font-bold">{upcomingClasses?.length || 0}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-[1.7fr_0.9fr] gap-8">
        {/* Left Column */}
        <div className="space-y-8">

          {/* My Enrollments – Pending/Approved/Rejected */}
          {pendingEnrollments.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                <ClipboardList className="text-amber-500" size={20} /> Enrollment Requests
              </h2>
              <div className="space-y-3">
                {pendingEnrollments.map((enr) => {
                  const cfg = STATUS_CONFIG[enr.status] || STATUS_CONFIG.pending;
                  return (
                    <div
                      key={enr._id}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">{enr.course_name || 'Course'}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Requested: {enr.created_at ? format(new Date(enr.created_at), 'MMM dd, yyyy') : 'N/A'}
                        </p>
                      </div>
                      <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.cls}`}>
                        {cfg.icon} {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Active Courses */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <BookOpen className="text-emerald-600" size={20} /> My Active Courses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeCourses.length > 0 ? (
                activeCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative h-40 overflow-hidden bg-slate-100">
                      <img
                        src={course.image || 'https://placehold.co/400x200/10b981/ffffff?text=Course'}
                        alt={course.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                      <div className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                         <Link to={`/dashboard/course/${course._id || course.id}`} className="text-emerald-600 hover:text-emerald-700">
                          <PlayCircle className="h-6 w-6" />
                        </Link>
                      </div>
                    </div>
                    <div className="space-y-4 p-5">
                      <h3 className="text-lg font-bold text-slate-900 line-clamp-2">{course.title}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                          <span>Progress</span>
                          <span className="text-emerald-600">{course.progress || 0}%</span>
                        </div>
                        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all"
                            style={{ width: `${course.progress || 0}%` }}
                          />
                        </div>
                      </div>
                         <Link
                           to={`/dashboard/course/${course._id || course.id}`}
                           className="block w-full rounded-xl bg-emerald-600 px-4 py-2.5 text-center text-sm font-bold text-white transition hover:bg-emerald-700"
                         >
                        Continue learning
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                  <BookOpen className="mx-auto mb-3 text-slate-300" size={40} />
                  <p className="text-slate-500">You are not enrolled in any active courses yet.</p>
                  <button
                    onClick={loadPublicCourses}
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <PlusCircle size={16} /> Browse & Enroll in a Course
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Browse & Enroll */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <PlusCircle className="text-blue-500" size={20} /> Browse Courses
              </h2>
              <button
                onClick={loadPublicCourses}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition"
              >
                <RefreshCw size={14} /> Load Courses
              </button>
            </div>
            {publicCourses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publicCourses.map((course) => {
                  const alreadyIn = enrolledCourseIds.has(course._id || course.id);
                  const msg = enrollMsg[course._id || course.id];
                  return (
                    <div
                      key={course._id || course.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={course.image || 'https://placehold.co/80x60/10b981/ffffff?text=Course'}
                          alt={course.name || course.title}
                          className="w-16 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 line-clamp-1">{course.name || course.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{course.description}</p>
                          {course.level && (
                            <span className="mt-1 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase">
                              {course.level}
                            </span>
                          )}
                        </div>
                      </div>
                      {msg && (
                        <p className={`text-xs font-medium ${msg.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                          {msg.text}
                        </p>
                      )}
                      {alreadyIn ? (
                        <span className="text-xs text-slate-400 italic text-center">Already enrolled / requested</span>
                      ) : (
                        <button
                          onClick={() => handleEnroll(course._id || course.id)}
                          disabled={enrollingId === (course._id || course.id)}
                          className="w-full py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2 transition"
                        >
                          {enrollingId === (course._id || course.id) ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <PlusCircle size={14} />
                          )}
                          Request Enrollment
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="space-y-6">
          {/* Upcoming Classes */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Calendar size={18} className="text-blue-600" /> Upcoming classes
            </h3>
            <div className="space-y-4">
              {upcomingClasses?.length > 0 ? (
                upcomingClasses.map((cls) => (
                  <div key={cls.id} className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">
                      {format(new Date(cls.date), 'MMM dd, HH:mm')}
                    </p>
                    <p className="mt-2 text-sm font-bold text-slate-900">{cls.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{cls.instructor?.name || 'Instructor'}</p>
                    {cls.meet_link && (
                      <a
                        href={cls.meet_link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
                      >
                        <Video size={14} /> Join Google Meet
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">No upcoming sessions scheduled.</p>
              )}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900">
              <Clock size={18} className="text-amber-500" /> Pending tasks
            </h3>
            <div className="space-y-3">
              {pendingAssignments?.length > 0 ? (
                pendingAssignments.map((task) => (
                  <div key={task.id} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
                    <div className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{task.title}</p>
                      <p className="mt-1 text-[11px] font-medium text-slate-400">
                        Due {task.due_date ? format(new Date(task.due_date), 'MMM dd') : 'N/A'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400 italic">All caught up!</p>
              )}
            </div>
          </div>

          {/* Certification CTA */}
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-5 text-white shadow-lg">
            <Award className="mb-3 h-9 w-9 text-emerald-400" />
            <h3 className="text-lg font-bold">Certification</h3>
            <p className="mt-2 text-sm text-slate-300">
              Complete your courses to earn Goethe-aligned certificates and badges.
            </p>
            <Link
              to="/dashboard/certificates"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 hover:text-emerald-300"
            >
              View my certificates <ChevronRight size={14} />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default StudentDashboard;
