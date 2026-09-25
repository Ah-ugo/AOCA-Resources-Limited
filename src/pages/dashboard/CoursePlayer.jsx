/** @format */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCourseStore from '../../stores/useCourseStore';
import {
  Play,
  CheckCircle,
  ChevronLeft,
  Loader2,
  FileText,
  Video,
  Download,
  Upload,
} from 'lucide-react';

const CoursePlayer = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const {
    activeCourse: course,
    progress,
    activeLesson,
    isLoading: loading,
    fetchCourseData,
    markLessonComplete,
    submitAssignment,
    setActiveLesson,
  } = useCourseStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [assignmentText, setAssignmentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCourseData(courseId);
  }, [fetchCourseData, courseId]);

  const handleComplete = async (lessonId) => {
    try {
      await markLessonComplete(lessonId, courseId);
    } catch (err) {
      alert('Failed to save progress');
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    if (!assignmentText.trim()) return;
    
    setIsSubmitting(true);
    try {
      await submitAssignment(activeLesson._id || activeLesson.id, { content: assignmentText });
      setAssignmentText('');
      alert('Assignment submitted successfully!');
    } catch (err) {
      alert('Failed to submit assignment');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to render video securely
  const renderVideo = (url) => {
    if (!url) return null;
    
    // Check if YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('youtu.be/')[1];
      return <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>;
    }
    
    // Check if Vimeo
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1];
      return <iframe className="w-full h-full" src={`https://player.vimeo.com/video/${videoId}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>;
    }

    // Fallback standard video
    return <video src={url} controls className="w-full h-full" />;
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
                  renderVideo(activeLesson.video_url)
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
                </div>
                <button
                  onClick={() =>
                    handleComplete(activeLesson._id || activeLesson.id)
                  }
                  disabled={progress?.completed_lesson_ids?.includes(
                    activeLesson._id || activeLesson.id,
                  )}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                    progress?.completed_lesson_ids?.includes(
                      activeLesson._id || activeLesson.id,
                    )
                      ? 'bg-emerald-100 text-emerald-700 cursor-default'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100'
                  }`}
                >
                  <CheckCircle size={18} />
                  {progress?.completed_lesson_ids?.includes(
                    activeLesson._id || activeLesson.id,
                  )
                    ? 'Completed'
                    : 'Mark as Complete'}
                </button>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mt-8">
                <nav className="-mb-px flex gap-8">
                  {['overview', 'materials', 'assignments'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                        activeTab === tab
                          ? 'border-emerald-500 text-emerald-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-4">
                {activeTab === 'overview' && (
                  <div className="prose max-w-none text-gray-600">
                    <p>{activeLesson.description || 'No description provided for this lesson.'}</p>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-4">
                    {activeLesson.materials?.length > 0 ? activeLesson.materials.map((mat, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-400" />
                          <span className="font-medium text-gray-900">{mat.title || 'Course Material'}</span>
                        </div>
                        <a href={mat.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                          <Download size={16} /> Download
                        </a>
                      </div>
                    )) : (
                      <p className="text-gray-500 italic">No materials attached to this lesson.</p>
                    )}
                  </div>
                )}

                {activeTab === 'assignments' && (
                  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4">Submit Assignment</h3>
                    <form onSubmit={handleAssignmentSubmit} className="space-y-4">
                      <div>
                        <textarea 
                          value={assignmentText}
                          onChange={(e) => setAssignmentText(e.target.value)}
                          rows="4" 
                          placeholder="Type your answer or paste a link to your work..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                        ></textarea>
                      </div>
                      <div className="flex justify-end">
                        <button 
                          type="submit" 
                          disabled={isSubmitting || !assignmentText.trim()}
                          className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Upload size={16} />}
                          Submit Work
                        </button>
                      </div>
                    </form>
                  </div>
                )}
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
              {progress?.completed_count || 0} / {progress?.total_lessons || 0} Completed
            </span>
            <span>{progress?.percentage || 0}%</span>
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
                    {progress?.completed_lesson_ids?.includes(lesson._id) ? (
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
