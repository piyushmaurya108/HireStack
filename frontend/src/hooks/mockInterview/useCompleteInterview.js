
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
      const apiErrorMsg =
        error.response?.data?.errors?.[0]?.msg ||
        error.response?.data?.message;
      toast.error(
        apiErrorMsg ||
          "Failed to complete interview"
      );
    },
  });

  return result;
};

