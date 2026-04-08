/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import {
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  UserMinus,
  RefreshCw,
  Search,
  Filter,
  MoreVertical,
  ExternalLink,
  Loader2,
} from 'lucide-react';
import {
  listAllEnrollments,
  approveEnrollment,
  rejectEnrollment,
  assignStudentToClass,
  getCourses,
  getClasses,
} from '../../services/admin-service';
import { format } from 'date-fns';

const EnrollmentManagement = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);

  // Assignment Form State
  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [assignmentData, setAssignmentData] = useState({
    class_id: '',
    note: '',
  });
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listAllEnrollments({
        status: activeTab,
        search: searchQuery,
      });
      setEnrollments(data.enrollments);
      setCounts(data.counts);
    } catch (error) {
      console.error('Failed to fetch enrollments:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Fetch courses and classes when assignment modal opens
  const openAssignModal = async (enrollment) => {
    setSelectedEnrollment(enrollment);
    setShowAssignModal(true);
    try {
      const [coursesRes, classesRes] = await Promise.all([
        getCourses(),
        getClasses({ course_id: enrollment.course_id }),
      ]);
      setCourses(coursesRes.courses);
      setClasses(classesRes.classes);
    } catch (error) {
      console.error('Failed to load assignment options:', error);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this student application?')) return;
    try {
      await approveEnrollment(id);
      fetchData();
    } catch (error) {
      alert('Approval failed');
    }
  };

  const handleReject = async () => {
    if (!rejectReason) return;
    setActionLoading(true);
    try {
      await rejectEnrollment(
        selectedEnrollment.enrollment_id || selectedEnrollment._id,
        {
          reason: rejectReason,
        },
      );
      setShowRejectModal(false);
      setRejectReason('');
      fetchData();
    } catch (error) {
      alert('Rejection failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAssign = async () => {
    if (!assignmentData.class_id) return;
    setActionLoading(true);
    try {
      await assignStudentToClass({
        user_id: selectedEnrollment.student_id,
        course_id: selectedEnrollment.course_id,
        class_id: assignmentData.class_id,
        note: assignmentData.note,
      });
      setShowAssignModal(false);
      setAssignmentData({ class_id: '', note: '' });
      fetchData();
    } catch (error) {
      alert('Assignment failed');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700 border-amber-200',
      approved: 'bg-blue-100 text-blue-700 border-blue-200',
      active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
      removed: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return styles[status] || styles.pending;
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Enrollment Management
          </h1>
          <p className='text-gray-500'>
            Manage student course applications and class assignments.
          </p>
        </div>

        <div className='flex items-center gap-2 bg-white p-1 rounded-xl shadow-sm border border-gray-200'>
          <button
            onClick={() => fetchData()}
            className='p-2 hover:bg-gray-50 rounded-lg text-gray-500 transition-colors'
            title='Refresh Data'
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <div className='w-px h-6 bg-gray-200 mx-1' />
          <div className='relative'>
            <Search className='w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              placeholder='Search students...'
              className='pl-9 pr-4 py-2 bg-transparent border-none focus:ring-0 text-sm w-64'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <div className='flex flex-wrap gap-2'>
        {['pending', 'approved', 'active', 'rejected', 'removed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === tab
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'
            }`}
          >
            <span className='capitalize'>{tab}</span>
            <span
              className={`px-1.5 py-0.5 rounded-lg text-[10px] ${activeTab === tab ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}
            >
              {counts[tab] || 0}
            </span>
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className='bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full text-left border-collapse'>
            <thead>
              <tr className='bg-gray-50/50 border-b border-gray-100'>
                <th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
                  Student
                </th>
                <th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
                  Course
                </th>
                <th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
                  Applied On
                </th>
                <th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider'>
                  Status
                </th>
                <th className='px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {loading ? (
                <tr>
                  <td colSpan='5' className='px-6 py-12 text-center'>
                    <div className='flex flex-col items-center gap-2'>
                      <Loader2 className='w-8 h-8 text-emerald-500 animate-spin' />
                      <p className='text-sm text-gray-500'>
                        Fetching enrollments...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan='5' className='px-6 py-12 text-center'>
                    <p className='text-gray-400'>
                      No {activeTab} enrollments found.
                    </p>
                  </td>
                </tr>
              ) : (
                enrollments.map((item) => (
                  <tr
                    key={item._id}
                    className='hover:bg-gray-50/50 transition-colors group'
                  >
                    <td className='px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold'>
                          {item.student_name?.charAt(0)}
                        </div>
                        <div>
                          <div className='font-semibold text-gray-900'>
                            {item.student_name}
                          </div>
                          <div className='text-xs text-gray-500'>
                            {item.student_email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='text-sm font-medium text-gray-700'>
                        {item.course_name}
                      </div>
                      {item.class_title && (
                        <div className='text-xs text-emerald-600 font-medium'>
                          Class: {item.class_title}
                        </div>
                      )}
                    </td>
                    <td className='px-6 py-4 text-sm text-gray-500'>
                      {item.created_at
                        ? format(new Date(item.created_at), 'MMM dd, yyyy')
                        : 'N/A'}
                    </td>
                    <td className='px-6 py-4'>
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 text-right'>
                      <div className='flex items-center justify-end gap-2'>
                        {item.status === 'pending' && (
                          <>
                            <button
                              onClick={() =>
                                handleApprove(item._id || item.enrollment_id)
                              }
                              className='p-2 hover:bg-emerald-50 text-emerald-600 rounded-lg transition-colors'
                              title='Approve'
                            >
                              <CheckCircle className='w-5 h-5' />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEnrollment(item);
                                setShowRejectModal(true);
                              }}
                              className='p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors'
                              title='Reject'
                            >
                              <XCircle className='w-5 h-5' />
                            </button>
                          </>
                        )}

                        {item.status === 'approved' && (
                          <button
                            onClick={() => openAssignModal(item)}
                            className='flex items-center gap-2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-colors'
                          >
                            <UserCheck className='w-4 h-4' />
                            Assign Class
                          </button>
                        )}

                        {item.status === 'active' && (
                          <button
                            onClick={() => openAssignModal(item)}
                            className='p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors'
                            title='Reassign Class'
                          >
                            <RefreshCw className='w-5 h-5' />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300'>
            <div className='p-6 bg-emerald-600 text-white'>
              <div className='flex justify-between items-start'>
                <div>
                  <h3 className='text-xl font-bold'>Assign to Class</h3>
                  <p className='text-emerald-100 text-sm mt-1'>
                    {selectedEnrollment?.student_name} -{' '}
                    {selectedEnrollment?.course_name}
                  </p>
                </div>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className='p-1 hover:bg-white/20 rounded-full transition-colors'
                >
                  <XCircle className='w-6 h-6' />
                </button>
              </div>
            </div>
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  Select Class
                </label>
                <select
                  className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 text-sm'
                  value={assignmentData.class_id}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      class_id: e.target.value,
                    })
                  }
                >
                  <option value=''>Choose a class...</option>
                  {classes.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title} ({format(new Date(c.date), 'MMM dd, HH:mm')})
                    </option>
                  ))}
                </select>
                {classes.length === 0 && (
                  <p className='text-[10px] text-amber-600 mt-1 font-medium italic'>
                    No classes found for this course. Please create one first.
                  </p>
                )}
              </div>

              <div>
                <label className='block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  Admin Note (Sent to student)
                </label>
                <textarea
                  rows={3}
                  className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 text-sm resize-none'
                  placeholder='Welcome to the course! Your class starts...'
                  value={assignmentData.note}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      note: e.target.value,
                    })
                  }
                />
              </div>

              <div className='flex gap-3 pt-2'>
                <button
                  onClick={() => setShowAssignModal(false)}
                  className='flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!assignmentData.class_id || actionLoading}
                  className='flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-2'
                >
                  {actionLoading ? (
                    <Loader2 className='w-4 h-4 animate-spin' />
                  ) : (
                    <UserCheck className='w-4 h-4' />
                  )}
                  Assign & Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm'>
          <div className='bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden'>
            <div className='p-6 bg-red-600 text-white'>
              <h3 className='text-xl font-bold'>Reject Application</h3>
              <p className='text-red-100 text-sm mt-1'>
                {selectedEnrollment?.student_name}
              </p>
            </div>
            <div className='p-6 space-y-4'>
              <div>
                <label className='block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>
                  Reason for Rejection
                </label>
                <textarea
                  rows={4}
                  className='w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:border-red-500 text-sm resize-none'
                  placeholder='Explain why this application is being rejected...'
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>

              <div className='flex gap-3'>
                <button
                  onClick={() => setShowRejectModal(false)}
                  className='flex-1 py-3 border border-gray-200 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason || actionLoading}
                  className='flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition-all disabled:opacity-50'
                >
                  {actionLoading ? 'Processing...' : 'Confirm Rejection'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentManagement;
