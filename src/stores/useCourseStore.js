import { create } from 'zustand';
import apiClient from '../services/api-client';

const useCourseStore = create((set, get) => ({
  courses: [],
  enrollments: [],
  upcomingClasses: [],
  pendingAssignments: [],
  activeCourse: null,
  activeLesson: null,
  progress: {
    completed_lesson_ids: [],
    completed_count: 0,
    total_lessons: 0,
    percentage: 0,
  },
  isLoading: false,
  error: null,

  fetchStudentDashboard: async () => {
    set({ isLoading: true, error: null });
    try {
      // FIX: correct endpoint is /dashboard not /dashboard/student
      const response = await apiClient.get('/dashboard');
      set({
        courses: response.data.courses || [],
        upcomingClasses: response.data.upcoming_classes || [],
        pendingAssignments: response.data.pending_assignments || [],
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  fetchMyEnrollments: async () => {
    try {
      const response = await apiClient.get('/students/my-enrollments');
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.enrollments || [];
      set({ enrollments: data });
    } catch (error) {
      console.warn('Failed to fetch enrollments:', error.message);
    }
  },

  requestEnrollment: async (courseId) => {
    try {
      const response = await apiClient.post(
        `/students/courses/${courseId}/enroll-request`,
      );
      get().fetchMyEnrollments();
      return response.data;
    } catch (error) {
      if (error.response?.status === 404 || error.response?.status === 405) {
        const fallback = await apiClient.post('/students/apply', {
          course_id: courseId,
          message: '',
        });
        get().fetchMyEnrollments();
        return fallback.data;
      }
      throw error;
    }
  },

  fetchCourseData: async (courseId) => {
    set({ isLoading: true, error: null });
    try {
      const [courseRes, progressRes] = await Promise.all([
        apiClient.get(`/dashboard/courses/${courseId}`),
        apiClient.get(`/dashboard/progress/${courseId}`),
      ]);

      const activeCourse = courseRes.data;
      const progress = progressRes.data;

      let activeLesson = null;
      if (activeCourse.modules?.length > 0) {
        activeLesson = activeCourse.modules[0].lessons?.[0] || null;
      }

      set({ activeCourse, progress, activeLesson, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  markLessonComplete: async (lessonId, courseId) => {
    try {
      await apiClient.post(`/dashboard/progress/lesson/${lessonId}/complete`, {
        course_id: courseId,
      });
      const progressRes = await apiClient.get(
        `/dashboard/progress/${courseId}`,
      );
      set({ progress: progressRes.data });
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
      throw error;
    }
  },

  submitAssignment: async (lessonId, payload) => {
    try {
      await apiClient.post(
        `/dashboard/assignments/${lessonId}/submit`,
        payload,
      );
      // Fetch updated progress or assignment status if necessary
    } catch (error) {
      console.error('Failed to submit assignment:', error);
      throw error;
    }
  },

  setActiveLesson: (lesson) => set({ activeLesson: lesson }),
}));

export default useCourseStore;
