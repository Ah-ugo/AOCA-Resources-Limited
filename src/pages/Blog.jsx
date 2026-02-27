/** @format */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  ChevronRight,
  Tag,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://aoca-resources-backend.onrender.com/blog/posts',
        );
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();

        // Extract the posts array from the response
        const postsData = data.posts || [];
        setPosts(postsData);

        // Extract unique categories from posts
        if (postsData.length > 0) {
          const uniqueCategories = [
            'All',
            ...new Set(
              postsData
                .map((post) => post.category)
                .filter((cat) => cat && cat.trim() !== ''),
            ),
          ];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get author name (you might want to fetch author details separately)
  const getAuthorName = (post) => {
    // This is a placeholder - you might want to fetch author details from a separate endpoint
    return 'AOCA Resources';
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;

    const matchesCategory =
      selectedCategory === 'All' ||
      (post.category && post.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative pt-48 pb-32 bg-luxury-black text-white overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000'
            alt='Blog Hero'
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-luxury-black' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl mx-auto text-center'>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm block mb-6'
            >
              Insights & News
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='text-5xl md:text-8xl font-serif font-bold mb-8'
            >
              The AOCA Journal
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto'
            >
              Expert perspectives on international careers, language mastery,
              and the evolving global landscape.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search & Filter Bar */}
      <section className='py-12 bg-white sticky top-20 z-30 border-b border-gray-100'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col lg:flex-row gap-6 items-center'>
            <div className='relative flex-1 w-full'>
              <Search className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search articles...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-16 pr-8 py-5 rounded-full bg-gray-50 border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors'
              />
            </div>
            <div className='flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0'>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-4 rounded-full text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-gray-50 text-gray-400 hover:text-luxury-black border border-gray-100'
                  }`}
                >
                  {cat || 'Uncategorized'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className='py-32'>
        <div className='container mx-auto px-6'>
          {loading ? (
            <div className='flex flex-col items-center justify-center py-20'>
              <Loader2 className='h-12 w-12 text-emerald-600 animate-spin mb-4' />
              <p className='text-gray-500 font-light'>Loading insights...</p>
            </div>
          ) : error ? (
            <div className='text-center py-20'>
              <p className='text-xl text-red-500 font-light'>Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className='mt-4 px-8 py-3 bg-luxury-black text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-emerald-600 transition-all'
              >
                Retry
              </button>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20'>
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className='group'
                >
                  <Link
                    to={`/blog/${post._id}`}
                    className='block mb-8 relative overflow-hidden rounded-[2.5rem] aspect-[16/10]'
                  >
                    <img
                      src={
                        post.featured_image ||
                        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1000'
                      }
                      alt={post.title}
                      className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    {post.category && (
                      <div className='absolute top-8 left-8'>
                        <span className='px-6 py-2 rounded-full bg-white/90 backdrop-blur-md text-luxury-black text-[10px] font-bold uppercase tracking-widest'>
                          {post.category}
                        </span>
                      </div>
                    )}
                  </Link>
                  <div className='space-y-4'>
                    <div className='flex items-center gap-6 text-xs text-gray-400 font-bold uppercase tracking-widest'>
                      <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4 text-emerald-500' />
                        {formatDate(post.created_at)}
                      </div>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4 text-emerald-500' />
                        {getAuthorName(post)}
                      </div>
                    </div>
                    <h2 className='text-3xl md:text-4xl font-serif font-bold text-luxury-black group-hover:text-emerald-600 transition-colors leading-tight'>
                      <Link to={`/blog/${post._id}`}>{post.title}</Link>
                    </h2>
                    <p className='text-lg text-gray-500 font-light leading-relaxed'>
                      {post.excerpt ||
                        post.content?.substring(0, 150) + '...' ||
                        'Click to read more about this insightful article.'}
                    </p>
                    <Link
                      to={`/blog/${post._id}`}
                      className='inline-flex items-center gap-3 text-luxury-black font-bold uppercase tracking-widest text-xs group-hover:text-emerald-600 transition-colors pt-4'
                    >
                      Read Article{' '}
                      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-2' />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <p className='text-xl text-gray-400 font-light'>
                No articles found matching your criteria.
              </p>
            </div>
          )}

          {/* Pagination - You can implement this when your API supports it */}
          {posts.length > 0 && (
            <div className='mt-32 flex justify-center items-center gap-4'>
              <button className='w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all'>
                1
              </button>
              <button className='w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all'>
                2
              </button>
              <button className='w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-500 transition-all'>
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className='py-32 bg-luxury-black text-white'>
        <div className='container mx-auto px-6'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-4xl md:text-6xl font-serif font-bold mb-8'>
              Subscribe to the Journal
            </h2>
            <p className='text-xl text-white/60 font-light mb-12'>
              Get the latest insights and news delivered directly to your inbox
              every week.
            </p>
            <form className='flex flex-col md:flex-row gap-4 max-w-2xl mx-auto'>
              <input
                type='email'
                placeholder='Your email address'
                className='flex-1 bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white focus:outline-none focus:border-emerald-500 transition-colors'
              />
              <button className='px-12 py-5 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all'>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
