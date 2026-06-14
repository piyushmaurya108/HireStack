import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockInterviewApi } from "../../api/mockInterview";

export const useCreateInterview = () => {
  const result = useMutation({
    mutationKey: ["createInterview"],

    mutationFn: mockInterviewApi.createInterview,

    onSuccess: () => {
      toast.success(
        "Interview created successfully!"
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to create interview"
      );
    },
  });

  return result;
};