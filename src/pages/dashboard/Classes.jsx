/** @format */

'use client';

import { useState, useEffect } from 'react';
import { Video, Calendar, Clock, User, ExternalLink } from 'lucide-react';
import { getClasses } from '../../services/dashboard-service';

function Classes() {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [pastClasses, setPastClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getClasses(activeTab);

        if (activeTab === 'upcoming') {
          setUpcomingClasses(data.classes || []);
        } else {
          setPastClasses(data.classes || []);
        }
      } catch (err) {
        console.error(`Error fetching ${activeTab} classes:`, err);
        setError(err.message || `Failed to load ${activeTab} classes`);

        // Clear the relevant state on error
        if (activeTab === 'upcoming') {
          setUpcomingClasses([]);
        } else {
          setPastClasses([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, [activeTab]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600'></div>
      </div>
    );
  }

  return (
    <div>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold mb-2'>Live Classes</h1>
        <p className='text-gray-600'>
          Join interactive German language classes via Google Meet
        </p>
      </div>

      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <div className='border-b'>
          <div className='flex'>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'upcoming'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Upcoming Classes
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`px-4 py-3 text-sm font-medium ${
                activeTab === 'past'
                  ? 'border-b-2 border-emerald-600 text-emerald-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Past Classes
            </button>
          </div>
        </div>

        {error ? (
          <div className='p-6 text-center'>
            <p className='text-red-500'>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className='mt-2 text-sm underline text-emerald-600'
            >
              Try again
            </button>
          </div>
        ) : activeTab === 'upcoming' ? (
          <div className='divide-y'>
            {upcomingClasses.length === 0 ? (
              <div className='p-6 text-center text-gray-500'>
                No upcoming classes scheduled.
              </div>
            ) : (
              upcomingClasses.map((classItem) => (
                <div
                  key={classItem.id || classItem._id}
                  className='p-4 hover:bg-gray-50'
                >
                  <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div className='flex-1'>
                      <h3 className='font-medium'>{classItem.title}</h3>
                      <p className='text-sm text-gray-600 mt-1'>
                        {classItem.description}
                      </p>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          <span>{formatDate(classItem.date)}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          <span>{formatTime(classItem.date)}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <User className='h-4 w-4' />
                          <span>
                            Instructor:{' '}
                            {classItem.instructor?.name ||
                              classItem.instructor ||
                              'TBD'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <a
                      href={classItem.meet_link || classItem.link || '#'}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors inline-flex items-center gap-2'
                    >
                      <Video className='h-4 w-4' />
                      Join Class
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className='divide-y'>
            {pastClasses.length === 0 ? (
              <div className='p-6 text-center text-gray-500'>
                No past classes found.
              </div>
            ) : (
              pastClasses.map((classItem) => (
                <div
                  key={classItem.id || classItem._id}
                  className='p-4 hover:bg-gray-50'
                >
                  <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div className='flex-1'>
                      <h3 className='font-medium'>{classItem.title}</h3>
                      <p className='text-sm text-gray-600 mt-1'>
                        {classItem.description}
                      </p>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 text-sm text-gray-600'>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          <span>{formatDate(classItem.date)}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <Clock className='h-4 w-4' />
                          <span>{formatTime(classItem.date)}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                          <User className='h-4 w-4' />
                          <span>
                            Instructor:{' '}
                            {classItem.instructor?.name ||
                              classItem.instructor ||
                              'TBD'}
                          </span>
                        </div>
                      </div>
                    </div>
                    {classItem.recording_link && (
                      <a
                        href={classItem.recording_link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors inline-flex items-center gap-2'
                      >
                        <ExternalLink className='h-4 w-4' />
                        View Recording
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Class Schedule Info */}
      <div className='mt-8 bg-white rounded-lg shadow overflow-hidden'>
        <div className='p-4 bg-emerald-600 text-white'>
          <h2 className='text-lg font-semibold flex items-center gap-2'>
            <Calendar className='h-5 w-5' />
            Class Schedule
          </h2>
        </div>
        <div className='p-4'>
          <p className='text-gray-600 mb-4'>
            Your German classes are scheduled according to your course plan.
          </p>
          <ul className='space-y-2'>
            <li className='flex items-center gap-2'>
              <Clock className='h-4 w-4 text-emerald-600' />
              <span>Check your course schedule for exact dates and times</span>
            </li>
            <li className='flex items-center gap-2 text-gray-500'>
              <Video className='h-4 w-4 text-emerald-600' />
              <span>All classes are conducted via Google Meet</span>
            </li>
            <li className='flex items-center gap-2 text-gray-500'>
              <User className='h-4 w-4 text-emerald-600' />
              <span>
                Join links are provided 15 minutes before class starts
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Classes;
