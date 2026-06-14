
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockInterviewApi } from "../../api/mockInterview";

export const useCompleteInterview = () => {
  const result = useMutation({
    mutationKey: ["completeInterview"],

    mutationFn: mockInterviewApi.completeInterview,

    onSuccess: () => {
      toast.success("Interview completed successfully!");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to complete interview"
      );
    },
  });

  return result;
};

