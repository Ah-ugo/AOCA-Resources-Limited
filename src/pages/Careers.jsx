/** @format */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  ArrowRight,
  ChevronDown,
  Loader2,
  Sparkles,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJobCategories, getJobListings } from '../services/career-service';

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

function formatSalary(job) {
  if (job.salary_min && job.salary_max) {
    return `${job.salary_currency || '$'}${job.salary_min.toLocaleString()} - ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}`;
  } else if (job.salary_min) {
    return `${job.salary_currency || '$'}${job.salary_min.toLocaleString()}+`;
  } else if (job.salary_max) {
    return `Up to ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}`;
  }
  return 'Competitive';
}

function formatEmploymentType(type) {
  if (!type) return 'Full-time';
  return type
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatDate(dateString) {
  if (!dateString) return 'Recently';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [jobCategories, setJobCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const [jobsResponse, categoriesResponse] = await Promise.all([
          getJobListings({ limit: 50 }),
          getJobCategories().catch(() => []),
        ]);

        const nextJobs = jobsResponse.jobs || [];
        setJobs(nextJobs);
        setJobCategories(categoriesResponse || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const categories = useMemo(() => {
    const categoryNames = [
      ...jobCategories.map((category) => category.name || category.title),
      ...jobs.map((job) => job.category).filter(Boolean),
    ];
    return ['All', ...new Set(categoryNames.filter(Boolean))];
  }, [jobCategories, jobs]);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      (job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="w-full bg-surface overflow-x-hidden">
      {/* Full-Screen Editorial Hero */}
      <section className="relative h-screen min-h-[640px] w-full flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/study-group.jpg"
            alt="AOCA team collaborating"
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
                Join the Elite
              </span>
            </div>
            <h1 className="font-display-hero text-5xl sm:text-6xl lg:text-7xl text-white font-bold tracking-tight leading-none">
              Build the Future of Global Talent
            </h1>
            <p className="font-body-lg text-base sm:text-lg text-white/85 max-w-xl leading-relaxed">
              At AOCA, we're more than a consultancy — we're a team of
              passionate professionals dedicated to transforming lives through
              global opportunities.
            </p>
            <div className="flex flex-wrap items-center gap-8 pt-4">
              {[
                { value: `${jobs.length || '10'}+`, label: 'Open Roles' },
                { value: '3', label: 'Consular Hubs' },
                { value: '500+', label: 'Lives Transformed' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-headline-sm text-2xl text-white font-bold">
                    {stat.value}
                  </span>
                  <span className="font-label-caps text-[10px] text-white/70 uppercase tracking-widest font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
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
                placeholder="Search for roles…"
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

      {/* Job Listings */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-on-surface-variant font-body-md">
                Loading career opportunities…
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
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-body-lg text-on-surface-variant">
                No positions found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, i) => (
                <motion.article
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (i % 6) * 0.06 }}
                  className="group p-6 md:p-10 rounded-xl bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-8">
                    <div className="space-y-5 flex-1">
                      <div className="flex flex-wrap gap-2">
                        {job.category && (
                          <span
                            className={`px-3 py-1 rounded-full font-label-caps text-[10px] font-bold uppercase tracking-wider ${badgeStyleFor(
                              job.category,
                              categories,
                            )}`}
                          >
                            {job.category}
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant text-[10px] font-label-caps font-bold uppercase tracking-wider border border-outline-variant/30">
                          {formatEmploymentType(job.employment_type)}
                        </span>
                        {job.location?.remote && (
                          <span className="px-3 py-1 rounded-full bg-surface-container-high text-primary text-[10px] font-label-caps font-bold uppercase tracking-wider">
                            Remote
                          </span>
                        )}
                      </div>
                      <h3 className="font-headline-sm text-xl text-on-surface font-semibold group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="font-body-md text-sm text-on-surface-variant leading-relaxed max-w-2xl">
                        {job.description}
                      </p>
                      <div className="flex flex-wrap gap-6 text-sm text-on-surface-variant font-medium pt-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {job.location?.city || 'Various'},{' '}
                          {job.location?.country || 'Nigeria'}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-primary" />
                          {formatSalary(job)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          Posted {formatDate(job.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center shrink-0">
                      <Link
                        to={`/careers/${job._id}`}
                        className="w-full lg:w-auto text-center px-8 py-3.5 bg-primary text-on-primary rounded-full font-label-md text-sm font-semibold hover:bg-primary-container transition-all"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-primary-container rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-tertiary opacity-90 pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-secondary-fixed font-label-caps text-xs font-bold uppercase tracking-widest mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Our Culture</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-white font-semibold mb-8">
                Why Work With Us?
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: Users,
                    title: 'Global Impact',
                    desc: 'Every day, you help professionals achieve their dreams of working and living abroad.',
                  },
                  {
                    icon: Sparkles,
                    title: 'Elite Community',
                    desc: 'Work alongside some of the brightest minds in international recruitment and education.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Growth Mindset',
                    desc: 'We invest in your professional development with continuous learning opportunities.',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-secondary-fixed" />
                    </div>
                    <div>
                      <h4 className="font-title-md text-white font-semibold mb-1">
                        {item.title}
                      </h4>
                      <p className="font-body-sm text-sm text-white/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10">
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/image5.png"
                  alt="AOCA team culture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary-fixed rounded-full flex items-center justify-center text-center p-6 shadow-lg">
                <p className="text-xs font-label-caps font-bold uppercase tracking-widest text-on-secondary-fixed leading-tight">
                  Join the Movement
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full rounded-xl bg-surface-container-lowest p-8 sm:p-12 shadow-md border border-outline-variant/30 flex flex-col items-center text-center gap-6"
          >
            <h2 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-semibold">
              Don't See a Perfect Fit?
            </h2>
            <p className="font-body-md text-on-surface-variant leading-relaxed max-w-xl">
              We're always looking for talented individuals to join our mission.
              Send us your CV and we'll keep you in mind for future roles.
            </p>
            <a
              href="mailto:careers@aocaresourcesltd.com"
              className="inline-flex items-center gap-3 px-8 py-3.5 bg-primary text-on-primary rounded-full font-label-md text-sm font-semibold hover:bg-primary-container transition-all shadow-sm"
            >
              Send Your CV
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
