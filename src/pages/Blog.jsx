/** @format */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Calendar,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Clock,
  Sparkles,
  ShieldCheck,
  BookOpen,
  Loader2,
  Mail,
  Send,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Cycle of badge color classes so dynamic categories still look intentional
const BADGE_STYLES = [
  'bg-primary text-on-primary',
  'bg-secondary text-on-secondary',
  'bg-primary-container text-white',
  'bg-secondary-container text-on-secondary-container',
  'bg-tertiary-container text-white',
];

function badgeStyleFor(category, categories) {
  const idx = Math.max(0, categories.indexOf(category));
  return BADGE_STYLES[idx % BADGE_STYLES.length];
}

function formatDate(dateString) {
  if (!dateString) return 'Recently';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function estimateReadTime(text) {
  const words = (text || '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function getAuthorName(post) {
  return post?.author?.name || 'AOCA Resources';
}

function getExcerpt(post) {
  return (
    post.excerpt ||
    (post.content
      ? post.content.replace(/<[^>]+>/g, '').substring(0, 160) + '…'
      : '') ||
    'Click to read more about this insightful article.'
  );
}

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://aoca-resources-backend.onrender.com/blog/posts',
        );
        if (!response.ok) throw new Error('Failed to fetch blog posts');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        posts
          .map((post) => post.category)
          .filter((cat) => cat && cat.trim() !== ''),
      ),
    ];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      (post.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.content || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' ||
      (post.category && post.category === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const [featuredPost, ...remainingPosts] = filteredPosts;
  const topicChips = categories.filter((c) => c !== 'All').slice(0, 5);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 4500);
  };

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Full-Screen Editorial Hero */}
      <section className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/image10.png"
            alt="AOCA Journal — editorial desk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 to-primary/20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-24 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl flex flex-col items-start gap-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-secondary-fixed/40">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
              <span className="font-label-caps text-[11px] tracking-widest text-secondary-fixed uppercase font-bold">
                Insights &amp; News
              </span>
            </div>
            <h1 className="font-display-hero text-5xl sm:text-6xl lg:text-7xl text-white font-bold tracking-tight leading-none">
              The AOCA Journal
            </h1>
            <p className="font-body-lg text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              Expert perspectives on German migration pathways, clinical
              accreditation, intensive language mastery, and career journeys
              from Port Harcourt to Europe.
            </p>
            {topicChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {topicChips.map((chip) => (
                  <span
                    key={chip}
                    className="font-label-caps text-[11px] px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 uppercase tracking-wide backdrop-blur-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/70"
        >
          <span className="font-label-caps text-[10px] uppercase tracking-widest">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </section>

      {/* Search + Category Filter */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 sticky top-[88px] pb-2">
        <div className="max-w-7xl mx-auto">
          <div className="bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/30 flex flex-col gap-5">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-outline" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, visa pathways, exam prep guides…"
                className="w-full pl-12 pr-4 py-3.5 bg-surface-container-low text-on-surface rounded-lg font-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4 py-2 rounded-full font-label-md text-sm font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-on-surface-variant font-body-md">
                Loading insights…
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-24">
              <p className="font-body-lg text-red-500">Error: {error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-8 py-3 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all"
              >
                Retry
              </button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body-lg text-on-surface-variant">
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <>
              {/* Lead Article Showcase */}
              {featuredPost && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-md border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-12 group hover:shadow-xl transition-shadow"
                >
                  <Link
                    to={`/blog/${featuredPost._id}`}
                    className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden block"
                  >
                    <img
                      src={
                        featuredPost.featured_image ||
                        '/image9.png'
                      }
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
                      <span className="font-label-caps text-[11px] text-primary font-bold tracking-wider uppercase">
                        Lead Briefing
                      </span>
                    </div>
                  </Link>
                  <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-surface-container-lowest">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3 text-on-surface-variant font-body-sm text-sm flex-wrap">
                        {featuredPost.category && (
                          <>
                            <span className="font-label-caps text-secondary font-bold uppercase tracking-wider text-xs">
                              {featuredPost.category}
                            </span>
                            <span>•</span>
                          </>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(featuredPost.created_at)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {estimateReadTime(featuredPost.content)} min read
                        </span>
                      </div>
                      <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold leading-snug">
                        <Link
                          to={`/blog/${featuredPost._id}`}
                          className="group-hover:text-primary transition-colors"
                        >
                          {featuredPost.title}
                        </Link>
                      </h2>
                      <p className="font-body-md text-on-surface-variant leading-relaxed">
                        {getExcerpt(featuredPost)}
                      </p>
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
                          {getAuthorName(featuredPost)
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-title-md text-sm font-semibold text-on-surface">
                            {getAuthorName(featuredPost)}
                          </span>
                          <span className="font-body-sm text-xs text-on-surface-variant">
                            Editorial Desk
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 mt-4 border-t border-outline-variant/20">
                      <Link
                        to={`/blog/${featuredPost._id}`}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-sm font-semibold hover:bg-primary-container transition-all"
                      >
                        <span>Examine Full Briefing</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Article Grid */}
              {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {remainingPosts.map((post, i) => (
                    <motion.article
                      key={post._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                      className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-outline-variant/30 transition-all group"
                    >
                      <Link
                        to={`/blog/${post._id}`}
                        className="relative h-52 overflow-hidden block"
                      >
                        <img
                          src={
                            post.featured_image ||
                            '/image9.png'
                          }
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.category && (
                          <div
                            className={`absolute top-3 left-3 px-3 py-1 rounded-full font-label-caps text-[10px] font-bold uppercase ${badgeStyleFor(
                              post.category,
                              categories,
                            )}`}
                          >
                            {post.category}
                          </div>
                        )}
                      </Link>
                      <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-xs">
                            <span>{formatDate(post.created_at)}</span>
                            <span>•</span>
                            <span>
                              {estimateReadTime(post.content)} min read
                            </span>
                          </div>
                          <h3 className="font-headline-sm text-lg text-on-surface font-semibold hover:text-primary transition-colors leading-snug">
                            <Link to={`/blog/${post._id}`}>{post.title}</Link>
                          </h3>
                          <p className="font-body-sm text-sm text-on-surface-variant line-clamp-3">
                            {getExcerpt(post)}
                          </p>
                        </div>
                        <Link
                          to={`/blog/${post._id}`}
                          className="inline-flex items-center gap-1.5 font-label-md text-sm font-semibold text-primary hover:text-secondary transition-colors"
                        >
                          <span>Read Article</span>
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between pt-6 border-t border-outline-variant/20 flex-wrap gap-4">
                <span className="font-body-sm text-sm text-on-surface-variant">
                  Displaying{' '}
                  <strong className="text-on-surface">
                    1–{filteredPosts.length}
                  </strong>{' '}
                  of {posts.length} published briefings
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    disabled
                    className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-outline"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-primary text-on-primary font-label-md text-sm font-semibold shadow-sm">
                    1
                  </button>
                  <button className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:text-primary transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-xl bg-surface-container-lowest p-8 sm:p-12 shadow-md border border-outline-variant/30 flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="flex flex-col gap-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-secondary font-label-caps text-xs font-bold uppercase tracking-wider">
                <Mail className="h-4 w-4" />
                <span>AOCA Consular Dispatch</span>
              </div>
              <h3 className="font-headline-md text-2xl text-on-surface font-semibold">
                Subscribe to The Journal
              </h3>
              <p className="font-body-md text-on-surface-variant">
                Receive migration pathway updates, exam booking notices, and new
                hospital recruitment dates directly in your inbox.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="w-full lg:w-auto flex flex-col sm:flex-row gap-3 shrink-0"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@example.com"
                className="px-5 py-3.5 bg-surface-container-low text-on-surface rounded-lg font-body-md border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-80"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-primary hover:bg-primary-container text-on-primary font-label-md text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 shrink-0"
              >
                <span>Subscribe Now</span>
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
          <AnimatePresence>
            {subscribed && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 p-3 rounded-lg bg-primary text-on-primary font-body-sm text-sm flex items-center gap-2 max-w-xl"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>
                  You're subscribed — check your inbox for confirmation.
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
