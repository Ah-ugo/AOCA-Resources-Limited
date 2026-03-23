/** @format */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Edit,
  Trash2,
  Search,
  Plus,
  Filter,
  User,
  Download,
  Loader,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Mail,
  Phone,
  Calendar,
  Shield,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
} from 'lucide-react';
import { getUsers, deleteUser } from '../../../services/admin-service';
import { formatDate } from '../../../utils/formatters';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const fetchUsers = async (page = 1, role = '', status = '', search = '') => {
    try {
      setLoading(true);
      const skip = (page - 1) * 10;
      const response = await getUsers({
        skip,
        limit: 10,
        role: role || undefined,
        search: search || undefined,
      });

      console.log('Users response:', response);

      if (response && response.users) {
        setUsers(response.users);
        setTotalUsers(response.total || response.users.length);
        setTotalPages(
          Math.ceil((response.total || response.users.length) / 10),
        );
      } else if (Array.isArray(response)) {
        setUsers(response);
        setTotalUsers(response.length);
        setTotalPages(Math.ceil(response.length / 10));
      } else {
        setUsers([]);
        setTotalUsers(0);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchUsers(currentPage, selectedRole, selectedStatus, searchTerm);
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [currentPage, selectedRole, selectedStatus, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, selectedRole, selectedStatus, searchTerm);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedRole('');
    setSelectedStatus('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await deleteUser(userToDelete._id || userToDelete.id);
      setUsers(
        users.filter(
          (user) =>
            (user._id || user.id) !== (userToDelete._id || userToDelete.id),
        ),
      );
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const exportUsers = () => {
    const headers = ['Name', 'Email', 'Role', 'Status', 'Joined'];
    const csvContent = [
      headers.join(','),
      ...users.map((user) =>
        [
          `${user.first_name || ''} ${user.last_name || ''}`.trim(),
          user.email || '',
          user.role || '',
          user.disabled ? 'Inactive' : 'Active',
          user.created_at ? new Date(user.created_at).toLocaleDateString() : '',
        ].join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getRoleBadgeColor = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'instructor':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'student':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadge = (user) => {
    const isActive = !user.disabled;
    return (
      <span
        className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
          isActive
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}
      >
        {isActive ? (
          <CheckCircle className='h-3 w-3' />
        ) : (
          <XCircle className='h-3 w-3' />
        )}
        {isActive ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing{' '}
              <span className='font-medium'>{(currentPage - 1) * 10 + 1}</span>{' '}
              to{' '}
              <span className='font-medium'>
                {Math.min(currentPage * 10, totalUsers)}
              </span>{' '}
              of <span className='font-medium'>{totalUsers}</span> results
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronsLeft className='h-5 w-5' />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <span className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300'>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <ChevronsRight className='h-5 w-5' />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='h-full flex flex-col overflow-hidden'>
      {/* Header - Fixed */}
      <div className='flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Users Management
            </h1>
            <p className='text-sm text-gray-600 mt-1'>
              Manage all users, their roles, and permissions
            </p>
          </div>
          <div className='mt-4 md:mt-0 flex gap-3'>
            <button
              onClick={exportUsers}
              className='inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
            >
              <Download className='h-4 w-4 mr-2' />
              Export CSV
            </button>
            <Link
              to='/admin/users/new'
              className='inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
            >
              <Plus className='h-4 w-4 mr-2' />
              Add User
            </Link>
          </div>
        </div>
      </div>

      {/* Filters - Fixed */}
      <div className='flex-shrink-0 px-6 py-3 bg-white border-b border-gray-200'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-600'
        >
          <Filter className='h-4 w-4' />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters Panel - Expandable */}
      {showFilters && (
        <div className='flex-shrink-0 px-6 py-4 bg-gray-50 border-b border-gray-200'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            {/* Search */}
            <div className='col-span-1 md:col-span-2'>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Search Users
              </label>
              <form onSubmit={handleSearch} className='relative'>
                <input
                  type='text'
                  placeholder='Search by name, email...'
                  className='w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
                {searchTerm && (
                  <button
                    type='button'
                    onClick={() => setSearchTerm('')}
                    className='absolute right-2 top-2.5 text-gray-400 hover:text-gray-600'
                  >
                    <X className='h-4 w-4' />
                  </button>
                )}
              </form>
            </div>

            {/* Role Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => handleRoleFilter(e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              >
                <option value=''>All Roles</option>
                <option value='admin'>Admin</option>
                <option value='instructor'>Instructor</option>
                <option value='student'>Student</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              >
                <option value=''>All Status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedRole || selectedStatus || searchTerm) && (
            <div className='mt-3 flex items-center gap-2 flex-wrap'>
              <span className='text-xs text-gray-500'>Active filters:</span>
              {selectedRole && (
                <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-xs'>
                  Role: {selectedRole}
                </span>
              )}
              {selectedStatus && (
                <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-xs'>
                  Status: {selectedStatus}
                </span>
              )}
              {searchTerm && (
                <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-xs'>
                  Search: "{searchTerm}"
                </span>
              )}
              <button
                onClick={clearFilters}
                className='text-xs text-red-600 hover:text-red-700 font-medium'
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      {/* Table Container - Scrollable */}
      <div className='flex-1 overflow-auto min-h-0 bg-white'>
        {loading ? (
          <div className='flex items-center justify-center h-full'>
            <Loader className='h-8 w-8 text-emerald-600 animate-spin' />
          </div>
        ) : (
          <div className='h-full flex flex-col'>
            {/* Table */}
            <div className='flex-1 overflow-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50 sticky top-0 z-10'>
                  <tr>
                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                      User
                    </th>
                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                      Contact
                    </th>
                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                      Role
                    </th>
                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                      Status
                    </th>
                    <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                      Joined
                    </th>
                    <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user._id || user.id}
                        className='hover:bg-gray-50'
                      >
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center flex-shrink-0'>
                              {user.image ? (
                                <img
                                  src={user.image}
                                  alt={`${user.first_name || ''} ${user.last_name || ''}`}
                                  className='h-8 w-8 rounded-full object-cover'
                                />
                              ) : (
                                <span className='text-white text-xs font-bold'>
                                  {(user.first_name?.charAt(0) || '') +
                                    (user.last_name?.charAt(0) || '')}
                                </span>
                              )}
                            </div>
                            <div className='ml-3'>
                              <div className='text-sm font-medium text-gray-900 whitespace-nowrap'>
                                {user.first_name || ''} {user.last_name || ''}
                              </div>
                              <div className='text-xs text-gray-500 whitespace-nowrap'>
                                @{user.username || 'N/A'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <div className='space-y-1'>
                            <div className='flex items-center text-xs text-gray-500 whitespace-nowrap'>
                              <Mail className='h-3 w-3 mr-1 text-gray-400 flex-shrink-0' />
                              <span className='truncate max-w-[150px]'>
                                {user.email}
                              </span>
                            </div>
                            {user.phone && (
                              <div className='flex items-center text-xs text-gray-500 whitespace-nowrap'>
                                <Phone className='h-3 w-3 mr-1 text-gray-400 flex-shrink-0' />
                                <span className='truncate max-w-[150px]'>
                                  {user.phone}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <span
                            className={`px-2 py-0.5 inline-flex items-center gap-1 text-xs font-semibold rounded-full border ${getRoleBadgeColor(user.role)}`}
                          >
                            <Shield className='h-3 w-3' />
                            {user.role
                              ? user.role.charAt(0).toUpperCase() +
                                user.role.slice(1)
                              : 'User'}
                          </span>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          {getStatusBadge(user)}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <div className='flex items-center text-xs text-gray-500'>
                            <Calendar className='h-3 w-3 mr-1 text-gray-400' />
                            {formatDate(user.created_at)}
                          </div>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-right'>
                          <div className='flex justify-end space-x-1'>
                            <Link
                              to={`/admin/users/${user._id || user.id}`}
                              className='p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors'
                              title='Edit user'
                            >
                              <Edit className='h-4 w-4' />
                            </Link>
                            <button
                              onClick={() => handleDeleteClick(user)}
                              className='p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                              title='Delete user'
                            >
                              <Trash2 className='h-4 w-4' />
                            </button>
                            <button
                              className='p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors'
                              title='More options'
                            >
                              <MoreVertical className='h-4 w-4' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan='6' className='px-4 py-8 text-center'>
                        <div className='flex flex-col items-center justify-center text-gray-500'>
                          <User className='h-8 w-8 text-gray-300 mb-2' />
                          <p className='text-sm font-medium'>No users found</p>
                          <p className='text-xs text-gray-400 mt-1'>
                            Try adjusting your search or filter
                          </p>
                          <button
                            onClick={clearFilters}
                            className='mt-3 px-3 py-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium border border-emerald-200 rounded-lg hover:bg-emerald-50'
                          >
                            Clear all filters
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination - Fixed at bottom */}
            {totalPages > 1 && (
              <div className='flex-shrink-0 border-t border-gray-200 bg-white'>
                {renderPagination()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4'>
            <div
              className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
              onClick={() => setShowDeleteModal(false)}
            />

            <div className='relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl transform transition-all'>
              <div className='px-4 pt-5 pb-4 sm:p-6'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <AlertCircle className='h-6 w-6 text-red-600' />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Delete User
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Are you sure you want to delete{' '}
                        <span className='font-medium text-gray-700'>
                          {userToDelete?.first_name || ''}{' '}
                          {userToDelete?.last_name || ''}
                        </span>
                        ? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2'>
                <button
                  onClick={confirmDelete}
                  className='w-full sm:w-auto px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                >
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className='w-full sm:w-auto mt-2 sm:mt-0 px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
