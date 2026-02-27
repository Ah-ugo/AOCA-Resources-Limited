/** @format */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Filter,
  ArrowRight,
  ChevronDown,
  Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJobListings } from '../services/career-service'; // Adjust the import path as needed

export default function Careers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Use the imported function from your careers service
        const response = await getJobListings({
          limit: 100,
        });

        // Extract the jobs array from the response
        const jobsData = response.jobs || [];
        setJobs(jobsData);

        // Extract unique categories from the jobs data
        if (jobsData.length > 0) {
          const uniqueCategories = [
            'All',
            ...new Set(jobsData.map((job) => job.category).filter(Boolean)),
          ];
          setCategories(uniqueCategories);
        }
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(err.message || 'Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      false;
    const matchesCategory =
      selectedCategory === 'All' || job.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Helper function to format salary display
  const formatSalary = (job) => {
    if (job.salary_min && job.salary_max) {
      return `${job.salary_currency || '$'}${job.salary_min.toLocaleString()} - ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}`;
    } else if (job.salary_min) {
      return `${job.salary_currency || '$'}${job.salary_min.toLocaleString()}+`;
    } else if (job.salary_max) {
      return `Up to ${job.salary_currency || '$'}${job.salary_max.toLocaleString()}`;
    }
    return 'Competitive';
  };

  // Format employment type for display
  const formatEmploymentType = (type) => {
    if (!type) return 'Full-time';
    return type
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className='min-h-screen bg-white'>
      {/* Hero Section */}
      <section className='relative pt-48 pb-32 bg-luxury-black text-white overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <img
            src='https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2000'
            alt='Careers Hero'
            className='w-full h-full object-cover opacity-30'
          />
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-luxury-black' />
        </div>

        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-3xl'>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm block mb-6'
            >
              Join the Elite
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='text-5xl md:text-8xl font-serif font-bold mb-8'
            >
              Build the Future <br /> of Global Talent
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='text-xl text-white/60 font-light leading-relaxed mb-12'
            >
              At AOCA, we are more than a consultancy. We are a team of
              passionate professionals dedicated to transforming lives through
              global opportunities.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className='py-12 bg-luxury-cream sticky top-20 z-30 border-b border-gray-100'>
        <div className='container mx-auto px-6'>
          <div className='flex flex-col lg:flex-row gap-6 items-center'>
            <div className='relative flex-1 w-full'>
              <Search className='absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
              <input
                type='text'
                placeholder='Search for roles...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-16 pr-8 py-5 rounded-full bg-white border border-gray-100 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm'
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
                      : 'bg-white text-gray-400 hover:text-luxury-black border border-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className='py-32'>
        <div className='container mx-auto px-6'>
          {loading ? (
            <div className='flex flex-col items-center justify-center py-20'>
              <Loader2 className='h-12 w-12 text-emerald-600 animate-spin mb-4' />
              <p className='text-gray-500 font-light'>
                Loading career opportunities...
              </p>
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
          ) : (
            <div className='grid grid-cols-1 gap-8'>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, i) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className='group p-8 md:p-12 rounded-[2.5rem] bg-white border border-gray-100 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500'
                  >
                    <div className='flex flex-col lg:flex-row justify-between gap-8'>
                      <div className='space-y-6 flex-1'>
                        <div className='flex flex-wrap gap-3'>
                          <span className='px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-bold uppercase tracking-widest'>
                            {job.category || 'General'}
                          </span>
                          <span className='px-4 py-1.5 rounded-full bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-widest'>
                            {formatEmploymentType(job.employment_type)}
                          </span>
                          {job.location?.remote && (
                            <span className='px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-[10px] font-bold uppercase tracking-widest'>
                              Remote
                            </span>
                          )}
                        </div>
                        <h3 className='text-3xl font-serif font-bold text-luxury-black group-hover:text-emerald-600 transition-colors'>
                          {job.title}
                        </h3>
                        <p className='text-lg text-gray-500 font-light leading-relaxed max-w-2xl'>
                          {job.description}
                        </p>
                        <div className='flex flex-wrap gap-8 text-sm text-gray-400 font-medium'>
                          <div className='flex items-center gap-2'>
                            <MapPin className='h-4 w-4 text-emerald-500' />
                            {job.location?.city || 'Various'},{' '}
                            {job.location?.country || 'Nigeria'}
                          </div>
                          <div className='flex items-center gap-2'>
                            <DollarSign className='h-4 w-4 text-emerald-500' />
                            {formatSalary(job)}
                          </div>
                          <div className='flex items-center gap-2'>
                            <Clock className='h-4 w-4 text-emerald-500' />
                            Posted{' '}
                            {job.created_at
                              ? new Date(job.created_at).toLocaleDateString(
                                  'en-US',
                                  {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  },
                                )
                              : 'Recently'}
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center'>
                        <Link
                          to={`/careers/${job._id}`}
                          className='w-full lg:w-auto px-12 py-5 bg-luxury-black text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-600 transition-all group-hover:scale-105'
                        >
                          Apply Now
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className='text-center py-20'>
                  <p className='text-xl text-gray-400 font-light'>
                    No positions found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className='py-32 bg-luxury-black text-white overflow-hidden'>
        <div className='container mx-auto px-6'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 items-center'>
            <div>
              <span className='text-emerald-400 font-bold uppercase tracking-[0.4em] text-sm block mb-6'>
                Our Culture
              </span>
              <h2 className='text-4xl md:text-6xl font-serif font-bold mb-8'>
                Why Work With Us?
              </h2>
              <div className='space-y-12'>
                {[
                  {
                    title: 'Global Impact',
                    desc: 'Every day, you help professionals achieve their dreams of working and living abroad.',
                  },
                  {
                    title: 'Elite Community',
                    desc: 'Work alongside some of the brightest minds in international recruitment and education.',
                  },
                  {
                    title: 'Growth Mindset',
                    desc: 'We invest in your professional development with continuous learning opportunities.',
                  },
                ].map((item, i) => (
                  <div key={i} className='space-y-4'>
                    <h4 className='text-2xl font-serif font-bold text-emerald-400'>
                      {item.title}
                    </h4>
                    <p className='text-lg text-white/50 font-light leading-relaxed'>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className='relative'>
              <div className='aspect-square rounded-[3rem] overflow-hidden'>
                <img
                  src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000'
                  alt='Culture'
                  className='w-full h-full object-cover'
                />
              </div>
              <div className='absolute -top-10 -left-10 w-48 h-48 bg-emerald-600 rounded-full flex items-center justify-center text-center p-6 animate-pulse'>
                <p className='text-sm font-bold uppercase tracking-widest'>
                  Join the <br /> Movement
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-32 bg-luxury-cream'>
        <div className='container mx-auto px-6 text-center'>
          <h2 className='text-4xl md:text-6xl font-serif font-bold text-luxury-black mb-8'>
            Don't See a Perfect Fit?
          </h2>
          <p className='text-xl text-gray-500 font-light mb-12 max-w-2xl mx-auto'>
            We are always looking for talented individuals to join our mission.
            Send us your CV and we'll keep you in mind for future roles.
          </p>
          <a
            href='mailto:careers@aocaresourcesltd.com'
            className='inline-flex items-center gap-4 px-12 py-6 bg-emerald-600 text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/20'
          >
            Send Your CV <ArrowRight className='h-5 w-5' />
          </a>
        </div>
      </section>
    </div>
  );
}
