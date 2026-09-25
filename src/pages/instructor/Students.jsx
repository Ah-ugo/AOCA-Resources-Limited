/** @format */

import React, { useEffect, useState } from 'react';
import {
  Users,
  Search,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getInstructorCourses } from '../../services/instructor-service';

export default function InstructorStudents() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getInstructorCourses();
        setCourses(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load instructor courses:', error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const totalLearners = courses.reduce(
    (sum, course) => sum + (Number(course.enrollment_count) || 0),
    0,
  );

  const filteredCourses = courses.filter((course) => {
    const term = search.toLowerCase();
    return (
      !term ||
      (course.name || '').toLowerCase().includes(term) ||
      (course.level || '').toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Students</h1>
          <p className="text-slate-500">
            Track active learners across your AOCA programs
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-500 shadow-sm">
          <Search size={16} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-52 border-0 bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search courses"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Total learners
            </span>
            <Users className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{totalLearners}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Active courses
            </span>
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{courses.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
              Courses needing review
            </span>
            <Clock3 className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-slate-900">
            {
              courses.filter((course) => (course.enrollment_count || 0) < 6)
                .length
            }
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium">Level</th>
                <th className="px-4 py-3 font-medium">Learners</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {!loading && filteredCourses.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No courses found for this instructor.
                  </td>
                </tr>
              ) : (
                filteredCourses.map((course) => (
                  <tr
                    key={course._id || course.id}
                    className="hover:bg-slate-50/60"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                          {(course.name || 'C').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">
                            {course.name || 'Untitled course'}
                          </p>
                          <p className="text-xs text-slate-500">
                            {course.duration || 0} weeks
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {course.level || 'General'}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-2.5 w-28 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-emerald-500"
                            style={{
                              width: `${Math.min(100, (Number(course.enrollment_count) || 0) * 12)}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-slate-700">
                          {course.enrollment_count || 0}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          (course.enrollment_count || 0) > 10
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {(course.enrollment_count || 0) > 10
                          ? 'Healthy'
                          : 'Needs attention'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => navigate('/instructor/classes')}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200"
                      >
                        View course <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
