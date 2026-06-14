 import { useQuery } from "@tanstack/react-query";
import { mockInterviewApi } from "../../api/mockInterview";

export const useInterviewReport = (interviewId) => {
  const result = useQuery({
    queryKey: ["interviewReport", interviewId],

    queryFn: () =>
      mockInterviewApi.getInterviewReport(
        interviewId
      ),

    enabled: !!interviewId,

    staleTime: 5 * 60 * 1000, // 5 minutes

    retry: 1,
  });

  return result;
};