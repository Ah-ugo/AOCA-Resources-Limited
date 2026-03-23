/** @format */

'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiEdit,
  FiEye,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiUser,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiAlertCircle,
} from 'react-icons/fi';
import AdminLayout from '../../../components/admin/AdminLayout';
import { adminService } from '../../../services/admin-service';
import { formatDate } from '../../../utils/formatters';

const BlogsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    postId: null,
    postTitle: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, [currentPage, categoryFilter, searchTerm]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = {
        skip: (currentPage - 1) * 10,
        limit: 10,
        category: categoryFilter || undefined,
        search: searchTerm || undefined,
      };

      const data = await adminService.getBlogPosts(params);

      // Handle different response structures
      if (data && data.posts) {
        setPosts(data.posts);
        setTotalPosts(data.total || data.posts.length);
        setTotalPages(Math.ceil((data.total || data.posts.length) / 10));
      } else if (Array.isArray(data)) {
        setPosts(data);
        setTotalPosts(data.length);
        setTotalPages(Math.ceil(data.length / 10));
      } else {
        setPosts([]);
        setTotalPosts(0);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await adminService.getBlogCategories();
      if (Array.isArray(data)) {
        setCategories(data);
      } else if (data && data.categories) {
        setCategories(data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching blog categories:', err);
      setCategories([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleDeleteClick = (postId, postTitle) => {
    setDeleteModal({ show: true, postId, postTitle });
  };

  const confirmDelete = async () => {
    if (!deleteModal.postId) return;

    try {
      await adminService.deleteBlogPost(deleteModal.postId);
      setPosts(posts.filter((post) => post._id !== deleteModal.postId));
      setDeleteModal({ show: false, postId: null, postTitle: '' });
    } catch (err) {
      console.error('Error deleting blog post:', err);
      alert('Failed to delete blog post. Please try again.');
      setDeleteModal({ show: false, postId: null, postTitle: '' });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setCurrentPage(1);
  };

  const getStatusBadge = (post) => {
    const isPublished = post.is_published || post.status === 'published';
    return (
      <span
        className={`px-2 py-1 inline-flex items-center gap-1 text-xs leading-5 font-semibold rounded-full ${
          isPublished
            ? 'bg-green-100 text-green-800 border border-green-200'
            : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${isPublished ? 'bg-green-500' : 'bg-yellow-500'} mr-1`}
        ></span>
        {isPublished ? 'Published' : 'Draft'}
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
                {Math.min(currentPage * 10, totalPosts)}
              </span>{' '}
              of <span className='font-medium'>{totalPosts}</span> results
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
                <FiChevronsLeft className='h-5 w-5' />
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FiChevronLeft className='h-5 w-5' />
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
                <FiChevronRight className='h-5 w-5' />
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                <FiChevronsRight className='h-5 w-5' />
              </button>
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='h-full flex flex-col overflow-hidden bg-gray-50'>
      {/* Header - Fixed */}
      <div className='flex-shrink-0 px-6 py-4 bg-white border-b border-gray-200'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>Blog Posts</h1>
            <p className='text-sm text-gray-600 mt-1'>
              Manage all blog posts, categories, and publishing
            </p>
          </div>
          <button
            onClick={() => navigate('/admin/blogs/new')}
            className='mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors'
          >
            <FiPlus className='mr-2' />
            Add New Post
          </button>
        </div>
      </div>

      {/* Filters Toggle - Fixed */}
      <div className='flex-shrink-0 px-6 py-3 bg-white border-b border-gray-200'>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className='flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-emerald-600'
        >
          <FiFilter className='h-4 w-4' />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters Panel - Expandable */}
      {showFilters && (
        <div className='flex-shrink-0 px-6 py-4 bg-gray-50 border-b border-gray-200'>
          <form onSubmit={handleSearch} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              {/* Search */}
              <div className='col-span-1 md:col-span-2'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Search Posts
                </label>
                <div className='relative'>
                  <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4' />
                  <input
                    type='text'
                    placeholder='Search by title or content...'
                    className='w-full pl-9 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      type='button'
                      onClick={() => setSearchTerm('')}
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                    >
                      <FiX className='h-4 w-4' />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Category
                </label>
                <select
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value=''>All Categories</option>
                  {categories.map((category) => (
                    <option
                      key={category._id || category.id || category.name}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(categoryFilter || searchTerm) && (
              <div className='flex items-center gap-2 flex-wrap'>
                <span className='text-xs text-gray-500'>Active filters:</span>
                {categoryFilter && (
                  <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-xs'>
                    Category: {categoryFilter}
                  </span>
                )}
                {searchTerm && (
                  <span className='inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-xs'>
                    Search: "{searchTerm}"
                  </span>
                )}
                <button
                  type='button'
                  onClick={clearFilters}
                  className='text-xs text-red-600 hover:text-red-700 font-medium'
                >
                  Clear all
                </button>
              </div>
            )}
          </form>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className='flex-shrink-0 mx-6 my-4 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg'>
          <div className='flex items-center'>
            <FiAlertCircle className='h-5 w-5 text-red-400 mr-3' />
            <p className='text-sm text-red-700'>{error}</p>
          </div>
        </div>
      )}

      {/* Table Container - Scrollable */}
      <div className='flex-1 overflow-auto min-h-0 px-6 pb-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col'>
          {loading ? (
            <div className='flex items-center justify-center h-full'>
              <div className='animate-spin rounded-full h-8 w-8 border-2 border-emerald-500 border-t-transparent'></div>
            </div>
          ) : posts.length > 0 ? (
            <>
              {/* Table */}
              <div className='flex-1 overflow-auto'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <thead className='bg-gray-50 sticky top-0 z-10'>
                    <tr>
                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                        Title
                      </th>
                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                        Author
                      </th>
                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                        Category
                      </th>
                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                        Status
                      </th>
                      <th className='px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                        Published Date
                      </th>
                      <th className='px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {posts.map((post) => (
                      <tr
                        key={post._id || post.id}
                        className='hover:bg-gray-50'
                      >
                        <td className='px-4 py-3'>
                          <div>
                            <div className='text-sm font-medium text-gray-900 whitespace-nowrap'>
                              {post.title || 'Untitled'}
                            </div>
                            <div className='text-xs text-gray-500 truncate max-w-xs'>
                              {post.excerpt ||
                                post.content?.substring(0, 100) ||
                                'No excerpt'}
                              ...
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='h-7 w-7 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0'>
                              {post.author?.name?.charAt(0) || 'A'}
                            </div>
                            <div className='ml-2'>
                              <div className='text-sm text-gray-900'>
                                {post.author?.name || 'Unknown'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <span className='px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200'>
                            {post.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          {getStatusBadge(post)}
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap'>
                          <div className='flex items-center text-sm text-gray-500'>
                            <FiCalendar className='mr-1 h-3 w-3 text-gray-400' />
                            {post.is_published && post.published_at
                              ? formatDate(post.published_at)
                              : 'Not published'}
                          </div>
                        </td>
                        <td className='px-4 py-3 whitespace-nowrap text-right'>
                          <div className='flex justify-end space-x-1'>
                            <button
                              onClick={() =>
                                navigate(`/blog/${post._id || post.id}`)
                              }
                              className='p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors'
                              title='View Post'
                            >
                              <FiEye className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/admin/blogs/${post._id || post.id}/edit`,
                                )
                              }
                              className='p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                              title='Edit Post'
                            >
                              <FiEdit className='h-4 w-4' />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteClick(
                                  post._id || post.id,
                                  post.title,
                                )
                              }
                              className='p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                              title='Delete Post'
                            >
                              <FiTrash2 className='h-4 w-4' />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination - Fixed at bottom */}
              <div className='flex-shrink-0 border-t border-gray-200 bg-white'>
                {renderPagination()}
              </div>
            </>
          ) : (
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='text-center'>
                <FiSearch className='h-12 w-12 text-gray-300 mx-auto mb-4' />
                <p className='text-gray-500 text-lg font-medium'>
                  No blog posts found
                </p>
                <p className='text-gray-400 text-sm mt-1'>
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={() => navigate('/admin/blogs/new')}
                  className='mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
                >
                  <FiPlus className='mr-2' />
                  Add New Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen px-4'>
            <div
              className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
              onClick={() =>
                setDeleteModal({ show: false, postId: null, postTitle: '' })
              }
            />

            <div className='relative bg-white rounded-lg max-w-md w-full mx-auto shadow-xl transform transition-all'>
              <div className='px-4 pt-5 pb-4 sm:p-6'>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <FiAlertCircle className='h-6 w-6 text-red-600' />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg font-medium text-gray-900'>
                      Delete Blog Post
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Are you sure you want to delete{' '}
                        <span className='font-medium text-gray-700'>
                          "{deleteModal.postTitle}"
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
                  onClick={() =>
                    setDeleteModal({ show: false, postId: null, postTitle: '' })
                  }
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

export default BlogsList;
