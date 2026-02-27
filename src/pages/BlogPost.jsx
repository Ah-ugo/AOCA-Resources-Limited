/** @format */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  MessageSquare,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Try to fetch by slug first, then by ID as fallback
        const response = await fetch(
          `https://aoca-resources-backend.onrender.com/blog/posts/${slug}`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch post: ${response.status}`);
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get author initials for avatar
  const getAuthorInitials = (authorName) => {
    if (!authorName) return 'AU';
    return authorName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-luxury-cream flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='h-12 w-12 text-emerald-600 animate-spin mx-auto mb-4' />
          <p className='text-gray-500 font-light text-lg'>Loading article...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div className='min-h-screen bg-luxury-cream flex items-center justify-center'>
        <div className='text-center max-w-md px-6'>
          <div className='w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <AlertCircle className='text-red-500 h-12 w-12' />
          </div>
          <h2 className='text-3xl font-serif font-bold text-luxury-black mb-4'>
            Article Not Found
          </h2>
          <p className='text-gray-500 font-light mb-8'>
            {error ||
              "The article you're looking for doesn't exist or has been moved."}
          </p>
          <Link
            to='/blog'
            className='inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/20'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  // Use post data from API or fallback to mock data
  const postData = {
    title: post.title || 'Untitled Post',
    content: post.content || '<p>No content available.</p>',
    image:
      post.featured_image ||
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000',
    category: post.category || 'General',
    author: post.author || 'AOCA Resources',
    role: post.author_role || 'Contributor',
    date: formatDate(post.created_at),
    readTime: post.read_time || '5 min read',
    tags: post.tags || [],
    author_bio:
      post.author_bio ||
      `Author at AOCA Resources, sharing insights about ${post.category || 'various topics'}.`,
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Header */}
      <section className='relative h-[70vh] flex items-end pb-20 overflow-hidden bg-luxury-black'>
        <div className='absolute inset-0 z-0'>
          <img
            src={postData.image}
            alt={postData.title}
            className='w-full h-full object-cover opacity-50'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/40 to-transparent' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-4xl'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Link
                to='/blog'
                className='inline-flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-xs mb-8 hover:gap-3 transition-all'
              >
                <ArrowLeft className='h-4 w-4' /> Back to Journal
              </Link>
              <div className='flex items-center gap-4 mb-6'>
                <span className='px-6 py-2 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest'>
                  {postData.category}
                </span>
                <span className='text-white/50 text-xs font-bold uppercase tracking-widest'>
                  {postData.readTime}
                </span>
              </div>
              <h1 className='text-4xl md:text-7xl font-serif font-bold text-white mb-8 leading-tight'>
                {postData.title}
              </h1>
              <div className='flex items-center gap-6'>
                <div className='flex items-center gap-4'>
                  <div className='w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold'>
                    {getAuthorInitials(postData.author)}
                  </div>
                  <div>
                    <p className='text-white font-bold'>{postData.author}</p>
                    <p className='text-white/40 text-xs uppercase tracking-widest font-bold'>
                      {postData.role}
                    </p>
                  </div>
                </div>
                <div className='h-10 w-px bg-white/10 hidden md:block' />
                <div className='hidden md:flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest font-bold'>
                  <Calendar className='h-4 w-4 text-emerald-500' />
                  {postData.date}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className='py-32'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col lg:flex-row gap-20'>
            {/* Main Content */}
            <div className='flex-1'>
              <div
                className='prose prose-xl prose-emerald max-w-none font-light text-gray-600 leading-relaxed
                prose-headings:font-serif prose-headings:font-bold prose-headings:text-luxury-black
                prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-luxury-cream prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:text-2xl prose-blockquote:font-serif
                prose-img:rounded-[2.5rem] prose-img:shadow-2xl'
                dangerouslySetInnerHTML={{ __html: postData.content }}
              />

              {/* Tags & Share */}
              <div className='mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8'>
                <div className='flex flex-wrap gap-3'>
                  {(postData.tags.length > 0
                    ? postData.tags
                    : [postData.category, 'Insights', 'Career']
                  ).map((tag) => (
                    <span
                      key={tag}
                      className='px-6 py-2 rounded-full bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all cursor-pointer'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className='flex items-center gap-6'>
                  <span className='text-xs uppercase tracking-widest font-bold text-gray-400'>
                    Share Article
                  </span>
                  <div className='flex gap-4'>
                    {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                      <button
                        key={i}
                        className='w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-luxury-black hover:text-white transition-all'
                        onClick={() => {
                          // Add sharing functionality here
                          const urls = [
                            `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                            `https://twitter.com/intent/tweet?url=${window.location.href}&text=${postData.title}`,
                            `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                          ];
                          window.open(
                            urls[i],
                            '_blank',
                            'width=600,height=400',
                          );
                        }}
                      >
                        <Icon className='h-4 w-4' />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Author Bio */}
              <div className='mt-20 p-12 rounded-[3rem] bg-luxury-cream flex flex-col md:flex-row gap-8 items-center'>
                <div className='w-32 h-32 rounded-full bg-emerald-500/20 flex items-center justify-center text-4xl text-emerald-600 font-serif font-bold shrink-0'>
                  {getAuthorInitials(postData.author)}
                </div>
                <div className='text-center md:text-left'>
                  <h4 className='text-2xl font-serif font-bold text-luxury-black mb-2'>
                    {postData.author}
                  </h4>
                  <p className='text-emerald-600 font-bold uppercase tracking-widest text-[10px] mb-4'>
                    {postData.role}
                  </p>
                  <p className='text-gray-500 font-light leading-relaxed'>
                    {postData.author_bio}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className='w-full lg:w-96 space-y-12'>
              <div className='p-10 rounded-[2.5rem] bg-luxury-black text-white'>
                <h3 className='text-2xl font-serif font-bold mb-8'>
                  Related Articles
                </h3>
                <div className='space-y-8'>
                  {[1, 2, 3].map((i) => (
                    <Link
                      key={i}
                      to={`/blog/post-${i}`}
                      className='group block'
                    >
                      <p className='text-xs uppercase tracking-widest font-bold text-emerald-500 mb-2'>
                        {new Date(Date.now() - i * 86400000).toLocaleDateString(
                          'en-US',
                          { month: 'long', day: 'numeric', year: 'numeric' },
                        )}
                      </p>
                      <h4 className='text-lg font-serif font-bold group-hover:text-emerald-400 transition-colors leading-tight'>
                        Related Article Title {i}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>

              <div className='p-10 rounded-[2.5rem] bg-emerald-600 text-white text-center'>
                <h3 className='text-2xl font-serif font-bold mb-6'>
                  Ready to Start?
                </h3>
                <p className='text-white/80 font-light mb-8'>
                  Join the elite group of professionals achieving success with
                  AOCA Resources.
                </p>
                <Link
                  to='/register'
                  className='block w-full py-5 bg-white text-emerald-600 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-luxury-black hover:text-white transition-all'
                >
                  Register Now
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
