/** @format */
import apiClient from './api-client';

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

export const instructorService = {
  getInstructorStats,
  getInstructorCourses,
  gradeAssignment,
};
