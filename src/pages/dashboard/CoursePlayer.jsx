/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  getCourseDetail,
  getCourseProgress,
  markLessonComplete,
} from '../../services/student-service';
import {
  Play,
  CheckCircle,
  ChevronLeft,
  Loader2,
  FileText,
  Video,
} from 'lucide-react';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({ completed_lesson_ids: [] });
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = useCallback(async () => {
    try {
      const [courseData, progressData] = await Promise.all([
        getCourseDetail(courseId),
        getCourseProgress(courseId),
      ]);
      setCourse(courseData);
      setProgress(progressData);

      // Auto-select first lesson or last active
      if (courseData.modules?.length > 0) {
        const firstLesson = courseData.modules[0].lessons?.[0];
        setActiveLesson(firstLesson);
      }
    } catch (err) {
      console.error('Failed to load course player', err);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleComplete = async (lessonId) => {
    try {
      await markLessonComplete(lessonId, courseId);
      const updatedProgress = await getCourseProgress(courseId);
      setProgress(updatedProgress);
    } catch (err) {
      alert('Failed to save progress');
    }
  };

  if (loading)
    return (
      <div className='flex h-screen items-center justify-center bg-gray-900'>
        <Loader2 className='w-10 h-10 animate-spin text-emerald-500' />
      </div>
    );

  return (
    <div className='flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden'>
      {/* Main Content Area */}
      <div className='flex-1 flex flex-col min-w-0'>
        <div className='bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4'>
          <button
            onClick={() => navigate('/dashboard')}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors'
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className='font-bold text-gray-900 truncate'>{course?.title}</h1>
        </div>

        <div className='flex-1 overflow-y-auto p-6'>
          {activeLesson ? (
            <div className='max-w-4xl mx-auto space-y-6'>
              <div className='aspect-video bg-black rounded-2xl shadow-lg flex items-center justify-center overflow-hidden'>
                {activeLesson.video_url ? (
                  <iframe
                    src={activeLesson.video_url}
                    className='w-full h-full'
                    allowFullScreen
                  />
                ) : (
                  <div className='text-white text-center'>
                    <Play size={48} className='mx-auto mb-4 opacity-20' />
                    <p className='text-gray-500'>Video Content Placeholder</p>
                  </div>
                )}
              </div>
              <div className='flex justify-between items-start'>
                <div>
                  <h2 className='text-2xl font-bold text-gray-900'>
                    {activeLesson.title}
                  </h2>
                  <p className='text-gray-500 mt-2'>
                    {activeLesson.description}
                  </p>
                </div>
                <button
                  onClick={() =>
                    handleComplete(activeLesson._id || activeLesson.id)
                  }
                  disabled={progress.completed_lesson_ids.includes(
                    activeLesson._id || activeLesson.id,
                  )}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                    progress.completed_lesson_ids.includes(
                      activeLesson._id || activeLesson.id,
                    )
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100'
                  }`}
                >
                  <CheckCircle size={18} />
                  {progress.completed_lesson_ids.includes(
                    activeLesson._id || activeLesson.id,
                  )
                    ? 'Completed'
                    : 'Mark as Complete'}
                </button>
              </div>
            </div>
          ) : (
            <div className='h-full flex items-center justify-center text-gray-400 italic'>
              Select a lesson to begin
            </div>
          )}
        </div>
      </div>

      {/* Course Content Sidebar */}
      <div className='w-full lg:w-80 bg-white border-l border-gray-200 flex flex-col shrink-0'>
        <div className='p-6 border-b border-gray-200'>
          <h3 className='font-bold text-gray-900 mb-1'>Course Content</h3>
          <div className='flex items-center justify-between text-xs font-medium text-gray-500'>
            <span>
              {progress.completed_count} / {progress.total_lessons} Completed
            </span>
            <span>{progress.percentage}%</span>
          </div>
        </div>
        <div className='flex-1 overflow-y-auto'>
          {course?.modules?.map((module, mIdx) => (
            <div key={mIdx}>
              <div className='px-6 py-3 bg-gray-50 border-b border-gray-100'>
                <span className='text-[10px] font-bold text-gray-400 uppercase tracking-widest'>
                  Module {mIdx + 1}
                </span>
                <p className='font-bold text-gray-700 text-xs mt-0.5'>
                  {module.title}
                </p>
              </div>
              <div className='divide-y divide-gray-50'>
                {module.lessons?.map((lesson, lIdx) => (
                  <button
                    key={lIdx}
                    onClick={() => setActiveLesson(lesson)}
                    className={`w-full px-6 py-4 flex items-center gap-3 text-left transition-colors ${activeLesson?._id === lesson._id ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}
                  >
                    {progress.completed_lesson_ids.includes(lesson._id) ? (
                      <CheckCircle
                        size={16}
                        className='text-emerald-500 shrink-0'
                      />
                    ) : (
                      <Play size={16} className='text-gray-300 shrink-0' />
                    )}
                    <div className='min-w-0'>
                      <p
                        className={`text-sm font-medium truncate ${activeLesson?._id === lesson._id ? 'text-emerald-700' : 'text-gray-600'}`}
                      >
                        {lesson.title}
                      </p>
                      <span className='text-[10px] text-gray-400 flex items-center gap-1'>
                        <Video size={10} /> 12 mins
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
