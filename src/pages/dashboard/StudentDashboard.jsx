/** @format */

import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, Award, PlayCircle, ChevronRight, Loader2 } from 'lucide-react';
import { getStudentDashboard } from '../../services/student-service';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getStudentDashboard();
        setData(res);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Learning Center</h1>
          <p className="text-gray-500">Track your progress and access your classes.</p>
        </div>
        <div className="hidden md:flex gap-4">
          <div className="bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
            <p className="text-xs font-bold text-emerald-600 uppercase">Courses Active</p>
            <p className="text-xl font-bold">{data?.courses?.length || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Courses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="text-emerald-600" /> My Active Courses
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data?.courses?.length > 0 ? data.courses.map(course => (
              <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group">
                <div className="h-32 bg-gray-100 relative">
                  <img src={course.image || 'https://via.placeholder.com/400x200'} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <Link to={`/dashboard/course/${course.id}`} className="p-3 bg-white rounded-full scale-0 group-hover:scale-100 transition-transform">
                      <PlayCircle className="w-6 h-6 text-emerald-600" />
                    </Link>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="font-bold text-gray-900 truncate">{course.title}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-gray-500">Progress</span>
                      <span className="text-emerald-600">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>
                  <Link to={`/dashboard/course/${course.id}`} className="w-full block py-2 bg-emerald-600 text-white rounded-lg text-center text-xs font-bold hover:bg-emerald-700 transition-colors">
                    Continue Learning
                  </Link>
                </div>
              </div>
            )) : (
              <div className="col-span-2 py-12 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-medium">You are not enrolled in any active courses yet.</p>
                <Link to="/courses" className="text-emerald-600 text-sm font-bold hover:underline mt-2 inline-block">Browse Courses</Link>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Classes & Assignments Sidebar */}
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Calendar size={20} className="text-blue-600" /> Live Classes
            </h3>
            <div className="space-y-4">
              {data?.upcoming_classes?.length > 0 ? data.upcoming_classes.map(cls => (
                <div key={cls.id} className="p-4 bg-blue-50 rounded-xl border border-blue-100 relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={cls.meet_link} target="_blank" className="text-blue-600 hover:text-blue-800">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="text-xs font-bold text-blue-600 uppercase mb-1">{format(new Date(cls.date), 'MMM dd, HH:mm')}</p>
                  <p className="font-bold text-gray-900 text-sm">{cls.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{cls.instructor?.name}</p>
                </div>
              )) : (
                <p className="text-sm text-gray-400 italic">No upcoming sessions scheduled.</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Clock size={20} className="text-amber-600" /> Pending Tasks
            </h3>
            <div className="space-y-3">
              {data?.pending_assignments?.length > 0 ? data.pending_assignments.map(task => (
                <div key={task.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{task.title}</p>
                    <p className="text-[10px] text-gray-400 font-medium">Due {format(new Date(task.due_date), 'MMM dd')}</p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-400 italic">All caught up!</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-luxury-black to-gray-800 rounded-2xl p-6 text-white relative overflow-hidden">
            <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-white/5" />
            <h3 className="font-bold text-lg mb-2">Certification</h3>
            <p className="text-xs text-gray-400 mb-4">Complete your courses to earn Goethe-aligned certificates.</p>
            <Link to="/dashboard/certificates" className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-widest">
              View My Badges <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const ExternalLink = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

export default StudentDashboard;