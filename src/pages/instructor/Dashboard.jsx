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
} from 'lucide-react';
import { authService } from '../../services/auth-service';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, subtext }) => (
  <div className='bg-white p-6 rounded-2xl border border-gray-100 shadow-sm'>
    <div className='flex items-center justify-between mb-4'>
      <div
        className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-white`}
      >
        <Icon size={24} />
      </div>
      {subtext && (
        <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full'>
          {subtext}
        </span>
      )}
    </div>
    <h3 className='text-3xl font-bold text-gray-900 mb-1'>{value}</h3>
    <p className='text-gray-500 text-sm font-medium'>{title}</p>
  </div>
);

export default function InstructorDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Fetch stats from the backend
    const fetchStats = async () => {
      try {
        const token = authService.getToken();
        // Adjust URL if your API is hosted elsewhere
        const response = await fetch(
          'https://aoca-resources-backend.onrender.com/instructor/dashboard/stats',
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setStats(data.stats);
          setRecentActivity(data.recent_enrollments || []);
        }
      } catch (error) {
        console.error('Failed to fetch instructor stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className='flex h-[calc(100vh-80px)] items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-emerald-600' />
      </div>
    );
  }

  return (
    <div className='p-6 md:p-8 max-w-7xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-serif font-bold text-gray-900'>
            Instructor Dashboard
          </h1>
          <p className='text-gray-500 mt-1'>
            Welcome back! Here's what's happening with your courses.
          </p>
        </div>
        <div className='flex gap-3'>
          <Link
            to='/instructor/courses/create'
            className='flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-sm hover:bg-emerald-700 transition-colors'
          >
            <Plus size={16} /> Create Course
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        <StatCard
          title='Total Students'
          value={stats?.total_students || 0}
          icon={Users}
          color='bg-blue-500'
          subtext='Active'
        />
        <StatCard
          title='Active Courses'
          value={stats?.total_courses || 0}
          icon={BookOpen}
          color='bg-emerald-500'
        />
        <StatCard
          title='Assignments to Grade'
          value={stats?.pending_grading || 0}
          icon={FileText}
          color='bg-amber-500'
          subtext='Action needed'
        />
        <StatCard
          title='Total Assignments'
          value={stats?.total_assignments || 0}
          icon={TrendingUp}
          color='bg-purple-500'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Recent Enrollments */}
        <div className='lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='font-bold text-lg text-gray-900'>
              Recent Enrollments
            </h3>
            <button className='text-emerald-600 text-sm font-bold hover:underline'>
              View All
            </button>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-gray-100'>
                  <th className='text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-4'>
                    Student
                  </th>
                  <th className='text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-4'>
                    Course
                  </th>
                  <th className='text-left text-xs font-bold text-gray-400 uppercase tracking-wider pb-4'>
                    Date
                  </th>
                  <th className='text-right text-xs font-bold text-gray-400 uppercase tracking-wider pb-4'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-50'>
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity, i) => (
                    <tr
                      key={i}
                      className='hover:bg-gray-50/50 transition-colors'
                    >
                      <td className='py-4'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs font-bold'>
                            {activity.student_name.charAt(0)}
                          </div>
                          <span className='font-medium text-gray-900 text-sm'>
                            {activity.student_name}
                          </span>
                        </div>
                      </td>
                      <td className='py-4 text-sm text-gray-600'>
                        {activity.course_name}
                      </td>
                      <td className='py-4 text-sm text-gray-500'>
                        {new Date(activity.enrolled_at).toLocaleDateString()}
                      </td>
                      <td className='py-4 text-right'>
                        <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800'>
                          Active
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan='4'
                      className='py-8 text-center text-gray-500 text-sm'
                    >
                      No recent enrollments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='space-y-6'>
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6'>
            <h3 className='font-bold text-lg text-gray-900 mb-4'>
              Quick Actions
            </h3>
            <div className='space-y-3'>
              <button className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group'>
                <div className='w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors'>
                  <Video size={20} />
                </div>
                <div>
                  <p className='font-bold text-gray-900 text-sm'>
                    Schedule Class
                  </p>
                  <p className='text-xs text-gray-500'>
                    Create a new live session
                  </p>
                </div>
              </button>
              <button className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group'>
                <div className='w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors'>
                  <FileText size={20} />
                </div>
                <div>
                  <p className='font-bold text-gray-900 text-sm'>
                    Create Assignment
                  </p>
                  <p className='text-xs text-gray-500'>
                    Set tasks for students
                  </p>
                </div>
              </button>
              <Link
                to='/messages'
                className='w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left group'
              >
                <div className='w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors'>
                  <MessageSquare size={20} />
                </div>
                <div>
                  <p className='font-bold text-gray-900 text-sm'>
                    Broadcast Message
                  </p>
                  <p className='text-xs text-gray-500'>Send to all students</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
