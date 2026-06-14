 
import { useQuery } from "@tanstack/react-query";
import { mockInterviewApi } from "../../api/mockInterview";

export const useInterviewHistory = () => {
  const result = useQuery({
    queryKey: ["interviewHistory"],

    queryFn: mockInterviewApi.getInterviewHistory,
  });

  return result;
};
 