/** @format */

'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { getAssignments } from '../../services/dashboard-service';

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getAssignments(filter);
        setAssignments(data.assignments || []);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        setError(err.message || 'Failed to load assignments');
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [filter]);

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getStatusBadge = (status, score) => {
    switch (status) {
      case 'completed':
        return (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800'>
            <CheckCircle className='h-3 w-3 mr-1' />
            Completed {score && `- ${score}`}
          </span>
        );
      case 'overdue':
        return (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'>
            <AlertCircle className='h-3 w-3 mr-1' />
            Overdue
          </span>
        );
      default:
        return (
          <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800'>
            <Clock className='h-3 w-3 mr-1' />
            Pending
          </span>
        );
    }
  };

  const getTypeBadge = (type) => {
    const typeColors = {
      quiz: 'bg-blue-100 text-blue-800',
      essay: 'bg-purple-100 text-purple-800',
      listening: 'bg-indigo-100 text-indigo-800',
      exam: 'bg-pink-100 text-pink-800',
      reading: 'bg-teal-100 text-teal-800',
    };

    const colorClass = typeColors[type] || 'bg-gray-100 text-gray-800';

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
      >
        {type?.charAt(0).toUpperCase() + type?.slice(1) || 'Assignment'}
      </span>
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600'></div>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Assignments</h1>
        <p className='text-gray-600'>
          View and complete your German language course assignments
        </p>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <div className='flex items-center gap-2'>
            <FileText className='h-5 w-5 text-emerald-600' />
            <h2 className='text-lg font-semibold'>Your Assignments</h2>
          </div>

          <div className='flex gap-2'>
            {['all', 'pending', 'completed', 'overdue'].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-3 py-1 text-sm rounded-md ${
                  filter === filterType
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error ? (
          <div className='p-6 text-center'>
            <p className='text-red-500'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-2 text-sm underline text-emerald-600'
            >
              Try again
            </button>
          </div>
        ) : filteredAssignments.length === 0 ? (
          <div className='p-8 text-center'>
            <p className='text-gray-500'>
              No assignments found matching your filter.
            </p>
          </div>
        ) : (
          <div className='divide-y'>
            {filteredAssignments.map((assignment) => (
              <div
                key={assignment.id || assignment._id}
                className='p-4 hover:bg-gray-50'
              >
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                  <div className='flex-1'>
                    <div className='flex flex-wrap items-center gap-2 mb-1'>
                      <h3 className='font-medium'>{assignment.title}</h3>
                      {getStatusBadge(assignment.status, assignment.score)}
                      {assignment.type && getTypeBadge(assignment.type)}
                    </div>
                    <p className='text-sm text-gray-600 mb-2'>
                      {assignment.description}
                    </p>
                    <div className='flex items-center gap-1 text-sm text-gray-600'>
                      <Calendar className='h-4 w-4' />
                      <span>Due: {formatDate(assignment.due_date)}</span>
                    </div>
                  </div>

                  {assignment.status !== 'completed' && (
                    <Link
                      to={`/dashboard/assignments/${assignment.id || assignment._id}`}
                      className='bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors inline-flex items-center gap-1'
                    >
                      {assignment.status === 'overdue'
                        ? 'Submit Late'
                        : 'Start Assignment'}
                      <ChevronRight className='h-4 w-4' />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignments;
