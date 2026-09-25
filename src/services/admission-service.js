import apiClient from './api-client';

export const submitAdmissionInquiry = async (inquiryData) => {
  try {
    const response = await apiClient.post(
      '/admission-inquiry',
      inquiryData,
    );
    return response.data;
  } catch (error) {
    console.error('Submit admission inquiry error:', error);
    throw error;
  }
};

export const getInquiryPhoneNumbers = (inquiries = []) => {
  return inquiries
    .map((inquiry) => inquiry.phone)
    .filter((phone) => typeof phone === 'string' && phone.trim().length > 0);
};
