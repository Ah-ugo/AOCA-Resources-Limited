/** @format */
import apiClient from './api-client';

export const getStudentDashboard = async () => {
  const response = await apiClient.get('/dashboard');
  return response.data;
};

export const getStudentCourses = async () => {
  const response = await apiClient.get('/dashboard/courses');
  return response.data;
};

export const getCourseDetail = async (courseId) => {
  const response = await apiClient.get(`/dashboard/courses/${courseId}`);
  return response.data;
};

export const getCourseProgress = async (courseId) => {
  const response = await apiClient.get(`/dashboard/progress/${courseId}`);
  return response.data;
};

export const markLessonComplete = async (lessonId, courseId) => {
  const response = await apiClient.post(
    `/dashboard/progress/lesson/${lessonId}/complete`,
    {
      course_id: courseId,
    },
  );
  return response.data;
};

export const getResumeState = async (courseId) => {
  const response = await apiClient.get(`/dashboard/courses/${courseId}/resume`);
  return response.data;
};

export const getCertificates = async () => {
  const response = await apiClient.get('/dashboard/certificates');
  return response.data;
};

export const applyForCourse = async (courseId, message = '') => {
  const response = await apiClient.post('/students/apply', {
    course_id: courseId,
    message,
  });
  return response.data;
};

export const studentService = {
  getStudentDashboard,
  getStudentCourses,
  getCourseDetail,
  getCourseProgress,
  markLessonComplete,
  getResumeState,
  getCertificates,
  applyForCourse,
};
