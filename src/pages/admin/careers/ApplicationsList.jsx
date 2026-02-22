/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye, Download, Loader, User } from 'lucide-react';
import {
  getApplications,
  updateApplication,
} from '../../../services/admin-service';
import { formatDate } from '../../../utils/formatters';

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'applied':
        return 'bg-blue-100 text-blue-800';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'interview':
        return 'bg-purple-100 text-purple-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'applied':
        return 'Applied';
      case 'reviewing':
        return 'Reviewing';
      case 'interview':
        return 'Interview';
      case 'accepted':
        return 'Accepted';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const fetchApplications = async (page = 1, status = '', search = '') => {
    try {
      setLoading(true);
      const response = await getApplications(page, status, search);
      const apps = response.applications || [];
      console.log('Fetched applications:', apps); // Debug log
      setApplications(apps);
      setTotalPages(response.totalPages || 1);
      setCurrentPage(response.currentPage || 1);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage, selectedStatus, searchTerm);
  }, [currentPage, selectedStatus, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchApplications(1, selectedStatus, searchTerm);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
    fetchApplications(1, status, searchTerm);
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      await updateApplication(applicationId, { status: newStatus });
      setApplications(
        applications.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const exportApplications = () => {
    // Create CSV content
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Job Title',
      'Company',
      'Applied Date',
      'Status',
    ];
    const csvContent = [
      headers.join(','),
      ...applications.map((app) =>
        [
          `"${app.first_name || ''} ${app.last_name || ''}"`,
          `"${app.email || ''}"`,
          `"${app.phone || ''}"`,
          `"${app.job?.title || ''}"`,
          `"${app.job?.company || ''}"`,
          `"${formatDate(app.created_at) || ''}"`,
          `"${app.status || ''}"`,
        ].join(','),
      ),
    ].join('\n');

    // Download CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-3 py-1 rounded-md ${
            currentPage === i
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>,
      );
    }
    return (
      <div className='flex items-center justify-between mt-6 px-4 pb-4'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 border border-gray-300'
        >
          Previous
        </button>
        <div className='flex space-x-1'>{pages}</div>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className='px-3 py-1 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 border border-gray-300'
        >
          Next
        </button>
      </div>
    );
  };

  const renderApplicationRow = (application) => {
    const fullName =
      application.first_name && application.last_name
        ? `${application.first_name} ${application.last_name}`
        : application.first_name ||
          application.last_name ||
          'Name not provided';

    return (
      <tr key={application._id} className='hover:bg-gray-50'>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='flex items-center'>
            <div className='flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center'>
              <User className='h-5 w-5 text-green-600' />
            </div>
            <div className='ml-4'>
              <div className='text-sm font-medium text-gray-900'>
                {fullName}
              </div>
              <div className='text-sm text-gray-500'>
                {application.email || 'Email not provided'}
              </div>
            </div>
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm font-medium text-gray-900'>
            {application.job?.title || 'N/A'}
          </div>
          <div className='text-sm text-gray-500'>
            {application.job?.company || 'N/A'}
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <div className='text-sm text-gray-500'>
            {application.created_at
              ? formatDate(application.created_at)
              : 'N/A'}
          </div>
        </td>
        <td className='px-6 py-4 whitespace-nowrap'>
          <select
            value={application.status}
            onChange={(e) =>
              handleStatusChange(application._id, e.target.value)
            }
            className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-green-500 ${getStatusBadgeClass(
              application.status,
            )}`}
          >
            <option value='applied'>Applied</option>
            <option value='reviewing'>Reviewing</option>
            <option value='interview'>Interview</option>
            <option value='accepted'>Accepted</option>
            <option value='rejected'>Rejected</option>
          </select>
        </td>
        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
          <Link
            to={`/admin/careers/applications/${application._id}`}
            className='text-green-600 hover:text-green-900 inline-flex items-center'
          >
            <Eye className='h-4 w-4 mr-1' />
            View Details
          </Link>
        </td>
      </tr>
    );
  };

  return (
    <div className='p-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            Job Applications
          </h1>
          <p className='text-gray-600'>
            Manage all job applications and candidates
          </p>
        </div>
        <div className='mt-4 md:mt-0'>
          <button
            onClick={exportApplications}
            className='flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50'
          >
            <Download className='h-4 w-4 mr-2' />
            Export Applications
          </button>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-md overflow-hidden'>
        <div className='p-4 border-b'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <form onSubmit={handleSearch} className='flex-1'>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Search by name, email, or job title...'
                  className='w-full pl-10 pr-24 py-2 border rounded-md focus:ring-green-500 focus:border-green-500'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Search className='h-5 w-5 text-gray-400' />
                </div>
                <button
                  type='submit'
                  className='absolute inset-y-0 right-0 px-4 flex items-center bg-green-600 text-white rounded-r-md hover:bg-green-700'
                >
                  Search
                </button>
              </div>
            </form>
            <div className='flex items-center gap-2'>
              <Filter className='h-5 w-5 text-gray-400' />
              <span className='text-sm text-gray-600'>Filter by status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className='border rounded-md px-2 py-1 text-sm focus:ring-green-500 focus:border-green-500'
              >
                <option value=''>All Statuses</option>
                <option value='applied'>Applied</option>
                <option value='reviewing'>Reviewing</option>
                <option value='interview'>Interview</option>
                <option value='accepted'>Accepted</option>
                <option value='rejected'>Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className='flex justify-center items-center p-12'>
            <Loader className='h-8 w-8 text-green-600 animate-spin' />
          </div>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Applicant
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Job Position
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Applied Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {applications.length > 0 ? (
                    applications.map(renderApplicationRow)
                  ) : (
                    <tr>
                      <td
                        colSpan='5'
                        className='px-6 py-8 text-center text-sm text-gray-500'
                      >
                        No applications found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && renderPagination()}
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;
