/** @format */

import React, { useEffect, useState } from 'react';
import {
  CalendarDays,
  Clock3,
  Video,
  MapPin,
  ArrowUpRight,
  Plus,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getInstructorCourses,
  createInstructorClass,
} from '../../services/instructor-service';

export default function InstructorClasses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    course_id: '',
    title: '',
    description: '',
    date: '',
    duration: 60,
    meet_link: '',
    recording_link: '',
  });

  const fetchCourses = async () => {
    try {
      const data = await getInstructorCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to load instructor classes:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createInstructorClass(form);
      setForm({
        course_id: '',
        title: '',
        description: '',
        date: '',
        duration: 60,
        meet_link: '',
        recording_link: '',
      });
      setShowForm(false);
      fetchCourses();
    } catch (error) {
      console.error('Failed to create class:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const upcomingClasses = courses.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Live Classes</h1>
          <p className="text-slate-500">
            Course schedule and live delivery view for your assigned programs
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={16} /> New session
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">New Session</h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Course
                </label>
                <select
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.course_id}
                  onChange={(e) => setForm({ ...form, course_id: e.target.value })}
                >
                  <option value="">Select course</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.name || c.title || 'Untitled course'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Meet Link
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.meet_link}
                  onChange={(e) => setForm({ ...form, meet_link: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Date/Time
                  </label>
                  <input
                    required
                    type="datetime-local"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Duration (mins)
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: Number(e.target.value) })}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-bold text-white disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Session'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Assigned courses
            </span>
            <CalendarDays className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{courses.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Average duration
            </span>
            <Clock3 className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {courses.length
              ? `${Math.round(courses.reduce((sum, course) => sum + Number(course.duration || 0), 0) / courses.length)}w`
              : '0w'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Live delivery
            </span>
            <Video className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{upcomingClasses}</p>
        </div>
      </div>

      <div className="space-y-4">
        {!loading && courses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
            No assigned courses are available for this instructor yet.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course._id || course.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-bold text-slate-900">
                    {course.name || 'Untitled course'}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays size={14} /> {course.level || 'General'}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={14} /> {course.duration || 0} weeks
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Video size={14} /> {course.enrollment_count || 0} active
                      learners
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
                    Active
                  </span>
                  <button
                    onClick={() => navigate('/instructor/students')}
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
                  >
                    Open <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
