import axiosInstance from "../lib/axios";

export const mockInterviewApi = {
  uploadResume: async (formData) => {
    const response = await axiosInstance.post(
      "/mock/upload-resume",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  transcribeAudio: async (formData) => {
    const response = await axiosInstance.post(
      "/mock/transcribe",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  createInterview: async (data) => {
    const response = await axiosInstance.post(
      "/mock/create",
      data
    );

    return response.data;
  },

  getCurrentQuestion: async (interviewId) => {
    const response = await axiosInstance.get(
      `/mock/${interviewId}/question`
    );

    return response.data;
  },

  submitAnswer: async ({
    interviewId,
    questionId,
    answer,
  }) => {
    const response = await axiosInstance.post(
      `/mock/${interviewId}/answer`,
      {
        questionId,
        answer,
      }
    );

    return response.data;
  },

  completeInterview: async (interviewId) => {
    const response = await axiosInstance.post(
      `/mock/${interviewId}/complete`
    );

    return response.data;
  },

  getInterviewReport: async (interviewId) => {
    const response = await axiosInstance.get(
      `/mock/report/${interviewId}`
    );

    return response.data;
  },

  getInterviewHistory: async () => {
    const response = await axiosInstance.get(
      "/mock/history"
    );

    return response.data;
  },
};