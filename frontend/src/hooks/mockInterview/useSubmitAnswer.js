import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { mockInterviewApi } from "../../api/mockInterview";

export const useSubmitAnswer = () => {
  const result = useMutation({
    mutationKey: ["submitAnswer"],

    mutationFn:
      mockInterviewApi.submitAnswer,

    onSuccess: () => {
      toast.success(
        "Answer submitted successfully!"
      );
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit answer"
      );
    },
  });

  return result;
};