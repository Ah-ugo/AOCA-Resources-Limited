/** @format */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Plus,
  Video,
  FileText,
  Download,
  Loader2,
  ChevronLeft,
  BookOpen,
} from 'lucide-react';
import apiClient from '../../services/api-client';
import {
  getInstructorCoursesList,
  getInstructorModules,
  createInstructorLesson,
} from '../../services/instructor-service';

const contentTypes = [
  { value: 'live', label: 'Live Class', icon: Video },
  { value: 'recorded', label: 'Recorded Class', icon: Video },
  { value: 'materials', label: 'Materials', icon: FileText },
];

export default function InstructorLessons() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    module_id: '',
    title: '',
    content_type: 'live',
    url: '',
    order: 1,
    materials: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, modulesRes] = await Promise.all([
          getInstructorCoursesList(),
          getInstructorModules(courseId),
        ]);
        setCourses(coursesRes.courses || []);
        setModules(Array.isArray(modulesRes) ? modulesRes : modulesRes.modules || []);
      } catch (error) {
        console.error('Failed to load instructor lessons data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [courseId]);

  const currentCourse = courses.find(
    (c) => c._id === courseId || c.id === courseId,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createInstructorLesson(form);
      setForm({
        module_id: '',
        title: '',
        content_type: 'live',
        url: '',
        order: 1,
        materials: [],
      });
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create lesson:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/instructor/classes')}
            className="mb-2 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
          >
            <ChevronLeft size={16} /> Back to classes
          </button>
          <h1 className="text-2xl font-bold text-slate-900">Lessons</h1>
          <p className="text-slate-500">
            {currentCourse
              ? `Create lessons for ${currentCourse.name || currentCourse.title || 'this course'}`
              : 'Create lessons for your assigned modules'}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={16} /> New Lesson
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">New Lesson</h2>
              <button onClick={() => setShowForm(false)}>
                <Loader2 size={20} className="text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Module
                </label>
                <select
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.module_id}
                  onChange={(e) => setForm({ ...form, module_id: e.target.value })}
                >
                  <option value="">Select module</option>
                  {modules.map((m) => (
                    <option key={m._id || m.id} value={m._id || m.id}>
                      {m.title || 'Untitled module'}
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
                  Type
                </label>
                <select
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.content_type}
                  onChange={(e) => setForm({ ...form, content_type: e.target.value })}
                >
                  {contentTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Video / Resource URL
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Order
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-bold text-white disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Create Lesson'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
        <BookOpen className="mx-auto mb-3 h-10 w-10 text-slate-300" />
        <p className="text-lg font-semibold text-slate-800">Lesson management</p>
        <p className="mt-1 text-sm text-slate-500">
          Use the form above to create live classes, recorded sessions, and
          learning materials for your modules.
        </p>
      </div>
    </div>
  );
}
