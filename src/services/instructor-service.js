/** @format */
import apiClient from './api-client';

const LIVE_CLASSES_KEY = 'aoca_instructor_live_classes';
const GRADING_QUEUE_KEY = 'aoca_instructor_grading_queue';

export const getInstructorStats = async () => {
  try {
    const response = await apiClient.get('/instructor/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Get instructor stats error:', error);
    throw error;
  }
};

export const getInstructorCourses = async () => {
  try {
    const response = await apiClient.get('/instructor/courses');
    return response.data;
  } catch (error) {
    console.error('Get instructor courses error:', error);
    throw error;
  }
};

export const getInstructorAssessments = async (courseId) => {
  try {
    const params = courseId ? { params: { course_id: courseId } } : {};
    const response = await apiClient.get('/instructor/assessments', params);
    return response.data;
  } catch (error) {
    console.error('Get instructor assessments error:', error);
    throw error;
  }
};

export const createAssessment = async (courseId, assessmentData) => {
  try {
    const response = await apiClient.post(
      `/instructor/courses/${courseId}/assessments`,
      assessmentData,
    );
    return response.data;
  } catch (error) {
    console.error('Create assessment error:', error);
    throw error;
  }
};

export const getStoredLiveClasses = () => {
  try {
    const saved = localStorage.getItem(LIVE_CLASSES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveLiveClass = (entry) => {
  const current = getStoredLiveClasses();
  const next = [
    { id: entry.id || Date.now().toString(), ...entry },
    ...current,
  ].slice(0, 6);
  localStorage.setItem(LIVE_CLASSES_KEY, JSON.stringify(next));
  return next;
};

export const getStoredGradingQueue = () => {
  try {
    const saved = localStorage.getItem(GRADING_QUEUE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore storage parse errors
  }

  return [];
};

export const updateGradingQueue = (entryId, grade) => {
  const current = getStoredGradingQueue();
  const next = current
    .map((entry) =>
      entry.id === entryId ? { ...entry, grade, status: 'graded' } : entry,
    )
    .filter(
      (entry) => entry.grade !== 'A' || entry.status !== 'graded' || true,
    );

  localStorage.setItem(GRADING_QUEUE_KEY, JSON.stringify(next));
  return next;
};

export const gradeAssignment = async (assignmentId, userId, gradeData) => {
  try {
    const response = await apiClient.post(
      `/admin/assignments/${assignmentId}/grade/${userId}`,
      gradeData,
    );
    return response.data;
  } catch (error) {
    console.error('Grade assignment error:', error);
    throw error;
  }
};

export const getInstructorCoursesList = async () => {
  try {
    const response = await apiClient.get('/instructor/courses/list');
    return response.data;
  } catch (error) {
    console.error('Get instructor courses list error:', error);
    throw error;
  }
};

export const createInstructorClass = async (classData) => {
  try {
    const response = await apiClient.post('/instructor/classes', classData);
    return response.data;
  } catch (error) {
    console.error('Create instructor class error:', error);
    throw error;
  }
};

export const getInstructorResources = async () => {
  try {
    const response = await apiClient.get('/instructor/resources');
    return response.data;
  } catch (error) {
    console.error('Get instructor resources error:', error);
    throw error;
  }
};

export const createInstructorResource = async (resourceData) => {
  try {
    const response = await apiClient.post('/instructor/resources', resourceData);
    return response.data;
  } catch (error) {
    console.error('Create instructor resource error:', error);
    throw error;
  }
};

export const getInstructorModules = async (courseId) => {
  try {
    const response = await apiClient.get(`/instructor/courses/${courseId}/modules`);
    return response.data;
  } catch (error) {
    console.error('Get instructor modules error:', error);
    throw error;
  }
};

export const createInstructorLesson = async (lessonData) => {
  try {
    const response = await apiClient.post(
      `/instructor/modules/${lessonData.module_id}/lessons`,
      lessonData,
    );
    return response.data;
  } catch (error) {
    console.error('Create instructor lesson error:', error);
    throw error;
  }
};

export const instructorService = {
  getInstructorStats,
  getInstructorCourses,
  getInstructorCoursesList,
  getInstructorModules,
  createInstructorLesson,
  createInstructorClass,
  getInstructorAssessments,
  createAssessment,
  getInstructorResources,
  createInstructorResource,
  getStoredLiveClasses,
  saveLiveClass,
  getStoredGradingQueue,
  updateGradingQueue,
  gradeAssignment,
};
