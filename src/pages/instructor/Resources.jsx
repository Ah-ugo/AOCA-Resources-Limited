/** @format */

import React, { useEffect, useState } from 'react';
import { BookOpen, FileText, Download, FolderOpen, Upload, X } from 'lucide-react';
import {
  getInstructorCourses,
  getInstructorResources,
  createInstructorResource,
} from '../../services/instructor-service';

export default function InstructorResources() {
  const [courses, setCourses] = useState([]);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    course_id: '',
    title: '',
    description: '',
    type: 'document',
    url: '',
    level: '',
    category: '',
  });

  const typeStyles = [
    { icon: FileText, accent: 'bg-emerald-100 text-emerald-700' },
    { icon: Download, accent: 'bg-blue-100 text-blue-700' },
    { icon: FolderOpen, accent: 'bg-amber-100 text-amber-700' },
  ];

  const fetchData = async () => {
    try {
      const [coursesData, resourcesData] = await Promise.all([
        getInstructorCourses(),
        getInstructorResources(),
      ]);
      setCourses(Array.isArray(coursesData) ? coursesData : []);
      setResources(Array.isArray(resourcesData.resources) ? resourcesData.resources : []);
    } catch (error) {
      console.error('Failed to load instructor resources:', error);
      setCourses([]);
      setResources([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createInstructorResource(form);
      setForm({
        course_id: '',
        title: '',
        description: '',
        type: 'document',
        url: '',
        level: '',
        category: '',
      });
      setShowForm(false);
      fetchData();
    } catch (error) {
      console.error('Failed to create resource:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const resourceList = resources.length > 0 ? resources : courses.map((course, index) => ({
    title: course.name || 'Unnamed course',
    type: course.level || 'General study program',
    updated: course.updated_at
      ? new Date(course.updated_at).toLocaleDateString()
      : 'Recently updated',
    icon: typeStyles[index % typeStyles.length].icon,
    accent: typeStyles[index % typeStyles.length].accent,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resources</h1>
          <p className="text-slate-500">
            Live program materials linked to your assigned AOCA courses
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Upload size={16} /> Upload resource
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Upload Resource</h2>
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
                  Description
                </label>
                <textarea
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  URL
                </label>
                <input
                  required
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Level
                  </label>
                  <input
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    value={form.level}
                    onChange={(e) => setForm({ ...form, level: e.target.value })}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Category
                  </label>
                  <input
                    required
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-emerald-600 py-2 text-sm font-bold text-white disabled:opacity-50"
              >
                {submitting ? 'Uploading...' : 'Upload Resource'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {!loading && resourceList.length === 0 ? (
          <div className="md:col-span-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
            No course resources are available yet.
          </div>
        ) : (
          resourceList.map((resource) => {
            const Icon = resource.icon || FileText;
            return (
              <div
                key={resource.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${resource.accent || 'bg-emerald-100 text-emerald-700'}`}
                >
                  <Icon size={18} />
                </div>
                <p className="text-lg font-bold text-slate-900">
                  {resource.title}
                </p>
                <p className="mt-2 text-sm text-slate-500">{resource.type}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                  <span>Updated {resource.updated}</span>
                  <button className="font-medium text-emerald-600 hover:text-emerald-700">
                    Open
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
          <BookOpen className="h-5 w-5 text-emerald-600" />
        </div>
        <p className="text-lg font-semibold text-slate-800">
          Course resource library
        </p>
        <p className="mt-1 text-sm text-slate-500">
          {courses.length > 0
            ? `Your active AOCA program library includes ${courses.length} assigned course(s).`
            : 'Upload handouts, worksheets, and revision guides for each study track.'}
        </p>
      </div>
    </div>
  );
}
