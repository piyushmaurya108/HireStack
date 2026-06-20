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
      const apiErrorMsg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message;
      toast.error(
        apiErrorMsg ||
          "Failed to submit answer"
      );
    },
  });

  return result;
};