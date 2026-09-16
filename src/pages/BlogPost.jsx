/** @format */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Facebook,
  Twitter,
  Linkedin,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Phone,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

function formatDate(dateString) {
  if (!dateString) return 'Recently';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function estimateReadTime(text) {
  const words = (text || '')
    .replace(/<[^>]+>/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function getAuthorInitials(authorName) {
  if (!authorName) return 'AU';
  return authorName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
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

    if (slug) fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const response = await fetch(
          'https://aoca-resources-backend.onrender.com/blog/posts',
        );
        if (!response.ok) return;
        const data = await response.json();
        const allPosts = data.posts || [];
        const sameCategory = allPosts.filter(
          (p) => p._id !== post?._id && p.category === post?.category,
        );
        const fallback = allPosts.filter((p) => p._id !== post?._id);
        setRelatedPosts(
          (sameCategory.length ? sameCategory : fallback).slice(0, 3),
        );
      } catch (err) {
        // Related articles are a nice-to-have; fail silently
      }
    };

    if (post) fetchRelated();
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-surface flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-on-surface-variant font-body-md">
            Loading article…
          </p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-[70vh] bg-surface flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="text-red-500 h-10 w-10" />
          </div>
          <h2 className="font-headline-md text-on-surface font-bold mb-3">
            Article Not Found
          </h2>
          <p className="font-body-md text-on-surface-variant mb-8">
            {error ||
              "The article you're looking for doesn't exist or has been moved."}
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-on-primary rounded-full font-label-caps font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-all shadow-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  const postData = {
    title: post.title || 'Untitled Post',
    content: post.content || '<p>No content available.</p>',
    image:
      post.featured_image ||
      '/image10.png',
    category: post.category || 'General',
    author: post.author?.name || post.author || 'AOCA Resources',
    role: post.author_role || 'Editorial Desk',
    date: formatDate(post.created_at),
    readTime: `${estimateReadTime(post.content)} min read`,
    tags: post.tags || [],
    author_bio:
      post.author_bio ||
      `Executive faculty at AOCA Resources Limited, covering ${post.category || 'consular and career pathways'} for Nigerian professionals relocating to Germany.`,
  };

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Full-Screen Hero Header */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={postData.image}
            alt={postData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-24 sm:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl flex flex-col gap-6"
          >
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 w-fit text-white/80 font-label-caps font-bold uppercase tracking-widest text-xs hover:gap-3 hover:text-white transition-all"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Journal
            </Link>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-[11px] font-label-caps font-bold uppercase tracking-wider border border-white/20">
                {postData.category}
              </span>
              <span className="text-white/60 text-xs font-label-caps uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {postData.readTime}
              </span>
            </div>
            <h1 className="font-headline-lg text-3xl sm:text-5xl lg:text-6xl text-white font-semibold leading-tight">
              {postData.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white font-bold text-sm border border-white/20">
                  {getAuthorInitials(postData.author)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    {postData.author}
                  </p>
                  <p className="text-white/60 text-[11px] font-label-caps uppercase tracking-widest font-bold">
                    {postData.role}
                  </p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/20 hidden md:block" />
              <div className="hidden md:flex items-center gap-2 text-white/60 text-xs font-label-caps uppercase tracking-widest font-bold">
                <Calendar className="h-4 w-4" />
                {postData.date}
              </div>
            </div>
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

      {/* Article Body */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column */}
          <div className="lg:col-span-8 flex flex-col gap-8 bg-surface-container-lowest p-6 sm:p-10 rounded-xl shadow-sm border border-outline-variant/30">
            <div
              className="prose prose-lg max-w-none font-body-md text-on-surface-variant leading-relaxed
              prose-headings:font-headline-sm prose-headings:font-semibold prose-headings:text-on-surface
              prose-strong:text-on-surface
              prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:bg-surface-container-low prose-blockquote:p-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-primary
              prose-img:rounded-xl prose-img:shadow-md
              prose-a:text-primary"
              dangerouslySetInnerHTML={{ __html: postData.content }}
            />

            {/* Tags & Share */}
            <div className="pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-wrap gap-2">
                {(postData.tags.length > 0
                  ? postData.tags
                  : [postData.category, 'Insights', 'Career']
                ).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-caps text-[11px] font-semibold uppercase tracking-wide"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[11px] font-label-caps uppercase tracking-widest font-bold text-on-surface-variant">
                  Share
                </span>
                <div className="flex gap-2">
                  {[Facebook, Twitter, Linkedin].map((Icon, i) => (
                    <button
                      key={i}
                      className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface flex items-center justify-center transition-all"
                      onClick={() => {
                        const urls = [
                          `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`,
                          `https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(postData.title)}`,
                          `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`,
                        ];
                        window.open(urls[i], '_blank', 'width=600,height=400');
                      }}
                    >
                      <Icon className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Author Bio */}
            <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 flex flex-col sm:flex-row items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-lg shrink-0">
                {getAuthorInitials(postData.author)}
              </div>
              <div className="text-center sm:text-left">
                <h4 className="font-title-md text-base font-bold text-on-surface">
                  {postData.author}
                </h4>
                <p className="text-secondary font-label-caps text-[11px] font-bold uppercase tracking-wider mb-2">
                  {postData.role}
                </p>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  {postData.author_bio}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            {/* CTA */}
            <div className="p-6 bg-primary text-white rounded-xl shadow-lg flex flex-col gap-5 relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-36 h-36 rounded-full bg-secondary/20 blur-xl" />
              <div className="flex items-center gap-2 relative z-10">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                <span className="font-label-caps text-[11px] text-secondary-fixed uppercase font-bold tracking-widest">
                  Immediate Intake
                </span>
              </div>
              <h3 className="font-headline-sm text-xl text-white font-semibold leading-tight relative z-10">
                Ready to Start Your Own Pathway?
              </h3>
              <p className="font-body-sm text-sm text-white/80 relative z-10">
                Speak with our admissions counselors at Port Harcourt HQ or
                request an online consultation.
              </p>
              <div className="flex flex-col gap-2.5 pt-1 relative z-10">
                <a
                  href="tel:+2348161910975"
                  className="w-full text-center py-3 rounded-lg bg-secondary-fixed hover:bg-secondary-fixed-dim text-on-secondary-fixed font-label-md text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4" />
                  +234 816 191 0975
                </a>
                <Link
                  to="/register"
                  className="w-full text-center py-3 rounded-lg bg-white/15 hover:bg-white/25 text-white font-label-md text-sm font-semibold border border-white/20 transition-all"
                >
                  Register Online Now
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="p-6 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-4">
                <h4 className="font-title-md text-base text-on-surface font-semibold flex items-center justify-between">
                  <span>Related Briefings</span>
                </h4>
                <div className="flex flex-col divide-y divide-outline-variant/20">
                  {relatedPosts.map((related) => (
                    <Link
                      key={related._id}
                      to={`/blog/${related._id}`}
                      className="py-3 flex flex-col gap-1 group"
                    >
                      {related.category && (
                        <span className="font-label-caps text-[10px] text-secondary font-bold uppercase">
                          {related.category}
                        </span>
                      )}
                      <span className="font-label-md text-sm text-on-surface group-hover:text-primary transition-colors font-semibold leading-snug">
                        {related.title}
                      </span>
                      <span className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1">
                        {estimateReadTime(related.content)} min read
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Trust Card */}
            <div className="p-6 bg-surface-container-high rounded-xl flex flex-col gap-3">
              <span className="font-label-caps text-[11px] text-primary font-bold uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Statutory Transparency
              </span>
              <p className="font-body-sm text-sm text-on-surface">
                AOCA Resources Limited operates admissions and consular guidance
                from 70 Eligbolo Rd, Rumudumaya, Port Harcourt, Rivers State, in
                compliance with applicable immigration regulations.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
