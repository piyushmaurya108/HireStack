import { useQuery } from "@tanstack/react-query";
import { mockInterviewApi } from "../../api/mockInterview";

export const useCurrentQuestion = (
  interviewId
) => {
  const result = useQuery({
    queryKey: [
      "currentQuestion",
      interviewId,
    ],

    queryFn: () =>
      mockInterviewApi.getCurrentQuestion(
        interviewId
      ),

    enabled: !!interviewId,

    refetchInterval: 5000,
  });

  return result;
};