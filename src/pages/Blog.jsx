/** @format */

'use client';

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  Search,
  Calendar,
  User,
  Tag,
  ChevronRight,
  ChevronLeft,
  Clock,
} from 'lucide-react';
import Header from '../components/Header';
import { getBlogPosts } from '../services/blogService';
import Footer from '../components/Footer';

function Blog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;

  // Get category from URL if present
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
    setCurrentPage(1);
  }, [searchParams]);

  const getBlogPostss = async () => {
    try {
      setLoading(true);
      const response = await getBlogPosts();
      console.log('Blog posts response:', response);

      // Handle both array and object responses
      const postsData = Array.isArray(response)
        ? response
        : response.posts || [];
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize posts
  useEffect(() => {
    getBlogPostss();
  }, []);

  // Filter posts based on search query and category
  useEffect(() => {
    let result = [...posts];

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (post) =>
          post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post?.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post?.content?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((post) => post?.category === selectedCategory);
    }

    setFilteredPosts(result);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, posts]);

  // Get all unique categories (filter out empty strings)
  const categories = [
    ...new Set(posts.map((post) => post?.category).filter(Boolean)),
  ];

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    // The search is already handled by the useEffect
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    if (category === selectedCategory) {
      // If clicking the already selected category, clear the filter
      setSearchParams({});
      setSelectedCategory('');
    } else {
      setSearchParams({ category });
      setSelectedCategory(category);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-background'>
        <Header />
        <main className='pt-24 pb-16'>
          <div className='container mx-auto px-4'>
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary'></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      <Header />

      {/* Page Content */}
      <main className='pt-24 pb-16'>
        {/* Hero Section */}
        <section className='bg-primary/10 py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-3xl mx-auto text-center'>
              <h1 className='text-4xl md:text-5xl font-bold mb-6'>Our Blog</h1>
              <p className='text-xl text-gray-600'>
                Insights, guides, and news about German visa applications,
                language learning, and international opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='flex flex-col lg:flex-row gap-8'>
              {/* Main Content */}
              <div className='lg:w-3/4'>
                {/* Search and Filter Bar */}
                <div className='mb-8 flex flex-col md:flex-row gap-4'>
                  <form onSubmit={handleSearch} className='flex-1'>
                    <div className='relative'>
                      <input
                        type='text'
                        placeholder='Search articles...'
                        className='w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                    </div>
                  </form>

                  <div className='flex flex-wrap gap-2'>
                    <button
                      onClick={() => handleCategoryFilter('')}
                      className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                        selectedCategory === ''
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      All
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryFilter(category)}
                        className={`px-3 py-1 text-sm rounded-md whitespace-nowrap ${
                          selectedCategory === category
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {category || 'Uncategorized'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Blog Posts */}
                {currentPosts.length === 0 ? (
                  <div className='text-center py-12 bg-white rounded-lg shadow-md'>
                    <h3 className='text-xl font-medium mb-2'>No posts found</h3>
                    <p className='text-gray-600'>
                      Try adjusting your search or filter to find what you're
                      looking for.
                    </p>
                  </div>
                ) : (
                  <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-8'>
                    {currentPosts.map((post, index) => (
                      <motion.div
                        key={post._id || index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
                      >
                        <div className='relative h-48 w-full overflow-hidden bg-gray-100'>
                          {post.featured_image ? (
                            <img
                              src={post.featured_image}
                              alt={post.title || 'Blog post'}
                              className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  'https://via.placeholder.com/400x300?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                              <span className='text-gray-400'>No image</span>
                            </div>
                          )}
                          {post.category && (
                            <div className='absolute top-4 left-4 bg-primary text-white text-xs font-semibold px-2 py-1 rounded'>
                              {post.category}
                            </div>
                          )}
                        </div>
                        <div className='p-6'>
                          <h3 className='text-xl font-bold mb-2 hover:text-primary transition-colors line-clamp-2'>
                            <Link to={`/blog/${post._id}`}>
                              {post.title || 'Untitled'}
                            </Link>
                          </h3>
                          <p className='text-gray-600 mb-4 line-clamp-3'>
                            {post.excerpt ||
                              post.content?.substring(0, 150) ||
                              'No description available.'}
                          </p>
                          <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                            <div className='flex items-center gap-1'>
                              <User className='h-4 w-4' />
                              <span>{post.author?.name || 'Anonymous'}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <Calendar className='h-4 w-4' />
                              <span>{formatDate(post.created_at)}</span>
                            </div>
                          </div>
                          <Link
                            to={`/blog/${post._id}`}
                            className='inline-flex items-center text-primary font-medium hover:underline'
                          >
                            Read More
                            <ChevronRight className='h-4 w-4 ml-1' />
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='mt-12 flex justify-center'>
                    <nav className='flex items-center gap-2'>
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className='p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <ChevronLeft className='h-5 w-5' />
                      </button>

                      {[...Array(Math.min(5, totalPages))].map((_, index) => {
                        let pageNumber;
                        if (totalPages <= 5) {
                          pageNumber = index + 1;
                        } else if (currentPage <= 3) {
                          pageNumber = index + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNumber = totalPages - 4 + index;
                        } else {
                          pageNumber = currentPage - 2 + index;
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => paginate(pageNumber)}
                            className={`w-10 h-10 rounded-md ${
                              currentPage === pageNumber
                                ? 'bg-primary text-white'
                                : 'border hover:bg-gray-100'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}

                      <button
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className='p-2 rounded-md border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        <ChevronRight className='h-5 w-5' />
                      </button>
                    </nav>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className='lg:w-1/4'>
                {/* Categories */}
                {categories.length > 0 && (
                  <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <h3 className='text-lg font-bold mb-4'>Categories</h3>
                    <ul className='space-y-2'>
                      <li>
                        <button
                          onClick={() => handleCategoryFilter('')}
                          className={`flex items-center gap-2 w-full text-left ${
                            selectedCategory === ''
                              ? 'text-primary font-medium'
                              : 'text-gray-700 hover:text-primary'
                          }`}
                        >
                          <Tag className='h-4 w-4' />
                          <span>All Categories</span>
                          <span className='ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full'>
                            {posts.length}
                          </span>
                        </button>
                      </li>
                      {categories.map((category) => {
                        const count = posts.filter(
                          (post) => post?.category === category,
                        ).length;
                        return (
                          <li key={category}>
                            <button
                              onClick={() => handleCategoryFilter(category)}
                              className={`flex items-center gap-2 w-full text-left ${
                                selectedCategory === category
                                  ? 'text-primary font-medium'
                                  : 'text-gray-700 hover:text-primary'
                              }`}
                            >
                              <Tag className='h-4 w-4' />
                              <span>{category}</span>
                              <span className='ml-auto bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full'>
                                {count}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {/* Recent Posts */}
                {posts.length > 0 && (
                  <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
                    <h3 className='text-lg font-bold mb-4'>Recent Posts</h3>
                    <div className='space-y-4'>
                      {posts.slice(0, 5).map((post) => (
                        <div key={post._id} className='flex gap-3'>
                          <div className='w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100'>
                            {post.featured_image ? (
                              <img
                                src={post.featured_image}
                                alt={post.title}
                                className='w-full h-full object-cover'
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    'https://via.placeholder.com/64x64?text=No+Image';
                                }}
                              />
                            ) : (
                              <div className='w-full h-full flex items-center justify-center bg-gray-200'>
                                <span className='text-xs text-gray-400'>
                                  No img
                                </span>
                              </div>
                            )}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h4 className='font-medium text-sm hover:text-primary transition-colors line-clamp-2'>
                              <Link to={`/blog/${post._id}`}>
                                {post.title || 'Untitled'}
                              </Link>
                            </h4>
                            <div className='flex items-center gap-1 mt-1 text-xs text-gray-500'>
                              <Clock className='h-3 w-3 flex-shrink-0' />
                              <span className='truncate'>
                                {formatDate(post.created_at)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Call to Action */}
                <div className='bg-primary/10 rounded-lg p-6'>
                  <h3 className='text-lg font-bold mb-3'>
                    Ready to Start Your Journey?
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    Join our language courses and take the first step toward
                    your future in Germany.
                  </p>
                  <Link
                    to='/register'
                    className='block w-full bg-primary text-white text-center px-4 py-2 rounded-md hover:bg-primary/90 transition-colors'
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
