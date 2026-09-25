import React, { useEffect, useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  FileText,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  getInstructorCourses,
  getInstructorAssessments,
  createAssessment,
} from '../../services/instructor-service';
import apiClient from '../../services/api-client';

export default function AssessmentsList() {
  const navigate = useNavigate();
  const [assessments, setAssessments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    course_id: '',
    title: '',
    type: 'quiz',
    questions: '',
    passing_score: '',
    due_date: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = () => {
      getInstructorCourses()
        .then((data) => setCourses(Array.isArray(data) ? data : []))
        .catch(() => setCourses([]))
        .finally(() => {});
    };
    fetch();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getInstructorAssessments();
        setAssessments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load assessments:', err);
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.course_id || !form.title) {
      setError('Course and title are required.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        course_id: form.course_id,
        title: form.title,
        type: form.type || 'quiz',
        passing_score: form.passing_score ? Number(form.passing_score) : undefined,
        due_date: form.due_date || undefined,
        questions: form.questions ? JSON.parse(form.questions) : [],
      };
      const created = await createAssessment(form.course_id, payload);
      setAssessments((prev) => [created.assessment || created, ...prev]);
      setShowForm(false);
      setForm({
        course_id: '',
        title: '',
        type: 'quiz',
        questions: '',
        passing_score: '',
        due_date: '',
      });
    } catch (err) {
      setError(err?.response?.data?.detail || 'Failed to create assessment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (assessment) => {
    if (!window.confirm('Delete this assessment?')) return;
    try {
      await apiClient.delete(
        `/instructor/assessments/${assessment.id || assessment._id}`,
      );
      setAssessments((prev) =>
        prev.filter(
          (a) => (a.id || a._id) !== (assessment.id || assessment._id),
        ),
      );
    } catch (err) {
      console.error('Delete assessment error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <Clock className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assessments</h1>
          <p className="text-slate-500">
            Manage quizzes, tests, and assignments across your courses
          </p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
        >
          <Plus size={18} className="-mt-0.5 mr-1 inline h-4 w-4" /> Create
          Assessment
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-bold text-slate-900">
            New Assessment
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                Course
              </label>
              <select
                value={form.course_id}
                onChange={(e) =>
                  setForm((f) => ({ ...f, course_id: e.target.value }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Select course</option>
                {courses.map((c) => (
                  <option key={c._id || c.id} value={c._id || c.id}>
                    {c.name || c.title || 'Untitled course'}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Assessment title"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                Type
              </label>
              <select
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              >
                <option value="quiz">Quiz</option>
                <option value="test">Test</option>
                <option value="assignment">Assignment</option>
                <option value="final">Final</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                Passing score
              </label>
              <input
                value={form.passing_score}
                onChange={(e) =>
                  setForm((f) => ({ ...f, passing_score: e.target.value }))
                }
                placeholder="e.g. 60"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">
                Due date
              </label>
              <input
                value={form.due_date}
                onChange={(e) =>
                  setForm((f) => ({ ...f, due_date: e.target.value }))
                }
                type="date"
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600">
                Questions (JSON)
              </label>
              <textarea
                value={form.questions}
                onChange={(e) =>
                  setForm((f) => ({ ...f, questions: e.target.value }))
                }
                placeholder='[{"prompt":"...","choices":[...],"answer":0}]'
                rows={3}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-100"
              />
            </div>
          </div>
          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
          <div className="mt-4 flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? 'Saving...' : 'Save Assessment'}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                <th className="p-4 font-medium">Title & Course</th>
                <th className="p-4 font-medium">Type</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium">Submissions</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.length > 0 ? (
                assessments.map((item) => (
                  <tr
                    key={item.id || item._id}
                    className="border-b border-slate-100 hover:bg-slate-50/50"
                  >
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shrink-0">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {item.title}
                          </p>
                          <p className="text-sm text-slate-500">
                            {item.course?.name || item.course || 'Unassigned'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 capitalize">
                      {item.type}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          item.due_date &&
                          new Date(item.due_date) < new Date()
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {item.due_date &&
                        new Date(item.due_date) < new Date() ? (
                          <Clock size={14} />
                        ) : (
                          <CheckCircle2 size={14} />
                        )}
                        {item.due_date &&
                        new Date(item.due_date) < new Date()
                          ? 'Past due'
                          : 'Active'}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {item.due_date
                        ? new Date(item.due_date).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-900">
                      {item.submissions || 0}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate('/instructor/classes')}
                          className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No assessments found for your courses.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
