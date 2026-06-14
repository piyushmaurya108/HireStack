import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockInterviewApi } from "../../api/mockInterview";

export const useUploadResume = () => {
  const result = useMutation({
    mutationKey: ["uploadResume"],

    mutationFn: mockInterviewApi.uploadResume,

    onSuccess: () => {
      toast.success("Resume uploaded successfully!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to upload resume"
      );
    },
  });

  return result;
};